module.exports = {
  output: {
    fileName({ format }) {
      return `async-actions[min]${format !== 'cjs' ? '.[format]' : ''}[ext]`;
    },
    format: ['esm', 'cjs'],
  },
};
