import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
	region: process.env.S3_REGION,
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_KEY,
});

export const uploadFile = (file, fileName) => {
	const fileStream = fs.readFileSync(file.path);

	var re = /(?:\.([^.]+))?$/;

	const destination = `${
		process.env.NODE_ENV === 'production' ? '' : 'testing/'
	}${fileName}.${re.exec(file.name)[1]}`;

	return s3
		.upload({
			Bucket: process.env.S3_BUCKET_NAME,
			Body: fileStream,
			Key: destination,
		})
		.promise();
};

export const deleteFile = async (path) => {
	const data = await s3
		.deleteObject({
			Bucket: process.env.S3_BUCKET_NAME,
			Key: path,
		})
		.promise();

	return true;
};

export const getFileStream = async (fileKey) => {
	return await s3
		.getObject({
			Key: fileKey,
			Bucket: process.env.S3_BUCKET_NAME,
		})
		.createReadStream();
};
