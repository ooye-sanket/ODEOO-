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

	const getUser = () => {
		Axios.get('/auth')
			.then((r) => {
				localStorage.setItem(
					'auth-token',
					r.headers.authorization.split(' ')[1]
				);
				setUser(r.data.data);
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	};

	useEffect(() => getUser(), []);

	return (
		<Context.Provider
			value={{
				loginShow,
				setLoginShow,
				loading,
				user,
			}}
		>
			{children}
		</Context.Provider>
	);
};
