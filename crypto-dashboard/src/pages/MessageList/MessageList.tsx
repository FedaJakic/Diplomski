import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageUrlsApi } from '../../api/message'
import { tokenDecode } from '../../util/helpers/tokenHelpers'
import { ListGroup, Badge, Container } from 'react-bootstrap'

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (token) {
          const decodedToken = tokenDecode(token)
          const { messages } = await MessageUrlsApi.fetchMessages(
            decodedToken.id
          )
          setMessages(messages)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchMessages()
  }, [token])

  return (
    <Container className="mt-5">
      <h2>Messages</h2>
      <ListGroup>
        {messages.map((message) => (
          <ListGroup.Item
            key={message.id}
            as={Link}
            to={`/messages/${message.id}`}
          >
            {message.isViewed ? (
              message.subject
            ) : (
              <strong>{message.subject}</strong>
            )}
            {!message.isViewed && (
              <Badge bg="danger" className="ms-2">
                New
              </Badge>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default MessageList
