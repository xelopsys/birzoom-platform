import React, { Fragment, useState } from "react";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";

export function FormField(props: any) {
	return (
		<div className="w-full h-max flex flex-col justify-center items-start text-left my-2">
			<label htmlFor={props.name} className="text-sm text-left">
				{props.label}
				{props?.required ? <span className="text-red-400">*</span> : null}
			</label>
			{props.required ? (
				<Field
					type={props.type}
					id={props.name}
					name={props.name}
					placeholder={props.placeholder}
					required
					className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
				/>
			) : (
				<Field
					id={props.id}
					name={props.name}
					placeholder={props.placeholder}
					className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
				/>
			)}
		</div>
	);
}

export function FormSelect(props: any) {
	return (
		<div className="w-full flex flex-col justify-center items-start text-left my-2">
			<label htmlFor={props.name}>
				{props.label}
				{props.required ? <span className="text-red-400">*</span> : null}
			</label>
			<Field
				name={props.name}
				as="select"
				// onChange={props.onChange}
				id={props.name}
				// component="select"
				initialvalue={props.defaultValue}
				className="w-full py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
			>
				{props.values.map((value: any, index: number) => (
					<option key={index} value={value} disabled={index === 0}>
						{value}
					</option>
				))}
			</Field>
		</div>
	);
}
