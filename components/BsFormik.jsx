import { Field, ErrorMessage } from 'formik';
import { Form, FloatingLabel } from 'react-bootstrap';
import moment from 'moment';

export const BsFormik = (props) => {
	const { control, ...rest } = props;
	switch (control) {
		case 'textarea':
			return <TextArea {...rest} />;
		case 'select':
			return <Select {...rest} />;
		case 'checkbox':
			return <CheckBox {...rest} />;
		case 'checkbox-chips':
			return <CheckBoxChips {...rest} />;
		case 'radio-chips':
			return <RadioChips {...rest} />;
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

const TextArea = ({ label, name, className, ...rest }) => {
	return (
		<div className={className}>
			{/* <Form.Label>{label}</Form.Label> */}
			<FloatingLabel controlId={`floating-${name}`} label={label}>
				<Field name={name}>
					{({ field, meta: { touched, error } }) => (
						<Form.Control
							as="textarea"
							style={{ height: '120px' }}
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
						<Form.Control
							className="form-control"
							type="date"
							placeholder={label}
							value={field.value}
							onChange={(e) =>
								setFieldValue(name, moment(e.target.value).format('YYYY-MM-DD'))
							}
							isInvalid={touched && error}
							{...rest}
							{...field}
						/>
					)}
				</Field>
				<ErrorMessage name={name}>
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

const Select = ({ label, name, options, className, ...rest }) => {
	return (
		<div className={className}>
			<FloatingLabel controlId={`floating-${name}`} label={label}>
				<Form.Select name={name}>
					{options.map((option, key) => (
						<option key={key} value={option}>
							{option}
						</option>
					))}
				</Form.Select>
				<ErrorMessage
					name={name}
					// component="small"
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

const CheckBoxChips = ({ label, name, options, className, ...rest }) => {
	return (
		<div className={className}>
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
			>
				{(msg) => (
					<Form.Control.Feedback type="invalid" tooltip>
						{msg}
					</Form.Control.Feedback>
				)}
			</ErrorMessage>
		</div>
	);
};
const RadioChips = ({ label, name, options, className, ...rest }) => {
	return (
		<div className={className}>
			<Form.Label>{label}</Form.Label>
			<br />
			{options.map((option, key) => (
				<span key={key}>
					<Field
						type="radio"
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
			>
				{(msg) => (
					<Form.Control.Feedback type="invalid" tooltip>
						{msg}
					</Form.Control.Feedback>
				)}
			</ErrorMessage>
		</div>
	);
};
