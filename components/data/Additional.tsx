import React, { useState } from "react";
import { useRouter } from "next/router";

export function Additional() {
	const [selected, setSelected] = useState<string[] | any[]>([]);
	const handleAddToSelected = (e: any) => {
		setSelected((prev: any) =>
			prev.includes(e.target.value) ? prev : [...prev, e.target.value]
		);
	};
	const { locale } = useRouter();

	const fields = {
		first: [
			{
				spec: "field",
				type: "text",
				name: "name",
				label: locale == "en" ? "Name" : "Ism",
				placeholder: locale == "en" ? "Name" : "Ism",
				required: true,
			},
			{
				spec: "field",
				type: "text",
				name: "surname",
				label: locale == "en" ? "Surname" : "Familiya",
				placeholder: locale == "en" ? "Surname" : "Familiya",
				required: true,
			},
			{
				spec: "select",
				name: "gender",
				defaultValue: locale == "en" ? "Gender" : "Jinsi",
				label: locale == "en" ? "Gender" : "Jinsi",
				required: true,
				values:
					locale == "en"
						? [
								{
									value: "Gender",
									label: "Gender",
								},
								{
									value: "Male",
									label: "Male",
								},
								{
									value: "Female",
									label: "Female",
								},
						  ]
						: [
								{
									value: "Gender",
									label: "Jinsi",
								},
								{
									value: "Male",
									label: "Erkak",
								},
								{
									value: "Female",
									label: "Ayol",
								},
						  ],
				// values: ["Gender", "Male", "Female"],
			},
			{
				spec: "field",
				type: "text",
				name: "region",
				label: locale == "en" ? "Region" : "Hudud",
				required: true,
				placeholder: "Region",
			},
			{
				spec: "field",
				type: "number",
				name: "number",
				label: locale == "en" ? "Phone number +998" : "Telefon raqami +998",
				required: true,
				placeholder: "phone number",
			},
			{
				spec: "field",
				name: "password",
				type: "password",
				placeholder: "password",
				label: locale == "en" ? "Password" : "Parol",
				required: true,
			},
			{
				spec: "field",
				name: "birthday",
				label: locale == "en" ? "Birthday" : "Tug'ilgan kun",
				type: "date",
				placeholder: "birthday",
				required: true,
			},
			{
				spec: "field",
				name: "tg_username",
				label: "Telegram username",
				type: "text",
				placeholder: "username",
			},
		],
		second: [
			{
				spec: "select",
				name: "type_of_activity",
				defaultValue: locale == "en" ? "Activity" : "Faoliyat turi",
				label: locale == "en" ? "Type of activity" : "Faoliyat turi",
				values:
					locale == "en"
						? [
								{
									value: "Activity",
									label: "Activity",
								},
								{
									value: "Teacher",
									label: "Teacher",
								},
						  ]
						: [
								{
									value: "Activity",
									label: "Faoliyat turi",
								},
								{
									value: "Teacher",
									label: "O'qituvchi",
								},
						  ],
				// values: ["Activity", "Teacher"],
				required: true,
			},
			{
				spec: "select",
				name: "subjects",
				defaultValue: locale == "en" ? "Subjects" : "Fanlar",
				label: locale == "en" ? "Subjects" : "Fanlar",
				values:
					locale == "en"
						? [
								{
									value: "Subjects",
									label: "Subjects",
								},
								{
									value: "English",
									label: "English",
								},
								{
									value: "Russia",
									label: "Russia",
								},
								{
									value: "Math",
									label: "Math",
								},
								{
									value: "Physics",
									label: "Physics",
								},
						  ]
						: [
								{
									value: "Subjects",
									label: "Fanlar",
								},
								{
									value: "English",
									label: "Ingliz tili",
								},
								{
									value: "Russia",
									label: "Rus tili",
								},
								{
									value: "Math",
									label: "Matematika",
								},
								{
									value: "Physics",
									label: "Fizika",
								},
						  ],
				// values: ["Subjects", "English", "Russian", "Math", "Physics"],
				required: true,
			},
			{
				spec: "select",
				name: "language_level",
				defaultValue: locale == "en" ? "Levels" : "Til darajasi",
				label: locale == "en" ? "Language level" : "Til darajasi",
				values:
					locale == "en"
						? [
								{
									value: "Levels",
									label: "Levels",
								},
								{
									value: "Beginner",
									label: "Beginner",
								},
								{
									value: "Intermediate",
									label: "Intermediate",
								},
								{
									value: "Advanced",
									label: "Advanced",
								},
						  ]
						: [
								{
									value: "Levels",
									label: "Til darajasi",
								},
								{
									value: "Beginner",
									label: "Beginner",
								},
								{
									value: "Intermediate",
									label: "Intermediate",
								},
								{
									value: "Advanced",
									label: "Advanced",
								},
						  ],
				// values: ["Levels", "Beginner", "Intermediate", "Advanced"],
				required: true,
			},
			{
				spec: "field",
				type: "number",
				label: locale == "en" ? "Card number" : "Karta raqami",
				name: "card_number",
				placeholder: "xxxx xxxx xxxx xxxx",
			},
			{
				spec: "field",
				type: "text",
				label: locale == "en" ? "Moto" : "Shiori",
				name: "moto",
				placeholder: "something wise",
			},
			{
				spec: "select",
				name: "active",
				defaultValue: locale == "en" ? "Active" : "Faolligi",
				label: locale == "en" ? "isActive" : "Faol",
				values:
					locale == "en"
						? [
								{
									value: "Active",
									label: "Active",
								},
								{
									value: "active",
									label: "active",
								},
								{
									value: "noactive",
									label: "noactive",
								},
						  ]
						: [
								{
									value: "Active",
									label: "Faolligi",
								},
								{
									value: "active",
									label: "faol",
								},
								{
									value: "noactive",
									label: "nofaol",
								},
						  ],
				// values: ["Active", "active", "noactive"],
				required: true,
			},
			{
				spec: "field",
				type: "zoom_link",
				label: locale == "en" ? "Zoom link" : "Zoom havolasi",
				name: "zoom_link",
				placeholder: "zoom for link",
				required: true,
			},
		],
	};

	return { fields };
}

export interface MyFormValues {
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
	active?: boolean | string;
	zoom_link: string;
	level_of_teaching: string[];
	interests: string[];
	photo: any;
	createdAt: Date;
	updatedAt?: Date;
}
