import Head from 'next/head';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {

	return (
		<Container fluid className='bg-light'>
			<Container>
				<Row id='hero-section' className='align-items-center'>
					<Col >
						<div className='display-4'>Welcome to Odeo.in</div>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa distinctio, praesentium nam odio animi nobis voluptatum repellendus explicabo, sed at molestiae fugiat dolorem, consectetur ipsum accusamus a ex! Minus, perspiciatis.</p>
					</Col>
					<Col>
						<img src='/rock-band.svg' alt='' />
					</Col>
				</Row>
			</Container>
		</Container >
	);
}

Home.layout = 'STANDARD'

export default Home
