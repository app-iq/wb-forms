module.exports = {
    extends: [
        'wbox-frontend'
    ],
    overrides: [
        {
            files: ['**/*.test.tsx', '**/*.test.ts'],
            rules: {
                'react/no-array-index-key': 'off',
            }
        }
    ],
    rules: {
        'class-methods-use-this': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-no-useless-fragment': 'off',
    }
};
