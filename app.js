const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;
let gain;

const keyboard = {
	a: 'C3',
	s: 'D3',
	d: 'E3',
	f: 'F3',
	j: 'G3',
	k: 'A3',
	l: 'B3',
	';': 'C4',
};

const frequency = {
	C3: 130.8128,
	D3: 146.8324,
	E3: 164.8138,
	F3: 174.6141,
	G3: 195.9977,
	A3: 220.0,
	B3: 246.9417,
	C4: 261.6256,
};

let init = () => {
	oscillator = audioCtx.createOscillator();
	gain = audioCtx.createGain();
	oscillator.connect(gain);
	gain.connect(audioCtx.destination);
};

init();

window.addEventListener('keydown', (e) => {
	if (keyboard[e.key] === undefined) return;
	document.querySelector('#' + keyboard[e.key]).classList.add('clicked');
	makeNoteSound(frequency[keyboard[e.key]]);
});
window.addEventListener('keyup', (e) => {
	if (keyboard[e.key] === undefined) return;
	document.querySelector('#' + keyboard[e.key]).classList.remove('clicked');
});

let makeNoteSound = (f) => {
	gain.disconnect(audioCtx.destination);
	oscillator.disconnect(gain);
	oscillator = audioCtx.createOscillator();
	gain = audioCtx.createGain();
	oscillator.type = 'square';
	oscillator.connect(gain);
	oscillator.frequency.value = f;
	gain.connect(audioCtx.destination);
	oscillator.start();
	gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 2);
};

for (let key in frequency) {
	let value = frequency[key];
	document.querySelector('#' + key).addEventListener('click', () => {
		makeNoteSound(value);
	});
}
