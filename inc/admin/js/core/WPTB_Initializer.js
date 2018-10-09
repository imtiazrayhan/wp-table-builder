var WPTB_Initializer = function () {

	const MIN_COLUMNS = 1,
		MIN_ROWS = 1,
		MAX_COLUMNS = 10,
		MAX_ROWS = 10;

	var tableGenerator = document.body;
	columnsDecrementButton = tableGenerator.getElementsByClassName('wptb-input-number-decrement')[0],
		columnsIncrementButton = tableGenerator.getElementsByClassName('wptb-input-number-increment')[0],
		rowsDecrementButton = tableGenerator.getElementsByClassName('wptb-input-number-decrement')[1],
		rowsIncrementButton = tableGenerator.getElementsByClassName('wptb-input-number-increment')[1],
		columnsInput = document.getElementById('wptb-columns-number'),
		rowsInput = document.getElementById('wptb-rows-number');

	columnsDecrementButton.onclick = function () {
		if (columnsInput.value > MIN_COLUMNS) {
			columnsInput.value--;
		}
	};

	columnsDecrementButton.onmousedown = function (event) {
		event.preventDefault();
	}

	columnsIncrementButton.onclick = function () {
		if (columnsInput.value < MAX_COLUMNS) {
			columnsInput.value++;
		}
	};

	columnsIncrementButton.onmousedown = function (event) {
		event.preventDefault();
	}

	rowsDecrementButton.onclick = function () {
		if (rowsInput.value > MIN_ROWS) {
			rowsInput.value--;
		}
	};

	rowsDecrementButton.onmousedown = function (event) {
		event.preventDefault();
	}

	rowsIncrementButton.onclick = function () {
		if (rowsInput.value < MAX_ROWS) {
			rowsInput.value++;
		}
	};

	rowsIncrementButton.onmousedown = function (event) {
		event.preventDefault();
	}

	document.getElementById('wptb-generate-table').onclick = function () {
		var columns = document.getElementById('wptb-columns-number').value,
			rows = document.getElementById('wptb-rows-number').value;

		WPTB_Table(columns, rows);
	}

};