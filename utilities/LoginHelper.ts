import { API, loadConstacts } from './Constants';
import jwt_decode from 'jwt-decode';
import { storeAsyncStorageData } from './LocalStorage';

export class LoginHelper {
	public async VerifyLogin(email: string, password: string) {
		try {
			const response = await fetch(`${API.BASE_URL}/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'api-key': API.API_KEY,
				},
				body: JSON.stringify({ email, password }),
			});

			const token = await response.json();
			console.log(token);
			const { error } = token;

			if (error) {
				console.log(error);
				return null;
			}
			const decoded = jwt_decode(token);
			await storeAsyncStorageData(
				'USER',
				JSON.stringify({ id: decoded.id, token })
			);
			await loadConstacts();
			return token;
		} catch (err: any) {
			console.log(err);
			return null;
		}
	}

	public async SignUpUser(username: string, email: string, password: string) {
		try {
			const response = await fetch(`${API.BASE_URL}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'api-key': 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
				},
				body: JSON.stringify({ username, email, password }),
			});
			const user = await response.json();
			const { error } = user;

			if (error) {
				console.log(error);
				return null;
			}
			console.log(user);
			return user;
		} catch (err: any) {
			console.log(err);
			return null;
		}
	}
}
