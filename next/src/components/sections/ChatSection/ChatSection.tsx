import { Button, Typography } from '@bratislava/component-library'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import { TextArea, TextField } from 'react-aria-components'

import Icon from '@/src/components/common/Icon/Icon'
import MLink from '@/src/components/common/MLink/MLink'
import Spinner from '@/src/components/common/Spinner/Spinner'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { useTranslation } from '@/src/utils/useTranslation'

import { ChatSource } from './chatSources'
import { ChatMessage, useChat } from './useChat'

const VISIBLE_SOURCES_COUNT = 3

const ChatSources = ({ sources }: { sources: ChatSource[] }) => {
  const { t } = useTranslation()
  const [isExpanded, setIsExpanded] = useState(false)

  if (sources.length === 0) {
    return null
  }

  const hiddenSourcesCount = sources.length - VISIBLE_SOURCES_COUNT
  const visibleSources = isExpanded ? sources : sources.slice(0, VISIBLE_SOURCES_COUNT)

  return (
    <div className="mt-3 border-t pt-3">
      <Typography variant="p-small-bold">{t('ChatPage.sources')}</Typography>
      <ul className="mt-1 flex flex-col gap-1">
        {visibleSources.map((source) => (
          <li key={source.id}>
            <Typography variant="p-small">
              {source.href ? (
                <MLink href={source.href} variant="underlined">
                  {source.title}
                </MLink>
              ) : (
                source.title
              )}
            </Typography>
          </li>
        ))}
      </ul>
      {hiddenSourcesCount > 0 ? (
        <Button
          variant="link"
          size="small"
          className="mt-1"
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded
            ? t('ChatPage.showLessSources')
            : t('ChatPage.showMoreSources', { count: hiddenSourcesCount })}
        </Button>
      ) : null}
    </div>
  )
}

const ChatMessageItem = ({ message, isLoading }: { message: ChatMessage; isLoading: boolean }) => {
  const { t } = useTranslation()

  if (message.role === 'user') {
    return (
      <div className="max-w-3/4 self-end rounded-lg bg-background-passive-secondary px-4 py-3">
        <Typography variant="p-small">{message.content}</Typography>
      </div>
    )
  }

  return (
    <div className="max-w-3/4 self-start rounded-lg border px-4 py-3">
      {message.content.length === 0 && isLoading ? (
        <div className="flex items-center gap-2">
          <Spinner size="sm" />
          <Typography variant="p-small">{t('ChatPage.thinking')}</Typography>
        </div>
      ) : (
        <Markdown content={message.content} variant="small" />
      )}
      <ChatSources sources={message.sources} />
    </div>
  )
}

const ChatSection = () => {
  const { t } = useTranslation()
  const { messages, isLoading, isError, sendMessage, stop } = useChat()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end' })
  }, [messages])

  const handleSend = () => {
    const question = input
    setInput('')
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    sendMessage(question)
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    handleSend()
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto">
        <SectionContainer className="py-6">
          <div className="flex flex-col gap-4">
            {/* Hardcoded intro "message" from the chatbot. */}
            <div className="max-w-3/4 self-start rounded-lg border px-4 py-3">
              <Typography variant="p-small">{t('ChatPage.welcome')}</Typography>
              <Typography variant="p-small" className="mt-2 text-content-passive-secondary">
                {t('ChatPage.disclaimer')}
              </Typography>
            </div>

            {messages.map((message, index) => (
              <ChatMessageItem
                // Messages are append only, so the index is a stable key here.
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                message={message}
                isLoading={isLoading && index === messages.length - 1}
              />
            ))}

            {isError ? (
              <Typography variant="p-small" className="text-content-error-default">
                {t('ChatPage.error')}
              </Typography>
            ) : null}

            <div ref={messagesEndRef} />
          </div>
        </SectionContainer>
      </div>

      <div className="sticky bottom-0 shrink-0 border-t bg-background-passive-base py-4">
        <SectionContainer>
          <form onSubmit={handleSubmit}>
            <TextField
              className="relative"
              aria-label={t('ChatPage.inputLabel')}
              value={input}
              onChange={setInput}
            >
              <TextArea
                rows={3}
                placeholder={t('ChatPage.placeholder')}
                className="w-full resize-none rounded-lg border py-3 pr-16 pl-4 base-focus-ring outline-hidden hover:border-border-active-tertiary-hover focus:border-border-active-primary-pressed"
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    handleSend()
                  }
                }}
              />
              {isLoading ? (
                <Button
                  variant="outline"
                  size="small"
                  className="absolute right-3 bottom-3"
                  icon={<Icon name="close" />}
                  aria-label={t('ChatPage.stop')}
                  onPress={stop}
                />
              ) : (
                <Button
                  type="submit"
                  variant="solid"
                  size="small"
                  className="absolute right-3 bottom-3"
                  icon={<Icon name="send" />}
                  aria-label={t('ChatPage.send')}
                  isDisabled={input.trim().length === 0}
                />
              )}
            </TextField>
          </form>
        </SectionContainer>
      </div>
    </div>
  )
}

export default ChatSection
