import { Login, NavBar, Footer } from '../components';

const Standard = ({ children }) => {
	return (
		<>
			<NavBar />
			<Login />
			{children}
			<Footer />
		</>
	);
};

export default Standard;
