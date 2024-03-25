import { Toast, ToastContainer } from 'react-bootstrap'

interface ToastCompProps {
  position: 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'
  show: boolean
  setShow: (show: boolean) => void
  title: string
  content: string
}

const ToastComp: React.FC<ToastCompProps> = ({ position, show, setShow, title, content }) => {
  return (
    <ToastContainer containerPosition="fixed" position={position} className="p-3">
      <Toast autohide bg="dark" delay={3000} onClose={() => setShow(false)} show={show}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{content}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastComp
