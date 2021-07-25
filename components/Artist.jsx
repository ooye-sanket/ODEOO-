import Link from 'next/link';
import { Card, Button, Badge } from 'react-bootstrap';

export const Artist = ({ img, name, desc, categories, link }) => {
	return (
		<Card className="artist-card my-auto">
			<Card.Img variant="top" src={img} />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>
					{desc}
					{categories.map((i) => (
						<Badge bg="secondary" className="me-1">
							Bollywood
						</Badge>
					))}
				</Card.Text>
				<Link href={link}>
					<Button className="d-block ms-auto" variant="primary">
						Inquire
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};
