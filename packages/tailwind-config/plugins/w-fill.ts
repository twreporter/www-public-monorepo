import plugin from 'tailwindcss/plugin'

const wFillPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.w-fill': {
      width: 'fill-available',
      '@supports (width: -webkit-fill-available)': {
        width: '-webkit-fill-available',
      },
      '@supports (width: -moz-available)': {
        width: '-moz-available',
      },
    },
  })
})

export default wFillPlugin
