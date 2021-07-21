import { NavBar } from '../components';

const Standard = ({ children }) => {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
};

export default Standard;
