import React from "react";
import { GetServerSideProps } from "next";

export default function Create() {
	return <div>create</div>;
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
