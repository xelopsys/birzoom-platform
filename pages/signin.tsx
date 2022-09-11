import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";
import Logo from "../components/Logo";
import { SetCookie, SessionStorage } from "../components/getCookie/getCookie";
import { Formik, Field, Form } from "formik";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";

export default function SignIn() {
	const router = useRouter();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [checked, setChecked] = useState<boolean>(false);
	const [error, setError] = useState<boolean>();
	const [user, setUser] = useState<any>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	// useEffect(() => {
	// 	if (checked) {
	// 	}
	// }, [checked]);

	return (
		<div className="w-[100vw] h-[100vh] m-0 p-0 bg-[#F6F6F9] flex flex-row justify-center  items-center">
			<div className="w-[552px] h-[552px] bg-white  rounded-md flex flex-col justify-center items-center">
				<Logo />
				<h1 className="text-3xl mt-7">Xush kelibsiz</h1>
				<p className="text-gray-400 text-lg font-light mb-4">
					Login va parolingizni kiriting
				</p>
				<Formik
					initialValues={{
						username: "",
						password: "",
					}}
					onSubmit={async (values) => {
						await new Promise((r) => setTimeout(r, 500));
						const querysnapshot = getDocs(collection(db, "roles"));
						try {
							(await querysnapshot).forEach(async (doc) => {
								if (
									doc.data().email === values.username ||
									doc.data().name === values.username
								) {
									if (
										bcrypt.compareSync(values.password, doc.data().password)
									) {
										console.log("login success");

										SetCookie({
											name: doc.data().name,
											email: doc.data().email,
											role: doc.data().role,
											id: doc.id,
											photo: doc.data().photo,
											expires: checked
												? new Date(
														Date.now() + 60 * 60 * 1000 * 24 * 15
												  ).toUTCString()
												: new Date(
														Date.now() + 60 * 60 * 1000 * 24 * 2
												  ).toUTCString(),
										});

										await setUser({ ...doc.data(), id: doc.id });

										router.push("/");
									}
								}
							});
						} catch (e) {
							setError(true);
							console.log(e);
						}
					}}
				>
					<Form className="flex flex-col justify-center items-center gap-y-2">
						<label
							htmlFor="username"
							className="text-black text-left w-[440px] text-xs"
						>
							Username
						</label>
						<Field
							id="username"
							name="username"
							className="w-[440px] h-[40px] rounded-[4px] text-sm border border-gray-300 px-3 bg-white mb-3"
						/>

						<label
							htmlFor="password"
							className="text-black text-left w-[440px] text-xs"
						>
							Password
						</label>
						<Field
							id="password"
							name="password"
							type="password"
							className="w-[440px] h-[40px] rounded-[4px] text-sm border border-gray-300 px-3 bg-white mb-3"
						/>

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
							Submit
						</button>
						{error && (
							<p className="text-red-600 my-3">
								Your username or password is incorrect
							</p>
						)}
					</Form>
				</Formik>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	// console.log(context);

	// const cookies = context.
	const locale = context.locale;
	const cookie = context.req.cookies;
	// console.log(cookie);
	// console.log(locale);

	if (cookie.role === "admin" || cookie.role === "guest") {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	// console.log(cookies);
	return {
		props: {},
	};
};
