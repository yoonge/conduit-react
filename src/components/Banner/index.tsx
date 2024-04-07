import { Container } from 'react-bootstrap'
import './index.less'

interface BannerProps {
  children: JSX.Element | JSX.Element[]
}

const Banner: React.FC<BannerProps> = ({ children }) => {
  return (
    <section className="banner d-flex justify-content-center">
      <Container className="text-center">{children}</Container>
    </section>
  )
}

export default Banner
