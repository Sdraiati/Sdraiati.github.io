const prefersLightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

if (prefersLightMode) {
	document.getElementById("github-mark").src = "assets/img/github-mark.png";
}
