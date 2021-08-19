import { useEffect, useState, useRef } from 'react';
import { ImageCropper, HiddenCropper } from 'react-bootstrap-image-cropper';
import { Button } from 'react-bootstrap';
import { Camera } from 'react-bootstrap-icons';
export const ProfileImageCropper = ({ initialValue, afterChange }) => {
	// if you don't care the onChange event, you can use a ref to retrieve the cropped file
	const triggerRef = useRef();
	const [image, setImage] = useState(initialValue);

	const handleChange = (croppedFile) => {
		let objUrl = URL.createObjectURL(croppedFile);
		// console.log(croppedFile.type.split('/')[1]);
		let file = new File([croppedFile], 'img.jpg');

		setImage(objUrl);
		afterChange(file);
	};

	return (
		<div>
			<Button
				variant="light"
				className="image-overlay-btn d-block mx-auto p-0"
				onClick={() => triggerRef.current.trigger()}
			>
				<img src={image} alt="" />
				<div className="overlay">
					<Camera size={40} />
				</div>
			</Button>
			<HiddenCropper
				mimeType="image/jpeg"
				triggerRef={triggerRef}
				onCropped={handleChange}
				cropOptions={{ aspect: 4 / 4, maxZoom: 10 }}
			/>
		</div>
	);
};
