import { useEffect, useState, useRef } from 'react';
import { ImageCropper, HiddenCropper } from 'react-bootstrap-image-cropper';
import { Button } from 'react-bootstrap';
import { Camera } from 'react-bootstrap-icons';
export const ProfileImageCropper = ({
	initialValue,
	afterChange,
	className,
}) => {
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
		<div className={className}>
			<div
				className="image-overlay d-block mx-auto"
				onClick={() => triggerRef.current.trigger()}
			>
				<div className="content">
					{image ? <img src={image} alt="" /> : <Camera size={40} />}
				</div>

				<Button variant="success" className="px-2 pb-2 pt-1">
					<Camera size={18} />
				</Button>
			</div>
			<HiddenCropper
				mimeType="image/jpeg"
				triggerRef={triggerRef}
				onCropped={handleChange}
				cropOptions={{ aspect: 4 / 4, maxZoom: 10 }}
			/>
		</div>
	);
};
