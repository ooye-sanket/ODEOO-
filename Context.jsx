import { createContext, useEffect, useState } from 'react';
import Axios from 'axios';
// import useAuth from './hooks/useAuth';

// Context
const Context = createContext({});
export default Context;

// Provider
export const Provider = ({ children }) => {
	//   const auth = useAuth();
	const [loginShow, setLoginShow] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loggedOut, setLoggedOut] = useState(true);

	useEffect(() => {
		const getUser = async () => {
			Axios.get('/user')
				.then((r) => {
					localStorage.setItem(
						'auth-token',
						r.headers.authorization.split(' ')[1]
					);
					setUser(r.data.data);
					setLoggedOut(false);
				})
				.catch(console.error)
				.finally(() => setLoading(false));
		};
		getUser();
	}, []);

	return (
		<Context.Provider
			value={{
				loginShow,
				setLoginShow,
				loading,
				loggedOut,
				user,
			}}
		>
			{children}
		</Context.Provider>
	);
};
