import {IBM_Plex_Mono} from 'next/font/google'
import localFont from 'next/font/local'

export const IBMPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '400',
})

export const geistSans = localFont({
	src: './GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
export const geistMono = localFont({
	src: './GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const helvetica_extrabold = localFont({
  src: './Helvetica_bold.otf',
  variable: '--font-helvetica-bold',
  weight: '100 900',
})

export const helvetica_regular = localFont({
  src: './Helvetica_regular.otf',
  variable: '--font-helvetica-regular',
  weight: '100 900',
})

export const helvetica_bold = localFont({
  src: './helvetica_boldoblique.otf',
  variable: '--font-helvetica-regular',
  weight: '100 900',
})