'use client'

import { P1 } from '@twreporter/react-typescript-components/lib/text/paragraph'
import { articleDate } from './lexical/data'

type LicenseProps = {
  license?: string
  publishedDate?: string
  createdAt?: string
  id?: string
}

const License = ({
  license = 'Creative-Commons',
  publishedDate = '',
  createdAt,
  id = '',
}: LicenseProps) => {
  const year = articleDate(publishedDate || createdAt).split('/')[0]
  const licenseText =
    typeof license === 'string' && license.toLowerCase() === 'copyrighted'
      ? `© ${year} All rights reserved.`
      : '本文僅文字內容依 CC 創用姓名標示－非商業性－禁止改作 3.0 台灣授權條款釋出，文中照片不在此授權範圍內。'

  return (
    <div
      id={id}
      className="flex w-full items-center justify-center px-0 tablet:px-8"
    >
      <P1
        text={licenseText}
        className="min-w-0 flex-1 break-words text-center text-[var(--article-tertiary)]"
      />
    </div>
  )
}

export default License
