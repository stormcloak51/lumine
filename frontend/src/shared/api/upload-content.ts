import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/firebase';

export const uploadContent = async (file: File, path: string, username: string) => {
	try {
		const accountRef = ref(storage, path);
		await uploadBytes(accountRef, file).catch((err) => {
			console.log(err)
			return username
		})
		const url = await getDownloadURL(accountRef)
		return url
	} catch (err) {
		console.log(err)
		return username
	}
}