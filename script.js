(() => {
	const pads = Array.from(document.querySelectorAll('.pad'));
	const board = document.getElementById('board');
	const startBtn = document.getElementById('startBtn');
	const pauseBtn = document.getElementById('pauseBtn');
	const resetBtn = document.getElementById('resetBtn');
	const strictBtn = document.getElementById('strictBtn');
	const muteBtn = document.getElementById('muteBtn');
	const hintBtn = document.getElementById('hintBtn');
	const messageEl = document.getElementById('message');
	const levelEl = document.getElementById('level');
	const scoreEl = document.getElementById('score');
	const highScoreEl = document.getElementById('highScore');
	const livesEl = document.getElementById('lives');
	const hintsEl = document.getElementById('hints');

	const colors = ['green', 'red', 'yellow', 'blue'];

	let generatedSequence = [];
	let playerIndex = 0;
	let isPlayingBack = false;
	let isStrict = false;
	let isMuted = false;
	let isPaused = false;
	let lives = 3;
	let hints = 3;
	let highScore = Number(localStorage.getItem('cs_high_score') || 0);
	let level = 1;
	let score = 0;

	function setMessage(text) {
		messageEl.textContent = text;
	}

	function randomColor() {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function wait(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	function getPlaybackSpeed() {
		const base = 750;
		const decrement = Math.min(level - 1, 8) * 60; // faster as level rises
		return Math.max(350, base - decrement);
	}

	function tone(freq, durationMs) {
		if (isMuted) return;
		try {
			const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
			const oscillator = audioCtx.createOscillator();
			const gain = audioCtx.createGain();
			oscillator.type = 'sine';
			oscillator.frequency.value = freq;
			oscillator.connect(gain);
			gain.connect(audioCtx.destination);
			gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
			gain.gain.exponentialRampToValueAtTime(0.4, audioCtx.currentTime + 0.02);
			oscillator.start();
			setTimeout(() => {
				gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
				oscillator.stop();
				audioCtx.close();
			}, durationMs);
		} catch (_) { /* ignore */ }
	}

	const colorFreq = { green: 392, red: 440, yellow: 494, blue: 523 };

	function highlight(color, duration) {
		const el = pads.find(p => p.dataset.color === color);
		if (!el) return;
		el.classList.add('is-active');
		tone(colorFreq[color] || 440, Math.min(duration, 300));
		setTimeout(() => el.classList.remove('is-active'), duration * 0.6);
	}

	async function playbackSequence() {
		isPlayingBack = true;
		setMessage('Watch the sequence…');
		const speed = getPlaybackSpeed();
		for (const color of generatedSequence) {
			while (isPaused) { await wait(100); }
			highlight(color, speed);
			await wait(speed);
		}
		isPlayingBack = false;
		setMessage('Your turn!');
	}

	function startGame() {
		generatedSequence = [];
		playerIndex = 0;
		level = 1;
		score = 0;
		lives = 3;
		hints = 3;
		isPaused = false;
		updateHud();
		nextRound();
	}

	function updateHud() {
		levelEl.textContent = String(level);
		scoreEl.textContent = String(score);
		highScoreEl.textContent = String(highScore);
		livesEl.textContent = String(lives);
		hintsEl.textContent = String(hints);
	}

	async function nextRound() {
		playerIndex = 0;
		generatedSequence.push(randomColor());
		await playbackSequence();
	}

	function handlePlayer(color) {
		if (isPlayingBack || generatedSequence.length === 0) return;
		if (isPaused) return;
		highlight(color, 200);
		const expected = generatedSequence[playerIndex];
		if (color === expected) {
			playerIndex += 1;
			score += 5;
			updateHud();
			if (playerIndex === generatedSequence.length) {
				level += 1;
				score += 20;
				updateHud();
				setMessage('Nice! Next round…');
				setTimeout(() => nextRound(), 650);
			}
		} else {
			lives -= 1;
			updateHud();
			if (lives <= 0 || isStrict) {
				setMessage('Game Over!');
				highScore = Math.max(highScore, score);
				localStorage.setItem('cs_high_score', String(highScore));
				updateHud();
				setTimeout(() => startGame(), 1200);
			} else {
				setMessage('Wrong! Try again…');
				playerIndex = 0;
				setTimeout(() => playbackSequence(), 700);
			}
		}
	}

	function useHint() {
		if (hints <= 0 || isPlayingBack || generatedSequence.length === 0) return;
		hints -= 1;
		updateHud();
		playbackSequence();
	}

	// Events
	startBtn.addEventListener('click', () => {
		startGame();
	});
	pauseBtn.addEventListener('click', () => {
		isPaused = !isPaused;
		pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
	});
	resetBtn.addEventListener('click', () => {
		startGame();
	});
	strictBtn.addEventListener('click', () => {
		isStrict = !isStrict;
		strictBtn.textContent = `Strict: ${isStrict ? 'On' : 'Off'}`;
	});
	muteBtn.addEventListener('click', () => {
		isMuted = !isMuted;
		muteBtn.textContent = `Mute: ${isMuted ? 'On' : 'Off'}`;
	});
	hintBtn.addEventListener('click', () => {
		useHint();
	});
	board.addEventListener('click', (e) => {
		const target = e.target;
		if (!(target instanceof HTMLElement)) return;
		if (target.classList.contains('pad')) {
			handlePlayer(target.dataset.color);
		}
	});

	setMessage('Press Start to play.');
})();

