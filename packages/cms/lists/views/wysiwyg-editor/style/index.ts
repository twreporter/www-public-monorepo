import styled from '@emotion/styled'
import { css } from '@emotion/react'
// utils
import { tabletOnly, desktopOnly, hdOnly, mobileOnly, tabletAndAbove, desktopAndAbove, tabletAndBelow, desktopAndBelow } from './media-query'
// @twreporter
import {
  colorGrayscale,
  colorSupportive,
} from '@twreporter/core/lib/constants/color'

export const LexicalBox = styled.div`
  background-color: #fafbfc;
  border: 1px solid #e1e5e9;
  border-radius: 6px;

  &::selection {
    background-color: ${colorSupportive.heavy};
    color: ${colorGrayscale.white};
  }
`

const articleLayoutCss = css`
  width: 100%;
  box-sizing: border-box;
  display: grid;

  ${mobileOnly`
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 24px;
    padding-left: 24px;
    padding-right: 24px;
  `}

  ${tabletOnly`
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 24px;
    padding-left: 32px;
    padding-right: 32px;
  `}

  ${desktopOnly`
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 32px;
    padding-left: 48px;
    padding-right: 48px;
  `}

  ${hdOnly`
    grid-template-columns: repeat(12, minmax(0, 1fr));
    column-gap: 32px;
    padding-left: 80px;
    padding-right: 80px;
  `}
`

const normalItemCss = css`
  ${mobileOnly`
    grid-column: 1 / -1;
  `}

  ${tabletOnly`
    grid-column: 2 / 12;
  `}

  ${desktopAndAbove`
    grid-column: 4 / 10;
  `}
`

const largeItemCss = css`
  display: grid;

  ${tabletAndBelow`
    grid-column: 1 / -1;
  `}

  ${desktopAndAbove`
    grid-column: 4 / -1;
  `}
`

const fullscreenItemCSS = css`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
`

const rightItemCss = css`
  display: grid;

  ${mobileOnly`
    grid-column: 1 / -1;
  `}

  ${tabletOnly`
    grid-column: 2 / 12;
  `}

  ${desktopAndAbove`
    grid-column: 8 / -1;
  `}
`

const paragraphTextCSS = css`
  font-size: 18px;
  position: relative;
  line-height: 2.1;
  letter-spacing: 0.108px;
`

