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
		case 'date':
			return <Date {...rest} />;
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
					// component="small"
					className="invalid-feedback"
				>
					{(msg) => (
						<Form.Control.Feedback type="invalid" tooltip>
							{msg}
						</Form.Control.Feedback>
					)}
				</ErrorMessage>
			</FloatingLabel>
		</div>
	);
};
const Date = ({ label, name, className, ...rest }) => {
	return (
		<div className={className}>
			{/* <Form.Label>{label}</Form.Label> */}
			<FloatingLabel controlId={`floating-${name}`} label={label}>
				<Field name={name}>
					{({ field, meta: { touched, error } }) => (
						<input
							className="form-control"
							type="date"
							placeholder={label}
							value={field.value}
							onChange={(e) =>
								setFieldValue(name, moment(e.target.value).format('DD-MM-YYYY'))
							}
							isInvalid={touched && error}
							{...rest}
							{...field}
						/>
					)}
				</Field>
				<ErrorMessage name={name} className="invalid-feedback">
					{(msg) => (
						<Form.Control.Feedback type="invalid" tooltip>
							{msg}
						</Form.Control.Feedback>
					)}
				</ErrorMessage>
			</FloatingLabel>
		</div>
	);
};

const CheckBox = ({ label, name, error, className, ...rest }) => {
	return (
		<div className={className}>
			<Field name={name}>
				{({ field, meta: { touched, error } }) => (
					<Form.Check
						type="checkbox"
						label={label}
						checked={field.value}
						onChange={(e) => setFieldValue(field.name, e.target.value)}
						isInvalid={touched && error}
						{...rest}
						{...field}
					/>
				)}
			</Field>
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
			<ErrorMessage
				name={name}
				// component="small"
				className="invalid-feedback"
			>
				{(msg) => (
					<Form.Control.Feedback type="invalid" tooltip>
						{msg}
					</Form.Control.Feedback>
				)}
			</ErrorMessage>
		</>
	);
};
