const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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

const FREQUENCY_FOR_KEY = {
    C3: 130.8128,
    D3: 146.8324,
    E3: 164.8138,
    F3: 174.6141,
    G3: 195.9977,
    A3: 220.0,
    B3: 246.9417,
    C4: 261.6256,
};

let state = {
    volume: 0.5,
};

const makeNoteSound = (f) => {
    const oscillator = audioCtx.createOscillator()
        , gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    oscillator.type = 'square';
    oscillator.frequency.value = f;

    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = state.volume;
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 2);

    oscillator.start();
};

window.addEventListener('keydown', (e) => {
    if (keyboard[e.key] === undefined) return;
    document.querySelector('#' + keyboard[e.key]).classList.add('clicked');
    makeNoteSound(FREQUENCY_FOR_KEY[keyboard[e.key]]);
});
window.addEventListener('keyup', (e) => {
    if (keyboard[e.key] === undefined) return;
    document.querySelector('#' + keyboard[e.key]).classList.remove('clicked');
});

const volumeController = document.querySelector('.volume-controller__input');
volumeController.addEventListener('input', e => {
    const {target} = e;
    state.volume = parseFloat(target.value);
});
