export default {
  typescript: {
    rewritePaths: {
      'src/': 'build/src/',
      'test/': 'build/test/'
    },
    compile: 'tsc',
  },
};
