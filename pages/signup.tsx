import Axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image'
import { Container, Row, Col, Button, InputGroup, Spinner } from 'react-bootstrap'
import { At } from 'react-bootstrap-icons'
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik } from '../components'
import cogoToast from 'cogo-toast';

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
         .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
         ),
      passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match"),
      phone: Yup.string()
         .required('Phone no. is required.')
         .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            'Invalid Phone Number'),
   });

   const signup = (values: any, { setSubmitting }: any) => {
      // const { email, password } = values;
      Axios.post('/signup', values)
         .then((r) => {
            localStorage.setItem(
               'auth-token',
               r.headers.authorization.split(' ')[1]
            );
            window.location.replace("/");
            cogoToast
               .success(r.data.msg, { position: 'bottom-left' })
         }).catch(({ response: r }) => {
            cogoToast
               .warn(r.data.msg, { position: 'bottom-left' })
         })
         .finally(() => setSubmitting(false));
   };

   return (

      <Container fluid className='bg-primary' >

         <Row>
            <Col lg='6' className='d-none d-lg-block' style={{ height: '100vh' }}>

            </Col>
            <Col xs='12' lg='6' className='bg-white'>
               <div className="d-block mx-2 my-3">

                  <div className="section-title">
                     <h3>Create artist account</h3>
                  </div>
                  {/* <div id="form" className='m-0 p-xs-2 p-4 '> */}
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
                                    maxLength={10}
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
                              {isSubmitting ? (
                                 <Spinner animation="border" variant="light" size="sm" />
                              ) : (
                                 'Signup'
                              )}
                           </Button>

                        </FormikForm>
                     )}
                  </Formik>
               </div>

            </Col>

         </Row>

      </Container>

   )
}

export default Register