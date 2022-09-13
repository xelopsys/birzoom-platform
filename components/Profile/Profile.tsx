import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { GetCookie, DeleteAllCookie } from "../getCookie/getCookie";
import Image from "next/image";

export function Profile() {
	const [role, setRole] = useState<string | any>("");
	const [name, setName] = useState<string | any>("");
	const [email, setEmail] = useState<string | any>("");
	const [photo, setPhoto] = useState<string | any>("");
	const router = useRouter();
	const { asPath, locale } = useRouter();

	useEffect(() => {
		setRole(GetCookie("role"));
		setName(GetCookie("name"));
		setEmail(GetCookie("email"));
		setPhoto(GetCookie("photo"));
	}, [asPath]);

	const handleDelete = () => {
		DeleteAllCookie();
		return router.push("/signin");
	};
	return (
		<div className="flex w-full my-24 justify-center items-center">
			<div className="flex w-80 h-40  rounded-md shadow-md bg-white justify-start px-6 items-center space-x-4">
				<Image
					width="60"
					height="60"
					className="w-10 h-10 rounded-full"
					src={photo}
					alt=""
				/>
				<div className="font-medium ">
					<div>{name}</div>
					<div className="text-sm text-black">{email}</div>
					<button
						onClick={handleDelete}
						className="text-white bg-red-500 py-1 px-2 my-2 rounded-md hover:bg-red-700"
					>
						{locale == "en" ? "Sign out" : "Chiqish"}
					</button>
				</div>
			</div>
		</div>
	);
}
