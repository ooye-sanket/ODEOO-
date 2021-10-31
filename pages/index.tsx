import Head from 'next/head';
import Image from 'next/image';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import { Artist } from '../components'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Context from '../Context';
import useFetch from '../hooks/useFetch';
import cogoToast from 'cogo-toast';


const Home = () => {
	const { query } = useRouter()
	const { user, setLoginShow }: any = useContext(Context)
	const { data: artists, loading } = useFetch('/artists', [])
	useEffect(() => { if (query.showLogin) setLoginShow(true) }, [query.showLogin])

	return (
		<>
			<Container fluid className='bg-light'>
				<Container>
					<Row id='hero-section' className='align-items-center .justify-content-xs-around'>
						<Col xs={{ span: 12, order: 'last' }} lg='6'>
							<h1 className='display-5'>The Ultimate Platform For All Local Artists</h1>
							<p className='text-muted'>We are team of Talented artists making your event memorable.</p>
							<Button className='mb-1 me-2' >Post Inquiry</Button>
							<Button className='mb-1 me-1' variant='outline-dark' onClick={() => {
								cogoToast.success('Hello', { position: 'bottom-center' })
							}}>Learn More</Button>
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
					{
						loading ? (
							<Spinner
								animation="border"
								role="status"
								variant="primary"
								className='mx-auto'
							>
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						) : artists.length == 0 ?
							(
								<span className='text-muted text-center'>
									No Artists Found
								</span>

							)
							: artists?.map((itr: any, key: any) => (
								<Col key={key} xs={12} sm={6} lg={4} xl='auto'>
									<Artist img={itr?.img?.url} name={`${itr.firstName} ${itr.lastName}`} categories={itr.meta.genre} pro={itr.pro} link={`/artists/${itr.username}`} />
								</Col>
							))
					}
				</Row>
			</Container>
		</>
	);
}

Home.layout = 'STANDARD'

export default Home

// const artists = [
// 	{ name: 'Priyaansh Shah', desc: '', img: '/priyaansh.jpg', categories: ['Bollywood', 'Garba'], link: '/artists/2' },
// 	{ name: 'Priyaansh Shah', desc: '', img: '/priyaansh.jpg', categories: ['Bollywood', 'Garba'], link: '/artists/2' },
// 	{ name: 'Priyaansh Shah', desc: '', img: '/priyaansh.jpg', categories: ['Bollywood', 'Garba'], link: '/artists/2' },
// ]