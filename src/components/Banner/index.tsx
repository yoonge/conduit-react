import React from 'react'
import { Container } from 'react-bootstrap'
import './index.less'

interface BannerProps {
  headline: string | JSX.Element
  secondary: string | JSX.Element
}

const Banner: React.FC<BannerProps> = ({ headline, secondary }) => {
  return (
    <section className="banner d-flex justify-content-center">
      <Container className="text-center">
        {headline}
        {secondary}
      </Container>
    </section>
  )
}

export default Banner
