import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Login, AdminNav } from '../components';
import Context from '../Context';

const Admin = ({ children }) => {
	const { user, loading, loggedOut } = useContext(Context);
	// const router = useRouter();

	// useEffect(() => {
	// 	if (!user && !loading) {
	// 		Router.replace({
	// 			pathname: '/',
	// 			query: { showLogin: true },
	// 		});
	// 	}
	// }, []);

	// if (loading || loggedOut) {
	// 	return <>Loading...</>;
	// }

	return (
		<>
			<AdminNav />
			<Login />
			<Container fluid="sm" className="py-3">
				{children}
			</Container>
		</>
	);
};

export default Admin;
