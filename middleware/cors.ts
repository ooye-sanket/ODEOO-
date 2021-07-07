// @ts-ignore
import Cors from 'cors';

const cors = Cors({
	// Only allow requests with GET, POST and OPTIONS
	methods: ['GET', 'POST', 'OPTIONS'],
});

export default cors;
