export function timeAgo(date: string): string {
	const now = new Date()
	const postDate = new Date(date)
	const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

	let interval = Math.floor(seconds / 31536000) // Год
	if (interval >= 1) return `${interval}yr ago`

	interval = Math.floor(seconds / 2592000) // Месяц
	if (interval >= 1) return `${interval}mo ago`

	interval = Math.floor(seconds / 86400) // День
	if (interval >= 1) return `${interval}d ago`

	interval = Math.floor(seconds / 3600) // Час
	if (interval >= 1) return `${interval}hr ago`

	interval = Math.floor(seconds / 60) // Минуты
	if (interval >= 1) return `${interval}min ago`

	return 'just now' // Если меньше минуты
}
