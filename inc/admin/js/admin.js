(function () {

	function detectMode() {
		var url = window.location.href,
		    regex = new RegExp('[?&]table(=([^&#]*)|&|#|$)'),
		    results = regex.exec(url);
		if (!results) return false;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	var WPTB_Builder = function WPTB_Builder() {
		var table_id = detectMode();
		if (table_id) {
			var http = new XMLHttpRequest(),
			    url = ajaxurl + "?action=get_table" + '&id=' + table_id;
			http.open('GET', url, true);
			http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			http.onreadystatechange = function (d) {
				if (this.readyState == 4 && this.status == 200) {
					document.getElementsByClassName('wptb-table-generator')[0].style.display = 'none';
					document.getElementsByClassName('wptb-table-setup')[0].appendChild(WPTB_Parser(http.responseText));
				}
			};
			http.send(null);
		}
		document.counter = new ElementCounters();
		document.select = new MultipleSelect();

		var initializer = WPTB_Initializer();
		settings = WPTB_Settings();
	};

	document.addEventListener('DOMContentLoaded', WPTB_Builder);
})();
var WPTB_Button = function WPTB_Button(text) {

	var DOMElement = document.createElement('div'),
	    elButton2 = document.createElement('div'),
	    el_B = document.createElement('p');

	this.kind = 'button';

	DOMElement.classList.add('wptb-button-container');
	elButton2.classList.add('wptb-button-wrapper');
	el_B.classList.add('wptb-button');
	el_B.classList.add('editable');
	el_B.innerHTML = text != undefined ? text : 'Button Text';
	elButton2.appendChild(el_B);
	DOMElement.appendChild(elButton2);

	this.getDOMElement = function () {
		return DOMElement;
	};

	applyGenericItemSettings(this);

	return this;
};
var WPTB_Cell = function WPTB_Cell(callback, DOMElement) {

    function newElementProxy(el) {
        if (el == 'list') {
            return new WPTB_List();
        } else if (el == 'image') {
            return new WPTB_Image();
        } else if (el == 'text') {
            return new WPTB_Text();
        } else if (el == 'button') {
            return new WPTB_Button();
        }
    }

    function highlightRow(td) {
        var parentRow = td.parentNode,
            columnCount = parseInt(document.getElementById('wptb-columns-number').value),
            tds = document.getElementsByClassName('wptb-preview-table')[0].getElementsByTagName('td');
        for (var i = 0; i < tds.length; i++) {
            tds[i].classList.remove('highlighted-row-first', 'highlighted-row-last', 'highlighted-row-inner', 'highlighted-column-first', 'highlighted-column-last', 'highlighted-column-inner');
        }
        for (var i = 0; i < columnCount; i++) {

            var classToAdd = i == 0 ? 'highlighted-row-first' : i == columnCount - 1 ? 'highlighted-row-last' : 'highlighted-row-inner';
            var ttd = parentRow.getElementsByTagName('td')[i];
            if (ttd !== td) {
                ttd.classList.add(classToAdd);
            }
        }
    }

    function highlightColumn(td) {

        var index,
            parentRow = td.parentNode;
        columnCount = parseInt(document.getElementById('wptb-columns-number').value), rowCount = parseInt(document.getElementById('wptb-rows-number').value), table = document.getElementsByClassName('wptb-preview-table')[0];
        for (var i = 0; i < columnCount; i++) {
            if (parentRow.getElementsByTagName('td')[i] === td) {
                index = i;
                break;
            }
        }

        for (var i = 0; i < rowCount; i++) {
            var classToAdd = i == 0 ? 'highlighted-column-first' : i == rowCount - 1 ? 'highlighted-column-last' : 'highlighted-column-inner';
            var tr = table.getElementsByTagName('tr')[i];
            if (tr.getElementsByTagName('td')[index] !== td) {
                tr.getElementsByTagName('td')[index].classList.add(classToAdd);
            }
        }
    }

    DOMElement = document.createElement("td");

    DOMElement.draggable = false;

    DOMElement.classList.add('wptb-droppable', 'wptb-cell');

    DOMElement.onclick = callback;

    DOMElement.ondragenter = function (e) {
        var div;
        if (!e.dataTransfer.getData('wptbElement') && !e.dataTransfer.getData('node')) {
            return;
        }
        this.classList.add('wptb-drop-here-empty');
    };

    DOMElement.ondragover = function (e) {
        e.preventDefault();
    };

    DOMElement.ondragleave = function () {
        this.classList.remove('wptb-drop-here-empty');
    };

    DOMElement.ondrop = function (e) {
        var element, classId, space, t_space, spaceParent;
        e.preventDefault();
        space = new WPTB_Space();

        if (!e.dataTransfer.getData('wptbElement') && !e.dataTransfer.getData('node')) {
            return;
        }

        if (e.dataTransfer.getData('wptbElement')) {
            element = newElementProxy(e.dataTransfer.getData('wptbElement'));
            if (this.innerHTML == '') {
                this.appendChild(new WPTB_Space());
            }
            this.appendChild(element.getDOMElement());
            this.appendChild(space);
        } else {

            classId = e.dataTransfer.getData('node');
            element = document.getElementsByClassName(classId)[0];
            if (this.innerHTML == '') {
                t_space = element.nextSibling;
                spaceParent = element.parentNode;
                if (t_space != undefined) {
                    spaceParent.removeChild(t_space);
                }
                this.appendChild(new WPTB_Space());
            }
            this.appendChild(element);
            this.appendChild(space);
        }
        this.classList.remove('wptb-drop-here-empty');
        return true;
    };

    this.getDOMElement = function () {
        return DOMElement;
    };

    this.setCoords = function (y, x) {
        var el = this.getDOMElement();
        el.dataset.yIndex = y;
        el.dataset.xIndex = x;
    };

    this.getCoords = function () {
        var coords,
            el = this.getDOMElement();
        coords.x = el.dataset.xIndex;
        coords.y = el.dataset.yIndex;
        return coords;
    };

    this.appendElement = function (node) {
        getDOMElement().appendChild(node);
    };

    return this;
};
var ElementCounters = function ElementCounters() {

	var priv = [];
	priv['text'] = 0;
	priv['image'] = 0;
	priv['list'] = 0;
	priv['button'] = 0;

	this.increment = function (key) {
		if (!(key in priv)) {
			return;
		}
		priv[key]++;
	};

	this.nextIndex = function (key) {
		if (!(key in priv)) {
			return undefined;
		}
		return priv[key] + 1;
	};

	return this;
};
var WPTB_ElementOptions = function WPTB_ElementOptions(element, index) {

    var node = element.getDOMElement(),
        elemIdClass;

    prop = document.querySelector(".wptb-" + element.kind + "-options-prototype").cloneNode(true);
    prop.classList.remove("wptb-" + element.kind + "-options-prototype"); // remove prototype from the class
    elemIdClass = 'wptb-options-' + element.kind + "-" + index;

    var properties = prop.getElementsByClassName('wptb-element-property');

    for (var i = 0; i < properties.length; i++) {
        properties[i].dataset.element = elemIdClass;
    }

    prop.classList.add(elemIdClass);
    document.getElementById("element-options-group").appendChild(prop);

    node.onclick = function () {
        var infArr = this.className.match(/wptb-element-((.+-)\d+)/i),
            optionsClass = '.wptb-' + infArr[2] + 'options' + '.wptb-options-' + infArr[1];

        document.getElementById('add-elements').getElementsByTagName('a')[0].classList.remove('active');
        document.getElementById('element-options').getElementsByTagName('a')[0].classList.add('active');

        document.getElementsByClassName('wptb-elements-container')[0].style.display = 'none';
        document.getElementsByClassName('wptb-settings-section')[0].style.display = 'none';
        document.getElementById("element-options-group").style.display = 'block';

        var children = document.getElementById("element-options-group").childNodes;
        for (var i = 0; i < children.length; i++) {
            if (children[i].style) children[i].style.display = 'none';
        }

        document.querySelector(optionsClass).style.display = 'block';
    };

    if (element.kind == 'button') {
        //We must add this special kind of property, since it is triggered with click event
        var buttons = prop.getElementsByClassName('wptb-btn-size-btn');

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function () {
                var size = this.innerHTML,
                    n_Class = this.dataset.element,
                    infArr = n_Class.match(/wptb-options-(.+)-(\d+)/i),
                    type = infArr[1],
                    num = infArr[2],
                    affectedEl = document.getElementsByClassName('wptb-element-' + type + '-' + num)[0];
                affectedEl.classList.remove('wptb-size-S');
                affectedEl.classList.remove('wptb-size-M');
                affectedEl.classList.remove('wptb-size-L');
                affectedEl.classList.remove('wptb-size-XL');
                affectedEl.classList.add('wptb-size-' + size);
                var b = prop.getElementsByClassName('wptb-btn-size-btn');
                for (var i = 0; i < b.length; i++) {
                    b[i].classList.remove('selected');
                }
                this.classList.add('selected');
            };
        }
    }

    var optionControls = prop.getElementsByClassName('wptb-element-property');

    for (var i = 0; i < optionControls.length; i++) {
        if (optionControls[i].classList.contains('wptb-color-picker')) {
            jQuery(optionControls[i]).wpColorPicker({
                change: function change(event, ui) {
                    var parent = event.target,
                        classe,
                        type,
                        ps,
                        number;
                    classe = parent.dataset.element.match(/wptb-options-(.+)-(\d+)/i);
                    type = classe[1];
                    number = classe[2];
                    affectedEl = document.getElementsByClassName('wptb-element-' + type + '-' + number)[0];
                    if (type == 'button') {
                        affectedEl.getElementsByClassName('wptb-button')[0].style.backgroundColor = ui.color.toString();
                    } else {
                        ps = affectedEl.getElementsByTagName("p");
                        for (var i = 0; i < ps.length; i++) {
                            ps[i].style.color = ui.color.toString();
                        }
                    }
                }
            });
        }

        if (optionControls[i].dataset.type === 'font-size') {
            var slider = optionControls[i].parentNode.parentNode.getElementsByClassName('wptb-text-font-size-slider')[0];
            slider.oninput = function () {
                this.parentNode.parentNode.getElementsByClassName('wptb-text-font-size-number')[0].value = this.value;
                this.parentNode.parentNode.getElementsByClassName('wptb-text-font-size-number')[0].onchange();
            };
        }

        optionControls[i].onchange = function (event) {

            var n_Class = this.dataset.element,
                infArr = n_Class.match(/wptb-options-(.+)-(\d+)/i),
                type = infArr[1],
                num = infArr[2],
                affectedEl = document.getElementsByClassName('wptb-element-' + type + '-' + num)[0],
                val = this.value;

            switch (this.dataset.type) {
                case 'src':
                    var img = affectedEl.getElementsByTagName("img")[0];
                    img.src = this.value;
                    break;
                case 'alternative-text':
                    var img = affectedEl.getElementsByTagName("img")[0];
                    img.alt = this.value;
                    break;
                case 'image-width':
                    var img = affectedEl.getElementsByTagName("img")[0];
                    img.width = this.value;
                    break;
                case 'image-height':
                    var img = affectedEl.getElementsByTagName("img")[0];
                    img.height = this.value;
                    break;
                case 'font-size':
                    var ps = affectedEl.getElementsByTagName("p");
                    for (var i = 0; i < ps.length; i++) {
                        ps[i].style.fontSize = val + 'px';
                    }
                    this.parentNode.parentNode.getElementsByClassName('wptb-text-font-size-slider')[0].value = this.value;
                    break;
                case 'color':
                    var ps = affectedEl.getElementsByTagName("p");
                    for (var i = 0; i < ps.length; i++) {
                        ps[i].style.color = val;
                    }
                    break;
                case 'button-color':
                    break;
                case 'list-class':
                    if (val == 'unordered') {
                        event.target.parentNode.parentNode.querySelector('[data-type=list-style-type]').parentNode.style.display = 'flex';
                        var bullets = affectedEl.querySelectorAll('article .wptb-list-item-style-dot li');
                        for (var i = 0; i < bullets.length; i++) {
                            bullets[i].style.listStyleType = 'disc';
                        }
                        document.querySelector('[data-type=list-style-type]').value = 'disc';
                    } else {
                        event.target.parentNode.parentNode.querySelector('[data-type=list-style-type]').parentNode.style.display = 'none';
                        var bullets = affectedEl.querySelectorAll('article .wptb-list-item-style-dot li');
                        for (var i = 0; i < bullets.length; i++) {
                            bullets[i].style.listStyleType = 'decimal';
                        }
                    }
                    break;
                case 'list-style-type':
                    var bullets = affectedEl.querySelectorAll('article .wptb-list-item-style-dot li');
                    for (var i = 0; i < bullets.length; i++) {
                        bullets[i].style.listStyleType = val.toLowerCase();
                    }
                    break;
            }
        };
    }
};
var WPTB_Image = function WPTB_Image(src) {

	var DOMElement = document.createElement('div'),
	    img = document.createElement('img');

	this.kind = 'image';

	DOMElement.appendChild(img);

	this.getDOMElement = function () {
		return DOMElement;
	};
	applyGenericItemSettings(this);

	file_frame = wp.media.frames.file_frame = wp.media({
		title: 'Select a image to upload',
		button: {
			text: 'Use this image'
		},
		multiple: false
	});
	// When an image is selected, run a callback.
	file_frame.on('select', function () {
		attachment = file_frame.state().get('selection').first().toJSON();
		img.src = attachment.url;
	});
	// Finally, open the modal
	if (src == undefined) {
		file_frame.open();
	} else {
		img.src = src;
	}

	return this;
};
var WPTB_Initializer = function WPTB_Initializer() {

	var MIN_COLUMNS = 1,
	    MIN_ROWS = 1,
	    MAX_COLUMNS = 10,
	    MAX_ROWS = 10;

	var tableGenerator = document.body;
	columnsDecrementButton = tableGenerator.getElementsByClassName('wptb-input-number-decrement')[0], columnsIncrementButton = tableGenerator.getElementsByClassName('wptb-input-number-increment')[0], rowsDecrementButton = tableGenerator.getElementsByClassName('wptb-input-number-decrement')[1], rowsIncrementButton = tableGenerator.getElementsByClassName('wptb-input-number-increment')[1], columnsInput = document.getElementById('wptb-columns-number'), rowsInput = document.getElementById('wptb-rows-number');

	columnsDecrementButton.onclick = function () {
		if (columnsInput.value > MIN_COLUMNS) {
			columnsInput.value--;
		}
	};

	columnsIncrementButton.onclick = function () {
		if (columnsInput.value < MAX_COLUMNS) {
			columnsInput.value++;
		}
	};

	rowsDecrementButton.onclick = function () {
		if (rowsInput.value > MIN_ROWS) {
			rowsInput.value--;
		}
	};

	rowsIncrementButton.onclick = function () {
		if (rowsInput.value < MAX_ROWS) {
			rowsInput.value++;
		}
	};

	document.getElementById('wptb-generate-table').onclick = function () {
		var columns = document.getElementById('wptb-columns-number').value,
		    rows = document.getElementById('wptb-rows-number').value;

		WPTB_Table(columns, rows);
	};
};
var WPTB_LeftPanel = function WPTB_LeftPanel() {

    var table = document.getElementsByClassName('wptb-preview-table')[0],
        wptbElementButtons = document.getElementsByClassName('wptb-element');

    jQuery('#wptb-even-row-bg').wpColorPicker({
        change: function change(event, ui) {
            var tableRows = table.getElementsByTagName('tr');
            for (var i = 1; i < tableRows.length; i += 2) {
                tds = tableRows[i].getElementsByTagName('td');
                for (var j = 0; j < tds.length; j++) {
                    tds[j].style.backgroundColor = ui.color.toString();
                }
            }
        }
    });

    jQuery('#wptb-odd-row-bg').wpColorPicker({
        change: function change(event, ui) {
            var tableRows = table.getElementsByTagName('tr');
            for (var i = 2; i < tableRows.length; i += 2) {
                tds = tableRows[i].getElementsByTagName('td');
                for (var j = 0; j < tds.length; j++) {
                    tds[j].style.backgroundColor = ui.color.toString();
                }
            }
        }
    });

    jQuery('#wptb-table-header-bg').wpColorPicker({
        change: function change(event, ui) {
            var tableHeader = table.getElementsByTagName('tr')[0],
                tds = tableHeader.getElementsByTagName('td');
            for (var j = 0; j < tds.length; j++) {
                tds[j].style.backgroundColor = ui.color.toString();
            }
        }
    });

    function addInnerBorderSize(value) {
        var tableCells = table.getElementsByTagName('td');
        for (var i = 0; i < tableCells.length; i++) {
            tableCells[i].style.border = value + 'px solid';
        }
    }

    function addCellPadding(value) {
        var tableCells = table.getElementsByTagName('td');
        for (var i = 0; i < tableCells.length; i++) {
            tableCells[i].style.padding = value + 'px';
        }
    }

    function addInnerBorder(checked) {
        var styles;

        if (checked == 'checked') {
            document.getElementById('wptb-apply-inner-border').style.marginBottom = '0px';
            var tableCells = document.getElementsByClassName('wptb-preview-table')[0].getElementsByTagName('td');
            for (var i = 0; i < tableCells.length; i++) {
                tableCells[i].style.border = '1px solid';
            }

            document.getElementById('wptb-inner-border-settings').classList.add('visible');
        } else {
            document.getElementById('wptb-inner-border-settings').classList.remove('visible');
            var tableCells = document.getElementsByClassName('wptb-preview-table')[0].getElementsByTagName('td');
            for (var i = 0; i < tableCells.length; i++) {
                tableCells[i].style.border = '';
            }
        }
    }

    function addBorderSize(value) {
        table.style.border = value + 'px solid';
    }

    document.getElementById('wptb-table-cell-slider').oninput = function () {
        document.getElementById('wptb-table-cell-number').value = this.value;
        addCellPadding(this.value);
    };

    document.getElementById('wptb-table-cell-number').onchange = function () {
        document.getElementById('wptb-table-cell-slider').value = this.value;
        addCellPadding(this.value);
    };

    document.getElementById('wptb-table-border-slider').oninput = function () {
        document.getElementById('wptb-table-border-number').value = this.value;
        addBorderSize(this.value);
    };

    document.getElementById('wptb-table-border-number').onchange = function () {
        document.getElementById('wptb-table-border-slider').value = this.value;
        addBorderSize(this.value);
    };

    document.getElementById('wptb-table-inner-border-slider').oninput = function () {
        document.getElementById('wptb-table-inner-border-number').value = this.value;
        addInnerBorderSize(this.value);
    };

    document.getElementById('wptb-table-inner-border-number').onchange = function () {
        document.getElementById('wptb-table-inner-border-slider').value = this.value;
        addInnerBorderSize(this.value);
    };

    document.getElementById('wptb-inner-border-check').onchange = function () {
        var _val = this.checked ? 'checked' : 'unchecked';
        addInnerBorder(_val);
    };

    for (var i = 0; i < wptbElementButtons.length; i++) {
        wptbElementButtons[i].ondragstart = function (e) {
            e.dataTransfer.setData('wptbElement', this.dataset.wptbElement);
        };
    }

    document.getElementById('wptb-activate-cell-management-mode').onclick = table.toggleTableEditMode;
    document.getElementById('wptb-add-end-row').onclick = table.addRowToTheEnd;
    document.getElementById('wptb-add-start-row').onclick = table.addRowToTheStart;
    document.getElementById('wptb-add-row-before').onclick = table.addRowBefore;
    document.getElementById('wptb-add-row-after').onclick = table.addRowAfter;
    document.getElementById('wptb-add-end-column').onclick = table.addColumnEnd;
    document.getElementById('wptb-add-start-column').onclick = table.addColumnStart;
    document.getElementById('wptb-add-column-before').onclick = table.addColumnBefore;
    document.getElementById('wptb-add-column-after').onclick = table.addColumnAfter;
    //document.getElementById('wptb-delete-column').onclick = table.deleteColumn;
    //document.getElementById('wptb-delete-row').onclick = table.deleteRow;
    document.getElementById('wptb-merge-cells').onclick = table.mergeCells;
    document.getElementById('wptb-split-cell').onclick = table.splitCell;
    document.getElementById('add-elements').onclick = function () {
        document.getElementById('element-options').getElementsByTagName('a')[0].classList.remove('active');
        document.getElementById('add-elements').getElementsByTagName('a')[0].classList.add('active');
        document.getElementsByClassName('wptb-elements-container')[0].style.display = 'table';
        document.getElementsByClassName('wptb-settings-section')[0].style.display = 'block';
        document.getElementById("element-options-group").style.display = 'none';
    };
};
var WPTB_List = function WPTB_List(innerElements) {

    var el_L = document.createElement('ul'),
        item,
        DOMElement = document.createElement('div');

    this.kind = 'list';

    if (!innerElements) for (var i = 0; i < 3; i++) {
        item = new WPTB_ListItem('List Item ' + (i + 1));
        el_L.appendChild(item.getDOMElement());
    } else {
        for (var i = 0; i < innerElements.length; i++) {
            item = new WPTB_ListItem(innerElements[i]);
            el_L.appendChild(item.getDOMElement());
        }
    }
    DOMElement.appendChild(el_L);
    //window.addElementOptions('list', elList);

    this.getDOMElement = function () {
        return DOMElement;
    };
    applyGenericItemSettings(this);

    return this;
};
var WPTB_ListItem = function WPTB_ListItem(text) {

    if (text == undefined) text = 'New List Item';
    var DOMElement = document.createElement('article'),
        divdot = document.createElement('div'),
        divcontent = document.createElement('div'),
        libullet = document.createElement('li');
    divdot.classList.add('wptb-list-item-style-dot');
    divcontent.classList.add('wptb-list-item-content');
    libullet.classList.add('wptb-bullet');
    DOMElement.appendChild(divdot);
    DOMElement.appendChild(divcontent);
    divdot.appendChild(libullet);
    divcontent.innerHTML = text;
    divcontent.onkeyup = window.listItemKeyListener;

    DOMElement.onmouseenter = function (event) {

        var btnDelete = document.createElement('span'),
            btnCopy = document.createElement('span'),
            actions = document.createElement('span'),
            previous,
            i;
        actions.classList.add('wptb-actions');
        btnDelete.classList.add('dashicons', 'dashicons-trash', 'delete-action');
        btnCopy.classList.add('dashicons', 'dashicons-admin-page', 'duplicate-action');
        this.classList.add('wptb-directlyhovered');

        btnDelete.onclick = function () {
            var item = this.parentNode.parentNode,
                parent = item.parentNode;
            parent.removeChild(item);
        };

        btnCopy.onclick = function (event) {
            var article = event.target.parentNode.parentNode,
                content = article.querySelector('.wptb-list-item-content'),
                html = content.innerHTML;
            var duplicate = new WPTB_ListItem(html);
            article.parentNode.appendChild(duplicate.getDOMElement());
        };

        actions.append(btnCopy, btnDelete);
        this.appendChild(actions);
    };

    DOMElement.onmouseleave = function (event) {
        this.classList.remove('wptb-directlyhovered');
        var actions = this.parentNode.querySelector('.wptb-actions');
        if (actions != undefined) {
            var parent = actions.parentNode;
            parent.removeChild(actions);
        }
    };

    divcontent.onkeydown = function (event) {
        var key = event.which != undefined ? event.which : event.keyCode,
            duplicate,
            lastP;
        if (key !== 13 || window.dontAddItems !== undefined && window.dontAddItems === true) {
            return;
        }
        event.preventDefault();
        duplicate = new WPTB_ListItem(this.innerHTML);
        DOMElement.parentNode.insertBefore(duplicate.getDOMElement(), DOMElement);
        divcontent.innerHTML = 'New List Item';
        duplicate.getDOMElement().querySelector('.wptb-list-item-content').focus();

        return false;
    };

    this.getDOMElement = function () {
        return DOMElement;
    };

    return this;
};
var MultipleSelect = function MultipleSelect() {

	var selectedCells = [],
	    multipleCellMode = false;

	this.activateMultipleSelectMode = function () {
		selectedCells = [];
		var tds = document.getElementsByClassName('wptb-preview-table')[0].getElementsByTagName('td');
		for (var i = 0; i < tds.length; i++) {
			tds[i].classList.remove('wptb-highlighted');
		}
		multipleCellMode = true;
	};

	this.deactivateMultipleSelectMode = function () {
		multipleCellMode = false;
	};

	this.isActivated = function () {
		return multipleCellMode;
	};

	this.pushSelectedCell = function (cell) {
		if (!multipleCellMode) {
			return;
		}
		selectedCells.push(cell);
		cell.classList.add('wptb-highlighted');
	};

	this.selectedCells = function () {
		return selectedCells;
	};

	this.flushSelectedCells = function () {
		selectedCells = [];
	};

	this.getFirst = function () {
		var minXIndex = 1000,
		    minYIndex = 1000,
		    first;
		for (var i = selectedCells.length - 1; i >= 0; i--) {
			if (minXIndex >= selectedCells[i].dataset.xIndex && minYIndex >= selectedCells[i].dataset.yIndex) {
				first = selectedCells[i];
				minXIndex = selectedCells[i].dataset.xIndex;
				minYIndex = selectedCells[i].dataset.yIndex;
			}
		}
		return first;
	};

	this.getLast = function () {
		var maxXIndex = -1,
		    maxYIndex = -1,
		    last;
		for (var i = selectedCells.length - 1; i >= 0; i--) {
			if (maxXIndex <= selectedCells[i].dataset.xIndex && maxYIndex <= selectedCells[i].dataset.yIndex) {
				last = selectedCells[i];
				maxXIndex = selectedCells[i].dataset.xIndex;
				maxYIndex = selectedCells[i].dataset.yIndex;
			}
		}
		return last;
	};

	this.removeAllButFirst = function () {
		var td = this.getFirst();
		for (var i = 1; i < selectedCells.length; i++) {
			selectedCells[i].classList.add('wptb-fused-cell-' + td.dataset.xIndex + '-' + td.dataset.yIndex);
		}
	};

	return this;
};
var WPTB_Parser = function WPTB_Parser(code) {

	var node,
	    pos = 0;

	function getChar() {
		if (pos >= code.length) {
			return -1;
		}
		return code[pos++];
	}

	function getToken() {
		var char = getChar(),
		    token = char;

		if (char !== '[') {
			return;
		}

		do {
			char = getChar();
			if (char === -1) {
				return -1;
			}
			token += char;
		} while (char != ']');

		ctoken = token;

		return true;
	}

	function getCurrentToken() {
		return ctoken;
	}

	function getExpectedToken(expected) {
		if (getWordFromToken(ctoken) !== expected) {
			throw 'There was an error with the file and therefore the table could not be rendered';
		}
		getToken();
	}

	function getWordFromToken(token) {
		var p = token.indexOf(' '),
		    word = token.substring(1, p);
		if (p == -1) {
			//This is, if token tag has no attributes
			return token;
		}
		return '[' + word + ']';
	}

	function getAttributesFromToken() {
		var elems = ctoken.split(' '),
		    pair,
		    key,
		    value,
		    attr = [];

		for (var i = 1; i < elems.length; i++) {
			pair = elems[i].trim().split('=');
			key = pair[0];
			value = pair[1].substring(1, pair[1].length - 1);
			attr[key] = value;
		}

		return attr;
	}

	function parseAllHTML() {
		var html = '';
		pos--;

		do {
			char = getChar();
			if (char === -1) {
				return -1;
			}
			html += char;
		} while (char != '[');

		html = html.substring(0, html.length - 1);

		pos--;

		return html;
	}

	function analizeElement() {
		var t = getWordFromToken(getCurrentToken()),
		    html,
		    node;

		switch (t) {
			case '[text]':
				attr = getAttributesFromToken();
				getExpectedToken('[text]');
				html = parseAllHTML();
				node = new WPTB_Text(html);
				getToken();
				getExpectedToken('[/text]');
				break;
			case '[button]':
				attr = getAttributesFromToken();
				getExpectedToken('[button]');
				html = parseAllHTML();
				node = new WPTB_Button(html);
				getToken();
				getExpectedToken('[/button]');
				break;
			case '[img]':
				attr = getAttributesFromToken();
				node = new WPTB_Image(attr['src']);
				getExpectedToken('[img]');
				break;
		}

		return node.getDOMElement();
	}

	function analizeElements(td) {
		do {
			td.appendChild(analizeElement());
		} while (getCurrentToken() == '[image]' || getCurrentToken() == '[text]' || getCurrentToken() == '[list]' || getCurrentToken() == '[button]');
	}

	function analizeRows(tableNode) {
		do {
			var tr = tableNode.insertRow();
			tr.classList.add('wptb-row');
			getExpectedToken('[tr]');
			analizeTds(tr);
			getExpectedToken('[/tr]');
		} while (getWordFromToken(getCurrentToken()) === '[tr]');
	}

	function analizeTd() {
		var td = new WPTB_Cell();
		getExpectedToken('[td]');
		analizeElements(td.getDOMElement());
		getExpectedToken('[/td]');
		return td.getDOMElement();
	}

	function analizeTds(row) {
		do {
			row.appendChild(analizeTd());
		} while (getCurrentToken() == '[td]');
	}

	function analizeHeader(tableNode) {
		var header = tableNode.insertRow();
		header.classList.add('wptb-row', 'wptb-table-head');
		getExpectedToken('[tr]');
		analizeTds(header);
		getExpectedToken('[/tr]');
	}

	function analizeRoot() {
		getToken();
		var n = document.createElement('table');
		n.classList.add('wptb-preview-table');
		getExpectedToken('[table]');
		analizeHeader(n);
		analizeRows(n);
		getExpectedToken('[/table]');
		return n;
	}

	node = analizeRoot();

	return node;
};
var WPTB_Settings = function WPTB_Settings() {

	var elems = document.getElementsByClassName('wptb-element');

	for (var i = 0; i < elems.length; i++) {
		elems[i].ondragstart = function (event) {
			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
		};
	};

	document.getElementsByClassName('wptb-save-btn')[0].onclick = function () {
		var http = new XMLHttpRequest(),
		    url = ajaxurl + "?action=save_table",
		    t = document.getElementById('wptb-setup-name').value.trim(),
		    messagingArea,
		    code = WPTB_Stringifier(document.getElementsByClassName('wptb-preview-table')[0]);

		if (t === '') {
			messagingArea = document.getElementsByClassName('wptb-messaging')[0];
			messagingArea.innerHTML = 'Error: You must assign a name to the table before saving it.';
			messagingArea.classList.add('warning');
			setTimeout(function () {
				messagingArea.classList.remove('warning');
			}, 5000);
		}

		var params = 'title=' + t + '&content=' + code;
		http.open('POST', url, true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function (d) {
			if (this.readyState == 4 && this.status == 200) {
				messagingArea = document.getElementById('wptb-messaging-area');
				messagingArea.innerHTML = 'Success: table "' + t + '" was successfully saved.';
				messagingArea.classList.add('success');
				setTimeout(function () {
					messagingArea.classList.remove('success');
				}, 5000);
			}
		};
		http.send(params);
	};
};
var WPTB_Space = function WPTB_Space(text) {

    function newElementProxy(el) {
        if (el == 'list') {
            return new WPTB_List();
        } else if (el == 'image') {
            return new WPTB_Image();
        } else if (el == 'text') {
            return new WPTB_Text();
        } else if (el == 'button') {
            return new WPTB_Button();
        }
    }

    spaceBetween = document.createElement('div'), spaceBetween.classList.add('wptb-space-between');

    spaceBetween.ondragenter = function () {
        this.classList.add('visible');
    };
    spaceBetween.ondragover = function (event) {
        event.preventDefault();
    };

    spaceBetween.ondragleave = function () {
        this.classList.remove('visible');
    };

    spaceBetween.ondrop = function (event) {
        event.stopPropagation();

        var p = event.target.nextSibling,
            td = event.target,
            element,
            t_space,
            spaceParent;

        while (!td.classList.contains('wptb-droppable')) {
            td = td.parentNode;
        }

        if (event.dataTransfer.getData('wptbElement')) {
            element = newElementProxy(event.dataTransfer.getData('wptbElement'));
            this.classList.remove('visible');

            if (p == null) {
                td.appendChild(element.getDOMElement());
                td.appendChild(new WPTB_Space());
            } else {
                td.insertBefore(element.getDOMElement(), p);
                td.insertBefore(new WPTB_Space(), p);
            }
        } else {
            element = document.getElementsByClassName(event.dataTransfer.getData('node'))[0];

            t_space = element.nextSibling;
            spaceParent = element.parentNode;
            if (t_space != undefined) {
                spaceParent.removeChild(t_space);
            }

            if (p == null) {
                td.appendChild(element);
                td.appendChild(new WPTB_Space());
            } else {
                td.insertBefore(element, p);
                td.insertBefore(new WPTB_Space(), p);
            }
        }
        this.classList.remove('visible');
    };

    return spaceBetween;
};
var WPTB_Stringifier = function WPTB_Stringifier(node) {

	if (node == undefined || node.tagName == undefined) {
		return '';
	}

	var code = '',
	    children = node.childNodes,
	    padding,
	    margin,
	    bg1,
	    bg2,
	    bg3,
	    border,
	    colSpan,
	    rowSpan,
	    isHidden,
	    // Table Attributes
	listClass,
	    listStyleType,
	    //list attributes
	buttonSize,
	    buttonColor,
	    buttonBorder,
	    //button attributes
	fontSize,
	    fontColor,
	    fontFamily,
	    //text attributes
	src,
	    width,
	    height,
	    //image attributes
	additionalCSS,
	    additionalClass,
	    additionalID; // A few global attributes I wanted to add.

	switch (node.tagName.toLowerCase()) {
		case 'table':
			border = node.style.borderSize;
			margin = node.getElementsByTagName('td')[0].style.margin;
			padding = node.getElementsByTagName('td')[0].style.padding;
			innerBorder = node.getElementsByTagName('td')[0].style.borderSize;
			bg1 = node.rows[0].getElementsByTagName('td')[0].style.backgroundColor;

			if (node.rows.length > 1) {
				bg2 = node.rows[1].getElementsByTagName('td')[0].style.backgroundColor;
			}
			if (node.rows.length > 2) {
				bg3 = node.rows[2].getElementsByTagName('td')[0].style.backgroundColor;
			}
			code += '[table' + (margin != undefined && margin != '' ? ' margin="' + margin + '"' : '') + (padding != undefined && padding != '' ? ' padding="' + padding + '"' : '') + (innerBorder != undefined ? ' inner-border="' + innerBorder + '"' : '') + (bg1 != undefined ? ' data-bg1="' + bg1 + '"' : '') + (bg2 != undefined ? ' data-bg2="' + bg2 + '"' : '') + (bg3 != undefined ? ' data-bg3="' + bg3 + '"' : '') + ']';

			for (var i = 0; i < children.length; i++) {
				code += WPTB_Stringifier(children[i]);
			}

			code += '[/table]';
			break;
		case 'tbody':
			for (var i = 0; i < children.length; i++) {
				code += WPTB_Stringifier(children[i]);
			}
			break;
		case 'tr':
			code += '[tr]';

			for (var i = 0; i < children.length; i++) {
				code += WPTB_Stringifier(children[i]);
			}

			code += '[/tr]';
			break;
		case 'td':
			colspan = node.colSpan;
			rowspan = node.rowSpan;
			isHidden = node.classList.contains(/^wptb-fused-cell-(\d+)$/);
			code += '[td' + (colspan != undefined && colspan > 1 ? ' colspan="' + colspan + '"' : '') + (rowspan != undefined && rowspan > 1 ? ' rowspan="' + rowspan + '"' : '') + (isHidden ? ' hidden="true"' : '') + ']';

			for (var i = 0; i < children.length; i++) {
				code += WPTB_Stringifier(children[i]);
			}

			code += '[/td]';
			break;
		case 'div':
			if (node.classList.contains('wptb-ph-element')) {

				var infArr = node.className.match(/wptb-element-(.+)-(\d+)/i),
				    optionsClass,
				    trueNode,
				    nodeContent;
				if (infArr == undefined) {
					return;
				}
				switch (infArr[1]) {
					case 'list':
						trueNode = node.getElementsByTagName('ul')[0];
						if (!trueNode) {
							return ''; //We ignore the node in case of error
						}

						listStyleType = trueNode.getElementsByTagName('li')[0].style.listStyleType;
						listClass = listStyleType == 'decimal' ? 'numbered' : 'unordered';

						code += '[list' + (listClass != undefined ? ' class="' + listClass + '"' : 'class="unordered"') + (listStyleType != undefined ? ' style-type="' + listStyleType + '"' : '') + ']';
						listitems = trueNode.getElementsByTagName('article');
						for (var i = 0; i < listitems.length; i++) {
							code += '[item]';
							code += listitems[i].getElementsByClassName('wptb-list-item-content')[0].innerHTML;
							code += '[/item]';
						}
						code += '[/list]';
						break;
					case 'image':

						trueNode = node.getElementsByTagName('img')[0];
						if (!trueNode) {
							return ''; //We ignore the node in case of error
						}
						src = trueNode.src;
						width = trueNode.width;
						height = trueNode.height;
						alt = trueNode.alt;
						code += '[img' + (src != undefined ? ' src="' + src + '"' : '') + (width != undefined ? ' width="' + width + '"' : '') + (height != undefined ? ' height="' + height + '"' : '') + ']';
						break;
					case 'text':
						trueNode = node.getElementsByClassName('editable')[0];
						if (!trueNode) {
							return ''; //We ignore the node in case of error
						}
						fontSize = trueNode.getElementsByTagName('p')[0].style.fontSize;
						fontColor = trueNode.getElementsByTagName('p')[0].style.color;
						code += '[text' + (fontSize != undefined ? ' size="' + fontSize + '"' : '') + (fontColor != undefined ? ' color="' + fontColor + '"' : '') + ']';
						code += trueNode.innerHTML;
						code += '[/text]';
						break;
					case 'button':
						trueNode = node.getElementsByClassName('editable')[0];
						if (!trueNode) {
							return ''; //We ignore the node in case of error
						}

						buttonColor = trueNode.style.backgroundColor;
						buttonSize = node.className.match(/wptb-size-(.+)/i)[1];

						code += '[button' + (buttonColor != undefined ? ' color="' + buttonColor + '"' : '') + (buttonSize != undefined ? ' size="' + buttonSize + '"' : '') + ']';
						code += trueNode.innerHTML;
						code += '[/button]';
						break;
				}
			} else {
				return '';
			}
			break;
		default:
			code += '';
			break;
	}

	if (node.nextSibling != undefined) {
		WPTB_Stringifier(node.nextSibling);
	}

	return code;
};
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var array = [],
    WPTB_Table = function WPTB_Table(columns, rows) {

	var settings = document.getElementsByClassName('wptb-settings-items'),
	    wptbTableSetup = document.getElementsByClassName("wptb-table-setup")[0],
	    table,
	    row,
	    cell,
	    maxAmountOfCells,
	    maxAmountOfRows;

	var mark = function mark(event) {
		var rs = this.rowSpan,
		    cs = this.colSpan,
		    markedCells,
		    noCells = document.getElementsByClassName('no-cell-action'),
		    singleCells = document.getElementsByClassName('single-action'),
		    multipleCells = document.getElementsByClassName('multiple-select-action'),
		    position = getCoords(this),
		    row = position[0],
		    column = position[1];
		if (!document.select.isActivated()) {
			return;
		}
		if (this.className.match(/wptb-highlighted/)) {
			this.classList.remove('wptb-highlighted');
			for (var i = 0; i < rs; i++) {
				for (var j = 0; j < cs; j++) {
					array[row + i][column + j] = 0;
				}
			}
		} else {
			this.classList.add('wptb-highlighted');
			for (var i = 0; i < rs; i++) {
				for (var j = 0; j < cs; j++) {
					array[row + i][column + j] = 1;
				}
			}
		}

		markedCells = document.getElementsByClassName('wptb-highlighted').length;
		if (markedCells === 0) {
			for (var i = 0; i < multipleCells.length; i++) {
				multipleCells[i].classList.remove('visible');
			}
			for (var i = 0; i < noCells.length; i++) {
				noCells[i].classList.add('visible');
			}
			for (var i = 0; i < singleCells.length; i++) {
				singleCells[i].classList.remove('visible');
			}
		} else if (markedCells === 1) {
			for (var i = 0; i < multipleCells.length; i++) {
				multipleCells[i].classList.remove('visible');
			}
			for (var i = 0; i < noCells.length; i++) {
				noCells[i].classList.remove('visible');
			}
			for (var i = 0; i < singleCells.length; i++) {
				singleCells[i].classList.add('visible');
			}
		} else {
			for (var i = 0; i < multipleCells.length; i++) {
				if (table.isSquare(array)) {
					multipleCells[i].classList.add('visible');
				} else {
					multipleCells[i].classList.remove('visible');
				}
			}
			for (var i = 0; i < noCells.length; i++) {
				noCells[i].classList.remove('visible');
			}
			for (var i = 0; i < singleCells.length; i++) {
				singleCells[i].classList.remove('visible');
			}
		}
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

	var realTimeArray = function realTimeArray() {
		var carried = [],
		    tds,
		    cols,
		    matriz = [];

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
				if (_typeof(carried[k]) == 'object' && carried[k].amount > 0) {

					carried[k].amount--;

					if (carried[k].justAssigned) {
						carried[k].justAssigned = false;
					} else {
						cols.push(1);
					}
				}
			}

			matriz.push(cols);
		}
		return matriz;
	};

	var carriedRowspans = function carriedRowspans(row) {
		var carried = [],
		    tds,
		    cols;

		for (var i = 0; i < maxAmountOfCells; i++) {
			carried[i] = 0;
		}

		if (row == -1) {
			return carried;
		}

		for (var i = 0; i <= row; i++) {
			bufferDeCeldas = table.rows[i].getElementsByTagName('td');
			punteroDeCelda = 0;

			for (var posicionEnPuntos = 0; posicionEnPuntos < maxAmountOfCells; posicionEnPuntos += desplazamiento) {
				desplazamiento = 1;

				if (carried[posicionEnPuntos]) {
					carried[posicionEnPuntos]--;
				} else {
					celda = bufferDeCeldas[punteroDeCelda++];
					if (celda.rowSpan > 1) {
						for (k = 0; k < celda.colSpan; k++) {
							carried[posicionEnPuntos + k] = celda.rowSpan - 1;
						}
						desplazamiento = celda.colSpan;
					} else if (celda.colSpan > 1) {
						desplazamiento = celda.colSpan;
					}
				}
			}
		}
		return carried;
	};

	table.toggleTableEditMode = function () {
		var bar = document.getElementById('edit-bar');
		if (bar.classList.contains('visible')) {
			document.select.deactivateMultipleSelectMode();
			bar.classList.remove('visible');
		} else {
			document.select.activateMultipleSelectMode();
			bar.classList.add('visible');
		}
	};

	table.recalculateIndexes = function () {
		var trs = this.getElementsByTagName('tr'),
		    tds,
		    maxCols = 0;

		for (var i = 0; i < trs.length; i++) {
			tds = trs[i].getElementsByTagName('td');
			for (var j = 0; j < tds.length; j++) {

				if (i == 0) {
					tds[j].parentNode.className = '';
					tds[j].parentNode.classList.add('wptb-row', 'wptb-table-head');
				} else {
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
	};

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
			} else {
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

		if (pos === 0) {
			table.addColumnStart();
		} else {
			table.addColumnAfter(pos - 1);
		}
	};

	table.addColumnAfter = function (c_pos) {
		var rows = table.rows,
		    bufferDeCeldas,
		    cell = document.querySelector('.wptb-highlighted'),
		    pos = c_pos != undefined && typeof c_pos === 'number' ? c_pos : getCoords(cell)[1],
		    insercionPendiente = false,
		    desplazamiento,
		    td,
		    bro,
		    carriedRowspans = [],
		    currentCell;

		for (var i = 0; i < maxAmountOfCells; i++) {
			carriedRowspans.push(0);
		}

		for (var i = 0; i < rows.length; i++) {
			punteroDeCelda = 0;
			bufferDeCeldas = rows[i].getElementsByTagName('td');
			insercionPendiente = false;
			for (var posicionEnPuntos = 0; posicionEnPuntos < maxAmountOfCells; posicionEnPuntos += desplazamiento) {
				desplazamiento = 1;

				if (insercionPendiente) {
					td = new WPTB_Cell(mark);
					td.getDOMElement().style.backgroundColor = 'black';

					if (currentCell && rows[i].contains(currentCell)) {
						bro = currentCell.nextSibling;
						if (bro) {
							rows[i].insertBefore(td.getDOMElement(), bro);
						} else {
							rows[i].appendChild(td.getDOMElement());
						}
					} else {
						rows[i].insertBefore(td.getDOMElement(), bufferDeCeldas[0]);
					}
					break;
				} else if (carriedRowspans[posicionEnPuntos] > 0) {
					if (pos == posicionEnPuntos) {
						insercionPendiente = true;
					}
				} else {
					currentCell = bufferDeCeldas[punteroDeCelda++];
					if (currentCell.rowSpan > 1) {
						desplazamiento = currentCell.colSpan;
						for (var k = 0; k < currentCell.colSpan; k++) {
							carriedRowspans[posicionEnPuntos + k] = currentCell.rowSpan;
							if (posicionEnPuntos + k == pos) {
								insercionPendiente = true;
							}
						}
					} else if (currentCell.colSpan > 1) {
						desplazamiento = currentCell.colSpan;
						for (var k = 0; k < currentCell.colSpan; k++) {
							if (posicionEnPuntos + k == pos) {
								insercionPendiente = true;
							}
						}
					} else if (posicionEnPuntos == pos) {
						insercionPendiente = true;
					}
				}
			}

			for (var l = 0; l < maxAmountOfCells; l++) {
				if (carriedRowspans[l] > 0) carriedRowspans[l]--;
			}
		}

		for (var i = 0; i < array.length; i++) {
			array[i].push(0);
		}
		maxAmountOfCells++;
		drawTable(array);
		table.recalculateIndexes();
		undoSelect();
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
			td.getDOMElement().style.backgroundColor = 'black';
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
					td.getDOMElement().style.backgroundColor = 'black';
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
			td.getDOMElement().style.backgroundColor = 'black';
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
					td.getDOMElement().style.backgroundColor = 'black';
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

	table.isSquare = function (a) {
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

	var drawTable = function drawTable(a) {
		var string = 'DRAWING TABLE:\n';
		for (var i = 0; i < a.length; i++) {

			for (var j = 0; j < a[i].length; j++) {
				string += ' ' + a[i][j];
			}
			string += '\n';
		}
		table.isSquare(a);
	};

	var undoSelect = function undoSelect() {
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

	var fillTableArray = function fillTableArray() {
		var colspansSums = [],
		    a = [];

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
		var maxAmountOfRows = table.rows.length;
		for (var i = 0; i < maxAmountOfRows; i++) {
			a[i] = [];
			for (var j = 0; j < maxAmountOfCells; j++) {
				a[i].push(0);
			}
		}
		drawTable(a);
		return a;
	};

	var getCoords = function getCoords(search) {
		var skipInCols = [],
		    cell;

		for (var i = 0; i < maxAmountOfCells; i++) {
			skipInCols[i] = 0;
		}

		for (var i = 0; i < table.rows.length; i++) {
			var bufferDeCeldas = table.rows[i].getElementsByTagName('td');
			punteroDeCelda = 0;
			for (var posicionEnPuntos = 0; posicionEnPuntos < maxAmountOfCells; posicionEnPuntos += desplazamiento) {
				desplazamiento = 1;

				if (skipInCols[posicionEnPuntos]) {
					skipInCols[posicionEnPuntos]--;
				} else {
					var td = bufferDeCeldas[punteroDeCelda++];
					if (td == search) {
						return [i, posicionEnPuntos];
					}
					if (td.rowSpan > 1) {
						for (k = 0; k < td.colSpan; k++) {
							skipInCols[posicionEnPuntos + k] = td.rowSpan - 1;
						}
						desplazamiento = td.colSpan;
					} else if (td.colSpan > 1) {
						desplazamiento = td.colSpan;
					}
				}
			}
		}
	};

	table.mergeCells = function () {
		var dimensions = table.isSquare(array),
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
			} else {
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
					p.insertBefore(newCell, refCell.nextSibling);
				} else {
					p.appendChild(newCell);
				}
				refCell = newCell;
			}
		}
		undoSelect();
	};

	var getActualPointsInRow = function getActualPointsInRow(row) {
		var tds = table.rows[row].getElementsByTagName('td'),
		    points = 0;
		for (var i = 0; i < tds.length; i++) {
			points += tds[i].colSpan;
		}
		return points;
	};

	table.findRowspannedCells = function (row) {
		var array = [],
		    difference;
		actualPoints = getActualPointsInRow(row);
		if (actualPoints === maxAmountOfCells) {
			return [];
		}
		difference = maxAmountOfCells - actualPoints;

		for (var i = row - 1; i >= 0 && difference; i--) {
			var tds = table.rows[i].getElementsByTagName('td');
			for (var i = 0; i < tds.length; i++) {
				if (tds[i].rowSpan > 1) {
					array.push(tds[i]);
					difference -= tds[i].colSpan;
				}
			}
		}
		return array;
	};

	table.addLackingCells = function () {
		var sumRows = [];
		for (var i = 0; i < table.rows.length; i++) {
			sumRows.push(0);
		}

		for (var i = 0; i < table.rows.length; i++) {
			var tds = table.rows[i].getElementsByTagName('td');
			for (var j = 0; j < tds.length; j++) {
				if (tds[j].rowSpan > 1) {
					for (var k = 1; k < tds[j].rowSpan; k++) {
						sumRows[i + k]++;
					}
				}
			}
		}

		for (var i = 0; i < table.rows.length; i++) {
			var tds = table.rows[i].getElementsByTagName('td'),
			    totalColspan = 0;
			for (var j = 0; j < tds.length; j++) {
				totalColspan += tds[j].colSpan;
			}
			totalColspan += sumRows[i];
			difference = maxAmountOfCells - totalColspan;
			for (var j = 0; j < difference; j++) {
				var td = new WPTB_Cell(mark);
				table.rows[i].appendChild(td.getDOMElement());
			}
		}
	};

	table.deleteRow = function () {

		var cell = document.querySelector('.wptb-highlighted'),
		    row = getCoords(cell)[0],
		    reduct = table.findRowspannedCells(row);

		for (i = 0; i < reduct.length; i++) {
			reduct[i].rowSpan--;
		}

		table.getElementsByTagName('tbody')[0].removeChild(table.rows[row]);
		array.pop();
		undoSelect();
		table.addLackingCells();
	};

	table.deleteColumn = function () {

		var cell_ref = document.querySelector('.wptb-highlighted'),
		    column = getCoords(cell_ref)[1],
		    buffer,
		    cell,
		    carriedRowspans = [];

		for (var i = 0; i < maxAmountOfCells; i++) {
			carriedRowspans.push(0);
		}

		for (var i = 0; i < table.rows.length; i++) {
			buffer = table.rows[i].getElementsByTagName('td');
			desplazamiento = 1;
			punteroDeCelda = 0;
			for (var j = 0; j < maxAmountOfCells; j += desplazamiento) {

				desplazamiento = 1;

				if (carriedRowspans[j] == 0) {
					cell = buffer[punteroDeCelda++];
					if (cell.rowSpan > 1) {
						desplazamiento = cell.colSpan;
						for (var k = 0; k < cell.colSpan; k++) {
							carriedRowspans[j + k] = cell.rowSpan;
						}
						if (column > j && column <= j + k - 1) {
							//cell.style.backgroundColor = 'pink';
							cell.colSpan--;
							break;
						}
					} else if (cell.colSpan > 1) {
						desplazamiento = cell.colSpan;

						if (column > j && column <= j + cell.colSpan - 1) {
							//cell.style.backgroundColor = 'pink';
							cell.colSpan--;
							break;
						}
					}
					{
						if (column == j) {
							table.rows[i].removeChild(cell);
							//cell.style.backgroundColor = 'pink';
							break;
						}
					}
				} else {
					continue;
				}
			}

			for (var l = 0; l < carriedRowspans.length; l++) {
				if (carriedRowspans[l] > 0) {
					carriedRowspans[l]--;
				}
			}
		}
		maxAmountOfCells--;

		for (var i = 0; i < table.rows.length; i++) {
			if (array[i] != undefined) array[i].pop();
		}
		undoSelect();
	};

	array = fillTableArray();

	undoSelect();
	drawTable(array);

	wptbTableSetup.appendChild(table);

	table.recalculateIndexes();

	WPTB_LeftPanel();
};
var WPTB_Text = function WPTB_Text(text) {

	var DOMElement = document.createElement('div'),
	    elText2 = document.createElement('div'),
	    elP = document.createElement('p');

	this.kind = 'text';

	elText2.classList.add('editable');
	elP.innerHTML = text != undefined ? text : 'Text';
	elText2.appendChild(elP);
	DOMElement.appendChild(elText2);

	this.getDOMElement = function () {
		return DOMElement;
	};
	applyGenericItemSettings(this);

	return this;
};
var applyGenericItemSettings = function applyGenericItemSettings(element) {
	var node = element.getDOMElement(),
	    index = document.counter.nextIndex(element.kind),
	    listItems;

	node.onmouseenter = function (event) {
		this.classList.add('wptb-directlyhovered');
		var btnDelete = document.createElement('span'),
		    btnCopy = document.createElement('span'),
		    btnMove = document.createElement('span'),
		    actions = document.createElement('span'),
		    previous,
		    i;
		actions.classList.add('wptb-actions');
		btnDelete.classList.add('dashicons', 'dashicons-trash', 'delete-action');
		btnCopy.classList.add('dashicons', 'dashicons-admin-page', 'duplicate-action');
		btnMove.classList.add("dashicons", "dashicons-move", 'move-action');
		btnMove.draggable = true;
		btnDelete.onclick = function (event) {
			var act = this.parentNode.parentNode,
			    el = act.parentNode,
			    space = act.nextSibling,
			    num,
			    space2;
			el.removeChild(act);
			el.removeChild(space);
			num = el.getElementsByClassName('wptb-ph-element').length;
			if (!num) {
				space2 = el.getElementsByClassName('wptb-space-between')[0];
				if (space2) {
					el.removeChild(space2);
				}
			}
		};
		btnCopy.onclick = function (event) {
			if (element.kind == 'list') {

				var td = event.target.parentNode.parentNode.parentNode,
				    temp = [],
				    srcList = event.target.parentNode.parentNode.querySelectorAll('ul article .wptb-list-item-content');

				for (var i = 0; i < srcList.length; i++) {
					temp.push(srcList[i].innerHTML);
				}
				var copy = new WPTB_List(temp);
				td.appendChild(copy.getDOMElement());
			} else if (element.kind == 'text') {
				var td = event.target.parentNode.parentNode.parentNode,
				    copy = new WPTB_Text(event.target.parentNode.parentNode.childNodes[0].innerHTML);
				td.appendChild(copy.getDOMElement());
			} else if (element.kind == 'image') {
				var td = event.target.parentNode.parentNode.parentNode,
				    copy = new WPTB_Image(event.target.parentNode.parentNode.childNodes[0].src);
				td.appendChild(copy.getDOMElement());
			} else {
				var td = event.target.parentNode.parentNode.parentNode,
				    copy = new WPTB_Button(event.target.parentNode.parentNode.childNodes[0].innerHTML);
				td.appendChild(copy.getDOMElement());
			}
		};
		btnMove.ondragstart = function (event) {
			var parent = this,
			    infArr,
			    type;

			while (parent.className == '' || !parent.classList.contains('wptb-ph-element')) {
				parent = parent.parentNode;
			}

			infArr = parent.className.match(/wptb-element-(.+)-(\d+)/i);
			type = infArr[1];

			var img = document.createElement("img");
			img.src = "http://localhost/sandbox/wp-content/plugins/wp-table-builder/inc/admin/views/builder/icons/" + type + ".png";
			event.dataTransfer.setDragImage(img, 0, 0);
			event.dataTransfer.setData('node', 'wptb-element-' + infArr[1] + '-' + infArr[2]);
		};

		if (element.kind === 'button') {
			tinyMCE.init({
				target: node.childNodes[0].childNodes[0],
				inline: true,
				plugins: "link",
				dialog_type: "modal",
				theme: 'modern',
				menubar: false,
				fixed_toolbar_container: '#wpcd_fixed_toolbar',
				toolbar: 'bold italic strikethrough',
				setup: function setup(ed) {
					ed.on("init", function (ed) {
						tinyMCE.execCommand('mceRepaint');
					});
				},
				init_instance_callback: function init_instance_callback(editor) {
					editor.on('change', function (e) {
						// check if it becomes empty because if there's no value it's hard to edit the editor in button element
						if (editor.getContent() == "") {
							editor.setContent("<p class='wptb-button'>Button Text</p>");
						}
					});
					editor.on('KeyDown', function (e) {
						var range = editor.selection.getRng();
						var KeyID = e.keyCode;
						if (range.startOffset == 0 && (KeyID == 8 || KeyID == 46)) {
							e.preventDefault();
							editor.setContent("<p class='wptb-button'></p>");
						}
					});

					window.currentEditor = editor;
					editor.on('focus', function (e) {

						var totalWidth = document.getElementsByClassName('wptb-builder-panel')[0].offsetWidth;
						if (window.currentEditor && document.getElementById('wptb_builder').scrollTop >= 55 && window.currentEditor.bodyElement.style.display != 'none') {
							document.getElementById('wpcd_fixed_toolbar').style.position = 'fixed';
							document.getElementById('wpcd_fixed_toolbar').style.right = totalWidth / 2 - document.getElementById('wpcd_fixed_toolbar').offsetWidth / 2 + 'px';
							document.getElementById('wpcd_fixed_toolbar').style.top = '100px';
						} else {
							document.getElementById('wpcd_fixed_toolbar').style.position = 'static';
							delete document.getElementById('wpcd_fixed_toolbar').style.right;
							delete document.getElementById('wpcd_fixed_toolbar').style.top;
						}
					});
				}
			});
		} else if (element.kind === 'text') {
			tinyMCE.init({
				target: node.childNodes[0],
				inline: true,
				plugins: "link, paste",
				dialog_type: "modal",
				theme: 'modern',
				menubar: false,
				fixed_toolbar_container: '#wpcd_fixed_toolbar',
				paste_as_text: true,
				toolbar: 'bold italic strikethrough link unlink | alignleft aligncenter alignright alignjustify',
				init_instance_callback: function init_instance_callback(editor) {
					window.currentEditor = editor;
					editor.on('focus', function (e) {

						var totalWidth = document.getElementsByClassName('wptb-builder-panel')[0].offsetWidth;
						if (window.currentEditor && document.getElementById('wptb_builder').scrollTop >= 55 && window.currentEditor.bodyElement.style.display != 'none') {
							document.getElementById('wpcd_fixed_toolbar').style.position = 'fixed';
							document.getElementById('wpcd_fixed_toolbar').style.right = totalWidth / 2 - document.getElementById('wpcd_fixed_toolbar').offsetWidth / 2 + 'px';
							document.getElementById('wpcd_fixed_toolbar').style.top = '100px';
						} else {
							document.getElementById('wpcd_fixed_toolbar').style.position = 'static';
							delete document.getElementById('wpcd_fixed_toolbar').style.right;
							delete document.getElementById('wpcd_fixed_toolbar').style.top;
						}
					});
				}
			});
		} else {
			listItems = node.getElementsByClassName('wptb-list-item-content');
			for (var i = 0; i < listItems.length; i++) {
				tinyMCE.init({
					target: listItems[i],
					inline: true,
					plugins: "link, paste",
					dialog_type: "modal",
					theme: 'modern',
					menubar: false,
					fixed_toolbar_container: '#wpcd_fixed_toolbar',
					paste_as_text: true,
					toolbar: 'bold italic strikethrough link unlink | alignleft aligncenter alignright alignjustify',
					init_instance_callback: function init_instance_callback(editor) {
						window.currentEditor = editor;
						editor.on('focus', function (e) {
							var totalWidth = document.getElementsByClassName('wptb-builder-panel')[0].offsetWidth;
							if (window.currentEditor && document.getElementById('wptb_builder').scrollTop >= 55 && window.currentEditor.bodyElement.style.display != 'none') {
								document.getElementById('wpcd_fixed_toolbar').style.position = 'fixed';
								document.getElementById('wpcd_fixed_toolbar').style.right = totalWidth / 2 - document.getElementById('wpcd_fixed_toolbar').offsetWidth / 2 + 'px';
								document.getElementById('wpcd_fixed_toolbar').style.top = '100px';
							} else {
								document.getElementById('wpcd_fixed_toolbar').style.position = 'static';
								delete document.getElementById('wpcd_fixed_toolbar').style.right;
								delete document.getElementById('wpcd_fixed_toolbar').style.top;
							}
						});
					}
				});
			}
		}

		actions.appendChild(btnMove);
		actions.appendChild(btnCopy);
		actions.appendChild(btnDelete);
		this.appendChild(actions);
	};

	node.onmouseleave = function (event) {
		var formerActions = this.getElementsByClassName('wptb-actions');
		if (formerActions && formerActions[0]) {
			var par = formerActions[0].parentNode;
			par.removeChild(formerActions[0]);
		}
		this.classList.remove('wptb-directlyhovered');
	};

	node.classList.add('wptb-ph-element', 'wptb-element-' + element.kind + '-' + index);

	new WPTB_ElementOptions(element, index);

	document.counter.increment(element.kind);
};

//# sourceMappingURL=admin.js.map
