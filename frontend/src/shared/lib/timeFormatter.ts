export function timeAgo(date: string): string {
	const now = new Date();
	const postDate = new Date(date);
	const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

	const formatTime = (date: Date) => {
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	};

	let interval = Math.floor(seconds / 31536000);
	if (interval >= 1) return `${interval}yr ago at ${formatTime(postDate)}`;

	interval = Math.floor(seconds / 2592000);
	if (interval >= 1) return `${interval}mo ago at ${formatTime(postDate)}`;

	interval = Math.floor(seconds / 86400);
	if (interval === 1) return `yesterday at ${formatTime(postDate)}`;
	if (interval >= 1) return `${interval}d ago at ${formatTime(postDate)}`;

	interval = Math.floor(seconds / 3600);
	if (interval >= 3) return `${interval}hr ago at ${formatTime(postDate)}`;

	if (interval >= 1) return `${interval}hr ago`;

	interval = Math.floor(seconds / 60);
	if (interval >= 1) return `${interval}min ago`;

	return 'just now';
}
