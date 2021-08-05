import Head from 'next/head';
import Image from 'next/image';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Artist } from '../components'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import Context from '../Context';


const Home = () => {
	const { query } = useRouter()
	const { setLoginShow }: any = useContext(Context)

	useEffect(() => { if (query.showLogin) setLoginShow(true) }, [])

	return (
		<>
			<Container fluid className='bg-light'>
				<Container>
					<Row id='hero-section' className='align-items-center .justify-content-xs-around'>
						<Col xs={{ span: 12, order: 'last' }} lg='6'>
							<h1 className='display-5'>The Ultimate Platform For All Local Artists</h1>
							<p className='text-muted'>We are team of Talented artists making your event memorable.</p>
							<Button className='mb-1 me-1'>Post a Requirement</Button>
							<Button className='mb-1 me-1' variant='outline-dark'>Learn More</Button>
						</Col>
						<Col xs={{ span: 12, order: 'first' }} lg='6'>
							<div className="text-center">
								<img src='/rock-band.svg' alt='' />
							</div>
						</Col>
					</Row>
				</Container>
			</Container>
			<Container className='py-5'>
				<div className="section-title">
					<h2>Why Odeo.in?</h2>
				</div>
				<p>Why not?</p>
			</Container>
			<div id='about' className='bg-light'>
				<Container className='py-5'>
					<div className="section-title">
						<h2>Our Services</h2>
					</div>
					<Row>
						<Col>
							<Card>
								<Card.Body>
									<img src='/rock-band.svg' alt='' />
									<Card.Title>
										Artists
									</Card.Title>
								</Card.Body>
							</Card>
						</Col>
						<Col>
							<Card>
								<Card.Body>
									<img src='/rock-band.svg' alt='' />
									<Card.Title>
										Events
									</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
			<Container className='py-5'>
				<div className="section-title">
					<h2>Featured Artists</h2>
				</div>
				<Row>
					{artists.map((artist: any, key) => (<Col key={key} xs={12} sm={6} lg={4} xl='auto'>
						<Artist img={artist.img} name={artist.name} desc={artist.desc} categories={artist.categories} link={artist.link} />
					</Col>))}</Row>
			</Container>
		</>
	);
}

Home.layout = 'STANDARD'

export default Home

const artists = [
	{ name: 'Priyaansh Shah', desc: '', img: '/priyaansh.jpg', categories: ['Bollywood', 'Garba'], link: '/artists/2' },
	{ name: 'Priyaansh Shah', desc: '', img: '/priyaansh.jpg', categories: ['Bollywood', 'Garba'], link: '/artists/2' },
	{ name: 'Priyaansh Shah', desc: '', img: '/priyaansh.jpg', categories: ['Bollywood', 'Garba'], link: '/artists/2' },
]