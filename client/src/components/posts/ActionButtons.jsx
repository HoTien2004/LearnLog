import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'
import { PostContext } from '../../contexts/PostContext'

const ActionButtons = ({ url, _id }) => {
    const { deletePost, setShowToast, findPostUpdate, setShowUpdatePostModal } = useContext(PostContext)

    const handleDelete = async () => {
        const { success, message } = await deletePost(_id)
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger'
        })
    }

    const choosePostUpdate = (postId) => {
        // if (!postId) {
        //     setShowToast({
        //         show: true,
        //         message: 'Invalid post ID.',
        //         type: 'danger'
        //     })
        //     return
        // }

        findPostUpdate(postId)
        setShowUpdatePostModal(true)
    }

    return (
        <div className="d-flex justify-content-end gap-2">
            <Button
                className="post-button btn-sm"
                href={url}
                target="_blank"
                variant="outline-primary"
            >
                <img src={playIcon} alt="play" width="24" height="24" />
            </Button>
            <Button
                className="post-button btn-sm"
                variant="outline-warning"
                onClick={() => choosePostUpdate(_id)}
            >
                <img src={editIcon} alt="edit" width="24" height="24" />
            </Button>
            <Button
                className="post-button btn-sm"
                variant="outline-danger"
                onClick={handleDelete}
            >
                <img src={deleteIcon} alt="delete" width="24" height="24" />
            </Button>
        </div>
    )
}

export default ActionButtons