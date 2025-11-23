import type { Preview } from '@storybook/react';
import React from 'react';
import '@progress/kendo-theme-material/dist/all.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <style>
          {`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
        {/* 
          Note: If you encounter "Cannot read properties of undefined (reading 'fillMode')" errors,
          you may need to wrap stories in a Kendo ThemeProvider from @progress/kendo-react-common.
          Install it with: pnpm add -D @progress/kendo-react-common
          Then wrap Story with: <ThemeProvider theme="material"><Story /></ThemeProvider>
        */}
        <Story />
      </>
    ),
  ],
};

export default preview;
