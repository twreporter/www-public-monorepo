import { useContext, useState, type FC, type MouseEvent } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext } from '../../context'
// constants
import { THEME, type Theme } from '../../../constants/theme'
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../../constants/release-branch'
import { INTERNAL_LINKS } from '../../../constants/internal-links'
// icons
import { Search, KidStar, Member } from '../../../icons'
// button
import { IconButton } from '../../../button'
// link
import { ExternalLink, InternalLink } from '../../../customized-link'
// hooks
import { useOutsideClick } from '../../../hooks'
// search bar
import { SearchBar } from '../../../input'

const SearchIcon = () => {
  const [isSearchOpened, setSearchOpened] = useState(false)
  const { releaseBranch, theme } = useContext(HeaderContext)

  const closeSearchBox = () => {
    setSearchOpened(false)
  }
  const ref = useOutsideClick(closeSearchBox)

  const handleClickSearch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchOpened(true)
    if (!ref.current) return
    const input = ref.current.getElementsByTagName('input')[0]
    input?.focus()
  }

  const onSearch = (keywords: string) => {
    setSearchOpened(false)
    if (typeof window !== 'undefined') {
      window.location.href = `${INTERNAL_LINKS.search}?q=${encodeURIComponent(keywords)}`
    }
  }

  return (
    <div className="relative" ref={ref} key="search">
      <IconButton
        iconComponent={Search(releaseBranch)}
        theme={theme}
        onClick={handleClickSearch}
        className={clsx(
          'transition-opacity ease-in-out duration-[300ms]',
          isSearchOpened ? 'opacity-0 pointer-events-none' : 'opacity-100'
        )}
      />
      <div
        className={clsx(
          'absolute right-0 -top-[8px] transition-opacity ease-in-out duration-[300ms]',
          isSearchOpened ? 'opacity-100' : 'opacity-0 pointer-events-none',
          isSearchOpened ? 'z-999' : '-z-1'
        )}
      >
        <SearchBar
          placeholder="關鍵字搜尋"
          theme={theme}
          onClose={closeSearchBox}
          onSearch={onSearch}
        />
      </div>
    </div>
  )
}

export const Icons: FC<{
  releaseBranch?: ReleaseBranch
  theme?: Theme
}> = ({ releaseBranch = RELEASE_BRANCH.master, theme = THEME.normal }) => {
  const { isLinkExternal } = useContext(HeaderContext)
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink
  return (
    <div className="ml-[24px] flex flex-row gap-[16px]">
      <SearchIcon />
      <LinkComponent to={INTERNAL_LINKS.myReading.index}>
        <IconButton iconComponent={KidStar(releaseBranch)} theme={theme} />
      </LinkComponent>
      <LinkComponent to={INTERNAL_LINKS.account.index}>
        <IconButton iconComponent={Member(releaseBranch)} theme={theme} />
      </LinkComponent>
    </div>
  )
}
