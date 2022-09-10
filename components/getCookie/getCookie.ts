interface IUser {
	id: string;
	name: string;
	email: string;
	role: string;
	photo: string;
}

export function SetCookie({ name, email, id, role, photo }: IUser) {
	const cookie = [
		["name", name],
		["emai", email],
		["id", id],
		["role", role],
		["photo", photo],
	];

	cookie.map(([key, value]: any, index) => {
		if (value || key) {
			document.cookie = `${key}=${value}; expires=${new Date(
				Date.now() + 60 * 60 * 1000 * 24 * 365 * 10
			).toUTCString()};`;
		}
	});
}

export function GetCookie(name: string | undefined) {
	if (name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop()!.split(";").shift();
	}
}

export function SessionStorage({ name, email, id, role, photo }: IUser | any) {
	const cookie = [
		["name", name],
		["emai", email],
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

export function GetSessionStorage(name: string) {
	return sessionStorage.getItem(name);
}