export const StyleWrapper = styled.div`
  .editor {
    /* twreporter style */
    background-color: ${colorGrayscale.gray100};
    color: ${colorGrayscale.gray800};
    font-family: "Roboto Slab", "Noto Sans TC", sans-serif;
  }

  .lexical-content-editable {
    ${articleLayoutCss}
    row-gap: 40px;
    padding-top: 48px;
    padding-bottom: 48px;
  }

  .TwreporterTheme__paragraph {
    &:not(.TwreporterTheme__wwwQuote .TwreporterTheme__annotation) {
      ${normalItemCss}
      ${paragraphTextCSS}
      color: ${colorGrayscale.gray800};

      ${tabletAndAbove`
        padding-left: 32px;
        padding-right: 32px;
      `}

      /* line break */
      white-space: pre-wrap;
    }
  }

  .TwreporterTheme__wwwQuote .TwreporterTheme__paragraph {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .TwreporterTheme__wwwQuote.default {
    ${normalItemCss}
  }

  .TwreporterTheme__wwwQuote.blockquote {
    ${normalItemCss}
  }
  
  .TwreporterTheme__link {
    cursor: pointer;
    text-decoration: none;
    border-bottom: 1px solid rgba(102, 102, 102, 0.50);
    span, em, strong {
      color: ${colorGrayscale.gray700} !important;
    }

    &:hover {
      color: ${colorSupportive.heavy};
      border-color: ${colorSupportive.heavy};
      span, em, strong {
        color: ${colorSupportive.heavy} !important;
      }
    }
  }

  .TwreporterTheme__h2, .TwreporterTheme__h3 {
    ${normalItemCss}
    ${tabletAndAbove`  
      padding-top: 20px;
    `}
  }
  
  .TwreporterTheme__h2 {
    line-height: 125%;
    font-size: 24px;
    ${tabletAndAbove`
      font-size: 32px;  
    `}
  }
  
  .TwreporterTheme__h3 {
    line-height: 150%;
    font-size: 22px;
    ${tabletAndAbove`
      font-size: 28px;  
    `}
  }

  .TwreporterTheme__ul, .TwreporterTheme__ol {
    ${normalItemCss}
    ${paragraphTextCSS}
    font-size: 18px;
    margin-block-start: 0;
    margin-block-end: 0;
    padding: 0 32px 0 48px;

    li {
      margin: 0 0 0 27px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .TwreporterTheme__annotation {
    .Annotation__content {
      margin: 0 auto 10px auto;
      span {
        color: ${colorGrayscale.gray700} !important;
        background-color: white !important;
      }
    }
  }
  
  .TwreporterTheme__image {
    .Image__image {
      grid-column: 1 / -1;
    }

    &.default {
      ${largeItemCss}
      ${mobileOnly`
        .Image__image {
          width: 100vw;
          transform: translateX(-24px;)
        }
        figure {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          column-gap: 24px;
        }
        .Image__caption {
          grid-column: 2 / -1;
        }
      `}
      ${tabletOnly`
        .Image__image {
          width: 100vw;
          transform: translateX(-32px;)
        }
        figure {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          column-gap: 24px;
        }
        .Image__caption {
          grid-column: 4 / -1;
          float: right;
        }
      `}
      ${desktopAndAbove`
        figure {
          display: grid;
          grid-template-columns: repeat(9, minmax(0, 1fr));
          column-gap: 32px;
        }
        .Image__caption {
          grid-column: 7 / -1;
        }
      `}
    }
    
    &.right {
      ${rightItemCss}
      ${mobileOnly`
        figure {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          column-gap: 24px;
        }
        .Image__caption {
          grid-column: 2 / -1;
        }
      `}
      ${desktopAndAbove`
        float: right;
        figure {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          column-gap: 32px;
        }
        .Image__caption {
          grid-column: 3 / -1;
        }
      `}
    }

    &.small {
      ${normalItemCss}
      ${mobileOnly`
        .Image__image {
          width: 100vw;
          transform: translateX(-24px;)
        }
        figure {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          column-gap: 24px;
        }
        .Image__caption {
          grid-column: 2 / -1;
        }
      `}
      ${desktopAndAbove`
        figure {
          display: grid;
          grid-template-columns: repeat(9, minmax(0, 1fr));
          column-gap: 32px;
        }
        .Image__image {
          grid-column: 1 / 7;
        }
        .Image__caption {
          grid-column: 7 / -1;
        }
      `}
    }
  }

  .TwreporterTheme__infobox {
    ${normalItemCss}
  }

  .TwreporterTheme__infobox .TwreporterTheme__paragraph {
    font-size: 16px;
    font-weight: 400;
    line-height: 210%;
    letter-spacing: 0.096px;
    margin: 0;
  }

  .TwreporterTheme__infobox .TwreporterTheme__h2, .TwreporterTheme__infobox .TwreporterTheme__h3 {
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    margin: 0;
  }

  .TwreporterTheme__infobox .TwreporterTheme__h2 {
    ${desktopAndAbove`  
      font-size: 28px;
    `}
    ${tabletAndBelow`  
      font-size: 22px;
    `}
  }

  .TwreporterTheme__infobox .TwreporterTheme__h3 {
    ${desktopAndAbove`  
      font-size: 22px;
    `}
    ${tabletAndBelow`  
      font-size: 18px;
    `}
  }

  .TwreporterTheme__infobox .TwreporterTheme__ul, .TwreporterTheme__infobox .TwreporterTheme__ol {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    padding-left: 18px;
    margin-left: 18px;
    margin-block-start: 0;
    margin-block-end: 0;
    line-height: 210%;
    letter-spacing: 0.096px;
  }

  .TwreporterTheme__infobox .TwreporterTheme__annotation {
    .Annotation__content {
      border-left: 1px solid ${colorGrayscale.gray100};
      border-right: 1px solid ${colorGrayscale.gray100};
      border-bottom: 1px solid ${colorGrayscale.gray100};
    }
  }

  .TwreporterTheme__audio {
    ${normalItemCss}
  }

  .EmbeddedCode__content {
    ${normalItemCss}
  }

  .EmbeddedCode__content.fullscreen {
    ${fullscreenItemCSS}
  }

  .TwreporterTheme__slideshow {
    ${largeItemCss}

    .SlideShow__container {
      ${mobileOnly`
        display: inline-grid;
        padding: 0 24px;
        column-gap: 24px;
        align-self: stretch;
        grid-template-columns: repeat(4,minmax(0,1fr));
      `}
      ${tabletOnly`
        display: inline-grid;
        padding: 0 32px;
        column-gap: 24px;
        align-self: stretch;
        grid-template-columns: repeat(12,minmax(0,1fr));
      `}
      ${desktopAndAbove`
        display: grid;
        column-gap: 32px;
        align-self: stretch;
        grid-template-columns: repeat(9,minmax(0,1fr));
      `}
    }

    .SlideShow__media {
      grid-column: 1 / -1;
    }

    .SlideShow__body {
      ${mobileOnly`
        display: flex;
        padding-top: 20px;
        flex-direction: column;
        align-items: flex-end;
        gap: 20px;
        grid-column: 1 / span 4;
        justify-self: stretch;
      `}
      ${tabletOnly`
        display: flex;
        padding-top: 20px;
        flex-direction: column;
        align-items: flex-end;
        gap: 20px;
        grid-column: 4 / span 9;
        justify-self: stretch;
      `}

      ${desktopAndAbove`
        display: flex;
        padding-top: 20px;
        flex-direction: column;
        align-items: flex-end;
        gap: 20px;
        grid-column: 7 / span 3;
        justify-self: stretch;
      `}
    }
  }

  .TwreporterTheme__textBold {
    font-weight: bold;
  }

  .TwreporterTheme__textItalic {
    font-style: italic;
  }

  .TwreporterTheme__textUnderline {
    text-decoration: underline;
    text-decoration-style: solid;
    text-decoration-color: rgba(192, 150, 98, 0.50);
    text-decoration-thickness: 30%;
    text-underline-offset: -3px;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  .TwreporterTheme__textStrikethrough {
    text-decoration: line-through;
  }

  .TwreporterTheme__textUnderlineStrikethrough {
    text-decoration: underline line-through;
  }

  .TwreporterTheme__textSubscript {
    font-size: 0.8em;
    vertical-align: sub !important;
  }

  .TwreporterTheme__textSuperscript {
    font-size: 0.8em;
    vertical-align: super;
  }

  .TwreporterTheme__textLowercase {
    text-transform: lowercase;
  }

  .TwreporterTheme__textUppercase {
    text-transform: uppercase;
  }

  .TwreporterTheme__textCapitalize {
    text-transform: capitalize;
  }
`
