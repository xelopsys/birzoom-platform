import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GetCookie } from "../getCookie/getCookie";
import Image from "next/image";
import { Field } from "formik";
import { db, storage } from "../../firebase/firebase";
import {
	collection,
	getDocs,
	doc,
	deleteDoc,
	updateDoc,
} from "firebase/firestore";

export function Table({
	users,
	isUpdated,
	currentPage,
}: {
	users: any;
	isUpdated: any;
	currentPage: number;
}) {
	const [role, setRole] = useState<any>("");
	const { locale } = useRouter();
	const [isActive, setIsActive] = useState<string>("");
	const [activeId, setActiveId] = useState<number>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [user, setUser] = useState<any>([]);

	useEffect(() => {
		setRole(GetCookie("role"));
	}, []);

	useEffect(() => {
		setUser(users);
	}, [users]);

	const handleOpen = (id: number) => {
		setIsOpen(!isOpen);
		setActiveId(id);
	};
	const handleChangeActive = async (
		e: React.FormEvent<HTMLInputElement>,
		id: string
	) => {
		setIsOpen(!isOpen);
		setIsActive(e.currentTarget.value);
		await updateDoc(doc(db, "mockdata", id), {
			active: e.currentTarget.value,
		}).then(() => {
			isUpdated(true);
		});
	};

	const handleDelete = async (id: string) => {
		await deleteDoc(doc(db, "mockdata", id)).then(() => {
			isUpdated(true);
		});
	};

	return (
		<div>
			<div className="overflow-x-auto relative">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-white">
						<tr>
							<th scope="col" className="py-3 px-6">
								ID
							</th>
							<th scope="col" className="py-3 px-6">
								{locale == "en" ? "PHOTO" : "RASM"}
							</th>
							<th scope="col" className="py-3 px-6">
								{locale == "en" ? "NAME SURNAME" : "ISM FAMILIYA"}
							</th>
							<th scope="col" className="py-3 px-6">
								{locale == "en" ? "REGION" : "HUDUD"}
							</th>
							<th scope="col" className="py-3 px-6">
								{locale == "en" ? "LANGUAGE" : "TIL"}
							</th>
							<th scope="col" className="py-3 px-6">
								{locale == "en" ? "PHONE NUMBER" : "TELEFON RAQAMI"}
							</th>
							<th scope="col" className="py-3 px-6">
								{locale == "en" ? "ACTIVENESS" : "HOLATI"}
							</th>
							{role == "admin" && (
								<th scope="col" className="py-3 px-6">
									{locale == "en" ? "ACT" : "HARAKAT"}
								</th>
							)}
							{role == "admin" && (
								<th scope="col" className="py-3 px-6">
									{locale == "en" ? "Delete" : "O`chirish"}
								</th>
							)}
						</tr>
					</thead>
					<tbody>
						{user.map((user: any, index: number) => {
							return (
								<tr key={index} className="bg-white border-b">
									<th
										scope="row"
										className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
									>
										{currentPage == 1
											? index + 1
											: index + (currentPage + 5) - 1}
									</th>
									<td className="py-4 px-6">
										<Image
											width="32"
											height="32"
											src={user.photo}
											className="object-cover rounded-full"
										/>
									</td>
									<td className="py-4 px-6">
										{user.name}
										{"  "} {user.surname}
									</td>
									<td className="py-4 px-6">{user.region}</td>
									<td className="py-4 content-center text-center">
										<Image
											width="32"
											height="32"
											className="object-cover rounded-md mx-4"
											src="https://w7.pngwing.com/pngs/159/377/png-transparent-england-flag-of-the-united-kingdom-national-flag-flag-of-great-britain-american-flag-graphic-blue-angle-flag.png"
										/>
									</td>
									<td className="py-4 px-6"> {user.number}</td>
									<td className="py-4 px-6">
										<span
											className={`py-2 px-3 rounded-3xl ${
												user.active === "active"
													? "text-green-600 bg-green-50"
													: " text-red-600 bg-red-50"
											}`}
										>
											{locale == "en"
												? user.active
												: user.active == "active"
												? "faol"
												: "no faol"}
										</span>
									</td>
									{role == "admin" && (
										<td className="py-4 px-6 text-center relative">
											<button onClick={() => handleOpen(index)}>...</button>
											{activeId === index && isOpen ? (
												<div className="absolute w-[140px] h-[80px] box-border border z-10 bg-white right-12 rounded-md flex flex-col justify-center items-center">
													<label className="hover:bg-blue-100 hover:text-blue-500 w-[95%] px-3 pt-1 h-1/2 m-1 rounded-md content-center text-left">
														<input
															type="radio"
															name="active"
															value="active"
															className="hidden"
															onChange={(e) =>
																handleChangeActive(e, user.id.toString())
															}
														/>
														{locale == "en" ? "active" : "faol"}
													</label>
													<label className="hover:bg-blue-100 hover:text-blue-500 w-[95%] px-3 pt-1 h-1/2 m-1 rounded-md content-center text-left">
														<input
															type="radio"
															name="active"
															value="noactive"
															className="hidden"
															onChange={(e) =>
																handleChangeActive(e, user.id.toString())
															}
														/>
														{locale == "en" ? "noactive" : "faol emas"}
													</label>
												</div>
											) : null}
										</td>
									)}
									{role == "admin" && (
										<td className="py-4 px-6">
											<button
												className="text-white bg-red-500 px-3 py-2 rounded-3xl"
												onClick={() => handleDelete(user.id.toString())}
											>
												{locale == "en" ? "delete" : "o`chirish"}
											</button>
										</td>
									)}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
