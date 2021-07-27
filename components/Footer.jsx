import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {
	return (
		<footer className="bg-dark text-light">
			<Container className="p-4">
				<Row>
					<Col>
						<div id="logo">
							<img
								src="/odeo-logo-full.png"
								height="54"
								className="d-inline-block align-middle"
								alt="React Bootstrap logo"
							/>
						</div>
					</Col>
				</Row>
				<hr />
				<div className="text-center text-muted">
					© Copyright 2021 | Vraj Shah | All Rights Reserved.
				</div>
			</Container>
		</footer>
	);
};
