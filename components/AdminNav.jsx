import Link from 'next/link';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { HouseDoor } from 'react-bootstrap-icons';

export const AdminNav = () => {
	return (
		<>
			<Navbar expand="sm" variant="dark" bg="primary" sticky="top">
				<Container>
					<Navbar.Brand href="#">Navbar</Navbar.Brand>
					<Nav className="ms-auto">
						<Nav.Item as="li">
							<Nav.Link eventKey="link-1">Sign out</Nav.Link>
						</Nav.Item>
					</Nav>
				</Container>
			</Navbar>
			<Navbar
				bg="dark"
				variant="dark"
				fixed="bottom"
				className="mx-auto mb-2 px-2 rounded"
				style={{ minWidth: '15rem', width: 'fit-content' }}
			>
				<Nav variant="pills" defaultActiveKey="/admin">
					<Nav.Item>
						<Link href="/admin" passHref>
							<Nav.Link>Artists</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link href="/admin/inquiries" passHref>
							<Nav.Link>Inquiries</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="disabled" disabled>
							Disabled
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar>
		</>
	);
};
