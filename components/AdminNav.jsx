import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { HouseDoor, CardList, BoxArrowRight } from 'react-bootstrap-icons';

export const AdminNav = () => {
	const router = useRouter();
	return (
		<>
			<Navbar expand="sm" variant="dark" bg="primary" sticky="top">
				<Container>
					<Navbar.Brand href="#">Odeo Dashboard</Navbar.Brand>
					<Nav className="ms-auto">
						<Nav.Item
							as="li"
							onClick={() => {
								localStorage.removeItem('auth-token');
								router.reload();
							}}
						>
							<Nav.Link eventKey="link-1">
								<BoxArrowRight /> &nbsp; Log out
							</Nav.Link>
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
							<Nav.Link
								active={
									router.pathname === '/admin' ||
									router.pathname.startsWith('/admin/artists')
								}
							>
								<HouseDoor /> &nbsp; Artists
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link href="/admin/inquiries" passHref>
							<Nav.Link active={router.pathname.startsWith('/admin/inquiries')}>
								<CardList /> &nbsp; Inquiries
							</Nav.Link>
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
