import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9'
      },
      fontFamily : {
        'inter': 'Inter',
      },
      colors: {
        'orange': {
          '50': '#fffbea',
          '100': '#fff3c5',
          '200': '#ffe787',
          '300': '#ffd448',
          '400': '#ffc01e',
          '500': '#f79a03',
          '600': '#df7500',
          '700': '#b95004',
          '800': '#963e0a',
          '900': '#7b330c',
          '950': '#471801',
        },
        'pink': {
          '50': '#fdf2f6',
          '100': '#fce7f0',
          '200': '#fbcfe1',
          '300': '#f8a9c7',
          '400': '#f373a1',
          '500': '#ea4a7f',
          '600': '#db3463',
          '700': '#bc1a43',
          '800': '#9c1837',
          '900': '#821932',
          '950': '#4f0818',
        },
        'bodydark': '#04152d',
      }
    }
  }
}
