import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface Props {
  title: string
  body: string
  show: boolean
  onHide: () => void
}

const InfoModal: React.FC<Props> = ({ title, body, show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default InfoModal
