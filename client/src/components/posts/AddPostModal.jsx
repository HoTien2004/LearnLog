import React, { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
    const { isOpenModal, setIsOpenModal } = useContext(PostContext)

    const closeDialog = () => {
        setIsOpenModal(false)
    }

    return (
        <Modal show={isOpenModal} onHide={closeDialog} >
            <Modal.Header closeButton>
                <Modal.Title>Add New Post</Modal.Title>
                {/* <Button
                    variant="close"
                    aria-label="Close"
                    onClick={() => setIsOpenModal(false)}
                /> */}
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                        />
                        <Form.Text id="title-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Description"
                            name="description"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="YouTube Tutorial URL"
                            name="url"
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="success" type="submit">
                        LearnIt!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPostModal