import { Field, ErrorMessage } from 'formik';
import { Form, FloatingLabel } from 'react-bootstrap';
import moment from 'moment';

const BsFormik = (props) => {
	const { control, ...rest } = props;
	switch (control) {
		default:
			return <Input {...rest} />;
	}
};

const Input = ({ label, name, error, ...rest }) => {
	return (
		<>
			{/* <Form.Label>{label}</Form.Label> */}
			<FloatingLabel controlId={`floating-${name}`} label={label}>
				<Field name={name}>
					{({ field }) => (
						<Form.Control
							placeholder={label}
							value={field.value}
							onChange={(e) => setFieldValue(field.name, e.target.value)}
							isInvalid={error}
							{...rest}
							{...field}
						/>
					)}
				</Field>
				<ErrorMessage
					name={name}
					render={(msg) => (
						<Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback>
					)}
					// component="small"
					className="invalid-feedback"
				/>
			</FloatingLabel>
		</>
	);
};

export default BsFormik;
