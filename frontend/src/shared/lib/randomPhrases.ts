


export function randomCommentPhrases(): string {

	const prompts = [
		"Leave your thoughts here",
    "Write your mind",
    "Share what you think",
    "Join the conversation",
    "Drop your take",
    "What's your opinion?",
    "Tell us what you think",
    "Share your perspective",
    "Sound off in the comments",
    "Let's hear your thoughts"
	]

	return prompts[Math.floor(Math.random() * prompts.length)]
}

export function randomPostPhrases(): string {
	const prompts = [
		"What's news bro?",
    "What's on your mind?",
    "How's your day going?",
    "Share your moment",
    "What's happening?",
    "Update your friends",
    "What's up?",
    "Share your story",
    "What's new with you?",
    "Tell us about your day"
	]

	return prompts[Math.floor(Math.random() * prompts.length)]
}