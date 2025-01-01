import { Button } from '@mantine/core'
import { ChevronRight, LucideProps } from 'lucide-react'
import Link from 'next/link'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IconType } from 'react-icons/lib'

interface props {
  Icon:
    | ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
      >
    | IconType
  c: string
  title: string
  isActive: boolean
  setActive: () => void
}

export const SettingsSidenavItem = ({
  Icon,
  c,
  title,
  isActive,
  setActive,
}: props) => {
  return (
    <Button
      href={`/settings/${title.toLocaleLowerCase()}`}
      component={Link}
      onClick={() => {
        if (!isActive) setActive()
      }}
      classNames={{
        inner: 'flex gap-x-2 w-full items-center justify-start',
        root: 'h-10 !px-2 w-[200px] flex',
        section: 'data-[position=right]:ml-auto',
      }}
      className={`text-[#d2d5d8] font-sans font-[400] text-[1em] tracking-wide hover:bg-[#181818] hover:text-zinc-300 flex transition-all ${
        isActive && 'bg-[#181818] text-zinc-300'
      }`}
      variant="subtle"
      leftSection={
        <div className="p-1 rounded-lg" style={{ backgroundColor: `${c}` }}>
          <Icon fill="#ffffff" size={18} />
        </div>
      }
      rightSection={<ChevronRight stroke="#77838c" size={18} />}
    >
      {title}
    </Button>
  )
}
