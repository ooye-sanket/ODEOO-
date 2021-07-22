import Axios from 'axios';
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import { Offcanvas, Button, Form, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import Context from '../Context';

export const Login = () => {
	const { loginShow, setLoginShow } = useContext(Context);

	const initialValues = {
		email: '',
		password: '',
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid Email').required('Email is required.'),
		password: Yup.string()
			.required('No password provided.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
	});

	const login = (values) => {
		const { email, password } = values;
		console.log('Login');
		Axios.post('/login', { email, password })
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
		<>
			<Offcanvas
				placement="end"
				show={loginShow}
				onHide={() => setLoginShow(false)}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Artist Login</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={login}
						validateOnBlur
					>
						{({ values, errors, touched, isSubmitting }) => (
							<FormikForm>
								<Form.Group className="mb-3">
									<Form.Label>Email</Form.Label>
									<Field
										name="email"
										type="email"
										placeholder="Email Address"
										className={
											'form-control' +
											(errors.email && touched.email ? ' is-invalid' : '')
										}
									/>
									<ErrorMessage
										name="email"
										component="small"
										className="invalid-feedback"
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<Form.Label>Password</Form.Label>
									<Field
										name="password"
										type="password"
										placeholder="Password"
										className={
											'form-control' +
											(errors.password && touched.password ? ' is-invalid' : '')
										}
									/>
									<ErrorMessage
										name="password"
										component="small"
										className="invalid-feedback"
									/>
								</Form.Group>
								<Button
									variant="success"
									type="submit"
									disanled={!isSubmitting}
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
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};
