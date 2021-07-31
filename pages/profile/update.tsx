import { useContext } from 'react';
import { Container, ListGroup, Button, Badge, Row, Col, Card, InputGroup, FormControl } from 'react-bootstrap';
import { BsFormik } from '../../components'
import { At } from 'react-bootstrap-icons'
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import Context from '../../Context';
import Axios from 'axios';
import Router from 'next/router'

const Profile = () => {
   const { user }: any = useContext(Context)

   const initialValues = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phone: user.phone,
      currPassword: '',
      newPassword: '',
      passwordConfirm: ''

   };
   const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Email is required.'),
      newPassword: Yup.string()
         .required('No password provided.')
         .min(8, 'Password is too short - should be 8 chars minimum.'),
   });

   const signup = (values: any) => {
      const { email, newPassword } = values;
      Axios.post('/signup', values)
         .then((r) => {
            localStorage.setItem(
               'auth-token',
               r.headers.authorization.split(' ')[1]
            );
            Router.reload();
         })
         .catch(console.error);
   };

   return (
      <Container>
         <div className="section-title">
            <h2>Edit Profile</h2>
         </div>
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={signup}
            enableReinitialize
            validateOnBlur
         >
            {({ values, errors, touched, isSubmitting }) => (
               <FormikForm className='d-block my-auto'>
                  <Row>
                     <Col xs='12' sm='6'>
                        <BsFormik
                           className='mb-3'
                           name="firstName"
                           label="First Name"
                           isInvalid={errors.firstName && touched.firstName}
                        />
                     </Col>
                     <Col xs='12' sm='6'>
                        <BsFormik
                           className='mb-3'
                           name="lastName"
                           label="Last Name"
                           isInvalid={errors.lastName && touched.lastName}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col >
                        <BsFormik
                           className='mb-3'
                           name="email"
                           label="Email Address"
                           isInvalid={errors.email && touched.email}
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col xs='12' sm='5'>
                        <BsFormik
                           className='mb-3'
                           name="phone"
                           label="Phone No."
                           isInvalid={errors.phone && touched.phone}
                        />
                     </Col>
                     <Col xs='12' sm='7' >
                        <InputGroup className="mb-3" >
                           <InputGroup.Text id="basic-addon1"><At size={24} /></InputGroup.Text>
                           <BsFormik
                              className=' flex-grow-1'
                              name="username"
                              label="Username"
                              isInvalid={errors.username && touched.username}
                              style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                           />
                        </InputGroup>
                     </Col>
                  </Row>
                  <Row>
                     <Col xs='12' sm='6'>
                        <BsFormik
                           className='mb-3'
                           name="newPassword"
                           label="Password"
                           type='password'
                           isInvalid={errors.newPassword && touched.newPassword}
                        />
                     </Col>
                     <Col xs='12' sm='6'>
                        <BsFormik
                           className='mb-3'
                           name="passwordConfirm"
                           label="Confirm Password"
                           type='password'
                           isInvalid={errors.passwordConfirm && touched.passwordConfirm}
                        />
                     </Col>
                  </Row>
                  <Button
                     variant="success"
                     type="submit"
                     size='lg'
                     disabled={isSubmitting}
                     style={{ width: '100%' }}
                  >
                     Go Ahead!
                  </Button>

               </FormikForm>
            )}
         </Formik>


      </Container>
   );
};

Profile.layout = 'MINIMAL';
export default Profile;

const StatusListItem = ({ verified, children }: any) => {

   return (
      <ListGroup.Item>{children} &nbsp; <Badge bg={verified ? 'success' : 'danger'}>{verified ? 'VERIFIED' : 'NOT VERIFIED'}</Badge></ListGroup.Item>

   )
}