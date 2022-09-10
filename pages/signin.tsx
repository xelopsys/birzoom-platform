import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";
import Logo from "../components/Logo";
import { SetCookie, SessionStorage } from "../components/getCookie/getCookie";

export default function SignIn() {
	const router = useRouter();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [checked, setChecked] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [user, setUser] = useState<any>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const querysnapshot = getDocs(collection(db, "roles"));
		(await querysnapshot).forEach(async (doc) => {
			if (doc.data().email === username || doc.data().name === username) {
				if (bcrypt.compareSync(password, doc.data().password)) {
					console.log("login success");
					console.log(doc.data());
					return await setUser({ ...doc.data(), id: doc.id });
				} else {
					return setError("password is incorrect");
				}
			} else {
				return setError("email or username is incorrect");
			}
		});
	};

	useEffect(() => {
		checked ? SetCookie({ ...user }) : SessionStorage({ ...user });
		if (user) {
			router.push("/");
		}
	}, [user, checked]);

	return (
		<div className="w-[100vw] h-[100vh] m-0 p-0 bg-[#F6F6F9] flex flex-row justify-center  items-center">
			<div className="w-[552px] h-[552px] bg-white  rounded-md flex flex-col justify-center items-center">
				<Logo />
				<h1 className="text-3xl mt-7">Xush kelibsiz</h1>
				<p className="text-gray-400 text-lg font-light mb-4">
					Login va parolingizni kiriting
				</p>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col justify-center items-center gap-y-2"
				>
					<label
						htmlFor="email"
						className="text-black text-left w-[440px] text-xs"
					>
						Username
					</label>
					<input
						id="email"
						name="email"
						type="text"
						// placeholder="email"
						className="w-[440px] h-[40px] rounded-[4px] text-sm border border-gray-300 px-3 bg-white mb-3"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label
						htmlFor="password"
						className="text-black text-left w-[440px] text-xs"
					>
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						className="w-[440px] h-[40px] rounded-[4px] text-sm border border-gray-300 px-3 bg-white mb-3"
						onChange={(e) => setPassword(e.target.value)}
					/>
					{/* <span className="p-3"> */}

					<div className="flex items-start w-[440px] mb-3">
						<input
							id="link-checkbox"
							type="checkbox"
							onChange={(e) => {
								setChecked(e.target.checked);
							}}
							className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2"
						/>
						<label
							htmlFor="link-checkbox"
							className="ml-2 text-sm font-medium text-gray-900"
						>
							Remember me
						</label>
					</div>

					<button
						type="submit"
						className="bg-primary hover:bg-blue-700 text-white w-[440px] h-[40px] rounded-[4px] text-sm"
					>
						Sign In
					</button>
					{error && <p className="text-red-600 my-3">{error}</p>}
				</form>
			</div>
		</div>
	);
}
