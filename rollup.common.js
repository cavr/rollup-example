import postcssFlexbugs from 'postcss-flexbugs-fixes';
import autoprefixer from 'autoprefixer';
import easyImport from 'postcss-easy-import';
import url from 'postcss-url';
import filesize from 'rollup-plugin-filesize';
import svg from 'rollup-plugin-svg';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import postcss from 'rollup-plugin-postcss';

const PLUGINS = [
	postcss({
		extract: 'index.css',
		minimize: true,
		exclude: 'node_modules/**',
		modules: true,
		plugins: [
			postcssFlexbugs,
			autoprefixer(),
			easyImport({ extensions: '.sass' }),
			url()
		],
		use: [['sass']]
	}),
	filesize(),
	svg(),
	json(),
	resolve({
		jsnext: true,
		main: true,
		browser: true,
		builtins: true
	}),
	commonjs({
		include: 'node_modules/**'
	}),
	babel({
		exclude: 'node_modules/**',
		runtimeHelpers: true
	}),
	terser(),
	visualizer()
];

const EXTERNAL = ['react', 'react-dom', 'prop-types'];

export default {
	external: EXTERNAL,
	plugins: PLUGINS
};
