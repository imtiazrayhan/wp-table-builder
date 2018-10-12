var WPTB_Settings = function () {

	var elems = document.getElementsByClassName('wptb-element');

	function detectMode() {
		var url = window.location.href,
			regex = new RegExp('[?&]table(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return false;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	for (var i = 0; i < elems.length; i++) {
		elems[i].ondragstart = function (event) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
		}
	};

	document.getElementsByClassName('wptb-save-btn')[0].onclick = function () {
		var http = new XMLHttpRequest(),
			url = ajaxurl + "?action=save_table",
			t = document.getElementById('wptb-setup-name').value.trim(),
			messagingArea,
			code = WPTB_Stringifier(document.getElementsByClassName('wptb-preview-table')[0]);

		if (t === '') {
			messagingArea = document.getElementById('wptb-messaging-area');
			messagingArea.innerHTML = '<div class="wptb-error wptb-message">Error: You must assign a name to the table before saving it.</div>';
			messagingArea.classList.add('wptb-warning');
			setTimeout(function () {
				messagingArea.removeChild(messagingArea.firstChild);
			}, 4000);
			return;
		}
		var params = 'title=' + t + '&content=' + code;
		if (rs = detectMode()) {
			params += '&id=' + rs;
		}
		http.open('POST', url, true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function (d) {
			if (this.readyState == 4 && this.status == 200) {
				messagingArea = document.getElementById('wptb-messaging-area');
				messagingArea.innerHTML = '<div class="wptb-success wptb-message">Table: "' + t + '" was successfully saved!</div>';
				messagingArea.classList.add('wptb-success');
				setTimeout(function () {
					messagingArea.removeChild(messagingArea.firstChild);
				}, 4000);
			}
		}
		http.send(params);
	}
};
