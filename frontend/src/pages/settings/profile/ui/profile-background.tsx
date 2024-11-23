import {
  Button,
  Modal,
  Text,
  Image as MantineImage,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Camera, Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { ImageEditor } from './image-editor'

export const ProfileBackground = ({ imageUrl }: { imageUrl: string }) => {
  const [isBackgroundHovered, setIsBackgroundHovered] = useState(false)
  const [
    isBackgroundModalOpened,
    { open: openBackgroundModal, close: closeBackgroundModal },
  ] = useDisclosure(false)

  const [file, setFile] = useState<File | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const handleCancel = () => {
    closeBackgroundModal()
    setTimeout(() => {
      setFile(null)
      setCroppedImage(null)
    }, 200)
  }

  return (
    <>
      <div
        className="w-full h-[200px] overflow-hidden relative group"
        onMouseEnter={() => setIsBackgroundHovered(true)}
        onMouseLeave={() => setIsBackgroundHovered(false)}
      >
        <Image
          src={croppedImage || imageUrl}
          alt="profile background"
          className="w-full h-full object-cover object-center transition-opacity duration-200"
          width={1920}
          height={1080}
          quality={100}
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
      <Modal
        opened={isBackgroundModalOpened}
        onClose={closeBackgroundModal}
        title="Change Cover"
        centered
        radius={'lg'}
        size={'70%'}
        transitionProps={{ transition: 'rotate-left' }}
      >
        {!file ? (
          <Dropzone
            onDrop={(files) => setFile(files[0])}
            onReject={(files) =>
              notifications.show({
                title: 'File Rejected',
                message: files[0].errors[0].message,
                color: 'red',
              })
            }
            maxSize={25 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            className="p-6 border-2 border-dashed border-gray-300 hover:border-[#ffd37d] transition-colors duration-300 group cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Upload
                size={48}
                className="text-gray-400 group-hover:text-[#ffd37d] transition-colors duration-300"
              />
              <div>
                <Text size="lg" inline>
                  Drag image here or click to select
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  File should not exceed 25MB
                </Text>
              </div>
            </div>
          </Dropzone>
        ) : (
          <ImageEditor
            isOpen={isBackgroundModalOpened}
            img={URL.createObjectURL(file)}
            close={closeBackgroundModal}
            handleCancel={handleCancel}
          />
        )}
      </Modal>
    </>
  )
}
