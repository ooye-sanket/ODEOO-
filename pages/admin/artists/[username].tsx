import Axios from 'axios'
import { useRouter } from 'next/router'
import { Container, Card, Spinner, Row, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { At } from 'react-bootstrap-icons'
import { FieldArray, ErrorMessage, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik } from '../../../components'
import useFetch from '../../../hooks/useFetch'
import { Genre, Event } from '../../../@types'

const Artist = () => {
   const { query } = useRouter()
   const { data: artist, loading } = useFetch(`/artists/${query.username}`, {})

   const initialValues = {
      firstName: artist?.firstName,
      lastName: artist?.lastName,
      username: artist?.username,
      email: artist?.email,
      phone: artist?.phone,
      dateOfBirth: artist?.dateOfBirth,
      aadhar: artist?.aadhar,
      meta: {
         genre: artist?.meta?.genre,
         events: artist?.meta?.events,
      },
      verification: {
         email: artist?.verification?.email,
         phone: artist?.verification?.phone,
         profile: artist?.verification?.profile
      },
      youtubeLinks: artist?.youtubeLinks || ['', '', '']

   };
   const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid Email').required('Email is required.'),
      aadhar: Yup.string().min(12, "Aadhar number cannot be shorter than 12 digits").max(12, 'Aadhar number cannot be longer than 12 digits'),
      youtubeLinks: Yup.array()
         .of(Yup.string().matches(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?$/, "Invalid youtube link"))
   });

   const updateProfile = (values: any) => {
      console.log(values)
      Axios.put('/user/profile', { ...values, id: artist._id })
         .then((r) => {
            debugger;
         })
         .catch(console.error);
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
         <Card className='p-3' style={{ paddingBottom: '6em' }}>
            <Formik
               enableReinitialize
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
                                 className='flex-grow-1'
                                 name="username"
                                 label="Username"
                                 style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                              />
                           </InputGroup>
                        </Col>
                     </Row>
                     <Row>
                        <Col xs='12' sm='6'>
                           <BsFormik
                              control='date'
                              className='mb-3'
                              name="dateOfBirth"
                              label="Date of Birth"
                           />
                        </Col>
                        <Col xs='12' sm='6'>
                           <BsFormik
                              className='mb-3'
                              name="aadhar"
                              label="Aadhar Number"
                           />
                        </Col>
                     </Row>
                     <Form.Label>Youtube Links</Form.Label>
                     <FieldArray
                        name="youtubeLinks"
                        render={({ push, insert, remove }) => {
                           return (
                              values.youtubeLinks && values.youtubeLinks.length > 0 ? (
                                 values.youtubeLinks.map((link: any, index: any) => (
                                    <div className='mb-3'>
                                       <InputGroup hasValidation >
                                          <BsFormik
                                             className='flex-grow-1'
                                             name={`youtubeLinks.${index}`}
                                             label={`Video #${index + 1}`}
                                             style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                          />
                                          {values.youtubeLinks.length > 3 && <Button variant="outline-primary" onClick={() => remove(index)}>&#8722;</Button>}
                                          <Button variant="outline-primary" onClick={() => insert(index + 1, '')}>&#43;</Button>
                                       </InputGroup>

                                    </div>
                                 ))
                              ) : (
                                 <button onClick={() => push('')}>
                                    Add a Link
                                 </button>
                              )
                           )
                        }} />

                     <Row>
                        <Col xs='12' sm='6'>
                           <BsFormik
                              control='checkbox'
                              name='verification.phone'
                              className='mb-3'
                              label="Verify Phone"
                           />
                        </Col>
                        <Col xs='12' sm='6'>
                           <BsFormik
                              control='checkbox'
                              name='verification.profile'
                              className='mb-3'
                              label="Verify Profile"
                           />
                        </Col>
                     </Row>
                     <BsFormik
                        control='chips'
                        name='meta.genre'
                        label="Genre"
                        options={Object.values(Genre)}
                     />
                     <BsFormik
                        control='chips'
                        name='meta.events'
                        label="Events"
                        options={Object.values(Event)}
                     />

                     < Button
                        variant="success"
                        type="submit"
                        size='lg'
                        disabled={isSubmitting}
                     >
                        Update Profile
                     </Button>

                  </FormikForm>
               )}
            </Formik>
         </Card></Container>
   )
}

Artist.layout = 'ADMIN'

export default Artist