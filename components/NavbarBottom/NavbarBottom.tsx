import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GetCookie } from "../getCookie/getCookie";

export function NavbarBottom(props: any) {
	const { locale, asPath } = useRouter();
	const [show, setShow] = useState(false);
	const [role, setRole] = useState<string | undefined>("");
	const [category, setCategory] = useState<string>("all");
	const [search, setSearch] = useState<string>("");
	const currentValue = useRef<string>(search);
	//
	useEffect(() => {
		setRole(GetCookie("role"));
	}, [asPath]);

	useEffect(() => {
		props.setSearchValue(search);
	}, [search]);

	useEffect(() => {
		props.setCategoryValue(category);
	}, [category]);
	// console.log(search);
	return (
		<div className="w-full h-10 flex flex-row justify-between items-center">
			<div className="flex flex-row justify-center items-center ml-[25px] mt-[24px]">
				<form className="">
					{/* <label
					htmlFor="default-search"
					className="mb-2 text-lg font-medium text-gray-900 sr-only"
				>
					Search
				</label> */}
					<div className="relative">
						<div className="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-black "
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</div>
						<input
							type="search"
							id="default-search"
							className="p-4 focus:pl-10 w-10 h-10 flex flex-row items-center justify-center text-sm text-gray-900 bg-white rounded-md border border-gray-200 focus:ring-blue-500 focus:border-blue-500 focus:w-60 transition-transform ease-linear after:w-7"
							placeholder="Search"
							required
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</form>
				<select
					name="category"
					id="category"
					defaultValue={locale === "en" ? "All" : "Hammasi"}
					className="p-2 border rounded-md border-gray-200 ml-3"
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value="all">{locale === "en" ? "All" : "Hammasi"}</option>
					<option value="name">{locale === "en" ? "Name" : "Ism"}</option>
					<option value="surname">
						{locale === "en" ? "Surname" : "Familiya"}
					</option>
					<option value="region">{locale === "en" ? "Region" : "Hudud"}</option>
					<option value="number">
						{locale === "en" ? "Phone Number" : "Tel Raqami"}
					</option>
				</select>
			</div>
			{role === "admin" && (
				<div className="flex flex-row justify-center items-center  mr-[25px] mt-[24px]">
					<button className="py-2 px-3 border rounded-md mr-3 bg-white flex justify-center items-center cursor-pointer">
						Excel
					</button>
					<Link href="/teachers/create">
						<span className=" bg-primary py-2 px-3 text-white rounded-md flex justify-center items-center cursor-pointer ">
							{" "}
							{"+"}
							{"   "}
							{locale === "en" ? "Add teacher" : "O`qituvchi qo`shish"}
						</span>
					</Link>
				</div>
			)}
		</div>
	);
}
