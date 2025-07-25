/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    viewport: {
      viewports: require('@storybook/addon-viewport').MINIMAL_VIEWPORTS,
      defaultViewport: 'mobile1',
    },
  },
};

export default preview;