import type { FC } from 'react'
import clsx from 'clsx'
import { H4 } from '../../text/heading'
import { P1, P2, P3 } from '../../text/paragraph'

type LookBackCardProps = {
  reviewWord?: string
  title: string
  ogDescription: string
  bgImage: string
}

const AwardBadge: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className={clsx(
      'flex px-[8px] py-[2px] rounded-[40px] border w-fit',
      'shadow-[0_0_8px_var(--color-opacity-black-07)]',
      'border-supportive-pastel',
      'text-supportive-pastel'
    )}
  >
    {children}
  </div>
)

const BadgeOverlay: FC<{ reviewWord?: string; reverse?: boolean }> = ({
  reviewWord,
  reverse = false,
}) => (
  <div
    className={clsx(
      'flex w-full bg-linear-[180deg] bg-blend-multiply from-opacity-black-08 to-opacity-white-0',
      reverse
        ? 'flex-row-reverse px-[8px] pt-[8px] pb-[16px]'
        : 'px-[16px] pt-[16px] pb-[32px]'
    )}
  >
    {reviewWord && (
      <AwardBadge>
        {reverse ? (
          <P3 text={reviewWord} />
        ) : (
          <>
            <P3 className="desktop:hidden" text={reviewWord} />
            <P2 className="hidden desktop:block" text={reviewWord} />
          </>
        )}
      </AwardBadge>
    )}
  </div>
)

const ClampedText: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="w-full text-gray-800 line-clamp-3">
    {children}
  </div>
)

const LookBackCard: FC<LookBackCardProps> = ({
  reviewWord,
  title,
  ogDescription,
  bgImage,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col w-[75vw] max-w-[400px]',
        'hover:opacity-70',
        'tablet:flex-row tablet:w-full tablet:max-w-none'
      )}
    >
      {/* Tablet and above */}
      <div className="hidden tablet:flex tablet:w-full">
        <div
          className={clsx(
            'max-w-[400px] w-full h-full aspect-[3/2] bg-cover bg-no-repeat',
            'tablet:mr-[24px]',
            'desktop:mr-[32px]'
          )}
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <BadgeOverlay reviewWord={reviewWord} />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <H4
            className="w-full mb-[16px] text-gray-800"
            text={title}
            type={H4.Type.article}
          />
          <ClampedText>
            <P1 text={ogDescription} />
          </ClampedText>
        </div>
      </div>

      {/* Mobile only */}
      <div className="flex flex-col tablet:hidden">
        <div
          className="relative w-full aspect-[3/2] bg-cover bg-no-repeat mb-[8px]"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <BadgeOverlay reviewWord={reviewWord} reverse />
          <div className="w-full absolute bottom-0 px-[8px] pt-[16px] pb-[8px] text-white bg-linear-[180deg] bg-blend-multiply from-opacity-white-0 to-opacity-black-08 text-shadow-[0_0_8px_var(--color-opacity-black-07)]">
            <H4 text={title} type={H4.Type.article} />
          </div>
        </div>
        <ClampedText>
          <P2 text={ogDescription} />
        </ClampedText>
      </div>
    </div>
  )
}

export default LookBackCard
