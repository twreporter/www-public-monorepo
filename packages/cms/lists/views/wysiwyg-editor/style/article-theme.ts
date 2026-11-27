import { css } from '@emotion/react'

// Article_theme.md: only photography posts use the dark palette.
// Scope to Post fields, keeping editor controls and other lists unchanged.
export const articleThemeCss = css`
  &[data-article-theme] {
    --article-page: #f1f1f1;
    --article-placeholder: #d8d8d8;
    --article-primary: #404040;
    --article-emphasis: #000000;
    --article-secondary: #808080;
    --article-link: #9f7544;
    --article-quote-color: #666666;
    --article-divider: #cdcdcd;
    --article-annotation: #000000;
    --article-annotation-quote: #404040;
    --article-annotation-brief: #404040;
    --article-control: #808080;
    --article-control-invert: 0.502;
    --article-control-hover-invert: 0.251;
    --article-control-hover: #404040;
  }

  &[data-article-theme='photography'] {
    --article-page: #08192d;
    --article-placeholder: #24364b;
    --article-primary: #cdcdcd;
    --article-emphasis: #ffffff;
    --article-secondary: #cdcdcd;
    --article-link: #c09662;
    --article-quote-color: #9c9c9c;
    --article-divider: #bbbbbb;
    --article-annotation: #ffffff;
    --article-annotation-quote: #cdcdcd;
    --article-annotation-brief: #ffffff;
    --article-control: #bbbbbb;
    --article-control-invert: 0.733;
    --article-control-hover-invert: 1;
    --article-control-hover: #ffffff;
  }

  /* Specificity also covers the field-specific layout wrappers. */
  &&&[data-article-theme] {
    .editor-scroller, .embedded-code-editor__preview {
      background-color: var(--article-page);
    }

    .lexical-content-editable {
      --twreporter-lexical-color-text: var(--article-primary);
      --twreporter-lexical-color-divider: var(--article-divider);
      color: var(--article-primary);

      .TwreporterTheme__h2, .TwreporterTheme__h3,
      .TwreporterTheme__textBold { color: var(--article-emphasis); }

      .wwwQuote__container.default {
        --twreporter-lexical-color-text: var(--article-quote-color);
        color: var(--article-quote-color);
        .wwwQuote__content, .wwwQuote__quote_by { color: var(--article-quote-color); }
      }
      .wwwQuote__container.blockquote {
        color: var(--article-primary);
        .wwwQuote__quote_by { color: var(--article-primary); }
      }

      .Image__caption, .SlideShow__caption { color: var(--article-secondary); }
      .Image__skeleton_media, .Image__skeleton_line, .SlideShow__peek {
        background: var(--article-placeholder);
      }
      .SlideShow__counter { color: var(--article-primary); }
      .SlideShow__nav button {
        color: var(--article-control);
        border-color: currentColor;
        i { filter: brightness(0) invert(var(--article-control-invert)); }
        &:hover {
          color: var(--article-control-hover);
          i { filter: brightness(0) invert(var(--article-control-hover-invert)); }
        }
      }

      .TwreporterTheme__link {
        color: var(--article-link);
        border-bottom-color: color-mix(in srgb, currentColor 50%, transparent);
        span, em, strong { color: inherit !important; }
        &:hover { border-bottom-color: currentColor; }
      }

      .Annotation__text {
        color: var(--article-annotation);
        font-weight: 400;
        text-decoration: none;
      }
      .Annotation__indicator {
        border-color: currentColor;
        &::before, &::after { background-color: currentColor; }
      }
      .TwreporterTheme__wwwQuote .Annotation__text {
        color: var(--article-annotation-quote);
      }

      .TwreporterTheme__infobox, .Annotation__content {
        --twreporter-lexical-color-text: #666666;
        color: #666666;
        background-color: #ffffff;
        .TwreporterTheme__paragraph { color: inherit; }
        .TwreporterTheme__h2, .TwreporterTheme__h3,
        .TwreporterTheme__textBold { color: #262626; }
        .TwreporterTheme__link { color: #666666; }
        .TwreporterTheme__textBold .TwreporterTheme__link,
        .TwreporterTheme__link:has(.TwreporterTheme__textBold) { color: #262626; }
        .TwreporterTheme__textUnderline,
        .TwreporterTheme__textUnderlineStrikethrough { text-decoration-color: #e3be98; }
        .Annotation__text { color: #262626; }
      }
    }
  }

  &&&[data-article-theme][data-article-field='brief'] .Annotation__text {
    color: var(--article-annotation-brief);
  }
`
