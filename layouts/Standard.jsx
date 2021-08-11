import { Login, NavBar, Footer } from '../components';
import { Container, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Context from '../Context';

const Standard = ({ children }) => {
	const { user, loading } = useContext(Context);
	const router = useRouter();

	return user?.role === 'ADMIN' ? (
		router.replace('/admin')
	) : (
		<>
			<NavBar />
			{/* <Container>
				<Alert
					className="position-fixed bottom-0"
					variant="danger"
					style={{ zIndex: '1500' }}
				>
					This is a alert—check it out!
				</Alert>
			</Container> */}
			<Login />
			{children}
			<Footer />
		</>
	);
};

export default Standard;
