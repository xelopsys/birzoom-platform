import React, { useState, useEffect } from "react";
import {
	GetCookie,
	GetSessionStorage,
	DeleteAllCookie,
	RemoveAllSessionStorage,
} from "../getCookie/getCookie";
import { useRouter } from "next/router";
import Link from "next/link"
// import { type } from "os";

export function Avatar() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const [photo, setPhoto] = useState("");
	const [show, setShow] = useState(false);
	const router = useRouter();
	const { asPath, locale } = useRouter();
	const handleClick = () => {
		setShow(!show);
	};

	const handleSignOut = () => {
		DeleteAllCookie();
		RemoveAllSessionStorage();
		router.replace("/signin");
	};

	useEffect(() => {
		setName(GetCookie("name"));
		setEmail(GetCookie("email"));
		setRole(GetCookie("role"));
		setPhoto(GetCookie("photo"));
	}, [router.asPath]);

	return (
		<div className="mx-3 relative">
			<img
				type="button"
				className="p-1 w-10 h-10 rounded-full ring-2 ring-gray-300"
				src={photo}
				alt={name}
				onClick={handleClick}
			/>
			{show && (
				<div className="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow right-0 top-[44px]">
					<div className="py-3 px-4 text-sm text-gray-900">
						<div>{name}</div>
						<div className="font-medium truncate">{email}</div>
					</div>
					{role === "admin" && (
						<ul
							className="py-1 text-sm text-gray-700 "
							aria-labelledby="avatarButton"
						>
							<li>
								<Link href="/teachers/create" >
								<a className="block py-2 px-4 hover:bg-gray-100">
									{locale === "en" ? "Create" : "Yaratish"}
									</a>
								</Link>
							</li>
						</ul>
					)}
					<div className="py-1">
						<button
							onClick={handleSignOut}
							className="block py-2 px-4 w-44 text-left text-sm text-gray-700 hover:bg-gray-100"
						>
							{locale === "en" ? "Sign out" : "Chiqish"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
