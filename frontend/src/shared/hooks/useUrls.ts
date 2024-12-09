


export const useUrls = () => {

	const createUrls = (files: File[]) => {
		return files.map(file => URL.createObjectURL(file))
	}

	const revokeUrls = (files: string[]) => {
		return files.map(file => URL.revokeObjectURL(file))
	}

	return {
		createUrls,
		revokeUrls,
	}

}