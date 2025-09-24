import { useContext, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext, HamburgerContext } from '../../context'
// components
import { IconButton, TextButton } from '../../../button'
import { Hamburger } from '../../../icons'
import Divider from '../../../divider'
// constants
import { CHANNELS } from './constants'
// link
import { ExternalLink, InternalLink } from '../../../customized-link'
import type { LinkTarget } from '../../../customized-link/type'
// lodash
import map from 'lodash/map'
const _ = {
  map,
}
type ChannelItemProps = {
  link: {
    href: string
    target: LinkTarget
  }
  label: string
}
const ChannelItem: FC<ChannelItemProps> = ({
  link = { href: '', target: '_self' },
  label = '',
}) => {
  const { theme, isLinkExternal } = useContext(HeaderContext)
  const LinkComponent = isLinkExternal ? ExternalLink : InternalLink
  console.log('link.href: ', link.href)
  return (
    <div className={clsx('flex items-center', '[&>a]:no-underline')}>
      <LinkComponent to={link.href} target={link.target}>
        <TextButton
          text={label}
          size={TextButton.Size.l}
          theme={theme}
          style={TextButton.Style.dark}
        />
      </LinkComponent>
    </div>
  )
}

const Channel = () => {
  const { releaseBranch, theme } = useContext(HeaderContext)
  const { toggleHamburger } = useContext(HamburgerContext)
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full px-[16px] py-[8px]">
        <IconButton
          iconComponent={Hamburger(releaseBranch)}
          theme={theme}
          onClick={toggleHamburger}
        />
        {_.map(CHANNELS, (channel) => {
          return (
            <ChannelItem
              key={`channel-${channel.label}`}
              label={channel.label}
              link={{
                href: channel.to,
                target: channel.target,
              }}
            />
          )
        })}
      </div>
      <Divider />
    </div>
  )
}

export default Channel
