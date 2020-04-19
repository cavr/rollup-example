import path from 'path';
import { readFileSync } from 'fs';

import commonConf from './rollup.common';

const OUTPUT_NAME = 'library';

const chunkArray = readFileSync('./src/index.js', 'utf8')
	.split('\n') // -> all lines
	.filter(line => line.includes(' from ')) // -> lines which export something
	.map(line => {
		console.log(`src/${/.* from ('|")(\.\/|~)?(.*)('|").*/g.exec(line)[3]}`);
		return `src/${/.* from ('|")(\.\/|~)?(.*)('|").*/g.exec(line)[3]}`;
	}); // -> module paths

const input = {
	index: 'src/index.js'
};

chunkArray.forEach(path => {
	const name = path // 'yolo/FooBar'
		.split('/');

	const nameArray = name[name.length - 1] === 'src' ? name[name.length - 2] : name[name.length - 1];
	const result = nameArray.replace(/^\w/, c => c.toLowerCase());

	console.log(result);
	input[result] = path;
});

console.log(input);

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
		dir: 'dist/es',
		format: 'es'
	}
];

const config = OUTPUT_DATA.map(({ dir, format }) => ({
	input,
	output: {
		dir,
		format,
		name: OUTPUT_NAME,
		globals: GLOBALS
	},
	...commonConf
}));

export default config;
