const __svg__ = { // eslint-disable-line
  path: './assets/**/*.svg',
  name: 'assets/svgs/iconset-[hash].svg'
};

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
