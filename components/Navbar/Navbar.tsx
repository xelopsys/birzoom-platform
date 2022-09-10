import React from "react";
import { useRouter } from "next/router";
import { Icon } from "../Icon/Icon";
import { MdNotificationAdd } from "react-icons/md";
import { IoResizeOutline } from "react-icons/io5";

const Navbar = () => {
	const router = useRouter();
	return (
		<div className="w-[1215px] h-[72px] border-b bg-white flex flex-row justify-between px-6 items-center">
			<h1 className="text-xl">
				{router.asPath === "/"
					? "DASHBOARD"
					: router.asPath.split("/")[1].toUpperCase()}
			</h1>
			<div className="flex flex-row items-center justify-center">
				<Icon Icon={MdNotificationAdd} class="w-6 h-6 mr-[14px]" />
				<Icon
					Icon={IoResizeOutline}
					class="w-8 h-8 mr-[14px] border rounded-md p-2"
				/>
			</div>
		</div>
	);
};

export default Navbar;
