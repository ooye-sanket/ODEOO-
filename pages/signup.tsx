import Axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import Image from 'next/image'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import BsFormik from '../components/BsFormik'

const Register = () => {

   const initialValues = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      dateOfBirth: "",
      address: "",
      aadhar: "",
      imageUrl: "",
      contentToDisplay: [
         {
            title: "Youtube Video",
            description: "My Youtube Video",
            mediaUrl: ""
         }
      ],
      youtubeLinks: [
         "",
         ""
      ],
      meta: {
         genre: [],
         events: []
      }
   };
   const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Email is required.'),
      password: Yup.string()
         .required('No password provided.')
         .min(8, 'Password is too short - should be 8 chars minimum.'),
   });

   const signup = (values: any) => {
      const { email, password } = values;
      console.log('Login');
      Axios.post('/signup', { email, password })
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
      <Container fluid>
         <Row id='signup' >
            <Col xs sm={{ span: 10, offset: 1 }} lg={{ span: 6, offset: 3 }}>
               <Card className='mt-4'>
                  <Card.Header>
                     <img
                        src="/logo.png"
                        height="50"
                        width='auto'
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                     />
                     <h3>Sign Up</h3>
                  </Card.Header>
                  <Card.Body>
                     <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={signup}
                        validateOnBlur
                     >
                        {({ values, errors, touched, isSubmitting }) => (
                           <FormikForm>
                              <Row className='mb-3'>
                                 <Col xs='12' sm='6'>
                                    <BsFormik
                                       name="firstName"
                                       label="First Name"
                                       isInvalid={errors.firstName && touched.firstName}
                                    />
                                 </Col>
                                 <Col xs='12' sm='6'>
                                    <BsFormik
                                       name="lastName"
                                       label="Last Name"
                                       isInvalid={errors.lastName && touched.lastName}
                                    />
                                 </Col>
                              </Row>
                              <Row className='mb-3'>
                                 <Col >
                                    <BsFormik
                                       name="email"
                                       label="Email Address"
                                       isInvalid={errors.email && touched.email}
                                    />
                                 </Col>
                              </Row>
                              <Row className='mb-3'>
                                 <Col xs='12' sm='6'>
                                    <BsFormik
                                       name="phone"
                                       label="Phone No."
                                       isInvalid={errors.phone && touched.phone}
                                    />
                                 </Col>
                                 <Col xs='12' sm='6'>
                                    <BsFormik
                                       name="dateOfBirth"
                                       label="Date of Birth"
                                       error={errors.dateOfBirth && touched.dateOfBirth}
                                    />
                                 </Col>
                              </Row>
                              {/* <Row className='mb-3'>

                                 <Col >

                                 </Col>
                              </Row> */}

                              <Button
                                 variant="success"
                                 type="submit"
                                 disabled={isSubmitting}
                              >
                                 Submit
                              </Button>
                              {'   '}
                              <small>
                                 New to Odeo.in?{' '}
                                 <Link href="/signup">
                                    <a>SignUp</a>
                                 </Link>
                              </small>
                           </FormikForm>
                        )}
                     </Formik>
                  </Card.Body>
               </Card>
            </Col>

         </Row>
      </Container>
   )
}

export default Register