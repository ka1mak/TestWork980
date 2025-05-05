import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa'

import { SearchInput } from '@/components/elements/SearchInput/SearchInput'

import cls from './Header.module.scss'

export const Header = () => {
  return (
    <header className={clsx('', cls.header)}>
      <div className="container d-flex justify-content-between align-items-center px-2 py-3">
        <div className="d-flex align-items-center gap-3">
          <Image
            src="/logo.png"
            width={70}
            height={70}
            alt="Weather Logo"
            priority
          />
          <Link href="/" className={cls.logo}>Weather</Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <SearchInput />

          {/* <ThemeSwitcher /> */}

          <Link href="/favorites" className={cls.iconButton}>
            <FaRegHeart className="icon" />
          </Link>
        </div>
      </div>
    </header>
  )
}
