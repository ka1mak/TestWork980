export const LIGHT_THEME = {
  '--background': '#ffffff',
  '--foreground': '#171717',
}

export const DARK_THEME = {
  '--background': '#0a0a0a',
  '--foreground': '#ededed',
}

export type Theme = 'light' | 'dark'

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  const vars = theme === 'dark' ? DARK_THEME : LIGHT_THEME

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}
