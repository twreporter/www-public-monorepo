import type { FC, MouseEvent } from 'react'

import { PluginIconButton } from '../../../components/PluginUI'
import type { wwwQuoteLayout } from '../constant'

type wwwQuoteLayoutOptionsProps = {
  layout: wwwQuoteLayout
  onChange: (layout: wwwQuoteLayout) => void
}

const layoutOptions: Array<{
  iconClassName: string
  label: string
  value: wwwQuoteLayout
}> = [
  {
    iconClassName: 'www-quote-layout-default',
    label: 'default',
    value: 'default',
  },
  {
    iconClassName: 'www-quote-layout-blockquote',
    label: 'blockquote',
    value: 'blockquote',
  },
]

const WwwQuoteLayoutOptions: FC<wwwQuoteLayoutOptionsProps> = ({
  layout,
  onChange,
}) => {
  const updateLayout = (
    event: MouseEvent<HTMLButtonElement>,
    value: wwwQuoteLayout
  ) => {
    event.preventDefault()
    event.stopPropagation()
    onChange(value)
  }

  return (
    <div className="wwwQuote__layout_options">
      {layoutOptions.map((option) => (
        <PluginIconButton
          key={option.value}
          active={layout === option.value}
          iconClassName={option.iconClassName}
          onClick={(event) => updateLayout(event, option.value)}
        >
          {option.label}
        </PluginIconButton>
      ))}
    </div>
  )
}

export default WwwQuoteLayoutOptions
