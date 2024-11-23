import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../config/firebase';

export const uploadContent = async (file: File | Blob, path: string, username: string) => {
	try {
		const contentRef = ref(storage, path);
		await uploadBytes(contentRef, file).catch((err) => {
			console.log(err)
			return username
		})
		const url = await getDownloadURL(contentRef)
		return url
	} catch (err) {
		console.log(err)
		return username
	}
}