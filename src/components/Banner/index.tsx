import React from 'react'
import { Container } from 'react-bootstrap'
import './index.less'

import { User } from '../../types/user'

interface BannerProps {
  headline: JSX.Element | ((user: User) => JSX.Element)
  secondary: JSX.Element | ((user: User) => JSX.Element)
}

const Banner: React.FC<BannerProps> = ({ headline, secondary }) => {
  return (
    <section className="banner d-flex justify-content-center">
      <Container className="text-center">
        {headline as JSX.Element}
        {secondary as JSX.Element}
      </Container>
    </section>
  )
}

export default Banner
