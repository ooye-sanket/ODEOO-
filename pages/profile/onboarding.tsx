import Axios from 'axios'
import { Router, useRouter } from 'next/router'
import { Container, Card, Spinner, Row, Col, Button, InputGroup, Form } from 'react-bootstrap'
import { At, Plus } from 'react-bootstrap-icons'
import { FieldArray, ErrorMessage, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik } from '../../components'
import useFetch from '../../hooks/useFetch'
import { Genre, Event } from '../../@types'
import moment from 'moment';
import { useContext, useState } from 'react';
import Context from '../../Context';

const Onboarding = () => {
   const router = useRouter()
   const { loading, user, loginShow, setLoginShow }: any = useContext(Context);
   const initialValues = {
      username: user?.username,
      phone: user?.phone,
      address: user?.address || undefined,
      dateOfBirth: moment(user?.dateOfBirth).format('YYYY-MM-DD'),
      aadhar: user?.aadhar,
      meta: {
         genre: user?.meta?.genre,
         events: user?.meta?.events,
      },
      youtubeLinks: user?.youtubeLinks || ['', '', '']
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
      phone: Yup.string()
         .required('Phone no. is required.')
         .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
            , 'Invalid Phone Number'),
      address: Yup.string().required('Address is required.')
         .typeError("Doesn't look like an address"),
      dateOfBirth: Yup.string().test(
         "dateOfBirth",
         "Age should be greater than 16",
         (value: any) =>
            (moment().diff(moment(value), 'years') >= 16)
      ).required('Date of Birth is required.'),
      aadhar: Yup.number()
         .required('Aadhar no. is required')
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

   const updateProfile = (values: any) => {
      console.log(values)
      Axios.post('/user/profile', { ...values })
         .then((r) => {
            router.push('/profile');
         })
         .catch(console.error);
   };
   return (
      <Container>
         <div className="text-center my-3">
            <h4>Welcome aboard, a few steps before we go ahead.</h4>
         </div>
         <Card className='p-3'>
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
                        Done                     </Button>

                  </FormikForm>
               )}
            </Formik>
         </Card>
      </Container>
   )
}



Onboarding.layout = 'MINIMAL'

export default Onboarding
