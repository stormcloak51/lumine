import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from '../utils/firebase';

export const uploadAvatar = async (file: File, username: string) => {
	try {
		const accountRef = ref(storage, 'accounts/' + username + '/' + 'avatar.' + file.type.split('/')[1]);
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
	if (!file) return username
}