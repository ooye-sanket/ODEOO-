import Axios from 'axios'
import { Router, useRouter } from 'next/router'
import { Container, Card, Spinner, Row, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { At, Plus } from 'react-bootstrap-icons'
import { FieldArray, ErrorMessage, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik } from '../../../components'
import useFetch from '../../../hooks/useFetch'
import { Genre, Event } from '../../../@types'
import moment from 'moment';

const Artist = () => {
   const router = useRouter()
   const { data: artist, loading } = useFetch(`/artists/${router.query.username}`, {})

   const initialValues = {
      firstName: artist?.firstName,
      lastName: artist?.lastName,
      username: artist?.username,
      email: artist?.email,
      phone: artist?.phone,
      dateOfBirth: moment(artist?.dateOfBirth).format('YYYY-MM-DD'),
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
      phone: Yup.number()
         .typeError("Doesn't look like a Phone no.")
         .positive("Phone no. can't start with a minus")
         .integer("Phone no. can't include a decimal point")
         .min(8),
      dateOfBirth: Yup.string().test(
         "dateOfBirth",
         "Age should be greater than 16",
         (value: any) =>
            (moment().diff(moment(value), 'years') >= 16)
      ).required('Date of Birth is required.'),
      username: Yup.string().lowercase('Username cannot contain capital letters').required('Username is required.').test(
         "username",
         "Username taken",
         async (value: any) => {
            try {
               const r = await Axios.get(`/artists/${value}`)
               return r.data.data.username != artist?.username ? false : true
            } catch (err) {
               return true
            }
         }
      ),
      aadhar: Yup.number()
         .typeError("Doesn't look like an Aadhar no.")
         .positive("Aadhar no. can't start with a minus")
         .integer("Aadhar no. can't include a decimal point")
         .min(12, "Aadhar no. cannot be shorter than 12 digits")
         .required('Aadhar no. is required'),
      youtubeLinks: Yup.array().min(3, "Provide atleast 3 youtube links")
         .of(Yup.string().matches(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?$/, "Invalid youtube link"))
   });

   const updateProfile = (values: any) => {
      console.log(values)
      Axios.put('/user/profile', { ...values, id: artist._id })
         .then((r) => {
            router.push('/admin');
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
         <div className="section-title">
            <h3>Update Profile</h3>
         </div>
         <Card className='px-3 pt-3' style={{ paddingBottom: '4em' }}>
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
                              type='email'
                              name="email"
                              label="Email Address"
                              isInvalid={errors.email && touched.email}
                           />
                        </Col>
                     </Row>
                     <Row>
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
                        <Col xs='12' sm='5'>
                           <BsFormik
                              control='date'
                              className='mb-3'
                              name="dateOfBirth"
                              label="Date of Birth"
                           />

                        </Col>
                     </Row>
                     <Row>
                        <Col xs='12' sm='6'>
                           <BsFormik
                              className='mb-3'
                              maxLength={10}
                              name="phone"
                              label="Phone No."
                           />
                        </Col>

                        <Col xs='12' sm='6'>
                           <BsFormik
                              className='mb-3'
                              maxLength={12}
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
                                    <div className='mb-3' key={index}>
                                       <InputGroup hasValidation >
                                          <BsFormik
                                             className='flex-grow-1'
                                             name={`youtubeLinks.${index}`}
                                             label={`Video #${index + 1}`}
                                             style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                          />
                                          {values.youtubeLinks.length > 3 && (<Button variant="outline-primary"
                                             style={{ borderTopRightRadius: '0', borderBottomRightRadius: '0' }}
                                             onClick={() => remove(index)}>&#8722;</Button>)}
                                          <Button variant="outline-primary" onClick={() => insert(index + 1, '')}>&#43;</Button>
                                       </InputGroup>

                                    </div>
                                 ))
                              ) : (
                                 <Button onClick={() => push('')}>
                                    <Plus />  Add a Link
                                 </Button>
                              )
                           )
                        }} />
                     <ErrorMessage name='youtubeLinks' component='small' className='text-danger' />

                     <BsFormik
                        control='chips'
                        className='mb-3'
                        name='meta.genre'
                        label="Genre"
                        options={Object.values(Genre)}
                     />

                     <BsFormik
                        control='chips'
                        className='mb-3'
                        name='meta.events'
                        label="Events"
                        options={Object.values(Event)}
                     />
                     <Row>
                        <Col xs='6' sm='4'>
                           <BsFormik
                              control='checkbox'
                              name='verification.email'
                              className='mb-3'
                              label="Verify Email"
                           />
                        </Col>
                        <Col xs='6' sm='4'>
                           <BsFormik
                              control='checkbox'
                              name='verification.phone'
                              className='mb-3'
                              label="Verify Phone"
                           />
                        </Col>
                        <Col xs='12' sm='4'>
                           <BsFormik
                              control='checkbox'
                              name='verification.profile'
                              className='mb-3'
                              label="Verify Profile"
                           />
                        </Col>
                     </Row>

                     <Button
                        className='d-block ms-auto'
                        variant="success"
                        type="submit"
                        // size='lg'
                        disabled={isSubmitting}
                     >
                        Done                     </Button>

                  </FormikForm>
               )}
            </Formik>
         </Card></Container>
   )
}

Artist.layout = 'ADMIN'

export default Artist