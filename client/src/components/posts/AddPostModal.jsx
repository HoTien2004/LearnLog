import React, { useContext, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
    const { isOpenModal, setIsOpenModal, addPost, setShowToast } = useContext(PostContext)

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    const { title, description, url } = newPost

    const onChangeNewPostForm = e => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value })
    }

    const closeDialog = () => {
        resetAddPostData()
    }

    const onSubmit = async e => {
        e.preventDefault()
        const { success, message } = await addPost(newPost)
        resetAddPostData()
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger'
        })
    }

    const resetAddPostData = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
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
                            onChange={onChangeNewPostForm}
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
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="YouTube Tutorial URL"
                            name="url"
                            value={url}
                            onChange={onChangeNewPostForm}
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