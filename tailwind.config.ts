import colors from 'tailwindcss/colors';
// eslint-disable-next-line @typescript-eslint/no-var-requires

const reverseColors = (m: object) => {
  const keys = Object.keys(m);
  const reversedValues = Object.values(m).reverse();
  const obj = {};
  keys.forEach((e: string, i: number) => {
    obj[e] = reversedValues[i];
  });
  return obj;
};

export default {
  // important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--p) / <alpha-value>)',
      },
      // keyframes: {
      //   slideDown: {
      //     from: { height: 0 },
      //     to: { height: 'var(--radix-accordion-content-height)' },
      //   },
      //   slideUp: {
      //     from: { height: 'var(--radix-accordion-content-height)' },
      //     to: { height: 0 },
      //   },
      // },
      // animation: {
      //   slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      //   slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      // },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    require('tailwindcss-themer')({
      defaultTheme: {
        extend: {
          colors: {
            base: colors.zinc,
          },
        },
      },
      themes: [
        {
          name: 'light',
          extend: {
            colors: {
              base: colors.stone,
            },
          },
        },
        {
          name: 'dark',
          extend: {
            colors: {
              base: reverseColors(colors.zinc),
            },
          },
        },
        {
          name: 'sky',
          extend: {
            colors: {
              base: reverseColors(colors.sky),
            },
          },
        },
      ],
    }),

    // eslint-disable-next-line global-require
    require('tailwind-scrollbar'),
  ],
};
