import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router"

export function PreviewImage({ file }) {
	const { locale } = useRouter()
	const [imagePreviewUrl, setImagePreviewUrl] = useState("");

	// const reader = FileReader();
	useEffect(() => {
		const reader = new FileReader();
		const load = async () => {
			await reader.readAsDataURL(new Blob([file]), "image/jpeg");
		};
		load();
		reader.onloadend = () => {
			setImagePreviewUrl(reader.result);
		};
	}, [file]);

	return (
		<div className="w-[134px] h-[134px] border-2 rounded-full p-1 border-[#0086FF] flex justify-center items-center">
			{imagePreviewUrl ? (<Image
				width="134"
				height="134"
				src={imagePreviewUrl}
				alt="Preview"
				className=" object-cover rounded-full"
			/>
			) : (
				<span>{locale == "en" ? "Uploading..." : "Yuklanyapti..."}</span>
			)}

		</div>
	);
}
