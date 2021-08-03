import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
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
		return <>Loading...</>;
	} else {
		router.push({
			pathname: '/',
			query: { showLogin: true },
		});
	}
	return <>Please wait...</>;
};

export default Minimal;
