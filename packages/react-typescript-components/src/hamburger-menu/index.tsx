import { useContext, useState, type FC } from 'react'
import clsx from 'clsx'
// context
import { HeaderContext, HamburgerContext } from '../header/context'
// constants
import { THEME } from '../constants/theme'
import { Channels, CHANNEL_TYPE } from './constants/channels'
import { SocialMedias } from './constants/social-media'
// utils
import {
  selectHamburgerMenuTheme,
  selectHamburgerItemTheme,
} from './utils/theme'
// buttons
import { IconButton } from '../button'
import { MenuButton } from '../button'
// icons
import { Cross } from '../icons'
// logo
import { LogoSymbol, LogoHeader } from '../logo'
// utils
import { selectLogoType } from './utils/theme'
// divider
import Divider from '../divider'
// components
import { DropdownMenu } from '../dropdown-menu'
import IconLink from './components/icon-link'
import LightLink from './components/light-link'
import SocialMedia from './components/social-media'

const HamburgerMenu: FC = () => {
  const { theme, releaseBranch } = useContext(HeaderContext)
  const { closeHamburgerMenu } = useContext(HamburgerContext)

  const menuTheme = theme === THEME.photography ? theme : THEME.normal
  const { bgColor } = selectHamburgerMenuTheme(menuTheme)
  const logoType = selectLogoType(menuTheme)
  const [activeKey, setActiveKey] = useState('')

  return (
    <div
      className={clsx(
        'w-screen h-screen overflow-scroll overscroll-contain',
        bgColor,
        // reserveHeightForIos15 is 48px
        `pb-[calc(48px+48px)]`,
        'tablet:w-[320px] tablet:max-h-screen',
        'desktop:w-[280px]'
        // TODO: add scrollbar style
      )}
    >
      {/* close icon */}
      <div
        className={clsx(
          'hidden items-center justify-end pt-[24px] pr-[32px] pb-[16px]',
          'tablet:flex'
        )}
      >
        <IconButton
          iconComponent={Cross(releaseBranch)}
          theme={menuTheme}
          onClick={closeHamburgerMenu}
        />
      </div>
      {/* logo */}
      <div
        className={clsx(
          'hidden justify-center [&>img]:h-[24px] [&>img]:w-[24px]',
          'tablet:flex'
        )}
      >
        <LogoSymbol type={logoType} releaseBranch={releaseBranch} />
      </div>
      {/* mobile hamburger header */}
      <div
        className={clsx(
          'flex items-center justify-between px-[24px] py-[16px]',
          'tablet:hidden'
        )}
      >
        <a href="/" rel="noreferrer">
          <LogoHeader
            type={logoType}
            releaseBranch={releaseBranch}
            className="h-[21px]"
          />
        </a>
        <div className="flex gap-[16px]">
          <div>贊助</div>
          <div>登入</div>
        </div>
      </div>
      {/* mobile search bar */}
      <div className="px-[32px] pt-[24px] pb-[8px]">
        <input
          type="text"
          className={clsx(
            'w-full h-[40px] rounded-[20px] px-[16px]',
            'focus:outline-none'
          )}
          placeholder="搜尋"
        />
      </div>
      {/* menu buttons */}
      <div className="flex flex-col pt-[16px]">
        {Channels.map((channel, idx) => {
          if (channel.type === CHANNEL_TYPE.link) {
            const { color, hoverBgColor, activeBgColor } =
              selectHamburgerItemTheme(theme)
            return (
              <a
                href={channel.to}
                target={channel.target}
                key={channel.label}
                rel="noreferrer"
              >
                <MenuButton
                  key={channel.label}
                  text={channel.label}
                  fontWeight={MenuButton.FontWeight.bold}
                  color={color}
                  hoverBgColor={hoverBgColor}
                  activeBgColor={activeBgColor}
                  paddingLeft={'pl-[32px]'}
                  paddingRight={'pr-[32px]'}
                />
              </a>
            )
          }
          if (channel.type === CHANNEL_TYPE.divider) {
            return (
              <div className="py-[16px] px-[32px]" key={`divider-${idx}`}>
                <Divider direction={Divider.Direction.horizontal} />
              </div>
            )
          }
          if (channel.type === CHANNEL_TYPE.dropdown) {
            const isActive = activeKey === channel.label
            const toggleFunc = (key: string) => {
              const nextActiveKey = activeKey === key ? '' : key
              setActiveKey(nextActiveKey)
            }
            return (
              <button
                onClick={() => toggleFunc(channel.label)}
                key={channel.label}
                type="button"
              >
                <DropdownMenu
                  text={channel.label}
                  isActive={isActive}
                  dropdownItems={channel.dropdownItems}
                />
              </button>
            )
          }
          if (channel.type === CHANNEL_TYPE.iconLink) {
            return (
              <IconLink
                label={channel.label}
                to={channel.to}
                target={channel.target}
                icon={channel.icon}
                key={channel.label}
              />
            )
          }
          if (channel.type === CHANNEL_TYPE.lightLink) {
            return (
              <LightLink
                label={channel.label}
                to={channel.to}
                target={channel.target}
                key={channel.label}
              />
            )
          }
        })}
      </div>
      {/* social media */}
      <div className="flex flex-row gap-[16px] justify-center">
        {SocialMedias.map((socialMedia) => (
          <a
            href={socialMedia.link}
            target={socialMedia.target}
            rel="noreferrer noopener"
            key={socialMedia.icon}
          >
            <SocialMedia mediaType={socialMedia.icon} />
          </a>
        ))}
      </div>
      {/* action butoons */}
      <div
        className={clsx(
          'hidden flex-col gap-[16px] px-[32px] pt-[40px] pb-[32px]',
          'tablet:flex'
        )}
      >
        <div>訂閱電子報</div>
        <div>贊助我們</div>
      </div>
    </div>
  )
}

export default HamburgerMenu
