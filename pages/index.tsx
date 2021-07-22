import Head from 'next/head';

const Home = () => {

	return (
		<>
			<div className="jumbotron jumbotron-fluid">
				<div className="container">
					<h1 className="display-4">Fluid jumbotron</h1>
					<p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
				</div>
			</div>
		</>
	);
}

Home.layout = 'STANDARD'

export default Home
