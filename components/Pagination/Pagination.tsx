import React, { useState } from "react";

export default function Pagination({
	setCurrentPage,
	userLength,
}: {
	setCurrentPage: any;
	userLength: number;
}) {
	const [active, setActive] = useState<number>(0);

	const handleChangePage = (i: number) => {
		setCurrentPage(Number(i + 1));
		setActive(i);
	};
	return (
		<nav aria-label="Page navigation example">
			<ul className="inline-flex items-center -space-x-px">
				{[...Array(Math.ceil(userLength / 5))].map((_, i) => (
					<li key={i}>
						<button
							aria-current="page"
							onClick={() => handleChangePage(i)}
							className={`z-10 py-2 px-3 leading-tight ${
								active == i
									? "text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
									: "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
							} rounded-md mx-2`}
						>
							{i + 1}
						</button>
					</li>
				))}

				{/* <li>
					<a
						href="#"
						className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						1
					</a>
				</li>
				<li>
					<a
						href="#"
						className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						2
					</a>
				</li>
				<li>
					<a
						href="#"
						aria-current="page"
						className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
					>
						3
					</a>
				</li>
				<li>
					<a
						href="#"
						className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						4
					</a>
				</li>
				<li>
					<a
						href="#"
						className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
					>
						5
					</a>
				</li>
				<li>
					<a
						href="#"
						className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
					>
						<span className="sr-only">Next</span>
						<svg
							aria-hidden="true"
							className="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
					</a>
				</li> */}
			</ul>
		</nav>
	);
}
