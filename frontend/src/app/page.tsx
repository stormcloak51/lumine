import { Card } from '@mantine/core'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative w-full max-w-lg">
          <div className="absolute -top-10 -left-4 w-72 h-72 bg-purple-300 rounded-full filter blur-xl mix-blend-multiply opacity-90 animate-blob"></div>
          <div className="absolute -top-10 -right-4 w-72 h-72 bg-yellow-300 rounded-full filter blur-xl mix-blend-multiply opacity-90 animate-blob animation-delay-2000"></div>
          <div className="absolute top-0 left-20 w-72 h-72 bg-pink-300 rounded-full filter blur-xl mix-blend-multiply opacity-90 animate-blob animation-delay-4000"></div>
          <Card className="backdrop-blur-md bg-[rgba(0,0,0,0.4)] rounded-xl">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold">Shrekogram</h1>
              <p className="text-2xl">
                The social network for{' '}
                <Link href="/feed" className="text-[#ffd37d]">
                  zoomers
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
      <Card className="absolute left-10 bottom-10 flex flex-col p-2 rounded-xl backdrop-blur-md bg-[rgba(0,0,0,0.1)] drop-shadow-2xl shadow-2xl">
        <h1>
          Frontend is made by:{' '}
          <Link
            href="https://github.com/stormcloak51"
            className="text-[#ffd37d]"
          >
            Галеев Григорий
          </Link>
        </h1>
        <h1>
          Backend is made by:{' '}
          <Link
            href="https://github.com/stormcloak51"
            className="text-[#ffd37d]"
          >
            Галеев Григорий
          </Link>
        </h1>
        <h1>
          Designed by:{' '}
          <Link
            href="https://github.com/stormcloak51"
            className="text-[#ffd37d]"
          >
            Галеев Григорий
          </Link>
        </h1>
        <h1>
          Developed Everything by:{' '}
          <Link
            href="https://github.com/stormcloak51"
            className="text-[#ffd37d]"
          >
            Галеев Григорий
          </Link>
        </h1>
      </Card>
    </div>
  )
}
