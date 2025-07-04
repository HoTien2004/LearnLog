import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ActionButtons from './ActionButtons'

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
    return (
        <Card className="shadow h-100" border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
            <Card.Body>
                <Card.Title>
                    <Row className="align-items-center">
                        <Col xs={8}>
                            <p className="post-title">{title}</p>
                            <Badge pill bg={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
                                {status}
                            </Badge>
                        </Col>
                        <Col xs={4} className="text-end">
                            <ActionButtons url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card >
    )
}

export default SinglePost