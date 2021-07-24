import Head from 'next/head';
import Image from 'next/image';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {

	return (
		<Container fluid className='bg-light'>
			<Container>
				<Row id='hero-section' className='align-items-center'>
					<Col xs={{ span: 12, order: 'last' }} lg='6'>
						<div className='display-4'>Welcome to Odeo.in</div>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa distinctio, praesentium nam odio animi nobis voluptatum repellendus explicabo, sed at molestiae fugiat dolorem, consectetur ipsum accusamus a ex! Minus, perspiciatis.</p>
						<Button>Post a Requirement</Button>
					</Col>
					<Col xs={{ span: 12, order: 'first' }} lg='6'>
						<div className="text-center">
							<Image width='640' height='400' src='/rock-band.svg' alt='' />
						</div>
					</Col>
				</Row>
			</Container>
		</Container >
	);
}

Home.layout = 'STANDARD'

export default Home
