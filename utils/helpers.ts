export const capitalise = (str: string) => {
	console.log(str.replace(/^\w/, (c) => c.toUpperCase()));
	return str.replace(/^\w/, (c) => c.toUpperCase());
};

export const getVideoId=(url:string)=> {
	const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
	const match = url.match(regExp);

	return (match && match[2].length === 11)
	  ? match[2]
	  : null;
}
 