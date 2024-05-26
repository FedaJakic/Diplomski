import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

interface Props {
  title: string
  show: boolean
  onHide: () => void
  onUpload: (file: File | null) => void
}

const UploadModal: React.FC<Props> = ({ title, show, onHide, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    onUpload(selectedFile)
    onHide()
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="file"
          name="profile_picture"
          onChange={handleFileChange}
          accept="image/*"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UploadModal
