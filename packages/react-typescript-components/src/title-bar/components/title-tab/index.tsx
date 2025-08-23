import clsx from 'clsx'
import { type FC, useState, useEffect } from 'react'
// hook
import { useScrollStatus } from './hook'
// components
import TabItem from './tab-item'
import { H1 } from '../../../text/heading'
// type
import type { Tab } from './type'

type TitleTabProps = {
  title: string
  tabs: Tab[]
  activeTabIndex?: number
}
const TitleTab: FC<TitleTabProps> = ({
  title,
  tabs = [],
  activeTabIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(activeTabIndex)
  const [showGradientMask, setShowGradientMask] = useState(false)

  const ref = useScrollStatus(setShowGradientMask)

  useEffect(() => {
    setActiveIndex(activeTabIndex)
  }, [activeTabIndex])

  return (
    <div className="flex flex-col w-full text-gray-800">
      <H1 text={title} />
      {
        tabs.length > 0 ? (
          <div ref={ref} className={clsx(
            'flex items-center',
            'overflow-x-scroll scrollbar:!w-0',
            {
              '[mask-image:linear-gradient(to_left,rgba(241,241,241,0),#f1f1f1_48px)] [-webkit-mask-image:linear-gradient(to_left,rgba(241,241,241,0),#f1f1f1_48px)]': showGradientMask,
            }
          )}>
            {
              tabs.map((tab, index) => {
                tab.isActive = index === activeIndex
                const handleClick = () => {
                  setActiveIndex(index)
                }
                return <TabItem {...tab} key={`tab-${index}`} onClick={handleClick} />
              })
            }
          </div>
        ) : null
      }
    </div>
  )
}

export default TitleTab
