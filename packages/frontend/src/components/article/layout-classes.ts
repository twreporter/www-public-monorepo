import clsx from 'clsx'

const subgrid =
  'col-span-full grid min-w-0 grid-cols-subgrid content-start gap-y-10'
const readingColumn =
  'col-span-full min-w-0 tablet:col-[2/span_10] tablet:max-w-[624px] desktop:col-[1/span_6]'
const pageColumn =
  'col-span-full min-w-0 tablet:col-[2/span_10] tablet:max-w-[624px] desktop:col-[4/span_6]'
const listsAndLinks = [
  '[&_ol]:list-decimal [&_ol]:pl-[1.5em] [&_ul]:list-disc [&_ul]:pl-[1.5em]',
  '[&_a]:underline [&_a]:decoration-[var(--article-underline-primary)] [&_a]:decoration-[0.02em] [&_a]:underline-offset-[0.2em] [&_a:hover]:text-[var(--article-link)]',
]

export const articleLayout = {
  page: 'w-full bg-[var(--article-page)] text-[var(--article-primary)] tracking-normal [--article-font-size:18px] data-[large-text=true]:[--article-font-size:22px] pb-[calc(48px+env(safe-area-inset-bottom))] desktop:pb-0 print:pb-0 [&_#related-articles]:scroll-mt-20',
  // The shared grid supplies pb-[120px]; article spacing overrides that default.
  body: 'grid grid-cols-4 gap-x-6 gap-y-10 pt-14 pb-14! desktop:pb-24!',
  sidebar:
    'hidden desktop:col-[1/span_3] desktop:row-start-1 desktop:flex desktop:min-w-0 desktop:flex-col desktop:gap-20',
  sidebarGroup: 'shrink-0',
  // Five 30px controls and four 16px gaps make the vertical toolbar 214px tall.
  // The growing track bounds sticky movement between the two metadata blocks.
  toolbarTrack: 'relative min-h-[214px] flex-1 print:hidden',
  stickyToolbar: 'sticky top-[max(0px,calc((100dvh-214px)/2))]',
  reading: clsx(subgrid, 'desktop:col-[4/-1] desktop:row-start-1'),
  metadataTop: clsx(readingColumn, 'pb-5 desktop:hidden'),
  metadataBottom: clsx(readingColumn, 'py-5 desktop:hidden'),
  brief: clsx(
    readingColumn,
    'flex flex-col gap-5 font-title text-xl font-bold leading-[1.7] text-justify text-[var(--article-secondary)] [overflow-wrap:anywhere] tablet:px-8',
    listsAndLinks,
    '[&_.article-annotation-content]:bg-[var(--article-box-surface)] [&_.article-annotation-content]:text-[var(--article-box-text)] [&_.article-annotation-content_summary]:text-[var(--article-annotation-box)] [&_a]:decoration-[var(--article-underline-secondary)] [&_summary]:text-[var(--article-annotation-brief)] [&_summary]:font-normal [&_summary]:no-underline'
  ),
  divider: readingColumn,
  prose: clsx(
    subgrid,
    'font-default text-[length:var(--article-font-size)] leading-[2.1] tracking-[0.006em] [overflow-wrap:anywhere]',
    '[&>*]:col-span-full [&>*]:min-w-0 tablet:[&>*]:col-[2/span_10] tablet:[&>*]:max-w-[624px] tablet:[&>*]:px-8 desktop:[&>*]:col-[1/span_6]',
    '[&>:is(h2,h3,h4)]:pt-5 [&>:is(h2,h3,h4)]:font-bold [&>:is(h2,h3,h4)]:leading-[1.25]',
    '[&_h2]:text-2xl [&_h3]:text-[22px] [&_h4]:text-[22px] desktop:[&_h2]:text-[32px] desktop:[&_h3]:text-[28px]',
    listsAndLinks,
    '[&_:is(h2,h3,h4,strong)]:text-[var(--article-emphasis)] [&_hr]:border-[var(--article-divider)]',
    '[&_:is(blockquote,.article-quote)]:text-[var(--article-quote)] [&_.article-quote_figcaption]:text-[var(--article-quote)]',
    '[&_summary]:text-[var(--article-annotation-body)] [&_summary]:font-normal [&_summary]:no-underline [&_.article-quote_summary]:text-[var(--article-annotation-quote)]',
    '[&_:is(.article-infobox,.article-annotation-content)]:bg-[var(--article-box-surface)] [&_:is(.article-infobox,.article-annotation-content)]:text-[var(--article-box-text)] [&_:is(.article-infobox,.article-annotation-content)]:border-[var(--article-box-border)]',
    '[&_:is(.article-infobox,.article-annotation-content)_:is(h2,h3,h4,strong)]:text-[var(--article-box-strong)] [&_:is(.article-infobox,.article-annotation-content)_summary]:text-[var(--article-annotation-box)] [&_:is(.article-infobox,.article-annotation-content)_a]:decoration-[var(--article-underline-box-text)]',
    '[&_img]:block [&_img]:max-w-full [&_iframe]:block [&_iframe]:max-w-full',
    '[&_:is(.article-image,.article-slideshow,.article-embed)]:py-5',
    'tablet:[&>:is(.article-image,.article-slideshow,.article-embed)]:col-span-full tablet:[&>:is(.article-image,.article-slideshow,.article-embed)]:max-w-none tablet:[&>:is(.article-image,.article-slideshow,.article-embed)]:px-0',
    '[&_:is(.article-image,.article-slideshow)>img]:w-full [&_:is(.article-image,.article-slideshow)>img]:h-auto',
    '[&_iframe]:w-full [&_iframe]:aspect-[3/2] [&_iframe]:h-auto [&_iframe]:border-0',
    '[&_figcaption]:py-4 [&_figcaption]:border-b [&_figcaption]:border-[var(--article-gold)] [&_figcaption]:text-[var(--article-secondary)] [&_figcaption]:text-sm [&_figcaption]:leading-normal [&_figcaption]:tracking-normal',
    '[&_.article-slide-controls]:flex [&_.article-slide-controls]:items-center [&_.article-slide-controls]:justify-end [&_.article-slide-controls]:gap-4 [&_.article-slide-controls]:mb-5',
    '[&_.article-slide-controls_button]:size-11 [&_.article-slide-controls_button]:cursor-pointer [&_.article-slide-controls_button:disabled]:opacity-40 [&_.article-slide-controls_button:disabled]:cursor-default'
  ),
  support: pageColumn,
  copyright: clsx(pageColumn, 'scroll-mt-20'),
  endDivider: clsx(pageColumn, 'desktop:hidden'),
}
