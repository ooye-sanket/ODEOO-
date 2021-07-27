import Link from 'next/link';
import { Card, Button, Badge } from 'react-bootstrap';

export const Artist = ({ img, name, desc, categories, link }) => {
	return (
		<Card className="artist-card mx-auto my-2">
			<Card.Img variant="top" src={img} />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>
					{desc}
					<br />
					{categories.map((i, key) => (
						<Badge key={key} bg="secondary" className="me-1">
							{i}
						</Badge>
					))}
				</Card.Text>
				<Link href={link}>
					<Button size="sm" className="d-block ms-auto" variant="primary">
						Learn more
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};
