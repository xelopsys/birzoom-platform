import React from "react";
import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";

export function Checkbox() {
	const { locale } = useRouter();

	const interests = [
		{
			index: 0,
			id: "books",
			name: locale == "en" ? "books" : "kitoblar",
			checked: false,
			type: "checkbox",
			value: "books",
			htmlFor: "books",
			img: "/basketball.svg",
		},
		{
			index: 1,
			id: "travel",
			name: locale == "en" ? "travel" : "sayohat",
			checked: false,
			type: "checkbox",
			value: "travel",
			htmlFor: "travel",
			img: "/basketball.svg",
		},
		{
			index: 2,
			id: "technology",
			name: locale == "en" ? "technology" : "texnologiya",
			checked: false,
			type: "checkbox",
			value: "technology",
			htmlFor: "technology",
			img: "/basketball.svg",
		},
		{
			index: 3,
			id: "movies",
			name: locale == "en" ? "movies" : "filmlar",
			checked: false,
			type: "checkbox",
			value: "movies",
			htmlFor: "movies",
			img: "/basketball.svg",
		},
		{
			index: 4,
			id: "cartoons",
			name: locale == "en" ? "cartoons" : "multfilmlar",
			checked: false,
			type: "checkbox",
			value: "cartoons",
			htmlFor: "cartoons",
			img: "/basketball.svg",
		},
		{
			index: 5,
			id: "finance",
			name: locale == "en" ? "finance" : "iqtisod",
			checked: false,
			type: "checkbox",
			value: "finance",
			htmlFor: "finance",
			img: "/basketball.svg",
		},
	];

	return (
		<div className="w-full h-full flex flex-row justify-center items-center box-border">
			<div className="flex flex-row  content-center w-full md:grid-cols-3 box-border">
				<div
					className="flex flex-wrap justify-center items-center w-full h-fit gap-3 flex-row box-border"
					// role="group"
					aria-labelledby="checkbox-group"
				>
					{interests.map((interest: any, index: number) => {
						return (
							<div className="inline" key={index}>
								<Field
									type="checkbox"
									id={interest.id}
									name="interests"
									value={interest.value}
									className="hidden peer"
								/>
								<label
									htmlFor={interest.htmlFor}
									className="flex flex-row justify-center items-center p-4  w-24 h-20 text-gray-500 bg-white rounded-md border border-gray-200 peer-checked:border-0 cursor-pointer peer-checked:bg-[#0088ff29] hover:text-gray-600 peer-checked:text-primary hover:bg-gray-50 "
								>
									<div className="flex flex-col w-full h-full justify-center items-center box-border">
										<div className="w-full text-lg font-semibold flex flex-col justify-center items-center mt-2">
											<img src="/basketball.svg" className="w-10" alt="one" />
										</div>
										<div className="w-full text-md text-inherit flex flex-col justify-center items-center">
											{interest.name}
										</div>
									</div>
								</label>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
