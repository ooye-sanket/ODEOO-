import { Login, NavBar } from '../components';

const Standard = ({ children }) => {
	return (
		<>
			<NavBar />
			<Login />
			{children}
		</>
	);
};

export default Standard;
