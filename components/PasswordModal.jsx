import Axios from 'axios';
import {
	Container,
	Card,
	Spinner,
	Row,
	Col,
	InputGroup,
	Form,
	Button,
	Modal,
} from 'react-bootstrap';
import { Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import { BsFormik } from './';
import { useContext } from 'react';
import Context from '../Context';

export const PasswordModal = () => {
	const { user, pswdModal, setPswdModal } = useContext(Context);

	const initialValues = {
		password: '',
		newPassword: '',
		passwordConfirm: '',
	};
	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.required('No password provided.')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
			),
		newPassword: Yup.string()
			.required('No password provided.')
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
				'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
			)
			.notOneOf([Yup.ref('password'), null], 'Think of a new password'),

		passwordConfirm: Yup.string()
			.oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
			.notOneOf([Yup.ref('password'), null], 'Think of a new password'),
	});

	const changePassword = (values) => {
		console.log(values);
		Axios.put('/user/password?action=change', { ...values })
			.then((r) => {
				console.log('Updated');
				setPswdModal(false);
			})
			.catch(console.error);
	};

	return (
		<Modal show={pswdModal} onHide={() => setPswdModal(false)}>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={changePassword}
				validateOnBlur
			>
				{({ values, errors, touched, isSubmitting }) => (
					<FormikForm className="d-block my-auto">
						<Modal.Header closeButton>
							<Modal.Title>Change Password</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<BsFormik
								className="mb-3"
								type="password"
								name="password"
								label="Current Password"
								isInvalid={errors.password && touched.password}
							/>
							<BsFormik
								className="mb-3"
								type="password"
								name="newPassword"
								label="New Password"
								isInvalid={errors.newPassword && touched.newPassword}
							/>
							<BsFormik
								className="mb-3"
								type="password"
								name="passwordConfirm"
								label="Confirm New Password"
								isInvalid={errors.passwordConfirm && touched.passwordConfirm}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button
								variant="success"
								className="d-block ms-auto"
								type="submit"
								// size='lg'
								disabled={isSubmitting}
							>
								Save Changes
							</Button>
						</Modal.Footer>
					</FormikForm>
				)}
			</Formik>
		</Modal>
	);
};
