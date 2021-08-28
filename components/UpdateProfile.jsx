import Axios from 'axios';
import { Router, useRouter } from 'next/router';
import {
	Container,
	Card,
	Spinner,
	Row,
	Col,
	Button,
	InputGroup,
	Form,
} from 'react-bootstrap';
import { At, Plus } from 'react-bootstrap-icons';
import { FieldArray, ErrorMessage, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik, ProfileImageCropper } from './';
import useFetch from '../hooks/useFetch';
import { Genre, Event } from '../@types';
import moment from 'moment';
import { useContext } from 'react';
import Context from '../Context';

export const UpdateProfile = () => {
	const { setPswdModal } = useContext(Context);

	const { data: user, loading } = useFetch('/user?all=true', {});

	const initialValues = {
		firstName: user?.firstName,
		lastName: user?.lastName,
		username: user?.username,
		email: user?.email,
		phone: user?.phone,
		dateOfBirth: moment(user?.dateOfBirth).format('YYYY-MM-DD'),
		aadhar: user?.aadhar,
		address: user?.address || undefined,
		meta: {
			genre: user?.meta?.genre,
			events: user?.meta?.events,
		},
		youtubeLinks: user?.youtubeLinks || ['', '', ''],
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string().required('Email is required.').email('Invalid Email'),
		phone: Yup.string()
			.required('Phone no. is required.')
			.matches(
				/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
				'Invalid Phone Number'
			),
		dateOfBirth: Yup.string()
			.required('Date of Birth is required.')
			.test(
				'dateOfBirth',
				'Age should be greater than 16',
				(value) => moment().diff(moment(value), 'years') >= 16
			),
		username: Yup.string()
			.required('Username is required.')
			.lowercase('Username cannot contain capital letters')
			.test('username', 'Username taken', async (value) => {
				try {
					const r = await Axios.get(`/users/${value}`);
					return r.data.data.username != user?.username ? false : true;
				} catch (err) {
					return true;
				}
			}),
		aadhar: Yup.number()
			.required('Aadhar no. is required')
			.typeError("Doesn't look like an Aadhar no.")
			.positive("Aadhar no. can't start with a minus")
			.integer("Aadhar no. can't include a decimal point")
			.min(12, 'Aadhar no. cannot be shorter than 12 digits'),
		youtubeLinks: Yup.array()
			.min(3, 'Provide atleast 3 youtube links')
			.of(
				Yup.string().matches(
					/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?$/,
					'Invalid youtube link'
				)
			),
		meta: Yup.object().shape({
			genre: Yup.array().min(2, 'Select atleast 2 genre').of(Yup.string()),
			events: Yup.array().min(2, 'Select atleast 2 events').of(Yup.string()),
		}),
	});

	const updateProfile = (values, { setSubmitting }) => {
		console.log(values);
		Axios.put('/user/profile', { ...values })
			.then((r) => {
				console.log('Updated');
			})
			.catch(console.error)
			.finally(() => setSubmitting(false));
	};

	const updateImage = (img) => {
		let data = new FormData();

		data.append('image', img);

		Axios.put('/user/image', data)
			.then((r) => console.log(r.data))
			.catch(console.error);
	};

	return (
		<Card className="my-2">
			<Formik
				enableReinitialize
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={updateProfile}
				validateOnBlur
			>
				{({ values, errors, touched, isSubmitting }) =>
					loading ? (
						<div className="py-5 text-center">
							<Spinner animation="border" role="status" variant="primary">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</div>
					) : (
						<FormikForm className="d-block my-auto">
							{/* <div className="pt-1 d-flex justify-content-between align-items-center"> */}
							<Card.Header className="py-3 d-flex justify-content-between align-items-center">
								<h4 className="m-0">Edit Profile</h4>
								<div>
									<Button
										variant="warning"
										className="me-2"
										onClick={() => setPswdModal(true)}
									>
										Change Password
									</Button>
									<Button
										variant="success"
										type="submit"
										// size='lg'
										disabled={isSubmitting}
									>
										Done{' '}
									</Button>
								</div>
							</Card.Header>
							{/* </div> */}
							{/* <hr /> */}
							<Card.Body>
								<Row>
									<Col xs="12" sm="5">
										<ProfileImageCropper
											initialValue={user?.img?.url}
											afterChange={updateImage}
											// className="mb-3"
										/>
									</Col>
									<Col xs="12" sm="7">
										<BsFormik
											className="mb-3"
											name="firstName"
											label="First Name"
										/>
										<BsFormik
											className="mb-3"
											name="lastName"
											label="Last Name"
										/>
										<BsFormik
											className="mb-3"
											type="email"
											name="email"
											label="Email Address"
										/>
									</Col>
								</Row>
								<Row>
									<Col xs="12" sm="7">
										<InputGroup className="mb-3">
											<InputGroup.Text id="basic-addon1">
												<At size={24} />
											</InputGroup.Text>
											<BsFormik
												className="flex-grow-1"
												name="username"
												label="Username"
												style={{
													borderTopLeftRadius: '0',
													borderBottomLeftRadius: '0',
												}}
											/>
										</InputGroup>
									</Col>
									<Col xs="12" sm="5">
										<BsFormik
											control="date"
											className="mb-3"
											name="dateOfBirth"
											label="Date of Birth"
										/>
									</Col>
								</Row>
								<Row>
									<Col xs="12" sm="6">
										<BsFormik
											className="mb-3"
											maxLength={10}
											name="phone"
											label="Phone No."
										/>
									</Col>

									<Col xs="12" sm="6">
										<BsFormik
											className="mb-3"
											maxLength={12}
											name="aadhar"
											label="Aadhar Number"
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<BsFormik
											className="mb-3"
											control="textarea"
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
										return values.youtubeLinks &&
											values.youtubeLinks.length > 0 ? (
											values.youtubeLinks.map((link, index) => (
												<div className="mb-3" key={index}>
													<InputGroup hasValidation>
														<BsFormik
															className="flex-grow-1"
															name={`youtubeLinks.${index}`}
															label={`Video #${index + 1}`}
															style={{
																borderTopRightRadius: '0',
																borderBottomRightRadius: '0',
															}}
														/>
														{values.youtubeLinks.length > 3 && (
															<Button
																variant="outline-primary"
																style={{
																	borderTopRightRadius: '0',
																	borderBottomRightRadius: '0',
																}}
																onClick={() => remove(index)}
															>
																&#8722;
															</Button>
														)}
														<Button
															variant="outline-primary"
															onClick={() => insert(index + 1, '')}
														>
															&#43;
														</Button>
													</InputGroup>
												</div>
											))
										) : (
											<Button onClick={() => push('')}>
												<Plus /> Add a Link
											</Button>
										);
									}}
								/>
								<ErrorMessage
									name="youtubeLinks"
									component="small"
									className="text-danger"
								/>

								<div className="mb-3">
									<BsFormik
										control="checkbox-chips"
										name="meta.genre"
										label="Genre"
										options={Object.values(Genre)}
									/>
									<ErrorMessage
										name="meta.genre"
										component="small"
										className="text-danger"
									/>
								</div>
								<div className="mb-3">
									<BsFormik
										control="checkbox-chips"
										name="meta.events"
										label="Events"
										options={Object.values(Event)}
									/>
									<ErrorMessage
										name="meta.events"
										component="small"
										className="text-danger"
									/>
								</div>
								<Form.Text className="text-muted">
									All the details provided by you except email, phone & address,
									will be displayed publicly.
								</Form.Text>
							</Card.Body>
							<Card.Footer>
								<Button
									className="d-block ms-auto"
									variant="success"
									type="submit"
									// size='lg'
									disabled={isSubmitting}
								>
									Done{' '}
								</Button>
							</Card.Footer>
						</FormikForm>
					)
				}
			</Formik>
		</Card>
	);
};
