'use client'

import { motion } from 'framer-motion'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

interface ISideNavItem {
  title: string
  href: string
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  isActive: boolean
  onClickEvent: () => void
}

export const SideNavItem = ({
  title,
  href,
  Icon,
  isActive,
  onClickEvent,
}: ISideNavItem) => {
  return (
    <Link
      href={href}
      className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        isActive
          ? 'text-white font-medium'
          : 'text-gray-400 hover:text-gray-300'
      }`}
      onClick={onClickEvent}
    >
      {isActive && (
        <div className="absolute inset-0 bg-[#2a2a2a] rounded-lg">
          <motion.div
            className="absolute inset-0 opacity-100 rounded-lg"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, rgba(255, 218, 145, 0.48) 0%, rgba(255, 198, 86, 0.32) 49%, rgba(223,148,0, 0.00) 100%)',
              filter: 'blur(20px)',
              opacity: 0.5,
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          />
        </div>
      )}
      <div className="relative z-10">
        <Icon
          size={22}
          className={
            isActive
              ? 'text-white drop-shadow-[0_0_8px_rgba(255,187,56,0.8)]'
              : 'text-gray-400'
          }
        />
      </div>
      <span
        className={`
          relative z-10 text-base font-medium
          ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,187,56,0.8)]' : ''}
        `}
      >
        {title}
      </span>
    </Link>
  )
}
