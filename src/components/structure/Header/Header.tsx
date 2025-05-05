import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FaSearch, FaRegHeart } from 'react-icons/fa'

import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher'

import cls from './Header.module.scss'

export const Header = () => {
  return (
    <header className={clsx('', cls.header)}>
      <div className="container d-flex justify-content-between align-items-center px-2 py-3 ">
        <div className="d-flex align-items-center gap-3">
          <Image
            src="/logo.png"
            width={70}
            height={70}
            alt="Weather Logo"
          />
          <Link href="/" className={cls.logo}>Weather</Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className={clsx(cls.search, 'input-group')}>
            <span className={clsx(cls.formIcon, 'input-group-text')}><FaSearch /></span>
            <input type="text" className={clsx(cls.formControl, 'form-control')} placeholder="Search City..." />
          </div>

          <ThemeSwitcher />

          <Link href="/favorites" className={cls.iconButton}>
            <FaRegHeart className="icon" />
          </Link>
        </div>
      </div>
    </header>
  )
}
