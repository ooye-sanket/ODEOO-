import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Login, AdminNav } from '../components';
import Context from '../Context';

const Admin = ({ children }) => {
	const { user, loading } = useContext(Context);
	const router = useRouter();

	return !!user ? (
		user?.role === 'ADMIN' ? (
			<div>
				<AdminNav />
				<Login />
				<Container className="py-3" id="admin-section">
					{children}
				</Container>
			</div>
		) : (
			router.replace({
				pathname: '/',
				query: { showLogin: true },
			})
		)
	) : loading ? (
		<div className="py-5 text-center">
			<Spinner animation="border" role="status" variant="primary">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	) : (
		router.replace({
			pathname: '/',
			query: { showLogin: true },
		})
	);
	return <>Please wait...</>;
};

export default Admin;
