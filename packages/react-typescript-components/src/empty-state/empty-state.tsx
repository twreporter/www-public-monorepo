import type { FC } from 'react'
import clsx from 'clsx'
// text
import { P1, P2 } from '../text/paragraph'
// button
import { PillButton } from '../button'
// constants
import { STYLE, type Style, BASE_GCS_DIR } from './constants'
import { RELEASE_BRANCH, type ReleaseBranch } from '../constants/release-branch'

type EmptyStateProps = {
  releaseBranch?: ReleaseBranch
  style?: Style
  title?: string
  showGuide?: boolean
  guide?: React.ReactNode | string
  showButton?: boolean
  buttonText?: string
  buttonUrl?: string
  buttonOnClick?: () => void
  maxWidth?: string
  className?: string
}

const EmptyState: FC<EmptyStateProps> & { Style: typeof STYLE } = ({
  releaseBranch = RELEASE_BRANCH.master,
  style = STYLE.default,
  title = '',
  showGuide = true,
  guide = null,
  showButton = true,
  buttonText = '',
  buttonUrl = '/',
  buttonOnClick = () => {},
  maxWidth = '280px',
  className = '',
}) => {
  let imageUrl = ''
  let imageWidth = ''

  switch (style) {
    case STYLE.pencil:
      imageUrl = `${BASE_GCS_DIR}/${releaseBranch}/pencil.png`
      imageWidth = '232'
      break
    case STYLE.underConstruction:
      imageUrl = `${BASE_GCS_DIR}/${releaseBranch}/under_construction.png`
      imageWidth = '177'
      break
    default:
      imageUrl = `${BASE_GCS_DIR}/${releaseBranch}/seek.png`
      imageWidth = '170'
      break
  }

  return (
    <div
      className={clsx('w-full mt-[8px] flex flex-col items-center', className)}
    >
      <div className="flex flex-col items-center" style={{ maxWidth }}>
        {/* biome-ignore lint/performance/noImgElement: use next image later */}
        <img src={imageUrl} width={imageWidth} alt="" />
        <div className="mt-[48px] flex flex-col items-center text-center text-gray-800">
          <P1 text={title} weight={P1.Weight.bold} />
          {showGuide && guide ? (
            <div
              className={clsx(
                'flex items-baseline text-center text-gray-600',
                '[&_svg]:bg-gray-600 [&_svg]:w-[18px] [&_svg]:h-[18px] [&_svg]:mx-[4px] [&_svg]:translate-y-[3px]'
              )}
            >
              {typeof guide === 'string' ? <P2 text={guide} /> : guide}
            </div>
          ) : null}
        </div>
        {showButton ? (
          <a
            className="mt-[24px] no-underline"
            href={buttonUrl}
            onClick={buttonOnClick}
          >
            <PillButton text={buttonText} size={PillButton.Size.l} />
          </a>
        ) : null}
      </div>
    </div>
  )
}

EmptyState.Style = STYLE

export default EmptyState
