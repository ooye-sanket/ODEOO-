import { useContext, useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Badge } from 'react-bootstrap';
import Context from '../../Context';
import { ProfileImageCropper, PasswordModal, UpdateProfile } from '../../components'
import Axios from 'axios'
const Profile = () => {
	const { user }: any = useContext(Context)

	const updateImage = (img: any) => {
		let data = new FormData()

		data.append('image', img)

		Axios.put('/user/image', data).then(r => console.log(r.data)).catch(console.error)
	}

	return (
		<><Container>
			<div className="section-title">
				<h2>My Account</h2>
			</div>
			<Row>
				<Col lg='3' xs='12' >
					<ListGroup className='my-2'>
						<ListGroup.Item><b>Onboarding Process</b></ListGroup.Item>
						<StatusListItem verified={user.verification.email}
						>Email
						</StatusListItem>
						<StatusListItem verified={user.verification.phone}
						>Profile
						</StatusListItem>
						<StatusListItem verified={user.verification.phone}
						>Phone
						</StatusListItem>
						<ListGroup.Item></ListGroup.Item>
					</ListGroup>
				</Col>
				<Col lg='9' xs='12'>
					<UpdateProfile />
				</Col>
			</Row>
		</Container>
			<PasswordModal /></>
	);
};

Profile.layout = 'MINIMAL';
export default Profile;

const StatusListItem = ({ verified, children }: any) => {

	return (
		<ListGroup.Item>
			<div className="d-flex justify-content-between">
				<small>
					{children}
				</small>
				<Badge bg={verified ? 'success' : 'danger'}>{verified ? 'VERIFIED' : 'NOT VERIFIED'}</Badge>
			</div>
		</ListGroup.Item>

	)
}