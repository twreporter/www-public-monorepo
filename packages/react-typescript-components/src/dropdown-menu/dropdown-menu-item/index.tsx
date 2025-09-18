import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext } from '../../header/context'
// theme
import { selectHamburgerItemTheme } from '../../hamburger-menu/utils/theme'
// text
import { P2 } from '../../text/paragraph'
const DropdownMenuItem: FC<{
  label: string
}> = ({ label }) => {
  const { theme } = useContext(HeaderContext)
  const { color, hoverBgColor, activeBgColor } = selectHamburgerItemTheme(theme)
  return (
    <div
      className={clsx(
        'py-[8px] pl-[48px] pr-[32px] cursor-pointer',
        color,
        hoverBgColor,
        activeBgColor
      )}
    >
      <P2 text={label} weight={P2.Weight.bold} />
    </div>
  )
}

export default DropdownMenuItem
