import Axios from 'axios'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { Container, Card, Spinner, Row, Col, Button, InputGroup, Form, Breadcrumb } from 'react-bootstrap'
import { At, Plus } from 'react-bootstrap-icons'
import { FieldArray, ErrorMessage, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik, ProfileImageCropper } from '../../../components'
import useFetch from '../../../hooks/useFetch'
import { Genre, Event } from '../../../@types'
import moment from 'moment';

const Artist = () => {
   const router = useRouter()
   const { data: artist, loading } = useFetch(`/artists/${router.query.username}`, { })

   const initialValues = {
      firstName: artist?.firstName,
      lastName: artist?.lastName,
      username: artist?.username,
      email: artist?.email,
      description: artist?.description || undefined,
      address: artist?.address || undefined,
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
      phone: Yup.string()
         .required('Phone no. is required.')
         .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            'Invalid Phone Number'
         ),
      description: Yup.string()
         .required('Profile Description is required')
         .min(30, 'Description should be at least 30 characters long'),
      dateOfBirth: Yup.string().test(
         "dateOfBirth",
         "Age should be greater than 16",
         (value: any) =>
            (moment().diff(moment(value), 'years') >= 16)
      ).required('Date of Birth is required.'),
      username: Yup.string()
         .required('Username is required.')
         .lowercase('Username cannot contain capital letters')
         .test('username', 'Username taken', async (value) => {
            try {
               const r = await Axios.get(`/users/${value}`);
               return r.data.data.username != artist?.username ? false : true;
            } catch (err) {
               return true;
            }
         }),
      aadhar: Yup.number()
         .typeError("Doesn't look like an Aadhar no.")
         .positive("Aadhar no. can't start with a minus")
         .integer("Aadhar no. can't include a decimal point")
         .min(12, "Aadhar no. cannot be shorter than 12 digits")
         .required('Aadhar no. is required'),
      youtubeLinks: Yup.array().min(3, "Provide atleast 3 youtube links")
         .of(Yup.string().matches(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?$/, "Invalid youtube link")),
      meta: Yup.object().shape({
         genre: Yup.array().min(2, 'Select atleast 2 genre').of(Yup.string()),
         events: Yup.array().min(2, 'Select atleast 2 events').of(Yup.string()),
      }),
   });

   const updateProfile = (values: any, { setSubmitting }: any) => {
      console.log(values)
      Axios.put('/user/profile', { ...values, id: artist._id })
         .then((r) => {
            router.push('/admin');
         })
         .catch(console.error)
         .finally(() => setSubmitting(false));
   };
   const updateImage = (img: any) => {
      let data = new FormData();

      data.append('id', artist._id);
      data.append('image', img);

      Axios.put('/user/image', data)
         .then((r) => console.log(r.data))
         .catch(console.error);
   };


   return (
      <Container>
         <div className="section-title">
            <h3>Update Profile</h3>
         </div>
         <Breadcrumb>
            <Breadcrumb.Item>Admin </Breadcrumb.Item>
            <Link href='/admin' passHref>
               <Breadcrumb.Item>Arists </Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>{artist.username}</Breadcrumb.Item>
         </Breadcrumb>
         <Card className='px-3 pt-3' style={{ paddingBottom: '4em' }}>
            {loading ?
               <div className="py-5 text-center">
                  <Spinner animation="border" role="status" variant="primary">
                     <span className="visually-hidden">Loading...</span>
                  </Spinner>
               </div> :
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
                           <Col xs='12' sm='5'>
                              <ProfileImageCropper
                                 initialValue={artist?.img?.url}
                                 afterChange={updateImage}
                                 className="mb-3"
                              />
                           </Col>
                           <Col xs='12' sm='7'>
                              <BsFormik
                                 className='mb-3'
                                 name="firstName"
                                 label="First Name"
                              />
                              <BsFormik
                                 className='mb-3'
                                 name="lastName"
                                 label="Last Name"
                              />
                              <BsFormik
                                 className='mb-3'
                                 type='email'
                                 name="email"
                                 label="Email Address"
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
                           <Col >
                              <BsFormik
                                 className='mb-3'
                                 control='textarea'
                                 name="description"
                                 label="Profile Description"
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
                        <Row>
                           <Col >
                              <BsFormik
                                 className='mb-3'
                                 control='textarea'
                                 name="address"
                                 label="Address"
                                 isInvalid={errors.address && touched.address}
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
                           control='checkbox-chips'
                           className='mb-3'
                           name='meta.genre'
                           label="Genre"
                           options={Object.values(Genre)}
                        />

                        <BsFormik
                           control='checkbox-chips'
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
            } </Card></Container>
   )
}

Artist.layout = 'ADMIN'

export default Artist