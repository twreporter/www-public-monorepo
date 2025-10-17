import { useState } from 'react'
import type { FC, FormEvent, ChangeEvent } from 'react'
import clsx from 'clsx'
// constants
import { THEME, type Theme } from '../../constants/theme'
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../constants/release-branch'
// theme
import { selectThemeStyle } from '../theme'
// icons
import { Cross, Search } from '../../icons'
// button
import { IconButton } from '../../button'

const defaultFunc = () => {}
type SearchBarProps = {
  placeholder?: string
  theme?: Theme
  releaseBranch?: ReleaseBranch
  onSearch?: (keywords: string) => void
  onClose?: () => void
  handleBlur?: () => void
  autoFocus?: boolean
  className?: string
  searchBarWidth?: string
}
const SearchBar: FC<SearchBarProps> & {
  Theme: typeof THEME
} = ({
  placeholder = '',
  theme = THEME.normal,
  releaseBranch = RELEASE_BRANCH.master,
  onSearch = defaultFunc,
  onClose = defaultFunc,
  handleBlur = defaultFunc,
  autoFocus = true,
  className = '',
  searchBarWidth = 'w-fit',
}) => {
  const [keywords, setKeywords] = useState('')
  const [focus, setFocus] = useState(false)
  const {
    bgColor,
    focusBgColor,
    desktopBgColor,
    borderColor,
    color,
    focusColor,
    placeholderColor,
  } = selectThemeStyle(theme)
  const onFocus = () => setFocus(true)
  const onBlur = () => {
    setFocus(false)
    handleBlur()
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(keywords)
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value
    setKeywords(input)
  }
  const onReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setKeywords('')
  }

  return (
    <form
      className={clsx('flex items-center', className)}
      noValidate
      onSubmit={onSubmit}
      onReset={onReset}
      onFocus={onFocus}
    >
      <div
        className={clsx(
          'flex items-center py-[8px] px-[16px] rounded-[40px] border-[1px] border-solid gap-[8px]',
          searchBarWidth,
          bgColor,
          focus
            ? clsx(focusBgColor, borderColor, desktopBgColor)
            : 'border-transparent'
        )}
      >
        <input
          type="search"
          placeholder={placeholder}
          value={keywords}
          onChange={onChange}
          onBlur={onBlur}
          // biome-ignore lint/a11y/noAutofocus: autoFocus is intentionally used to focus the search input for better UX
          autoFocus={autoFocus}
          className={clsx(
            'h-[24px] text-[14px] focus-visible:border-0 font-default w-[fill-available] w-[-webkit-fill-available]',
            'focus-visible:outline-0 focus-visible:border-transparent [&::-webkit-search-cancel-button]:hidden',
            color,
            placeholderColor,
            focusColor
          )}
        />
        <IconButton
          theme={theme}
          iconComponent={Search(releaseBranch)}
          onClick={() => onSearch(keywords)}
        />
      </div>
      <IconButton
        theme={theme}
        iconComponent={Cross(releaseBranch)}
        onClick={onClose}
        className={clsx('ml-[8px] hidden', 'desktop:inline-flex')}
      />
    </form>
  )
}
SearchBar.Theme = THEME

export default SearchBar
