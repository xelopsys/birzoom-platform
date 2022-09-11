import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { Icon } from "../Icon/Icon";
import { MdNotificationAdd } from "react-icons/md";
import { IoResizeOutline } from "react-icons/io5";
import Link from "next/link";
import { routes } from "../lang/lang";
import { Avatar } from "../Avatar/Avatar";

const Navbar = () => {
	const router = useRouter();
	const { locale, locales, asPath } = useRouter();
	const [route, setRoute] = useState<any>([...routes.EN]);

	const handleChange = (e: any) => {
		console.log(e.target.value);
		router.replace(asPath, asPath, {
			locale: e.target.value,
		});
	};

	useEffect(() => {
		if (locale === "en") {
			setRoute([...routes.EN]);
		} else {
			setRoute([...routes.UZ]);
		}
	}, [locale]);

	return (
		<div className="w-full h-[72px] border-b bg-white flex flex-row justify-between px-6 items-center">
			<h1 className="text-xl">
				{route.map((route: any) => {
					if (route.path === asPath) {
						return route.name.toUpperCase();
					}
				})}
			</h1>
			<div className="flex flex-row items-center justify-center">
				<Icon Icon={MdNotificationAdd} class="w-6 h-6 mr-[14px]" />
				<Icon
					Icon={IoResizeOutline}
					class="w-6 h-6 mr-[14px] border rounded-md p-1"
				/>
				<select
					name="locale"
					id="locale"
					onChange={handleChange}
					defaultValue={locale}
				>
					{locales?.map((locale: any, index: number) => {
						return (
							<option key={index} value={locale}>
								{locale.toUpperCase()}
							</option>
						);
					})}
				</select>
				<Avatar />
			</div>
		</div>
	);
};

export default Navbar;
