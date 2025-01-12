'use client'

import { FileButton, Flex, Indicator } from '@mantine/core'
import { Camera, LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'

import { useMediaContent } from '../model/useMediaContent'
import { MediaContentItem } from './media-content-item'

interface props {
  isFocused: boolean
}

export const MediaContent = ({ isFocused }: props) => {
  const {
    handleChange,
    handleDelete,
    media,
    previews,
    setPreviews,
    isLoading,
  } = useMediaContent()

  useEffect(() => {
    if (media) {
      setPreviews(media)
    }
  }, [setPreviews, media])

  return (
    <>
      {previews && (
        <Flex
          align={'center'}
          gap={16}
          className={`cursor-default overflow-x-auto scrollbar max-w-[190px] flex-nowrap ${
            isFocused ? 'flex' : 'hidden'
          }`}
        >
          {previews.map((item, index) => {
            if (!item) return null
            return (
              <MediaContentItem
                onDelete={handleDelete}
                file={item}
                key={index}
              />
            )
          })}
        </Flex>
      )}
      <FileButton
        accept="image/* video/*"
        onChange={handleChange}
        multiple
        disabled={isLoading || media?.length == 5}
      >
        {(props) => (
          <Indicator
            color="#ffbb38"
            size={16}
            label={
              isLoading ? (
                <LoaderCircle size={12} className="animate-spin" />
              ) : (
                media?.length
              )
            }
          >
            <Camera
              {...props}
              className={'text-[rgb(66,66,66)] cursor-pointer'}
            />
          </Indicator>
        )}
      </FileButton>
    </>
  )
}
