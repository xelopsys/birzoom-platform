import React from "react";
import { Formik, Field, Form } from "formik";

export function Checkbox() {
	const interests = [
		{
			index: 0,
			id: "kitoblar",
			name: "Kitoblar",
			checked: false,
			type: "checkbox",
			value: "kitoblar",
			htmlFor: "kitoblar",
			img: "/basketball.svg",
		},
		{
			index: 1,
			id: "sayohat",
			name: "Sayohat",
			checked: false,
			type: "checkbox",
			value: "sayohat",
			htmlFor: "sayohat",
			img: "/basketball.svg",
		},
		{
			index: 2,
			id: "texnologiya",
			name: "Texnologiya",
			checked: false,
			type: "checkbox",
			value: "texnologiya",
			htmlFor: "texnologiya",
			img: "/basketball.svg",
		},
		{
			index: 3,
			id: "filmlar",
			name: "Filmlar",
			checked: false,
			type: "checkbox",
			value: "filmlar",
			htmlFor: "filmlar",
			img: "/basketball.svg",
		},
		{
			index: 4,
			id: "multfilmlar",
			name: "Multfilmlar",
			checked: false,
			type: "checkbox",
			value: "multfilmlar",
			htmlFor: "multfilmlar",
			img: "/basketball.svg",
		},
		{
			index: 5,
			id: "iqtisod",
			name: "Iqtisod",
			checked: false,
			type: "checkbox",
			value: "iqtisod",
			htmlFor: "iqtisod",
			img: "/basketball.svg",
		},
	];

	return (
		<div className="w-full h-full flex flex-row justify-center items-center">
			<div className="flex flex-row content-center w-full md:grid-cols-3">
				<div
					className="flex w-full h-fit gap-x-3 flex-row justify-evenly items-center"
					role="group"
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
