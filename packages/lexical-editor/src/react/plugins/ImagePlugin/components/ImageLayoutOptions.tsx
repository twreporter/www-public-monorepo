import type { FC } from 'react'
import { PluginIconButton } from '../../../components/PluginUI'
import type { ImageLayout } from '../types'

type ImageLayoutOptionsProps = {
  layout: ImageLayout
  onChange: (layout: ImageLayout) => void
}

const layoutOptions: Array<{
  iconClassName: string
  label: string
  value: ImageLayout
}> = [
  {
    iconClassName: 'image-layout-default',
    label: 'default',
    value: 'default',
  },
  {
    iconClassName: 'image-layout-small',
    label: 'small',
    value: 'small',
  },
  {
    iconClassName: 'image-layout-right',
    label: 'right',
    value: 'right',
  },
]

const ImageLayoutOptions: FC<ImageLayoutOptionsProps> = ({
  layout,
  onChange,
}) => (
  <div className="layout-option">
    {layoutOptions.map((option) => (
      <PluginIconButton
        key={option.value}
        active={layout === option.value}
        iconClassName={option.iconClassName}
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </PluginIconButton>
    ))}
  </div>
)

export default ImageLayoutOptions
