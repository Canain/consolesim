'use strict';

const emptyChar = ' ';
const nonEmptyChar = '\u00b7';
const width = 252;
const height = 68;
const ratio = 2;
const grav = 1;
const deltat = 1;
const rate = 0;

const posRand = 50;
const pRand = 0;
const num = 30;

function draw(data) {
	process.stdout.write('\u001b[2J');
	for (let y = 0; y < data.length; y++) {
		let row = data[y];
		for (let x = 0; x < row.length; x++) {
			if (row[x]) {
				process.stdout.write(`\u001b[${y};${x}f${nonEmptyChar}`);
			}
		}
	}
	// data.forEach(row => {
	// 	let out = '';
	// 	row.forEach(pixel => {
	// 		out += pixel ? nonEmptyChar : emptyChar;
	// 	});
	// 	console.log(out);
	// });
}

function genEmpty(rows, cols) {
	let empty = [];
	for (let i = 0; i < rows; i++) {
		let row = [];
		for (let j = 0; j < cols; j++) {
			row.push(0);
		}
		empty.push(row);
	}
	return empty;
}

function clear(display) {
	for (let i = 0; i < display.length; i++) {
		let row = display[i];
		for (let j = 0; j < row.length; j++) {
			row[j] = 0;
		}
	}
}

function genRandom(rows, cols) {
	let sample = genEmpty(rows, cols);
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			sample[i][j] = Math.random() < 0.5 ? 1 : 0;
		}
	}
	return sample;
}

function add(vec1, vec2) {
	let result = [];
	for (let i = 0; i < vec1.length; i++) {
		result.push(vec1[i] + vec2[i]);
	}
	return result;
}

function mult(vec, scalar) {
	return vec.map(val => {
		return val * scalar;
	});
}

function sub(vec1, vec2) {
	return add(vec1, mult(vec2, -1));
}

function dot(vec1, vec2) {
	let dot = 0;
	for (let i = 0; i < vec1.length; i++) {
		dot += vec1[i] * vec2[i];
	}
	return dot;
}

function dist(vec1, vec2) {
	let diff = sub(vec1, vec2);
	return Math.sqrt(dot(diff, diff));
}

function gravForceNorm(vec1, vec2) {
	return grav / Math.pow(dist(vec1, vec2), 2);
}

function gravForce(vec1, vec2) {
	return mult(sub(vec2, vec1), gravForceNorm(vec1, vec2));
}

let display = genEmpty(height, width);

let map = [];

map.push({
	pos: [0, 10],
	p: [1, 0]
}, {
	pos: [0, -10],
	p: [-1, 0]
}, {
	pos: [0, 0],
	p: [0, 0]
});


// for (let i = 0; i < num; i++) {
// 	map.push({
// 		pos: [posRand/2 - Math.random() * posRand, posRand/2 - Math.random() * posRand],
// 		p: [pRand/2 - Math.random() * pRand, pRand/2 - Math.random() * pRand],
// 	});
// }

let halfWidth = Math.floor(width / 2);
let halfHeight = Math.floor(height / 2);

function step() {
	clear(display);
	
	map.forEach(obj => {
		map.forEach(obj2 => {
			if (obj === obj2) {
				return;
			}
			
			obj.p = add(obj.p, mult(gravForce(obj.pos, obj2.pos), deltat));
		});
	});
	
	map.forEach(obj => {
		obj.pos = add(obj.pos, mult(obj.p, deltat));
	});
	
	map.forEach(obj => {
		let pos = obj.pos;
		let y = halfHeight - Math.floor(pos[1]/ratio);
		let x = halfWidth + Math.floor(pos[0]);
		if (y > -1 && y < height && x > -1 && x < width) {
			display[y][x] = 1;
		}
	});
	
	draw(display);
}

function loop() {
	step();
	setTimeout(loop, rate);
}

process.stdout.write(`\u001b[${height}B`);

loop();