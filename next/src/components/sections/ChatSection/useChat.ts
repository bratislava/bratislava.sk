import { useCallback, useRef, useState } from 'react'

import { ChatSource, parseChatSources } from './chatSources'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  sources: ChatSource[]
}

type StreamDelta = {
  content: string
  sources: ChatSource[]
}

type StreamedChunk = {
  choices?: {
    delta?: {
      content?: string | null
      tool_calls?: { function?: { name?: string; arguments?: string } }[] | null
    }
  }[]
}

const parseSourcesToolCall = (toolCall: { function?: { name?: string; arguments?: string } }) => {
  if (toolCall.function?.name !== '_meiliSearchSources' || !toolCall.function.arguments) {
    return []
  }

  try {
    const { sources } = JSON.parse(toolCall.function.arguments) as { sources?: unknown }

    return parseChatSources(sources)
  } catch {
    return []
  }
}

/** Parses one `data: {...}` line of the Meilisearch (OpenAI compatible) event stream. */
const parseStreamLine = (line: string): StreamDelta | null => {
  if (!line.startsWith('data: ')) {
    return null
  }

  const data = line.slice('data: '.length).trim()
  if (data.length === 0 || data === '[DONE]') {
    return null
  }

  let chunk: StreamedChunk
  try {
    chunk = JSON.parse(data) as StreamedChunk
  } catch {
    return null
  }

  const delta = chunk.choices?.[0]?.delta

  return {
    content: delta?.content ?? '',
    sources: (delta?.tool_calls ?? []).flatMap((toolCall) => parseSourcesToolCall(toolCall)),
  }
}

const readStream = async (
  body: ReadableStream<Uint8Array>,
  onDelta: (delta: StreamDelta) => void,
) => {
  const reader = body.pipeThrough(new TextDecoderStream()).getReader()
  let buffer = ''
  let isDone = false

  while (!isDone) {
    // eslint-disable-next-line no-await-in-loop
    const { done, value } = await reader.read()
    isDone = done
    buffer += value ?? ''

    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    lines
      .map((line) => parseStreamLine(line))
      .filter((delta): delta is StreamDelta => delta !== null)
      .forEach((delta) => onDelta(delta))
  }
}

const appendDelta = (message: ChatMessage, delta: StreamDelta): ChatMessage => ({
  ...message,
  content: message.content + delta.content,
  sources: [
    ...message.sources,
    ...delta.sources.filter((source) => !message.sources.some(({ id }) => id === source.id)),
  ],
})

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const handleDelta = useCallback((delta: StreamDelta) => {
    setMessages((previousMessages) =>
      previousMessages.map((message, index) =>
        index === previousMessages.length - 1 ? appendDelta(message, delta) : message,
      ),
    )
  }, [])

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmedContent = content.trim()
      if (trimmedContent.length === 0 || isLoading) {
        return
      }

      const history: ChatMessage[] = [
        ...messages,
        { role: 'user', content: trimmedContent, sources: [] },
      ]

      setMessages([...history, { role: 'assistant', content: '', sources: [] }])
      setIsLoading(true)
      setIsError(false)

      const abortController = new AbortController()
      abortControllerRef.current = abortController

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history.map(({ role, content: messageContent }) => ({
              role,
              content: messageContent,
            })),
          }),
          signal: abortController.signal,
        })

        if (!response.ok || !response.body) {
          throw new Error('Chat request failed')
        }

        await readStream(response.body, handleDelta)
      } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          setIsError(true)
          setMessages(history)
        }
      } finally {
        abortControllerRef.current = null
        setIsLoading(false)
      }
    },
    [handleDelta, isLoading, messages],
  )

  const stop = useCallback(() => {
    abortControllerRef.current?.abort()
  }, [])

  return { messages, isLoading, isError, sendMessage, stop }
}
