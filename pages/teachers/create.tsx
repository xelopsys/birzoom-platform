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
import { Information } from "../../components/Information/Information";
import { Edit } from "../../components/Edit/Edit";
import { Creater } from "../../components/Create/Create";

export default function Create() {
	const router = useRouter();
	const { locale, asPath } = router;

	const [showInfo, setShowInfo] = useState<boolean>(false);
	const [showEdit, setShowEdit] = useState<boolean>(false);
	const [id, setId] = useState<string>("");
	return (
		<div className="w-[100vw] h-[100vh]">
			<div className="w-full h-full flex flex-row ">
				<Sidebar />
				<div className="w-full h-full flex flex-col justify-start items-center">
					<div className="w-full">
						<Navbar />
					</div>
					<div className="w-full h-full bg-gray-100 overflow-y-hidden scrollbar-hide pb-6">
						<p className="w-max h-max border-b-2 pb-3 ml-8 mt-4 border-blue-600">
							{showInfo
								? locale == "en"
									? "Edit"
									: "Tahrirlash"
								: locale == "en"
								? "Create"
								: "Yaratish"}
						</p>
						{showInfo == false ? (
							<Creater setShow={setShowInfo} setDocId={setId} />
						) : (
							<Fragment>
								{showEdit ? (
									<Edit docId={id} />
								) : (
									<Information docId={id} setShowEdit={setShowEdit} />
								)}
							</Fragment>
						)}
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
				destination: "/teachers",
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};
