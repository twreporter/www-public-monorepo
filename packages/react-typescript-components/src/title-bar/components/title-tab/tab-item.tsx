import clsx from 'clsx'
import type { FC } from 'react'
// type
import type { Tab } from './type'
// component
import { ExternalLink, InternalLink } from '../../../customized-link'
import { TextButton } from '../../../button'

type TabItemProps = Tab & {
  onClick: () => void
  className?: string
}
const TabItem: FC<TabItemProps> = ({
  text,
  link,
  isExternal = false,
  isActive = false,
  onClick,
  className = '',
}) => {
  const CustomizedLink = isExternal ? ExternalLink : InternalLink
  return (
    <button
      className={clsx('flex shrink-0 mr-[24px] last:mr-0', className)}
      onClick={onClick}
      type="button"
    >
      <CustomizedLink to={link}>
        <TextButton
          text={text}
          active={isActive}
          size={TextButton.Size.L}
          className="py-[16px]"
        />
      </CustomizedLink>
    </button>
  )
}

export default TabItem
