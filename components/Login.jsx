import Axios from 'axios';
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import { Offcanvas, Button, Form, Modal, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import Context from '../Context';
import { BsFormik } from '../components';
import Image from 'next/image';
import cogoToast from 'cogo-toast';

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

	const login = (values, { setSubmitting }) => {
		const { email, password } = values;
		console.log('Login');
		Axios.post('/login', { email, password })
			.then((r) => {
				localStorage.setItem(
					'auth-token',
					r.headers.authorization.split(' ')[1]
				);
				cogoToast
					.success(r.data.msg, { position: 'bottom-left' })
					.then(() => Router.reload());
			})
			.catch((e) => {
				cogoToast.error(e.response.data.msg, { position: 'bottom-left' });
				console.log(e.response);
			})
			.finally(() => setSubmitting(false));
	};

	return (
		<>
			<Offcanvas
				placement="end"
				show={loginShow}
				onHide={() => setLoginShow(false)}
				// style={{ background: 'var(--primary)' }}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>Artist Login</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body className="position-relative">
					<div className="text-center">
						<Image src="/launch.svg" alt="" width="200" height="200" />
					</div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={login}
					>
						{({ values, errors, touched, isSubmitting }) => (
							<FormikForm>
								<Form.Group className="mb-3">
									<BsFormik
										name="email"
										label="Email"
										isInvalid={errors.email && touched.email}
									/>
								</Form.Group>

								<Form.Group className="mb-3">
									<BsFormik
										name="password"
										label="Password"
										type="password"
										isInvalid={errors.password && touched.password}
									/>
								</Form.Group>
								<Button
									variant="success"
									type="submit"
									size="lg"
									disabled={isSubmitting}
									style={{ width: '100%' }}
								>
									{isSubmitting ? (
										<Spinner animation="border" variant="light" size="sm" />
									) : (
										'Login'
									)}
								</Button>
							</FormikForm>
						)}
					</Formik>
					<br />
					<Link href="/password-reset">
						<a>
							<small>Forgot password?</small>
						</a>
					</Link>
					<br />
					<small>
						New to Odeo.in?{' '}
						<Link href="/signup">
							<a>
								<b>SignUp</b>
							</a>
						</Link>
					</small>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};
