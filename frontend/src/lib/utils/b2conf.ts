import B2 from 'backblaze-b2';
const b2 = new B2({
	applicationKeyId: process.env.NEXT_PUBLIC_B2_APPLICATION_KEY_ID!,
	applicationKey: process.env.NEXT_PUBLIC_B2_APPLICATION_KEY!,
})


export default b2