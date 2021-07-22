import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import {
	Button,
	Container,
	Nav,
	Navbar,
	NavDropdown,
	Spinner,
} from 'react-bootstrap';
import Context from '../Context';

export const NavBar = () => {
	const { loading, user, loginShow, setLoginShow } = useContext(Context);

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				fixed="top"
				bg="light"
				variant="light"
			>
				<Container>
					<Navbar.Brand href="#home">
						<img
							src="/logo.png"
							height="50"
							className="d-inline-block align-top"
							alt="React Bootstrap logo"
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />

					<Navbar.Collapse className="px-lg-4">
						<Nav as="ul" className="mx-auto">
							<Nav.Item as="li">
								<Nav.Link href="/home">Home</Nav.Link>
							</Nav.Item>
							<Nav.Item as="li">
								<Nav.Link eventKey="link-1">Artists</Nav.Link>
							</Nav.Item>
							<Nav.Item as="li">
								<NavDropdown title="For Artists">
									<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.2">
										Another action
									</NavDropdown.Item>
									<NavDropdown.Item href="#action/3.3">
										Something
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action/3.4">
										Separated link
									</NavDropdown.Item>
								</NavDropdown>
							</Nav.Item>
						</Nav>
						{user ? (
							<Nav>
								<Nav.Item>
									<NavDropdown title={user.firstName}>
										<NavDropdown.Item href="#action/3.1">
											Action
										</NavDropdown.Item>
										<NavDropdown.Item href="#action/3.2">
											Another action
										</NavDropdown.Item>
										<NavDropdown.Item href="#action/3.3">
											Something
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item
											onClick={() => {
												localStorage.removeItem('auth-token');
												Router.reload();
											}}
										>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</Nav.Item>
							</Nav>
						) : loading ? (
							<Spinner
								animation="border"
								role="status"
								size="sm"
								variant="primary"
							>
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						) : (
							<Nav as="ul">
								<Nav.Item as="li" onClick={() => setLoginShow(true)}>
									<Nav.Link color="primary">Login</Nav.Link>
								</Nav.Item>
								<Link href="/signup">
									<Button variant="outline-primary">Apply Now</Button>
								</Link>
							</Nav>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
