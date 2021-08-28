import { Container, FloatingLabel, Form } from 'react-bootstrap'

const Artists = () => {
   return (
      <header className="py-3 mb-4 border-bottom">
         <Container className='d-flex flex-wrap justify-content-center'>
            <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
               <span className="fs-4">Find the Best Artists</span>
            </a>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0">


               <Form.Control
                  placeholder='Search'
                  type='search'
                  size='lg'
               // value={field.value}
               // onChange={(e) => setFieldValue(field.name, e.target.value)}
               />
            </form>
         </Container>
      </header>
   )
}

Artists.layout = 'STANDARD'
export default Artists