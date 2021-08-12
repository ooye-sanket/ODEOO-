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
	Card,
} from 'react-bootstrap';
import Context from '../Context';
import { BoxArrowInRight, BoxArrowRight, X } from 'react-bootstrap-icons';

export const NavBar = () => {
	const { loading, user, loginShow, setLoginShow } = useContext(Context);

	return (
		<>
			{user && !user?.imgUrl && (
				<div className="py-1 rounded-0 text-center bg-secondary text-white">
					<small>
						Hi <b>{user?.firstName}</b>, great to see you. We'll be good to go
						once you{' '}
						<u style={{ cursor: 'pointer' }}>
							<Link href="/profile/onboarding" passHref>
								<a>Complete your profile</a>
							</Link>
						</u>
						.
						{/* <Button class="close" aria-label="Close">
							<span aria-hidden="true">&times;</span> 
							<X size={20} className="d-inline-block" />
						</Button> */}
					</small>
				</div>
			)}
			<Navbar
				collapseOnSelect
				expand="lg"
				sticky="top"
				bg="light"
				variant="light"
			>
				<Container>
					<Link href="/" passHref>
						<Navbar.Brand>
							<img
								src="/odeo-logo.png"
								height="48"
								className="d-inline-block align-middle"
								alt="React Bootstrap logo"
							/>
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />

					<Navbar.Collapse>
						<Nav as="ul" className="ms-auto">
							<Nav.Item as="li">
								<Nav.Link eventKey="link-1">Artists</Nav.Link>
							</Nav.Item>

							{user ? (
								<Nav.Item as="li">
									<NavDropdown title={user.firstName} align="end">
										{user && user?.imgUrl && (
											<Link href="/profile" passHref>
												<NavDropdown.Item>My Accounts</NavDropdown.Item>
											</Link>
										)}
										{/* <NavDropdown.Divider /> */}
										<NavDropdown.Item
											onClick={() => {
												localStorage.removeItem('auth-token');
												Router.reload();
											}}
										>
											<BoxArrowRight color="var(--secondary)" /> &nbsp; Logout
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
							) : (
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
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};
