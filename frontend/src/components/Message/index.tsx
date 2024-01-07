import styles from './index.module.scss'
import React, { useState } from 'react'

type MessageContent = React.ReactNode

type MessageType = 'info' | 'success' | 'error' | 'warning'

interface ArgsProps {
  content: MessageContent
  type: MessageType
}

interface MessageApi {
  open: (config: ArgsProps) => void
  info: (content: MessageContent) => void
  success: (content: MessageContent) => void
  warning: (content: MessageContent) => void
  error: (content: MessageContent) => void
}

const Message = ({ content, type }: { content: MessageContent; type: MessageType }) => {
  return (
    <div className={styles.message}>
      {type}: {content}
    </div>
  )
}

function useMessage(): [MessageApi, React.JSX.Element] {
  const [messages, setMessages] = useState<{ content: MessageContent; type: MessageType; key: number }[]>([])
  const [nextKey, setNextKey] = useState(0)

  const addMessage = (content: MessageContent, type: MessageType): number => {
    const key = nextKey
    setNextKey(nextKey + 1)
    setMessages(prevMessages => [...prevMessages, { key, content, type }])
    return key
  }

  const removeMessage = (key: number): void => {
    setMessages(prevMessages => prevMessages.filter(message => message.key !== key))
  }

  const api: MessageApi = {
    open(config) {
      const key = addMessage(config.content, config.type)
      setTimeout(() => removeMessage(key), 3000)
    },
    info(content) {
      this.open({ content, type: 'info' })
    },
    success(content) {
      this.open({ content, type: 'success' })
    },
    warning(content) {
      this.open({ content, type: 'warning' })
    },
    error(content) {
      this.open({ content, type: 'error' })
    },
  }

  const holder = (
    <div className={styles.holder}>
      {messages.map(message => (
        <Message key={message.key} content={message.content} type={message.type} />
      ))}
    </div>
  )
  return [api, holder]
}

const message = {
  useMessage,
}
export default message
