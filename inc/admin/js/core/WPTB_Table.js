var array = [], WPTB_Table = function (columns, rows) {

	var settings = document.getElementsByClassName('wptb-settings-items'),
		wptbTableSetup = document.getElementsByClassName("wptb-table-setup")[0],
		table, row, cell,
		maxAmountOfCells,
		maxAmountOfRows;

	var mark = function (event) {
		var rs = this.rowSpan,
			cs = this.colSpan,
			markedCells,
			//   noCells = document.getElementsByClassName('no-cell-action'),
			//   singleCells = document.getElementsByClassName('single-action'),
			//   multipleCells = document.getElementsByClassName('multiple-select-action'),
			position = getCoords(this),
			row = position[0],
			column = position[1];
		for (var i = 0; i < rs; i++) {
			for (var j = 0; j < cs; j++) {
				array[row + i][column + j] = 1;
			}
		}
		this.classList.add('wptb-highlighted');
		markedCells = document.getElementsByClassName('wptb-highlighted').length;
		/*    if(markedCells === 1){
					for (var i = 0; i < singleCells.length; i++) {
						singleCells[i].classList.add('visible');
						multipleCells[i].classList.remove('visible');
						noCells[i].classList.remove('visible');
					}
				}
				else{
						singleCells[i].classList.remove('visible');
						multipleCells[i].classList.add('visible');
						noCells[i].classList.remove('visible');
				}*/
	};

	for (var i = 0; i < settings.length; i++) {
		settings[i].classList.add('visible');
	}

	document.getElementsByClassName('wptb-table-generator')[0].style.display = 'none';

	//Create a HTML Table element.
	table = document.createElement('table');
	table.classList.add('wptb-preview-table');

	//Add the header row.
	row = table.insertRow(-1);
	row.classList.add('wptb-table-head', 'wptb-row');

	for (var i = 0; i < columns; i++) {
		cell = new WPTB_Cell(mark);
		cell.setCoords(0, i);
		row.appendChild(cell.getDOMElement());
	}

	//Add the data rows.
	for (var i = 1; i < rows; i++) {

		row = table.insertRow(-1);
		row.classList.add('wptb-row');

		for (var j = 0; j < columns; j++) {
			cell = new WPTB_Cell(mark);
			cell.setCoords(i, j);
			row.appendChild(cell.getDOMElement());
		}
	}

	var realTimeArray = function () {
		var carried = [], tds, cols, matriz = [];

		for (var i = 0; i < maxAmountOfCells; i++) {
			carried[i] = 0;
		}

		for (var i = 0; i < table.rows.length; i++) {
			cols = [];

			var tds = table.rows[i].getElementsByTagName('td');

			for (items = 0; items < tds.length; items++) {

				for (var k = 0; k < tds[items].colSpan; k++) {
					cols.push(1);
				}

				if (tds[items].rowSpan > 1) {
					for (var k = 0; k < tds[items].colSpan; k++) {
						carried[items + k] = {
							justAssigned: true,
							amount: tds[items].rowSpan
						};
					}
				}
			}

			for (var k = 0; k < maxAmountOfCells; k++) {
				if (typeof carried[k] == 'object' && carried[k].amount > 0) {

					carried[k].amount--;

					if (carried[k].justAssigned) {
						carried[k].justAssigned = false;
					}
					else {
						cols.push(1);
					}
				}
			}

			matriz.push(cols);

		}
		return matriz;
	};

	var carriedRowspans = function (row) {
		var carried = [], tds, cols;

		for (var i = 0; i < maxAmountOfCells; i++) {
			carried[i] = 0;
		}

		for (var i = 0; i <= row; i++) {
			tds = table.rows[i].getElementsByTagName('td');
			cols = 0,
				items = 0;

			for (colspansAcumulados = 0; colspansAcumulados < maxAmountOfCells && items < tds.length;) {
				if (carried[colspansAcumulados]) {
					carried[colspansAcumulados]--;
					colspansAcumulados++;
					continue;
				}
				cell = tds[items++];
				if (cell.rowSpan > 1) {
					for (var k = 0; k < cell.colSpan; k++) {
						carried[colspansAcumulados + k] = cell.rowSpan;
					}
				}
				if (carried[colspansAcumulados])
					carried[colspansAcumulados]--;
				colspansAcumulados += cell.colSpan;
			}

		}
		return carried;
	};

	table.toggleTableEditMode = function () {
		var bar = document.getElementById('edit-bar');
		if (bar.classList.contains('visible')) {
			document.select.deactivateMultipleSelectMode();
			bar.classList.remove('visible');
		}
		else {
			document.select.activateMultipleSelectMode();
			bar.classList.add('visible');

		}
	}

	table.recalculateIndexes = function () {
		var trs = this.getElementsByTagName('tr'), tds, maxCols = 0;

		for (var i = 0; i < trs.length; i++) {
			tds = trs[i].getElementsByTagName('td');
			for (var j = 0; j < tds.length; j++) {

				if (i == 0) {
					tds[j].parentNode.className = '';
					tds[j].parentNode.classList.add('wptb-row', 'wptb-table-head');
				}
				else {
					tds[j].parentNode.className = '';
					tds[j].parentNode.classList.add('wptb-row');
				}

				tds[j].dataset.xIndex = j;
				tds[j].dataset.yIndex = i;
			}
			if (j > maxCols) {
				maxCols = j;
			}
		}
		this.columns = maxCols;
	}

	table.addColumnEnd = function () {
		for (var i = 0; i < table.rows.length; i++) {
			td = new WPTB_Cell(mark);
			table.rows[i].appendChild(td.getDOMElement());
			array[i].push(0);
		}
		maxAmountOfCells++;
		undoSelect();
	};

	table.addColumnStart = function () {
		for (var i = 0; i < table.rows.length; i++) {
			td = new WPTB_Cell(mark);
			firstCell = table.rows[i].getElementsByTagName('td')[0];
			if (firstCell) {
				table.rows[i].insertBefore(td.getDOMElement(), firstCell);
			}
			else {
				table.rows[i].appendChild(td.getDOMElement());
			}
			array[i].push(0);
		}

		maxAmountOfCells++;
		undoSelect();
	};

	table.addColumnBefore = function () {

		var cell = document.querySelector('.wptb-highlighted'),
			pos = getCoords(cell)[1];

		if (pos == 0) {
			table.addColumnStart();
			return;
		}

		pos--;

		for (var i = 0; i < table.rows.length; i++) {
			cellCount = 0;

			arr = carriedRowspans(i);
			for (var j = 0; j < maxAmountOfCells;) {
				if (arr[j] != 0) {
					arr[j]--;
					j++;
					continue;
				}
				currentCell = table.rows[i].getElementsByTagName('td')[cellCount++];
				if (currentCell.colSpan > 1) {
					var insertAfterSkip = false;
					for (var k = 0; k < currentCell.colSpan - 1; k++) {
						if (pos === j + k) {
							insertAfterSkip = true;
						}
						j++;
					}
					if (insertAfterSkip) {
						var bro = currentCell.nextSibling,
							td = new WPTB_Cell(mark);
						if (bro) {
							table.rows[i].insertBefore(td.getDOMElement(), bro);
						} else {
							table.rows[i].appendChild(td.getDOMElement());
						}
						break;
					}
				} else {
					if (pos == j) {
						var bro = currentCell.nextSibling,
							td = new WPTB_Cell(mark);
						if (bro) {
							table.rows[i].insertBefore(td.getDOMElement(), bro);
						} else {
							table.rows[i].appendChild(td.getDOMElement());
						}
						break;
					} else {
					}
					j++;
				}
			}
		}

		for (var i = 0; i < array.length; i++) {
			array[i].push(0);
		}
		drawTable(array);
		table.recalculateIndexes();
		undoSelect();

	};

	table.addColumnAfter = function () {
		var cell = document.querySelector('.wptb-highlighted'),
			pos = getCoords(cell)[1];

		for (var i = 0; i < table.rows.length; i++) {
			cellCount = 0;

			arr = carriedRowspans(i);
			for (var j = 0; j < maxAmountOfCells;) {
				if (arr[j] != 0) {
					continue;
					arr[j]--;
				}
				currentCell = table.rows[i].getElementsByTagName('td')[cellCount++];
				if (currentCell.colSpan > 1) {
					var insertAfterSkip = false;
					for (var k = 0; k < currentCell.colSpan - 1; k++) {
						if (pos === j + k) {
							insertAfterSkip = true;
							console.log('Sadly, we must procrastinate ' + (currentCell.colSpan - 1) + ' spaces');
						}
						j++;
					}
					if (insertAfterSkip) {
						var bro = currentCell.nextSibling,
							td = new WPTB_Cell(mark);
						if (bro) {
							table.rows[i].insertBefore(td.getDOMElement(), bro);
						} else {
							table.rows[i].appendChild(td.getDOMElement());
						}
						break;
					}
				} else {
					if (pos == j) {
						var bro = currentCell.nextSibling,
							td = new WPTB_Cell(mark);
						if (bro) {
							table.rows[i].insertBefore(td.getDOMElement(), bro);
						} else {
							table.rows[i].appendChild(td.getDOMElement());
						}
						break;
					} else {
					}
					j++;
				}
			}
		}

		for (var i = 0; i < array.length; i++) {
			array[i].push(0);
		}
		drawTable(array);
		table.recalculateIndexes();
		undoSelect();

	};

	table.addRow = function (pos) {
		var _this, row, referenceRow = undefined;

		if (pos == 'end' || pos == 'start') {
			row = this.insertRow(pos == 'end' ? -1 : 0);
		} else {
			row = document.createElement('tr');
		}

		for (var j = 0; j < this.columns; j++) {
			var cell = new WPTB_Cell(mark);
			row.appendChild(cell.getDOMElement());
		}

		row.classList.add('wptb-row');

		if (pos == 'before' || pos == 'after') {
			_this = this.getElementsByClassName('wptb-highlighted')[0];
			referenceRow = this.getElementsByTagName('tr')[_this.dataset.yIndex];
			if (pos == "before") {
				this.getElementsByTagName('tbody')[0].insertBefore(row, referenceRow);
				var buttons = document.getElementsByClassName('wptb-relative-action');
				for (var i = 0; i < buttons.length; i++) {
					buttons[i].dataset.yIndex++;
				}
			} else {
				this.getElementsByTagName('tbody')[0].insertBefore(row, referenceRow.nextSibling);
			}
		}

		if (pos == 'before' || pos == 'start') {
			var active = document.querySelector('wptb-highlighted');
			if (active) {
				active.onclick();
			}
		}

		table.recalculateIndexes();
	};

	table.addRowToTheEnd = function (evt) {
		var r = table.insertRow(-1),
			td,
			aux;
		for (var i = 0; i < maxAmountOfCells; i++) {
			td = new WPTB_Cell(mark);
			r.appendChild(td.getDOMElement());
		}
		aux = Array.from(array[0]);
		array.push(aux);
		drawTable(array);
		table.recalculateIndexes();
		undoSelect();
	};

	table.addRowToTheStart = function (evt) {
		var r = table.insertRow(0);
		for (var i = 0; i < maxAmountOfCells; i++) {
			td = new WPTB_Cell(mark);
			r.appendChild(td.getDOMElement());
		}
		aux = Array.from(array[0]);
		array.push(aux);
		drawTable(array);
		table.recalculateIndexes();
		undoSelect();
	};

	table.addRowBefore = function () {
		var cell = document.querySelector('.wptb-highlighted'),
			row = getCoords(cell)[0],
			r = table.insertRow(row),
			aux,
			rowspans = carriedRowspans(row - 1);

		noPending = rowspans.filter(function (elem) {
			return elem == 0;
		});


		for (var i = 0; i < noPending.length; i++) {
			var td = new WPTB_Cell(mark);
			r.appendChild(td.getDOMElement());
		}

		arr = realTimeArray();

		for (var i = 0; i < arr.length; i++) {

			if (arr[i].length > maxAmountOfCells) {
				//Still not watched
			}

			if (arr[i].length < maxAmountOfCells) {

				for (var j = arr[i].length; j < maxAmountOfCells; j++) {
					td = new WPTB_Cell(mark);
					table.rows[i].appendChild(td.getDOMElement());
				}
			}
		}


		aux = Array.from(array[0]);
		array.push(aux);
		drawTable(array);
		table.recalculateIndexes();
		undoSelect();
	};

	table.addRowAfter = function () {

		var cell = document.querySelector('.wptb-highlighted'),
			row = getCoords(cell)[0],
			r = table.insertRow(row + 1),
			aux,
			rowspans = carriedRowspans(row);

		noPending = rowspans.filter(function (elem) {
			return elem == 0;
		});


		for (var i = 0; i < noPending.length; i++) {
			td = new WPTB_Cell(mark);
			r.appendChild(td.getDOMElement());
		}

		arr = realTimeArray();

		for (var i = 0; i < arr.length; i++) {

			if (arr[i].length > maxAmountOfCells) {
				//Still not watched
			}

			if (arr[i].length < maxAmountOfCells) {

				for (var j = arr[i].length; j < maxAmountOfCells; j++) {
					td = new WPTB_Cell(mark);
					table.rows[i].appendChild(td);
				}
			}
		}


		aux = Array.from(array[0]);
		array.push(aux);
		drawTable(array);
		table.recalculateIndexes();
		undoSelect();
	};

	var isSquare = function (a) {
		var rowStart = -1,
			columnStart = -1,
			rowEnd = -1,
			columnEnd = -1,
			height,
			width,
			itemsEstimate = 0,
			items = 0;

		for (var i = 0; i < a.length; i++) {
			for (var j = 0; j < a[i].length; j++) {
				if (a[i][j] == 1) {
					rowStart = i;
					columnStart = j;
					break;
				}
			}
			if (rowStart !== -1 && columnStart !== -1) {
				break;
			}
		}

		for (var i = a.length - 1; i > -1; i--) {
			for (var j = a[i].length - 1; j > -1; j--) {
				if (a[i][j] == 1) {
					rowEnd = i;
					columnEnd = j;
					break;
				}
			}
			if (rowEnd !== -1 && columnEnd !== -1) {
				break;
			}
		}


		for (var i = rowStart; i < rowEnd; i++) {
			for (var j = columnStart; j < columnEnd; j++) {
				if (a[i][j] == 0 || a[i][j] == undefined) {
					return false;
				}
			}
		}

		for (var i = 0; i < a.length; i++) {
			for (var j = 0; j < a[i].length; j++) {
				if (a[i][j] == 1) {
					items++;
				}
			}
		}

		height = rowEnd - rowStart + 1;
		width = columnEnd - columnStart + 1;
		itemsEstimate = height * width;

		if (itemsEstimate !== items) {
			return false;
		}
		return [height, width];
	};

	var drawTable = function (a) {
		var string = 'DRAWING TABLE:\n';
		for (var i = 0; i < a.length; i++) {

			for (var j = 0; j < a[i].length; j++) {
				string += ' ' + a[i][j];
			}
			string += '\n';
		}
		isSquare(a);
	};

	var undoSelect = function () {
		var tds = table.getElementsByClassName('wptb-highlighted');
		while (tds.length) {
			tds[0].classList.remove('wptb-highlighted');
		}
		for (var i = 0; i < array.length; i++) {

			for (var j = 0; j < array[i].length; j++) {
				array[i][j] = 0;
			}

		}
	};

	var fillTableArray = function () {
		var colspansSums = [], a = [];

		//calculate max amount of cells inside a row
		for (var i = 0; i < table.rows.length; i++) {
			var cells = table.rows[i].getElementsByTagName('td'),
				colspanSumInRow = 0;
			for (var j = 0; j < cells.length; j++) {
				colspanSumInRow += cells[j].colSpan;
			}
			colspansSums.push(colspanSumInRow);
		}

		maxAmountOfCells = Math.max.apply(null, colspansSums);
		//calculate max rows
		var maxAmountOfRows = table.rows.length; /* I'm feeling like I'm gonna go crazy if I don't assume 
			                                                  the table starts having a fixed amount of rows,
			                                                  therefore no matter if I vertically fuse all cells from the
			                                                  first row to the last row, the TR nodes won't dissapear
			                                                  (tough they will run empty after the merging function deletes
			                                                  all of its tds for increasing the first row tds rowspan),
			                                                  so its length remains as a confident max rows amount.
			                                                  */
		// fill with zeros from both values
		for (var i = 0; i < maxAmountOfRows; i++) {
			a[i] = [];
			for (var j = 0; j < maxAmountOfCells; j++) {
				a[i].push(0);
			}
		}
		drawTable(a);
		return a;
	};


	var getCoords = function (search) {
		var skipInCols = [], cell;

		for (var i = 0; i < table.rows.length; i++) {

			var tds = [].slice.call(table.rows[i].getElementsByTagName('td'));

			for (var j = 0; j < maxAmountOfCells;) {

				if (skipInCols[j] !== undefined && skipInCols[j] > 0) {
					j++;
					skipInCols[j]--;
					continue;
				}

				cell = tds.shift();

				if (cell.rowSpan > 1) {
					for (k = 0; k < cell.colSpan; k++) {
						skipInCols[j + k] = cell.rowSpan - 1;
					}
				}

				if (cell == search) {
					return [i, j];
				}

				j += cell.colSpan;

			}
		}
	};

	table.deleteRow = function (e) {
		var cell = document.getElementsByClassName('wptb-highlighted')[0],
			index = cell.dataset.yIndex,
			table = document.getElementsByClassName('wptb-preview-table')[0],
			row = table.getElementsByTagName('tr')[index],
			rowCount = table.rows.length,
			tbody = row.parentNode;
		if ((rowCount == 1 && columnCount == 1) || tbody == undefined) {
			return;
		}
		tbody.removeChild(row);
		this.recalculateIndexes();
	};

	table.deleteColumn = function (e) {
		var cell = document.getElementsByClassName('wptb-highlighted')[0],
			num = cell.dataset.xIndex,
			table = document.getElementsByClassName('wptb-preview-table')[0],
			rowCount = table.rows.length;

		if ((rowCount == 1 && columnCount == 1)) {
			return;
		}
		for (var i = 0; i < rowCount; i++) {
			var td = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[num],
				tr = td.parentNode;
			tr.removeChild(td);
		}
		this.recalculateIndexes();
	};

	table.mergeCells = function () {
		var dimensions = isSquare(array),
			rowspan = dimensions[0],
			colspan = dimensions[1],
			first = document.querySelector('.wptb-highlighted'),
			tds = [].slice.call(document.getElementsByClassName('wptb-highlighted'), 1);

		for (var i = 0; i < tds.length; i++) {
			var p = tds[i].parentNode;
			p.removeChild(tds[i]);
		}

		first.colSpan = colspan;
		first.rowSpan = rowspan;
		undoSelect();
	};

	table.splitCell = function () {
		var cell = document.getElementsByClassName('wptb-highlighted')[0],
			rowspan = cell.rowSpan,
			colspan = cell.colSpan;
		cell.rowSpan = 1;
		cell.colSpan = 1;
		for (var i = 0; i < rowspan; i++) {
			if (i == 0) {
				refCell = cell;
			}
			else {
				for (var k = 0, pt = 0; k < colspan; k += refCell.colSpan, pt++) {
					refCell = table.rows[i].getElementsByTagName('td')[pt];
					if (!refCell) {
						break;
					}
				}
			}

			var p = refCell ? refCell.parentNode : table.rows[i];
			for (var j = 0; j < colspan; j++) {
				if (!i && !j) {
					continue;
				}
				newCell = document.createElement('td');
				newCell.onclick = mark;
				if (refCell && refCell.nextSibling) {
					p.insertBefore(newCell, refCell.nextSibling)
				}
				else {
					p.appendChild(newCell);
				}
				refCell = newCell;
			}
		}
		undoSelect();

	};

	array = fillTableArray();

	wptbTableSetup.appendChild(table);

	table.recalculateIndexes();

	WPTB_LeftPanel();

};