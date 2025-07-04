import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
    const {
        postState: { postUpdate },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast,
    } = useContext(PostContext)

    // State
    const [updatedPost, setUpdatedPost] = useState(postUpdate)

    useEffect(() => {
        setUpdatedPost(postUpdate)
    }, [postUpdate])

    const { title, description, url, status } = updatedPost

    const onChangeUpdatedPostForm = e => {
        setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value })
    }

    const closeDialog = () => {
        setUpdatedPost(postUpdate)
        setShowUpdatePostModal(false)
    }

    const onSubmit = async e => {
        e.preventDefault()
        const { success, message } = await updatePost(updatedPost)
        setShowUpdatePostModal(false)
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger'
        })
    }

    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            required
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeUpdatedPostForm}
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
                            value={description}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="YouTube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as='select'
                            value={status}
                            name='status'
                            onChange={onChangeUpdatedPostForm}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
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

export default UpdatePostModal