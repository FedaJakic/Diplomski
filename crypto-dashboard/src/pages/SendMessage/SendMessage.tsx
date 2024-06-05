import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { MessageUrlsApi } from '../../api/message'
import { CustomJwtPayload, tokenDecode } from '../../util/helpers/tokenHelpers'

const SendMessage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()
  const [message, setMessage] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      if (token && userId) {
        const decodedToken: CustomJwtPayload = tokenDecode(token)
        const response = await MessageUrlsApi.sendMessage({
          senderId: decodedToken.id,
          receiverId: userId,
          subject,
          content: message,
        })
        if (response.success) {
          setSuccess('Message sent successfully!')
          setTimeout(() => {
            navigate(`/list-user`)
          }, 2000)
        } else {
          setError('Failed to send the message.')
        }
      }
    } catch (err) {
      setError('An error occurred while sending the message.')
    }
  }

  return (
    <div className="container mt-5">
      <h2>Send Message</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSubject" className="my-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-3">
          Send
        </Button>
      </Form>
    </div>
  )
}

export default SendMessage
