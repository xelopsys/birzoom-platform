import React, { useState, useEffect, Fragment } from "react";
import Head from "next/head";
// import { MyFormValues } from "../data/Additional";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoChatboxOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";

export function Information() {
	const { locale, asPath } = useRouter();
	const [user, setUser] = useState<any>({});

	useEffect(() => {
		const fetchData = async () => {
			const data = await getDocs(collection(db, "mockdata"));
			let list: any[] = [];
			data.forEach((doc) => {
				list.push({ ...doc.data(), id: doc.id });
				setUser({ ...list[9] });
			});
		};
		fetchData();
	}, []);

	console.log(user);
	return (
		<div className="w-full h-full flex-col justify-start overflow-y-scroll box-border items-center my-3 mx-3 p-0 bg-inherit">
			<p className="w-max h-max border-b-2 pb-2 border-blue-600">
				{locale == "en" ? "INFORMATION" : "MA'LUMOTLAR"}
			</p>
			<div className="w-full h-full flex flex-row justify-center overflow-y-scroll scrollbar-hide items-start gap-x-2 box-border mt-3 mb-8">
				<div className="w-1/4 bg-inherit  h-80 ">
					<div className="w-full h-3/4 rounded-md shadow flex flex-col justify-center items-center bg-white">
						<span className="w-full h-max flex flex-row justify-end items-center pr-3 text-right gap-x-3">
							<IoNotificationsOutline className="w-4 h-4" />
							<IoChatboxOutline className="w-4 h-4" />
						</span>
						<span className="w-max h-max my-1 border border-blue-500 p-1 rounded-full flex justify-center items-center">
							<Image
								width="130"
								height="130"
								className="rounded-full object-cover"
								src={user.photo ? user.photo : "/vercel.svg"}
							/>
						</span>
						<div className="text-center mb-2">
							<p className="text-md">
								{user.name} {user.surname}
							</p>
							<p className="text-sm text-gray-600">{user.number}</p>
						</div>
					</div>
					<button className="w-full text-center border mt-4 bg-blue-100 text-blue-600 py-2 rounded-md">
						{locale == "en" ? "Update" : "Tahrirlash"}
					</button>
				</div>

				<div className="w-3/4 h-full bg-white flex flex-row justify-start items-center">
					<div className="w-1/3 h-full flex flex-col justify-evenly items-start box-border text-gray-500">
						{Object.entries(user)
							.sort()
							.map(([key, value], index) => {
								return (
									<p key={key} className="text-md ml-6">
										{key}:
									</p>
								);
							})}
					</div>
					<div className="w-2/4 h-full flex flex-col justify-evenly items-start box-border text-black">
						{Object.entries(user)
							.sort()
							.map(([key, value]: any, index) => {
								if (key == "password") {
									return (
										<p key={key} className="text-md">
											******
										</p>
									);
								}
								if (key == "createdAt") {
									return (
										<p key={key} className="text-md">
											{value.toDate().toLocaleDateString()}
										</p>
									);
								}
								return (
									<p key={key} className="text-md">
										{value.toString().substring(0, 50)}
									</p>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}
