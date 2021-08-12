import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Login, NavBar, Footer } from '../components';
import Context from '../Context';

const Minimal = ({ children }) => {
	const { user, loading } = useContext(Context);
	const router = useRouter();

	// useEffect(() => {
	// 	if (!user && !loading) {
	// 		Router.replace({
	// 			pathname: '/',
	// 			query: { showLogin: true },
	// 		});
	// 	}
	// }, []);

	if (!!user) {
		return (
			<>
				<NavBar />
				<Login />
				{children}
			</>
		);
	} else if (loading) {
		return (
			<div className="py-5 text-center">
				<Spinner animation="border" role="status" variant="primary">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	} else {
		router.push({
			pathname: '/',
			query: { showLogin: true },
		});
	}
	return (
		<div className="py-5 text-center">
			<Spinner animation="border" role="status" variant="primary">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
			<small>🤔 Something seems wrong.</small>
		</div>
	);
};

export default Minimal;
