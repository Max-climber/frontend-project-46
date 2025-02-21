import globals from 'globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended });

export default [
  {
    files: ['**/*.js'], // Применяем к JS-файлам
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
      'no-console': 'off',
      'max-len': ['error', { code: 100 }],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/tests/**', // разрешаем использование devDependencies в тестах
            '**/*.config.js', // разрешаем в конфигурационных файлах
          ],
        },
      ],
    },
  },
  {
    files: ['**/tests/**'], // Применяем для тестовых файлов
    rules: {
      'no-underscore-dangle': 'off', // Отключаем это правило в тестах
    },
  },
  ...compat.extends('airbnb-base'),
];
