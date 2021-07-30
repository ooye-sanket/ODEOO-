import { useContext } from 'react';
import Context from '../../Context';

const Profile = () => {
	const { user }: any = useContext(Context)

	return (<><h2>Your profile here</h2>
		<p>
			{user?.verification.email ? 'Email is Verified' : 'Email not verified'}
		</p>
	</>);
};

Profile.layout = 'MINIMAL';
export default Profile;
