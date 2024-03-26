import { Toast, ToastContainer } from 'react-bootstrap'

interface ToastCompProps {
  bg?: Bg
  content: string
  delay?: number
  position: Position
  setShow: (show: boolean) => void
  show: boolean
  title: string
}

const ToastComp: React.FC<ToastCompProps> = ({
  bg = 'dark',
  content,
  delay = 3000,
  position,
  setShow,
  show,
  title
}) => {
  return (
    <ToastContainer containerPosition="fixed" position={position} className="p-3">
      <Toast autohide bg={bg} delay={delay} onClose={() => setShow(false)} show={show}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{content}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastComp
