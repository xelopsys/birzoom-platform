import React from "react";
import Logo from "../Logo";
import { IoHome } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";
import { Icon } from "../Icon/Icon";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Sidebar() {
	const router = useRouter();

	const routes = [
		{
			name: "dashboard",
			path: "/",
			Icon: IoHome,
		},
		{
			name: "teachers",
			path: "/teachers",
			Icon: BsFillPersonFill,
		},
		// {
		// 	name: "teachers/create",
		// 	path: "/teachers/create",
		// 	Icon: IoHome,
		// },
	];

	return (
		<div className="h-[100vh] w-56 flex flex-col justify-start items-start align-middle border-r bg-white">
			<div className="h-[72px] w-56 border-b pt-4 pl-4">
				<Logo />
			</div>
			<div className="h-100 w-56 pl-4 pt-[25px] pr-4">
				<p className="text-secondary font-semibold text-sm mb-4">ASOSIY</p>

				{routes.map((route, index) => {
					return (
						<Link href={route.path} key={index} passHref>
							<a
								className={` p-2 flex flex-row justify-start items-center text-md mt-3 linear transition-all ${
									router.asPath === route.path
										? `bg-blue-50 text-primary`
										: `bg-white text-secondary`
								} rounded-md pl-4`}
							>
								<Icon Icon={route.Icon} class="w-4 h-4 mr-[14px]" />{" "}
								{route.name}
							</a>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
