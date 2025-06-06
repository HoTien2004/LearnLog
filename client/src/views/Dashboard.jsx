import React, { useContext, useEffect } from 'react'
import { PostContext } from '../contexts/PostContext'
import { AuthContext } from '../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import addIcon from '../assets/plus-circle-fill.svg'

const Dashboard = () => {
  // Contexts
  const { postState: { posts, postsLoading }, getPosts, isOpenModal, setIsOpenModal } = useContext(PostContext)
  const { authState: { user: { username } } } = useContext(AuthContext)

  // Start: Get all posts
  useEffect(() => {
    getPosts()
  }, [])

  let body = null

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant='info' />
      </div>
    )
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as='h1'>Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to the Dashboard</Card.Title>
            <Card.Text>
              Click the button below to create your first post.
            </Card.Text>
            <Button onClick={() => setIsOpenModal(true)} variant='primary'>LearnIt!</Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map(post => {
            return (
              <Col key={post._id} className="my-2">
                <SinglePost post={post} />
              </Col>
            )
          })}
        </Row>

        <Button className='btn-floating' variant='none' onClick={() => setIsOpenModal(true)}>
          <img src={addIcon} alt="add-post" width='60' height='60' />
        </Button>
      </>
    )
  }

  return (
    <>
      {body}
      <AddPostModal />
    </>
  )
}

export default Dashboard
