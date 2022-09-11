interface IUser {
	id: string;
	name: string;
	email: string;
	role: string;
	photo: string;
	expires: unknown;
}

export function GetCookie(name: string | undefined) {
	if (name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop()!.split(";").shift();
	}
}

export function SetCookie({ name, email, id, role, photo, expires }: IUser) {
	const cookie = [
		["name", name],
		["email", email],
		["id", id],
		["role", role],
		["photo", photo],
		["expires", expires],
	];
	if (!GetCookie("role")) {
		cookie.map(([key, value]: any, index) => {
			if (value || key) {
				document.cookie = `${key}=${value};`;
			}
		});
	}
}

export function SessionStorage({ name, email, id, role, photo }: IUser | any) {
	const cookie = [
		["name", name],
		["email", email],
		["id", id],
		["role", role],
		["photo", photo],
	];

	cookie.map(([key, value]: any, index) => {
		if (value || key) {
			sessionStorage.setItem(key, value);
		}
	});
}

export function GetSessionStorage(name: any) {
	if (name) {
		return sessionStorage.getItem(`${name}`);
	}
}

export function GetLocalStorage(name: string) {
	return localStorage.getItem(name);
}

export function DeleteAllCookie() {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		const eqPos = cookie.indexOf("=");
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	}
}

export function RemoveAllSessionStorage() {
	sessionStorage.clear();
}
