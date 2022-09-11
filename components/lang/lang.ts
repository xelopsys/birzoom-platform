import { IoHome } from "react-icons/io5";
import { BsFillPersonFill } from "react-icons/bs";

export const routes = {
	EN: [
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
		// 	Icon: BsFillPersonFill,
		// },
	],
	UZ: [
		{
			name: "Panel",
			path: "/",
			Icon: IoHome,
		},
		{
			name: "O`qituvchilar",
			path: "/teachers",
			Icon: BsFillPersonFill,
		},
		// {
		// 	name: "o`qituvchilar/yaratish",
		// 	path: "/teachers/create",
		// 	Icon: BsFillPersonFill,
		// },
		// {
		// 	name: "teachers/create",
		// 	path: "/teachers/create",
		// 	Icon: IoHome,
		// },
	],
};
