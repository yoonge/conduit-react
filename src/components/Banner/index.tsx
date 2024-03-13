import React from 'react'
import { Container } from 'react-bootstrap'
import './index.less'

const Banner: React.FC = () => {
  return (
    <section className="banner">
      <Container>
        <h1>Conduit</h1>
        <p>A place to share your knowledge.</p>
      </Container>
    </section>
  )
}

export default Banner
