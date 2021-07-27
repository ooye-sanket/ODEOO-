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
import { BoxArrowInRight } from 'react-bootstrap-icons';

export const NavBar = () => {
	const { loading, user, loginShow, setLoginShow } = useContext(Context);

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				sticky="top"
				bg="light"
				variant="light"
			>
				<Container>
					<Navbar.Brand href="#home">
						<img
							src="/odeo-logo.png"
							height="48"
							className="d-inline-block align-middle"
							alt="React Bootstrap logo"
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />

					<Navbar.Collapse>
						<Nav as="ul" className="ms-auto">
							<Nav.Item as="li">
								<Nav.Link href="/home">Home</Nav.Link>
							</Nav.Item>
							<Nav.Item as="li">
								<Nav.Link eventKey="link-1">Artists</Nav.Link>
							</Nav.Item>
							<Nav.Item as="li">
								<NavDropdown title="For Artists" align="end">
									<NavDropdown.Item onClick={() => setLoginShow(true)}>
										<BoxArrowInRight color="var(--secondary)" /> &nbsp; Login
									</NavDropdown.Item>
									<Link href="/signup" passHref>
										<NavDropdown.Item>Join Now!</NavDropdown.Item>
									</Link>
									<NavDropdown.Item href="#action/3.3">
										Something
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="#action/3.4">
										Separated link
									</NavDropdown.Item>
								</NavDropdown>
							</Nav.Item>
							{user ? (
								<Nav.Item>
									<NavDropdown title={user.firstName}>
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
							) : loading ? (
								<Nav.Item className="d-flex align-items-center">
									<Spinner
										animation="border"
										role="status"
										size="sm"
										variant="primary"
									>
										<span className="visually-hidden">Loading...</span>
									</Spinner>
								</Nav.Item>
							) : null}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
