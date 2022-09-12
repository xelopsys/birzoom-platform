import React, { Fragment, useState } from "react";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";

export function FormField(props: any) {
	return (
		<div className="w-full h-max flex flex-col justify-center items-start text-left">
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
					className="w-full py-1 px-2 border border-gray-300"
				/>
			) : (
				<Field
					id={props.id}
					name={props.name}
					placeholder={props.placeholder}
				/>
			)}
		</div>
	);
}

export function FormSelect(props: any) {
	return (
		<Fragment>
			<label htmlFor={props.name}>
				{props.label}
				{props.required ? <span className="text-red-400">*</span> : null}
			</label>
			<select
				name={props.name}
				id={props.name}
				onChange={props.func}
				defaultValue={props.defaultValue}
			>
				{props.values.map((value: any, index: number) => (
					<option key={value} value={value} disabled={index === 0}>
						{value}
					</option>
				))}
			</select>
		</Fragment>
	);
}
