import { useMemo, type FC } from 'react'
import clsx from 'clsx'
// text
import { P1, P2 } from '../text/paragraph'
// constants
import { STYLE, type Style, BASE_GCS_DIR } from './constants'
import { RELEASE_BRANCH, type ReleaseBranch } from '../constants/release-branch'

type EmptyStateV2Props = {
  releaseBranch?: ReleaseBranch
  style?: Style
  maxWidth?: string
  title?: string
  guide?: React.ReactNode | string
  buttonComponents?: React.ReactElement[]
  className?: string
}

const EmptyStateV2: FC<EmptyStateV2Props> & { Style: typeof STYLE } = ({
  releaseBranch = RELEASE_BRANCH.master,
  style = STYLE.default,
  maxWidth = '280px',
  title = '',
  guide = null,
  buttonComponents = [],
  className = '',
}) => {
  const { imageUrl, imageWidth } = useMemo(() => {
    switch (style) {
      case STYLE.pencil:
        return {
          imageUrl: `${BASE_GCS_DIR}/${releaseBranch}/pencil.png`,
          imageWidth: '232',
        }
      case STYLE.underConstruction:
        return {
          imageUrl: `${BASE_GCS_DIR}/${releaseBranch}/under_construction.png`,
          imageWidth: '177',
        }
      default:
        return {
          imageUrl: `${BASE_GCS_DIR}/${releaseBranch}/seek.png`,
          imageWidth: '170',
        }
    }
  }, [style, releaseBranch])

  return (
    <div
      className={clsx(
        'w-full flex flex-col justify-center items-center',
        className
      )}
      style={{ maxWidth }}
    >
      {/* biome-ignore lint/performance/noImgElement: use next image later */}
      <img src={imageUrl} width={imageWidth} alt="" />
      <div className="mt-[48px] flex flex-col items-center text-center text-gray-800">
        <P1 text={title} weight={P1.Weight.bold} />
        {guide ? (
          <div
            className={clsx(
              'flex items-baseline text-center text-gray-600',
              '[&>svg]:bg-gray-600 [&>svg]:w-[18px] [&>svg]:h-[18px] [&>svg]:mx-[4px] [&>svg]:translate-y-[3px]'
            )}
          >
            {typeof guide === 'string' ? <P2 text={guide} /> : guide}
          </div>
        ) : null}
      </div>
      {buttonComponents.length > 0 ? (
        <div className="mt-[24px] flex flex-col gap-[16px]">
          {buttonComponents.map((button, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <div key={index}>{button}</div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

EmptyStateV2.Style = STYLE

export default EmptyStateV2
