import Link from 'next/link';
import { Card, Button, Badge } from 'react-bootstrap';

export const Artist = ({ img, name, categories, link,pro }) => {
	return (
		<Card className="artist-card mx-auto my-2 position-relative">
			<Card.Img variant="top" src={img} />
			{pro && <Badge
				bg="light"
				text="dark"
				className="position-absolute m-3 top-0 end-0"
			>
				PRO
			</Badge>}
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Text>
					{categories?.map((i, key) => (
						<Badge key={key} bg="secondary" className="me-1">
							{i}
						</Badge>
					))}
				</Card.Text>
				<Link href={link} passHref>
					<Button size="sm" className="d-block ms-auto" variant="primary">
						Learn more
					</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};
