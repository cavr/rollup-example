import path from 'path';


import commonConf from './rollup.common';


import pkg from './package.json';

const INPUT_FILE_PATH = 'src/index.js';
const OUTPUT_NAME = 'library';

const GLOBALS = {
	react: 'React',
	'react-dom': 'ReactDOM',
	'prop-types': 'PropTypes',
	events: 'events',
	string_decoder: 'string_decoder',
	buffer: 'buffer',
	path: 'path'
};


const OUTPUT_DATA = [
	{
		file: 'dist/index.js',
		format: 'cjs'
	}
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
	input: INPUT_FILE_PATH,
	output: {
		file,
		format,
		name: OUTPUT_NAME,
		globals: GLOBALS
	},
	...commonConf
}));

export default config;
