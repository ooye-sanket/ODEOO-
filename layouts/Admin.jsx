import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Login, AdminNav } from '../components';
import Context from '../Context';

const Admin = ({ children }) => {
	const { user, loading } = useContext(Context);
	const router = useRouter();

	// useEffect(() => {
	// 	if (user?.role !== 'ADMIN' && !loading) {
	// 		Router.replace({
	// 			pathname: '/',
	// 			query: { showLogin: true },
	// 		});
	// 	}
	// }, []);

	if (!!user) {
		if (user.role === 'ADMIN') {
			return (
				<>
					<AdminNav />
					<Login />
					<Container fluid="sm" className="py-3">
						{children}
					</Container>
				</>
			);
		} else {
			router.push({
				pathname: '/',
				query: { showLogin: true },
			});
		}
	} else if (loading) {
		return <>Loading...</>;
	} else {
		router.push({
			pathname: '/',
			query: { showLogin: true },
		});
	}
	return <>Please wait...</>;
};

export default Admin;
