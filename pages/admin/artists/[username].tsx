import Axios from 'axios'
import { useRouter } from 'next/router'
import { Container, Card, Spinner, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { At } from 'react-bootstrap-icons'
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik } from '../../../components'
import useFetch from '../../../hooks/useFetch'

const Artist = () => {
   const { query } = useRouter()
   const { data: artist, loading } = useFetch(`/artists/${query.username}`)

   const initialValues = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      dateOfBirth: '',
      aadhar: "",
      meta: {
         genre: [],
         events: [],
      },
      verification: {
         email: false,
         phone: false,
         profile: false
      },
      youtubeLinks: []

   };
   const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Email is required.'),
      password: Yup.string()
         .required('No password provided.')
         .min(8, 'Password is too short - should be 8 chars minimum.'),
   });

   const updateProfile = (values: any) => {
      console.log(values)
   };

   // firstName,
   // lastName,
   // username,
   // email,
   // phone,
   // dateOfBirth,
   // address,
   // aadhar,
   // youtubeLinks,
   // meta,
   // verification

   return (
      <Container>
         <Card>
            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={updateProfile}
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
                              name="dateOfBirth"
                              label="Date of Birth"
                              type='dateOfBirth'
                              isInvalid={errors.dateOfBirth && touched.dateOfBirth}
                           />
                        </Col>
                        <Col xs='12' sm='6'>
                           <BsFormik
                              className='mb-3'
                              name="aadhar"
                              label="Aadhar Number"
                              isInvalid={errors.aadhar && touched.aadhar}
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
         </Card></Container>
   )
}

Artist.layout = 'ADMIN'

export default Artist