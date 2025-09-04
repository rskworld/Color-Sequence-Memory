(function () {
	function loadScript(src, onload, onerror) {
		var s = document.createElement('script');
		s.src = src;
		s.async = true;
		s.referrerPolicy = 'no-referrer-when-downgrade';
		s.onload = onload || null;
		s.onerror = onerror || null;
		return s;
	}

	function createPlaceholder(message) {
		var el = document.createElement('div');
		el.className = 'ad-slot__placeholder';
		el.textContent = message || 'Ad is loading…';
		return el;
	}

	function mountIframe(slot, src) {
		try {
			var h = parseInt(slot.getAttribute('data-height') || '90', 10);
			var iframe = document.createElement('iframe');
			iframe.src = src;
			iframe.style.width = '100%';
			iframe.style.height = h + 'px';
			iframe.style.border = '0';
			iframe.loading = 'lazy';
			iframe.referrerPolicy = 'no-referrer-when-downgrade';
			slot.innerHTML = '';
			slot.appendChild(iframe);
			slot.classList.add('ad-slot--loaded');
			slot.dataset.loaded = '1';
		} catch (_) {}
	}

	function mountAd(slot) {
		if (!slot || slot.dataset.loaded) return;
		var src = slot.getAttribute('data-ad-src');
		if (!src) return;

		slot.classList.add('ad-slot--loading');
		slot.appendChild(createPlaceholder('Loading ad…'));

		var timeout = setTimeout(function () {
			slot.classList.remove('ad-slot--loading');
			slot.classList.add('ad-slot--stalled');
			// Fallback to iframe on stall
			mountIframe(slot, src);
		}, 5000);

		var script = loadScript(src, function () {
			clearTimeout(timeout);
			slot.classList.remove('ad-slot--loading', 'ad-slot--stalled');
			slot.classList.add('ad-slot--loaded');
			slot.dataset.loaded = '1';
		}, function () {
			clearTimeout(timeout);
			slot.classList.remove('ad-slot--loading');
			slot.classList.add('ad-slot--error');
			// Fallback to iframe on error
			mountIframe(slot, src);
		});

		// Some ad networks require insertion into DOM
		slot.appendChild(script);
	}

	function attachInteractionFallbacks() {
		document.addEventListener('click', function (e) {
			var slot = e.target.closest && e.target.closest('.ad-slot');
			if (!slot) return;
			if (!slot.dataset.loaded) {
				var src = slot.getAttribute('data-ad-src');
				mountIframe(slot, src);
			}
		});
	}

	function init() {
		var slots = document.querySelectorAll('.ad-slot');
		if (!slots.length) return;

		// Build a pool of ad sources and choose a single host slot
		var sources = [];
		for (var i = 0; i < slots.length; i++) {
			var s = slots[i].getAttribute('data-ad-src');
			if (s) sources.push({ src: s, height: slots[i].getAttribute('data-height') || '90' });
		}
		if (!sources.length) return;

		var host = slots[0];
		for (var j = 1; j < slots.length; j++) {
			slots[j].style.display = 'none';
		}

		function pickRandom() {
			return sources[Math.floor(Math.random() * sources.length)];
		}

		function showRandom() {
			var chosen = pickRandom();
			host.removeAttribute('data-loaded');
			host.dataset.loaded = '';
			host.setAttribute('data-ad-src', chosen.src);
			host.setAttribute('data-height', chosen.height);
			host.innerHTML = '';
			host.className = 'ad-slot';
			mountAd(host);
		}

		showRandom();
		setInterval(showRandom, 60000); // rotate every 60s

		attachInteractionFallbacks();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();

