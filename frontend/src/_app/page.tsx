import Link from 'next/link'


export function Home() {

	return (
		<div className='flex flex-col items-center justify-center'>
			<h1 className='text-3xl font-bold'>Lumine</h1>
			<p className='text-2xl'>The social network for <Link href='/feed' className='text-[#ffd37d]'>zoomers</Link></p>
		</div>
	)
}