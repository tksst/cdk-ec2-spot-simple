/** @type {import('prettier').Options} */
module.exports = {
  tabWidth: 4,
  printWidth: 120,  
  overrides: [
    {
        files: '*.json',
        options: {
          tabWidth: 2,
        },
    },
    {
      files: '*.{md,yml}',
      options: {
        tabWidth: 2,
        trailingComma: 'none',
      },
    },
  ],
}
