import { useContext } from 'react';
import { Container, ListGroup, Button, Badge } from 'react-bootstrap';
import Context from '../../Context';

const Profile = () => {
	const { user }: any = useContext(Context)

	return (
		<Container>
			<div className="section-title">

				<h2>Profile</h2>
			</div>
			<ListGroup className='my-3'>
				<ListGroup.Item> <b>Onboarding Process</b> </ListGroup.Item>

				<StatusListItem verified={user.verification.email}
				>Email
				</StatusListItem>
				<StatusListItem verified={user.verification.phone}
				>Phone
				</StatusListItem>
				<StatusListItem verified={user.verification.phone}
				>Profile
				</StatusListItem>
				<ListGroup.Item></ListGroup.Item>
			</ListGroup>

		</Container>
	);
};

Profile.layout = 'MINIMAL';
export default Profile;

const StatusListItem = ({ verified, children }: any) => {

	return (
		<ListGroup.Item>{children} &nbsp; <Badge bg={verified ? 'success' : 'danger'}>{verified ? 'VERIFIED' : 'NOT VERIFIED'}</Badge></ListGroup.Item>

	)
}