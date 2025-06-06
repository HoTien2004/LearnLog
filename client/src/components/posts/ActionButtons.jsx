import React from 'react'
import Button from 'react-bootstrap/Button'
import playIcon from '../../assets/play-btn.svg'
import editIcon from '../../assets/pencil.svg'
import deleteIcon from '../../assets/trash.svg'

const ActionButtons = ({ url, postId }) => {
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
            >
                <img src={editIcon} alt="edit" width="24" height="24" />
            </Button>
            <Button
                className="post-button btn-sm"
                variant="outline-danger"
            >
                <img src={deleteIcon} alt="delete" width="24" height="24" />
            </Button>
        </div>
    )
}

export default ActionButtons