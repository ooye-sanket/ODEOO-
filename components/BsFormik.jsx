import { Field, ErrorMessage } from 'formik';
import { Form, FloatingLabel } from 'react-bootstrap';
import moment from 'moment';

export const BsFormik = (props) => {
	const { control, ...rest } = props;
	switch (control) {
		case 'checkbox':
			return <CheckBox {...rest} />;
		case 'chips':
			return <Chips {...rest} />;
		default:
			return <Input {...rest} />;
	}
};

const Input = ({ label, name, className, ...rest }) => {
	return (
		<div className={className}>
			{/* <Form.Label>{label}</Form.Label> */}
			<FloatingLabel controlId={`floating-${name}`} label={label}>
				<Field name={name}>
					{({ field, meta: { touched, error } }) => (
						<Form.Control
							placeholder={label}
							value={field.value}
							onChange={(e) => setFieldValue(field.name, e.target.value)}
							isInvalid={touched && error}
							{...rest}
							{...field}
						/>
					)}
				</Field>
				<ErrorMessage
					name={name}
					render={(msg) => (
						<Form.Control.Feedback type="invalid" tooltip>
							{msg}
						</Form.Control.Feedback>
					)}
					// component="small"
					className="invalid-feedback"
				/>
			</FloatingLabel>
		</div>
	);
};

const CheckBox = ({ label, name, error, className, ...rest }) => {
	return (
		<div className={className}>
			{/* <Form.Group controlId="formBasicCheckbox"> */}
			<Form.Check type="checkbox" label={label} />
			{/* </Form.Group> */}
		</div>
	);
};

const Chips = ({ label, name, options, ...rest }) => {
	return (
		<>
			<Form.Label>{label}</Form.Label>
			<br />
			{options.map((option, key) => (
				<span key={key}>
					<Field
						type="checkbox"
						name={name}
						className="chip"
						id={`${name}-${key}`}
						value={option}
					/>
					<label htmlFor={`${name}-${key}`}>{option}</label>
				</span>
			))}

			<ErrorMessage as="small" name={name} />
		</>
	);
};
