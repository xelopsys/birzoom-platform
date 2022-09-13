import React, { useState, useEffect, useRef, Fragment } from "react";
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
import { MyFormValues, Additional } from "../../components/data/Additional";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { setDoc, doc } from "firebase/firestore";
import { storage, db } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Create() {
	const router = useRouter();
	const { fields } = Additional();
	const { locale, asPath } = router;
	const fileRef = useRef<any>();
	const [perc, setPerc] = useState<number>();
	const [select, setSelect] = useState<any>();
	const [text, setText] = useState<string>("");
	const [uploadMessage, setUploadMessage] = useState<string>("");
	const [cancel, setCancel] = useState<unknown>();

	const optionsValue = [
		{
			id: 0,
			value: "Levels",
			label: "Levels",
			isDisabled: true,
		},
		{
			id: 1,
			value: "Beginner",
			label: "Beginner",
		},
		{
			id: 2,
			value: "Intermediate",
			label: "Intermediate",
		},
		{
			id: 3,
			value: "Avanced",
			label: "Advanced",
		},
	];

	const initialValues: MyFormValues = {
		id: new Date().getTime(),
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
		active: false || "",
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
					<div className="w-full h-full bg-gray-100 overflow-y-hidden">
						<Formik
							initialValues={initialValues}
							onSubmit={(values, actions) => {
								actions.setSubmitting(false);
								const name = new Date().getTime() + values.photo.name;
								const hashedPassword = bcrypt
									.hashSync(values.password, 10)
									.toString();
								const storageRef = ref(storage, name);
								const uploadTask = uploadBytesResumable(
									storageRef,
									values.photo
								);

								try {
									uploadTask.on(
										"state_changed",
										(snapshot) => {
											const progress =
												(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
											setPerc(progress);
											switch (snapshot.state) {
												case "paused":
													setUploadMessage(
														locale == "en"
															? "Upload is paused"
															: "Yuklanish to`xtatildi"
													);
													break;
												case "running":
													setUploadMessage(
														locale == "en" ? "Uploading" : "Yuklanyapti"
													);
													break;
												default:
													break;
											}
										},
										(error) => {
											// Handle unsuccessful uploads
											console.log(error);
										},
										() => {
											getDownloadURL(uploadTask.snapshot.ref).then(
												async (downloadURL) => {
													console.log("File available at", downloadURL);
													values.photo = downloadURL;
													const id = new Date().getTime().toString();
													await setDoc(doc(db, "mockdata", id), {
														id: new Date().getTime(),
														locale: locale,
														name: values.name,
														surname: values.surname,
														gender: values.gender,
														region: values.region,
														number: values.number,
														birthday: values.birthday,
														tg_username: values.tg_username,
														type_of_activity: values.type_of_activity,
														subjects: values.subjects,
														language_level: values.language_level,
														card_number: values.card_number,
														moto: values.moto,
														active: values.active,
														zoom_link: values.zoom_link,
														interests: values.interests,
														photo: values.photo,
														createdAt: new Date(Date.now()),
														level_of_teaching: values.level_of_teaching,
														password: hashedPassword,
													});
												}
											);
										}
									);

									router.replace("/teachers/info");
								} catch (err) {
									console.log(err);
								}
							}}
						>
							{({
								errors,
								values,
								setFieldValue,
								handleReset,
								handleChange,
							}) => {
								return (
									<Form className="w-full h-full flex flex-row overflow-scroll scrollbar-hide box-border flex-wrap justify-evenly items-start py-8">
										<div className="w-[270px] h-[318px] bg-white flex flex-col justify-evenly p-2 items-center border rounded-md mb-4">
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
										<div className="w-2/3 h-auto bg-white flex flex-col overflow-visible box-border justify-center items-center border">
											<div className="w-full h-full scrollbar-hide box-border flex flex-row justify-evenly items-center  py-6">
												<div className="w-[40%] h-full flex flex-col justify-center items-center gap-x-3">
													{fields.first.map((field: any, index: number) => {
														return (
															<Fragment key={index}>
																{field.spec == "field" ? (
																	<FormField
																		type={field.type}
																		name={field.name}
																		label={field.label}
																		placeholder={field.placeholder}
																		required={field.required}
																	/>
																) : (
																	<div className="w-full flex flex-col justify-center items-start text-left my-2">
																		<label htmlFor={field.name}>
																			{field.label}
																			{field.required ? (
																				<span className="text-red-400">*</span>
																			) : null}
																		</label>
																		<select
																			name={field.name}
																			onChange={handleChange}
																			id={field.name}
																			required={field.required}
																			defaultValue={field.defaultValue}
																			className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
																		>
																			{field.values.map(
																				(value: any, index: number) => (
																					<option
																						key={index}
																						value={value}
																						disabled={index === 0}
																					>
																						{value}
																					</option>
																				)
																			)}
																		</select>
																	</div>
																)}
															</Fragment>
														);
													})}
												</div>
												<div className="w-[40%] h-full flex flex-col justify-center items-center gap-x-3">
													{fields.second.map((field: any, index: number) => {
														return (
															<Fragment key={index}>
																{field.spec == "field" ? (
																	<FormField
																		type={field.type}
																		name={field.name}
																		label={field.label}
																		placeholder={field.placeholder}
																		// required={field.required}
																	/>
																) : (
																	<div className="w-full flex flex-col justify-center items-start text-left my-2">
																		<label htmlFor={field.name}>
																			{field.label}
																			{field.required ? (
																				<span className="text-red-400">*</span>
																			) : null}
																		</label>
																		<select
																			name={field.name}
																			onChange={handleChange}
																			id={field.name}
																			// required={field.required}
																			// component="select"
																			defaultValue={field.defaultValue}
																			className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
																		>
																			{field.values.map(
																				(value: any, index: number) => (
																					<option
																						key={index}
																						value={value.value}
																						disabled={index === 0}
																					>
																						{value.label}
																					</option>
																				)
																			)}
																		</select>
																	</div>
																)}
															</Fragment>
														);
													})}
													<label className="w-full text-sm text-left">
														Level of teaching
														<span className="text-red-400">*</span>
													</label>
													<Select
														name="level_of_teaching"
														instanceId="level"
														options={optionsValue}
														isMulti={true}
														onChange={(change) =>
															setFieldValue("level_of_teaching", [
																...change.map((item: any) => item.value),
															])
														}
														className="w-full"
													/>
												</div>
											</div>

											<div className="w-full h-max flex flex-row justify-center items-center box-border my-3">
												<Checkbox />
											</div>
											{perc === 0 || perc === 100 ? (
												<span className="text-sm mt-3 mb-4 text-center w-full">
													{uploadMessage}
													{"  "}
													{perc}%
												</span>
											) : (
												<div className="w-full my-4 mb-6 flex flex-row justify-center items-center gap-x-8">
													<button
														type="submit"
														className="py-2 px-8 text-md border rounded-md"
														onClick={handleReset}
													>
														{locale == "en" ? "Reset" : "Bekor qilish"}
													</button>

													<button
														type="submit"
														className="py-2 px-8 text-md bg-primary text-white border rounded-md disabled"
													>
														{locale == "en" ? "Submit" : "Tasdiqlash"}
													</button>
												</div>
											)}
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

	if (
		cookie.role === undefined ||
		cookie.role === "" ||
		!cookie.role ||
		cookie.role !== "admin"
	) {
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
