import Axios from 'axios'
import { Router, useRouter } from 'next/router'
import { Container, Card, Spinner, Row, Col, Button, InputGroup, Form, Nav } from 'react-bootstrap'
import { Envelope, Cash } from 'react-bootstrap-icons'
import { FieldArray, ErrorMessage, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik } from '../../components'
import useFetch from '../../hooks/useFetch'
import { Genre, Event } from '../../@types'
import moment from 'moment';
import { useContext, useState, useEffect } from 'react';
import Context from '../../Context';

const Inquiry = () => {
   const router = useRouter()
   const { loading, user, loginShow, setLoginShow }: any = useContext(Context);
   const [step, setStep] = useState(1)
   const { data: artist }: any = useFetch(`/artists/${router.query?.artist}`, {});


   const initialValues = {
      artist: artist.firstName ? { firstName: artist?.firstName, lastName: artist?.lastName, username: artist?.username } : undefined,
      name: "",
      phone: "",
      email: "",
      genre: "",
      event: "",
      evntDate: moment().format('YYYY-MM-DD'),
      budget: 20000,
      city: "",
      state: "",
      country: "India",
   };
   const validationSchema = Yup.object().shape({
      event: Yup.string().required('Event Name is required.'),
      genre: Yup.string().required('Genre is required.'),
      name: Yup.string().required('Name is required.'),
      phone: Yup.number()
         .required('Phone no. is required.')
         .typeError("Doesn't look like a Phone no.")
         .positive("Phone no. can't start with a minus")
         .integer("Phone no. can't include a decimal point")
         .min(8),
      email: Yup.string().email('Invalid Email').required('Email is required.'),
      country: Yup.string().required('Country is required.'),
      state: Yup.string().required('State is required.'),
      city: Yup.string().required('City is required.'),
      budget: Yup.number().min(20000, 'Minimum budget of 20000 is recommended').required('Budget is required.'),
      evntDate: Yup.string()
         .test(
            'evntDate',
            'Event date should be in future',
            (value) => moment(value).isAfter(moment())
         )
         .required('Event Date is required.'),
   });

   const postInquiry = (values: any, { setSubmitting }: any) => {
      console.log(values)
      Axios.post('/inquiries', { ...values })
         .then((r) => {
            router.push('/');
         })
         .catch(console.error)
         .finally(() => setSubmitting(false));

   };

   return (
      <Container className='my-3'>
         <div className="section-title">
            <h3>Event Inquiry</h3>
         </div>
         <Card >
            <Formik
               enableReinitialize
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={postInquiry}

            >
               {({ values, errors, touched, isSubmitting }) => (
                  <FormikForm className='d-block my-auto'>
                     <Card.Header>
                        <div className="d-flex w-100 justify-content-between">
                           <Button
                              variant="secondary"
                              onClick={() => setStep((step) => step - 1)}
                              disabled={step < 2}
                           >
                              Back
                           </Button>
                           <Nav variant="pills" className='justify-content-center'>
                              <Nav.Item>
                                 <Nav.Link active={step == 1}><b>1</b></Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                 <Nav.Link active={step == 2}><b>2</b></Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                 <Nav.Link active={step == 3}><b>3</b></Nav.Link>
                              </Nav.Item>
                           </Nav>
                           <Button
                              variant="success"
                              type={step == 3 ? 'submit' : 'button'}
                              onClick={() => step < 3 ? setStep((step) => step + 1) : null}
                              disabled={step < 1}
                           >
                              {step == 3 ? 'Submit' : 'Next'}
                           </Button>
                        </div>
                     </Card.Header>
                     <Card.Body>
                        {(() => {
                           switch (step) {
                              case 1:
                                 return (
                                    <div className='mb-3'>
                                       <BsFormik
                                          control='radio-chips'
                                          name='event'
                                          options={Object.values(Event)}
                                       />
                                       <ErrorMessage name='event' component='small' className='text-danger' />
                                    </div>
                                 )
                                 break;
                              case 2:
                                 return (
                                    <div className='mb-3'>
                                       <BsFormik
                                          control='radio-chips'
                                          name='genre'
                                          options={Object.values(Genre)}
                                       />
                                       <ErrorMessage name='genre' component='small' className='text-danger' />
                                    </div>
                                 )
                                 break;
                              case 3:
                                 return (
                                    <>
                                       <Row>
                                          <Col xs='12' sm='6'>
                                             <BsFormik
                                                className='mb-3'
                                                name="name"
                                                label="Your Name"
                                             />
                                          </Col>

                                          <Col xs='12' sm='6'>
                                             <BsFormik
                                                className='mb-3'
                                                maxLength={10}
                                                name="phone"
                                                label="Phone No."
                                             />
                                          </Col>
                                          <Col xs='12'>
                                             <InputGroup className="mb-3" >
                                                <InputGroup.Text id="basic-addon1"><Envelope size={24} /></InputGroup.Text>
                                                <BsFormik
                                                   className='flex-grow-1'
                                                   type='email'
                                                   name="email"
                                                   label="Email Address"
                                                   style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                />
                                             </InputGroup>
                                          </Col>
                                          <Col xs='12' sm='6'>
                                             <BsFormik
                                                className='mb-3'
                                                control='date'
                                                name="evntDate"
                                                label="Event Date"
                                             />
                                          </Col>
                                          <Col xs='12' sm='6'>
                                             <InputGroup className="mb-3" >
                                                <InputGroup.Text id="basic-addon1"><Cash size={24} /></InputGroup.Text>
                                                <BsFormik
                                                   className='flex-grow-1'
                                                   name="budget"
                                                   label="Budget"
                                                   type='number'
                                                   style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                                                />
                                             </InputGroup>
                                          </Col>
                                          <Col xs='12' sm='6'>
                                             <BsFormik
                                                className='mb-3'
                                                control='select'
                                                name="country"
                                                label="Country"
                                                options={['India', 'Other']}
                                             />
                                          </Col>
                                          <Col xs='12' sm='6'>
                                             <BsFormik
                                                className='mb-3'
                                                name="state"
                                                label="State"
                                             />
                                          </Col>
                                          <Col xs='12' sm='6'>
                                             <BsFormik
                                                className='mb-3'
                                                name="city"
                                                label="City"
                                             />
                                          </Col>
                                       </Row>
                                    </>
                                 )
                                 break;

                              default:
                                 break;
                           }
                        })()}
                     </Card.Body>
                  </FormikForm>

               )}
            </Formik>
         </Card>
      </Container>
   )
}



Inquiry.layout = 'STANDARD'

export default Inquiry
