import {  Golos_Text } from 'next/font/google'

const golos = Golos_Text({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
  variable: '--font-golos',
})

export {
  golos,
}
