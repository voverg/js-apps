const C4 = new Audio("sounds/C4.mp3");
const Db4 = new Audio("sounds/Db4.mp3");
const D4 = new Audio("sounds/D4.mp3");
const Eb4 = new Audio("sounds/Eb4.mp3");
const E4 = new Audio("sounds/E4.mp3");
const F4 = new Audio("sounds/F4.mp3");
const Gb4 = new Audio("sounds/Gb4.mp3");
const G4 = new Audio("sounds/G4.mp3");
const Ab4 = new Audio("sounds/Ab4.mp3");
const A4 = new Audio("sounds/A4.mp3");
const Bb4 = new Audio("sounds/Bb4.mp3");
const B4 = new Audio("sounds/B4.mp3");
const C5 = new Audio("sounds/C5.mp3");
const Db5 = new Audio("sounds/Db5.mp3");
const D5 = new Audio("sounds/D5.mp3");
const Eb5 = new Audio("sounds/Eb5.mp3");
const E5 = new Audio("sounds/E5.mp3");

const notes = {C4: C4, Db4: Db4, D4: D4, Eb4: Eb4, E4: E4, F4: F4, Gb4: Gb4, G4: G4, Ab4: Ab4, A4: A4, Bb4: Bb4, B4: B4, C5: C5, Db5: Db5, D5: D5, Eb5: Eb5, E5: E5}

const pianoEl = document.querySelector('.piano');


function playSound(noteId) {
    const note = notes[noteId];
    const clone = note.cloneNode();
    clone.play();

    setTimeout(() => (clone.volume = 0.8), 400);
    setTimeout(() => (clone.volume = 0.6), 800);
    setTimeout(() => (clone.volume = 0.4), 1200);
    setTimeout(() => (clone.volume = 0.2), 1600);
    setTimeout(() => (clone.volume = 0), 2000);
}

pianoEl.addEventListener('click', (event) => {
    if (!event.target.classList.contains('key')) return;

    const key = event.target;
    key.classList.add('active');
    setTimeout(() => key.classList.remove('active'), 200);
    const noteId = key.dataset.id;

    playSound(noteId);
});

document.body.addEventListener('keydown', (event) => {
    event.preventDefault();
    const keyCode = event.code;
    const key = document.querySelector(`[data-key="${keyCode}"]`)

    if (key) {
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 200);
        const noteId = key.dataset.id;

        playSound(noteId);
    }
});