import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext } from '../../header/context'
// icon
import { SocialMedia as SocialMediaIcon } from '../../icons'
// type
import type { MediaType } from '../../icons/enum'
// theme
import { THEME } from '../../constants/theme'
// button
import { IconButton } from '../../button'

type SocialMediaProps = {
  mediaType: MediaType
}
const SocialMedia: FC<SocialMediaProps> = ({ mediaType }) => {
  const { theme, releaseBranch } = useContext(HeaderContext)
  const footerTheme = theme === THEME.transparent ? THEME.normal : theme
  const Icon = (
    <SocialMediaIcon mediaType={mediaType} releaseBranch={releaseBranch} />
  )
  return (
    <IconButton
      iconComponent={Icon}
      theme={footerTheme}
      className={clsx(
        '[&>svg]:h-[32px] [&>svg]:w-[32px]',
        '[&>svg]:tablet:h-[24px] [&>svg]:tablet:w-[24px]'
      )}
    />
  )
}

export default SocialMedia
