import { useEffect, useState } from 'react';
import Axios from 'axios';

const useFetch = (url, initialValue) => {
	const [response, setResponse] = useState({
		loading: true,
		data: initialValue,
	});

	useEffect(() => {
		const fetchData = async () => {
			Axios.get(url)
				.then((r) =>
					setResponse((response) => ({ ...response, data: r.data.data }))
				)
				.catch(console.error)
				.finally(() =>
					setResponse((response) => ({ ...response, loading: false }))
				);
		};
		fetchData();
	}, []);

	return response;
};

export default useFetch;
