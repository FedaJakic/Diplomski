import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageUrlsApi } from '../../api/message'
import { Container, Alert } from 'react-bootstrap'

const MessageDetail: React.FC = () => {
  const { messageId } = useParams<{ messageId: string }>()
  const [message, setMessage] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        if (messageId) {
          const response = await MessageUrlsApi.getMessage(messageId)
          if (response.success) {
            setMessage(response.message)
            await MessageUrlsApi.markAsViewed(messageId)
          } else {
            setError('Message not found')
          }
        }
      } catch (error) {
        setError('An error occurred while fetching the message.')
      }
    }

    fetchMessage()
  }, [])

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  if (!message) {
    return <div>Loading...</div>
  }

  return (
    <Container className="mt-5">
      <h2>{message.subject}</h2>
      <p>From: {message.sender.username}</p>
      <p>To: {message.receiver.username}</p>
      <p>Date: {new Date(message.created).toLocaleString()}</p>
      <hr />
      <p>{message.content}</p>
    </Container>
  )
}

export default MessageDetail
