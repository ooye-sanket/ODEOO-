import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { Login, NavBar, Footer } from '../components';
import Context from '../Context';

const Minimal = ({ children }) => {
	const { user, loading, loggedOut } = useContext(Context);
	// const router = useRouter();

	useEffect(() => {
		if (!user && !loading) {
			Router.replace({
				pathname: '/',
				query: { showLogin: true },
			});
		}
	}, []);

	if (loading || loggedOut) {
		return <>Loading...</>;
	}

	return (
		<>
			<NavBar />
			<Login />
			{children}
		</>
	);
};

export default Minimal;
