import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext } from '../../header/context'
// theme
import { THEME } from '../../constants/theme'
// utils
import { selectHamburgerFooterTheme } from '../utils/theme'
// text
import { P2 } from '../../text/paragraph'

type IconLinkProps = {
  label: string
  to: string
  target: string
}
const IconLink: FC<IconLinkProps> = ({ label, to, target }) => {
  const { theme } = useContext(HeaderContext)
  const footerTheme = theme === THEME.transparent ? THEME.normal : theme
  const { color, hoverColor, hoverBgColor, activeColor, activeBgColor } =
    selectHamburgerFooterTheme(footerTheme)
  return (
    <a href={to} target={target} rel="noreferrer noopener">
      <div
        className={clsx(
          'py-[8px] px-[32px] flex items-center',
          '[&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:mr-[4px]',
          color,
          hoverColor,
          hoverBgColor,
          activeColor,
          activeBgColor
        )}
      >
        <P2 text={label} />
      </div>
    </a>
  )
}

export default IconLink
