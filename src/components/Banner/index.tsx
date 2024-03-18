import React from 'react'
import { Container } from 'react-bootstrap'
import './index.less'

const Banner: React.FC = () => {
  return (
    <section className="banner d-flex justify-content-center">
      <Container className="text-center">
        <h1>Conduit</h1>
        <p>A place to share your knowledge.</p>
      </Container>
    </section>
  )
}

export default Banner
