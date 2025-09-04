<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Color Sequence Memory</title>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<header class="header">
		<h1>Color Sequence Memory</h1>
		<div class="scoreboard">
			<div>Level: <span id="level">1</span></div>
			<div>Score: <span id="score">0</span></div>
			<div>High: <span id="highScore">0</span></div>
			<div>Lives: <span id="lives">3</span></div>
			<div>Hints: <span id="hints">3</span></div>
		</div>
	</header>

	<main class="game">
		<div class="board" id="board" aria-label="Color pads" role="group">
			<button class="pad pad--green" data-color="green" aria-label="Green"><span class="pad__label">G</span></button>
			<button class="pad pad--red" data-color="red" aria-label="Red"><span class="pad__label">R</span></button>
			<button class="pad pad--yellow" data-color="yellow" aria-label="Yellow"><span class="pad__label">Y</span></button>
			<button class="pad pad--blue" data-color="blue" aria-label="Blue"><span class="pad__label">B</span></button>
		</div>

		<div class="controls">
			<button id="startBtn" class="btn">Start</button>
			<button id="pauseBtn" class="btn btn--ghost">Pause</button>
			<button id="hintBtn" class="btn">Hint</button>
			<button id="strictBtn" class="btn">Strict: Off</button>
			<button id="muteBtn" class="btn btn--ghost">Mute: Off</button>
			<button id="resetBtn" class="btn btn--ghost">Reset</button>
		</div>

		<div id="message" class="message" role="status" aria-live="polite"></div>
	</main>

	<!-- Ads: header/top -->
	<div class="ad ad--top">
		<div class="ad-slot" data-height="90" data-ad-src="https://www.profitableratecpm.com/mvyig4fw2?key=9d082a398f2b1455f5965c0aec8b6a0c"></div>
	</div>

	<!-- Ads: inline/mid -->
	<div class="ad ad--mid">
		<div class="ad-slot" data-height="250" data-ad-src="https://www.profitableratecpm.com/i1m19wngfn?key=34eaaa4cfabf2f61d18593b4c8c8b35a"></div>
		<div class="ad-slot" data-height="250" data-ad-src="https://www.profitableratecpm.com/ywsjhr2t9?key=3b24f96f1ee79daa7b229b5affab7006"></div>
	</div>

	<!-- Ads: sidebar/bottom -->
	<div class="ad ad--bottom">
		<div class="ad-slot" data-height="90" data-ad-src="https://www.profitableratecpm.com/eia1pa1dty?key=160ee4de7d9f92aba968ecb88b3c1435"></div>
		<div class="ad-slot" data-height="90" data-ad-src="https://www.profitableratecpm.com/z6mt31ac?key=b297a74bf4bf65b55c376be88f112f9c"></div>
		<div class="ad-slot" data-height="90" data-ad-src="https://www.profitableratecpm.com/e54dji0b9g?key=d3fb0b347ba82804df12b3ec7fa01041"></div>
		<div class="ad-slot" data-height="90" data-ad-src="https://www.profitableratecpm.com/imm1a4ayyq?key=bdb4e643ceacc9b3a1dc3fbf9c9f0b79"></div>
	</div>

	<script src="script.js"></script>
	<script src="ads.js"></script>
<?php include __DIR__ . '/footer.php'; ?>
</body>
</html>

