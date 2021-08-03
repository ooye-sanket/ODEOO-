import Axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image'
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap'
import { At } from 'react-bootstrap-icons'
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik } from '../components'

const Register = () => {

   const initialValues = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: ''

   };
   const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Email is required.'),
      password: Yup.string()
         .required('No password provided.')
         .min(8, 'Password is too short - should be 8 chars minimum.'),
   });

   const signup = (values: any) => {
      const { email, password } = values;
      Axios.post('/signup', values)
         .then((r) => {
            localStorage.setItem(
               'auth-token',
               r.headers.authorization.split(' ')[1]
            );
            window.open('/');
         })
         .catch(console.error);
   };

   return (
      <div id="signup">

         <h1 className='text-end text-light py-4 px-2'>Sign Up as Artist</h1>
         <div id="form" className='m-0 p-xs-2 p-4 '>
            <p>
               <small>
                  Already registered?{' '}
                  <Link href={{
                     pathname: '/',
                     query: { showLogin: true }
                  }} passHref >
                     <a><b>Login</b></a>
                  </Link>
               </small>
            </p>
            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={signup}
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
                              name="password"
                              label="Password"
                              type='password'
                              isInvalid={errors.password && touched.password}
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
         </div>

         {/* <Container >
            <Row>
               <Col xs sm={{ span: 10, offset: 2 }} lg={{ span: 4, offset: 8 }} className='bg-light'>

               </Col>
            </Row>
         </Container> */}
      </div>
   )
}

export default Register