export default {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [
      [
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',
        'display',
        'flex-direction',
        'justify-content',
        'align-items',
        'gap',
        'width',
        'height',
        'min-width',
        'min-height',
        'max-width',
        'max-height',
        'margin',
        'padding',
        'border',
        'border-radius',
        'background',
        'color',
        'font-size',
        'font-weight',
        'font-family',
        'line-height',
        'text-align',
        'text-decoration',
        'white-space',
        'cursor',
        'box-shadow',
        'transition',
        'animation',
        'filter',
        'opacity',
      ],
      {
        unspecified: 'bottomAlphabetical',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.{js,jsx}'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};
