import type { NextApiRequest, NextApiResponse } from 'next'

import { environment } from '@/src/environment'
import { serverEnvironment } from '@/src/environment.server'

const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 2000

type ChatMessage = { role: 'user' | 'assistant'; content: string }

/**
 * Meilisearch streams the search progress and the used documents only if the client announces that it understands
 * these "tools" - without them we would get the answer, but no sources.
 * https://www.meilisearch.com/docs/reference/api/chats
 */
const meilisearchTools = [
  {
    type: 'function',
    function: {
      name: '_meiliSearchProgress',
      description: 'Provides information about the current Meilisearch search operation',
      parameters: {
        type: 'object',
        properties: {
          call_id: { type: 'string' },
          function_name: { type: 'string' },
          function_parameters: { type: 'string' },
        },
        required: ['call_id', 'function_name', 'function_parameters'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: '_meiliSearchSources',
      description: 'Provides the documents the answer is based on',
      parameters: {
        type: 'object',
        properties: { call_id: { type: 'string' } },
        required: ['call_id'],
      },
    },
  },
]

const isValidMessages = (messages: unknown): messages is ChatMessage[] =>
  Array.isArray(messages) &&
  messages.length > 0 &&
  messages.length <= MAX_MESSAGES &&
  messages.every(
    (message) =>
      typeof message === 'object' &&
      message !== null &&
      ((message as ChatMessage).role === 'user' || (message as ChatMessage).role === 'assistant') &&
      typeof (message as ChatMessage).content === 'string' &&
      (message as ChatMessage).content.length <= MAX_MESSAGE_LENGTH,
  )

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    response.status(405).json({ error: 'Method not allowed' })

    return
  }

  const { meilisearchChatApiKey, meilisearchChatWorkspace, meilisearchChatModel } =
    serverEnvironment

  if (!meilisearchChatApiKey || !meilisearchChatWorkspace || !meilisearchChatModel) {
    response.status(503).json({ error: 'Chat is not configured' })

    return
  }

  const { messages } = request.body ?? {}

  if (!isValidMessages(messages)) {
    response.status(400).json({ error: 'Invalid messages' })

    return
  }

  const abortController = new AbortController()
  request.on('close', () => abortController.abort())

  let upstream: Response

  try {
    upstream = await fetch(
      new URL(
        `/chats/${meilisearchChatWorkspace}/chat/completions`,
        environment.meilisearchHost,
      ).toString(),
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${meilisearchChatApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: meilisearchChatModel,
          // Meilisearch doesn't implement non streamed chat completions.
          stream: true,
          tools: meilisearchTools,
          messages,
        }),
        signal: abortController.signal,
      },
    )
  } catch {
    response.status(502).json({ error: 'Chat backend is not reachable' })

    return
  }

  if (!upstream.ok || !upstream.body) {
    response.status(502).json({ error: 'Chat backend returned an error' })

    return
  }

  response.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    // Prevents the reverse proxy from buffering the stream.
    'X-Accel-Buffering': 'no',
  })

  const reader = upstream.body.getReader()

  try {
    let isDone = false

    while (!isDone) {
      // eslint-disable-next-line no-await-in-loop
      const { done, value } = await reader.read()
      isDone = done

      if (value) {
        response.write(value)
      }
    }
  } catch {
    // The client disconnected or the stream broke, there is nothing to report anymore.
  }

  response.end()
}

export const config = {
  api: {
    // The response is a stream of unknown length.
    responseLimit: false,
  },
}

export default handler
