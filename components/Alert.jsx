import { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';

export const Alert = () => {
	const [list, setList] = useState([]);
	return list.length === 0 ? null : (
		<Container>
			{list.map((itm, key) => (
				<Alert
					key={key}
					className="position-fixed bottom-0"
					variant="danger"
					style={{ zIndex: '1500' }}
				>
					{itm.msg}
				</Alert>
			))}
		</Container>
	);
};
