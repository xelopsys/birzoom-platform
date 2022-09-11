import Link from "next/link";
import { useRouter } from "next/router";

function Locale() {
	const { locale, locales, asPath } = useRouter();
	console.log("locale", locale);
	console.log("locales", locales);
	console.log("asPath", asPath);
	return (
		<div>
			<main>
				<div>
					{locales?.map((l, i) => {
						return (
							<span key={i} className={l === locale ? `text-red-300` : ""}>
								<Link href={asPath} locale={l}>
									{l}
								</Link>
							</span>
						);
					})}
				</div>
				<div>
					<h1>My Multi-Language Blog</h1>
					<div></div>
				</div>
			</main>
		</div>
	);
}
export default Locale;
