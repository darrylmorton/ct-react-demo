// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfig([
  // globalIgnores(['dist', 'build', 'storybook-static']),
  globalIgnores(['dist', 'build', 'storybook-static']),
  {

    files: ['**/*.{ts,tsx}'],
    ignores: ['dist', 'build', 'storybook-static', '**/*.js'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      // 'plugin:storybook/recommended',
      // 'plugin:eslint-plugin-storybook/recommended',
      // storybook
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.jest },
    },

    // ignores: ['./storybook/**', './storybook-static/**'],
  },
  // ...storybook.configs['flat/recommended'],
  eslintConfigPrettier,
])
