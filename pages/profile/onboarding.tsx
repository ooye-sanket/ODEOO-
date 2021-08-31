import Axios from 'axios'
import { Router, useRouter } from 'next/router'
import { Container, Card, Spinner, Row, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { At, Plus } from 'react-bootstrap-icons'
import { FieldArray, ErrorMessage, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik, ProfileImageCropper } from '../../components'
import useFetch from '../../hooks/useFetch'
import { Genre, Event } from '../../@types'
import moment from 'moment';
import { useContext, useState } from 'react';
import Context from '../../Context';
import cogoToast from 'cogo-toast';

const Onboarding = () => {
   const router = useRouter()
   const { data: user, loading } = useFetch('/user?all=true', { });
   const initialValues = {
      username: user?.username,
      phone: user?.phone,
      description: user?.description || undefined,
      address: user?.address || undefined,
      dateOfBirth: moment(user?.dateOfBirth).format('YYYY-MM-DD'),
      aadhar: user?.aadhar,
      meta: {
         genre: user?.meta?.genre,
         events: user?.meta?.events,
      },
      youtubeLinks: user?.youtubeLinks?.length != 0 ? user?.youtubeLinks : ['', '', '']
   };
   const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required.')
         .lowercase('Username cannot contain capital letters').test(
            "username",
            "Username taken",
            async (value: any) => {
               try {
                  const r = await Axios.get(`/artists/${value}`)
                  return r.data.data.username != user?.username ? false : true
               } catch (err) {
                  return true
               }
            }
         ),
      description: Yup.string()
         .required('Profile Description is required')
         .min(30, 'Description should be at least 30 characters long'),
      phone: Yup.string()
         .required('Phone no. is required.')
         .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            'Invalid Phone Number'),
      address: Yup.string().required('Address is required.')
         .typeError("Doesn't look like an address"),
      dateOfBirth: Yup.string().test(
         "dateOfBirth",
         "Age should be greater than 16",
         (value: any) =>
            (moment().diff(moment(value), 'years') >= 16)
      ).required('Date of Birth is required.'),
      aadhar: Yup.number()
         // .required('Aadhar no. is required')
         .typeError("Doesn't look like an Aadhar no.")
         .positive("Aadhar no. can't start with a minus")
         .integer("Aadhar no. can't include a decimal point")
         .min(12, "Aadhar no. cannot be shorter than 12 digits"),
      youtubeLinks: Yup.array().min(3, "Provide atleast 3 youtube links")
         .of(Yup.string().required('Youtube Link is required.').matches(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?$/, "Invalid youtube link")),
      meta: Yup.object().shape({
         genre: Yup.array().min(2, "Select atleast 2 genre").of(Yup.string()),
         events: Yup.array().min(2, "Select atleast 2 events").of(Yup.string())
      })
   });

   const updateProfile = (values: any, { setSubmitting }: any) => {
      console.log(values)
      Axios.post('/user/profile', { ...values })
         .then(r => {
            cogoToast
               .success(r.data.msg, { position: 'bottom-left' }).then(() => router.push('/profile'))

         }).catch(({ response: r }) => {
            cogoToast
               .warn(r.data.msg, { position: 'bottom-left' })
         })
         .finally(() => setSubmitting(false));

   };
   const updateImage = (img: any) => {
      cogoToast
         .loading('Uploading image...', { position: 'bottom-left' })
      let data = new FormData()

      data.append('image', img)

      Axios.put('/user/image', data).then(r => {
         cogoToast
            .success(r.data.msg, { position: 'bottom-left' })
         console.log(r.data)
      }).catch(({ response: r }) => {
         cogoToast
            .warn(r.data.msg, { position: 'bottom-left' })
      })
   }
   return (
      <Container>
         <div className="text-center my-3">
            <h4>Welcome aboard, a few steps before we go ahead.</h4>
         </div>
         <Card className='p-3'>
            <Row>
               <Col xs='12' sm='5'>
                  <ProfileImageCropper initialValue={user?.img?.url} afterChange={updateImage} className='my-2' />
               </Col>
               <Col xs='12' sm='7' className='p-3' >
                  <div><span className="text-muted">Artist Name: </span>{user?.firstName} {user?.lastName}</div>
                  <div><span className="text-muted">Email: </span>{user?.email}</div>
               </Col>
            </Row>
            {loading ? <div className="py-5 text-center">
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
                  {({ values, errors, touched, isSubmitting, }) => (
                     <FormikForm className='d-block my-auto'>
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
                                 required
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
                                 maxLength={13}
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
                        <div
                           className='mb-3'
                        >
                           <BsFormik
                              control='checkbox-chips'
                              name='meta.genre'
                              label="Genre"
                              options={Object.values(Genre)}
                           />
                           <ErrorMessage name='meta.genre' component='small' className='text-danger' />
                        </div>
                        <div
                           className='mb-3'
                        >
                           <BsFormik
                              control='checkbox-chips'
                              name='meta.events'
                              label="Events"
                              options={Object.values(Event)}
                           />
                           <ErrorMessage name='meta.events' component='small' className='text-danger' />
                        </div>
                        <Form.Text className="text-muted">
                           All the details provided by you except email, phone & address, will be displayed publicly.
                        </Form.Text>

                        <Button
                           className='d-block ms-auto'
                           variant="success"
                           type="submit"
                           // size='lg'
                           disabled={isSubmitting}
                        >
                           Done
                        </Button>

                     </FormikForm>
                  )}
               </Formik>
            }        </Card>
      </Container>
   )
}



Onboarding.layout = 'MINIMAL'

export default Onboarding
