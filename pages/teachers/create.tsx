import React, { useState, useEffect, useRef } from "react";
import { GetServerSideProps } from "next";
import { Formik, Form, Field } from "formik";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import { FormField, FormSelect } from "../../components/FormikField/Field";
import { Checkbox } from "../../components/checkbox/Checkbox";
import { PreviewImage } from "../../components/Preview/Preview";
import Image from "next/image";
interface MyFormValues {
	id: number;
	locale: string | undefined;
	name: string;
	surname: string;
	gender: string;
	region: string;
	number: number;
	password: string;
	birthday: Date;
	tg_username?: string;
	type_of_activity: string;
	subjects: string;
	language_level: string;
	card_number?: number;
	moto: string;
	active?: boolean;
	zoom_link: string;
	level_of_teaching: string[];
	interests: string[];
	photo: string;
	createdAt: Date;
}

export default function Create() {
	const router = useRouter();
	const { locale, asPath } = router;
	const [selected, setSelected] = useState<string[]>([]);
	const fileRef = useRef<any>();
	const [perc, setPerc] = useState<number>();
	const [text, setText] = useState<string>("");
	const [uploadMessage, setUploadMessage] = useState<string>("");
	const [cancel, setCancel] = useState<unknown>();

	const handleAddToSelected = (e: any) => {
		setSelected((prev: any) =>
			!prev.includes(e.target.value) ? prev.push(e.target.value) : prev
		);
	};
	const initialValues: MyFormValues = {
		id: 0,
		locale: locale,
		name: "",
		surname: "",
		gender: "",
		region: "",
		number: 9,
		password: "",
		birthday: new Date(),
		tg_username: "",
		type_of_activity: "",
		subjects: "",
		language_level: "",
		card_number: 0,
		moto: "",
		active: false,
		zoom_link: "",
		level_of_teaching: [],
		interests: [],
		photo: "",
		createdAt: new Date(Date.now()),
	};

	return (
		<div className="w-[100vw] h-[100vh]">
			<div className="w-full h-full flex flex-row ">
				<Sidebar />
				<div className="w-full h-full flex flex-col justify-start items-center">
					<div className="w-full">
						<Navbar />
					</div>
					<div className="w-full h-full bg-gray-100">
						<Formik
							initialValues={initialValues}
							onSubmit={(values, actions) => {
								console.log({ values, actions });
								alert(JSON.stringify(values, null, 2));
								actions.setSubmitting(false);
							}}
						>
							{({ errors, values, setFieldValue, handleReset }) => {
								return (
									<Form className="w-full h-full flex flex-row flex-wrap justify-evenly items-start pt-8">
										<div className="w-[270px] h-[318px] bg-white flex flex-col justify-evenly p-2 items-center border rounded-md">
											<p className="text-left mr-auto ml-2 mt-3">
												{locale == "en" ? "Photo" : "Rasm"}
												<span className="text-red-400">*</span>
											</p>
											<div className="w-[238px] h-[213px] mb-5 flex flex-col justify-evenly items-center border rounded-md border-gray-400">
												{values.photo ? (
													<PreviewImage file={values.photo} />
												) : (
													<Image
														width="134"
														height="134"
														src="https://john-mohamed.com/wp-content/uploads/2018/05/Profile_avatar_placeholder_large.png"
														alt="Preview"
														className=" object-cover rounded-full"
													/>
												)}
												<p className="text-md text-gray-500">
													{locale == "en"
														? "Drag your photo here"
														: "Rasmni shu yerga olib keling"}
												</p>
											</div>

											<span className="flex flex-row w-full mb-3 h-max justify-around items-center">
												<span
													role="button"
													onClick={() => setFieldValue("photo", "")}
													className="flex flex-col w-[113px] h-9 cursor-pointer rounded-md border hover:bg-gray-100 text-grey-400 bg-white justify-center text-md items-center"
												>
													{locale == "en" ? "Cancel" : "O`chirish"}
												</span>
												{locale == "en" ? (
													<label
														htmlFor="photo"
														className="flex flex-col w-[113px] h-9 cursor-pointer rounded-md text-white bg-primary hover:bg-blue-600 justify-center text-md items-center"
													>
														{values.photo ? "Change" : "Upload"}
													</label>
												) : (
													<label
														htmlFor="photo"
														className="flex flex-col w-[113px] h-9 cursor-pointer rounded-md text-white bg-primary hover:bg-blue-600 justify-center text-md items-center"
													>
														{values.photo ? "O`zgartirish" : "Yuklash"}
													</label>
												)}
												<input
													ref={fileRef}
													id="photo"
													name="photo"
													type="file"
													className="hidden"
													onChange={(e: any) => {
														setFieldValue("photo", e.target.files[0]);
													}}
													required
												/>
											</span>
										</div>
										<div className="w-2/3 h-full bg-white flex flex-col overflow-x-hidden justify-center items-center border">
											<div className="w-full h-max flex flex-row justify-evenly items-center">
												<div className="w-1/2 flex flex-col justify-center items-center gap-x-3">
													<FormField
														type="text"
														name="name"
														label="Name"
														placeholder="Name"
														required={true}
													/>
													<FormField
														type="text"
														name="surname"
														label="Surname"
														placeholder="Surname"
														required={true}
													/>

													<FormSelect
														name="gender"
														defaultValue="Gender"
														label="Gender"
														required={true}
														values={["Gender", "Male", "Female"]}
													/>
													<FormField
														type="text"
														name="region"
														label="Region"
														required={true}
														placeholder="Region"
													/>
													<FormField
														type="number"
														name="number"
														label="Phone number +998"
														required={true}
														placeholder="phone number"
													/>
													<FormField
														name="password"
														type="password"
														placeholder="password"
														label="Password"
														required={true}
													/>
													<FormField
														name="birthday"
														label="Birthday"
														type="date"
														placeholder="birthday"
														required
													/>
													<FormField
														name="tg_username"
														label="Telegram username"
														type="text"
														placeholder="username"
													/>
												</div>
												<div className="w-1/2 flex flex-col justify-center items-center gap-x-3">
													<FormSelect
														name="type_of_activity"
														defaultValue="Activity"
														label="Type of activity"
														values={["Activity", "Teacher"]}
														required={true}
													/>

													<FormSelect
														name="subjects"
														defaultValue="Subjects"
														label="Subjects"
														values={[
															"Subjects",
															"English",
															"Russian",
															"Math",
															"Physics",
														]}
														required={true}
													/>
													<FormSelect
														name="language_level"
														defaultValue="Levels"
														label="Language level"
														values={[
															"Levels",
															"Beginner",
															"Intermediate",
															"Advanced",
														]}
														required={true}
													/>

													<FormField
														type="number"
														label="Card number"
														name="card_number"
														placeholder="xxxx xxxx xxxx xxxx"
													/>
													<FormField
														type="text"
														label="Moto"
														name="moto"
														placeholder="something wise"
													/>
													<FormSelect
														name="active"
														defaultValue="Active"
														label="isActive"
														values={["Active", true, false]}
														required={true}
													/>

													<FormField
														type="zoom_link"
														label="Zoom link"
														name="zoom_link"
														placeholder="zoom for link"
														required={true}
													/>
													<FormSelect
														name="level_of_teaching"
														label="Level of teaching"
														defaultValue="Level of teaching"
														values={[
															"Level of teaching",
															"Beginner",
															"Intermediate",
															"Advanced",
														]}
														required={true}
														func={handleAddToSelected}
													/>
												</div>
											</div>

											<div className="w-full h-max flex flex-row justify-center items-center box-border">
												<Checkbox />
											</div>
											<button type="submit" onClick={handleReset}>Reset</button>
											<button type="submit">Submit</button>
										</div>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
	const cookie = context.req.cookies;

	if (cookie.role === undefined || cookie.role === "" || !cookie.role) {
		return {
			redirect: {
				destination: "/signin",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};
