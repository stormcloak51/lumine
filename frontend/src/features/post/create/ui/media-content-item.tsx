'use client'

import { IAsset } from '@/shared/config/types/general.types'
import { PreviewMedia } from '@/shared/ui/PreviewMedia'
import { CloseButton, Image } from '@mantine/core'
import { X } from 'lucide-react'
import { useState } from 'react'

interface props {
  file: IAsset
  onDelete: (file: IAsset) => void
}

export const MediaContentItem = ({ onDelete, file }: props) => {
  const [isOpenedModal, setOpenedModal] = useState(false)
  return (
    <div style={{ minWidth: '75px', maxWidth: '100' }}>
      <div className="w-full h-full border border-white rounded-md cursor-pointer relative mt-3">
        <Image
          width="100%"
          height="auto"
          src={file.url}
          alt="media"
          radius={'md'}
          onClick={() => setOpenedModal(true)}
          style={{ maxHeight: '50px', objectFit: 'contain' }}
        />
        <span
          onClick={() => {
            if (!file.key) return
            onDelete(file)
          }}
          className="absolute top-0 right-0 transform -translate-y-2/4 translate-x-2/4 cursor-pointer z-10"
        >
          <CloseButton
            icon={<X size={20} color="#ff4e4e" />}
            size={22}
            radius={'xl'}
            className="bg-[#2b2d31] transition-all hover:bg-[#35373c]"
          />
        </span>
      </div>
      <PreviewMedia
        isOpened={isOpenedModal}
        setIsOpened={setOpenedModal}
        src={file.url}
        type="image"
      />
    </div>
  )
}
