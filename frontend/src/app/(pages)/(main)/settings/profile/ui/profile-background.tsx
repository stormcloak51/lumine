import {
  Button,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { ProfileModal } from './profile-modal'

export const ProfileBackground = ({ imageUrl }: { imageUrl: string }) => {
  const [isBackgroundHovered, setIsBackgroundHovered] = useState(false)
  const [
    isBackgroundModalOpened,
    { open: openBackgroundModal, close: closeBackgroundModal },
  ] = useDisclosure(false)

  const [file, setFile] = useState<File | null>(null)

  if (!imageUrl) return null

  return (
    <>
      <div
        className="w-full h-[200px] overflow-hidden relative group"
        onMouseEnter={() => setIsBackgroundHovered(true)}
        onMouseLeave={() => setIsBackgroundHovered(false)}
      >
        <Image
          src={imageUrl}
          alt="profile background"
          className="w-full h-full object-cover object-center transition-opacity duration-200"
          fill
          quality={100}
          priority
          sizes='(max-width: 768px) 100vw, 640px'
        />
        <div
          className={`absolute top-4 right-4 transition-opacity duration-200 ${
            isBackgroundHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            leftSection={<Camera size={16} />}
            className="bg-black/50 hover:bg-black/70 text-white rounded-lg"
            onClick={openBackgroundModal}
          >
            Change Cover
          </Button>
        </div>
      </div>

      {/* Modal */}
      <ProfileModal type='background' isOpened={isBackgroundModalOpened} close={closeBackgroundModal} file={file} setFile={setFile} />
    </>
  )
}
