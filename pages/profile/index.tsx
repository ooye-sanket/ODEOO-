import { useContext } from 'react';
import { Container, Row, Col, ListGroup, Button, Badge } from 'react-bootstrap';
import Context from '../../Context';

const Profile = () => {
	const { user }: any = useContext(Context)

	return (
		<Container>
			<div className="section-title">

				<h2>Profile</h2>
			</div>
			<Row>
				<Col lg='4' xs='12'>
					<ListGroup className='my-3'>
						<ListGroup.Item><b>Onboarding Process</b></ListGroup.Item>
						<StatusListItem verified={user.verification.phone}
						>Profile
						</StatusListItem>
						<StatusListItem verified={user.verification.email}
						>Email
						</StatusListItem>
						<StatusListItem verified={user.verification.phone}
						>Phone
						</StatusListItem>
						<ListGroup.Item></ListGroup.Item>
					</ListGroup>
				</Col>
			</Row>

		</Container>
	);
};

Profile.layout = 'MINIMAL';
export default Profile;

const StatusListItem = ({ verified, children }: any) => {

	return (
		<ListGroup.Item><Badge bg={verified ? 'success' : 'danger'}>{verified ? 'VERIFIED' : 'NOT VERIFIED'}</Badge>&nbsp;{children}</ListGroup.Item>

	)
}