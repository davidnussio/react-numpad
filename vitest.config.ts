import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    deps: {
      optimizer: {
        web: {
          include: [/shared/],
        },
      },
    },
  },
})
