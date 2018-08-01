(function ($) {

    window.deleteButton = function (event) {
        var act = this.parentNode.parentNode,
            el = act.parentNode;
        el.removeChild(act);
        window.add_Elements_tab();
    };

    window.copyButton = function (event) {
        var td = event.target.parentNode.parentNode.parentNode,
            copy = newButton(event.target.parentNode.parentNode.childNodes[0].innerHTML);
        td.appendChild(copy);
    };

    window.showButtonSettings = function (event) {
        this.classList.add('wptb-directlyhovered');
        var btnDelete = document.createElement('span'),
            btnCopy = document.createElement('span'),
            actions = document.createElement('span'),
            previous,
            i;
        actions.classList.add('wptb-actions');
        btnDelete.classList.add('dashicons', 'dashicons-trash', 'delete-action');
        btnCopy.classList.add('dashicons', 'dashicons-admin-page', 'duplicate-action');
        btnDelete.onclick = window.deleteButton;
        btnCopy.onclick = window.copyButton;
        actions.appendChild(btnCopy);
        actions.appendChild(btnDelete);
        this.appendChild(actions);
    };

    window.hideButtonSettings = function (event) {
        var formerActions = this.getElementsByClassName('wptb-actions');
        if (formerActions && formerActions[0]) {
            var par = formerActions[0].parentNode;
            par.removeChild(formerActions[0]);
        }
        this.classList.remove('wptb-directlyhovered');
    };

    window.newButton = function (text) {
        var elButton = document.createElement('div');
        elButton.classList.add('wptb-button-container');
        var elButton2 = document.createElement('div');
        elButton2.classList.add('wptb-button-wrapper');
        var el_B = document.createElement('p');
        el_B.classList.add('wptb-button');
        el_B.classList.add('editable');
        el_B.innerHTML = text != undefined ? text : 'Button Text';
        elButton2.appendChild(el_B);
        elButton.appendChild(elButton2);
        elButton.onmouseenter = showButtonSettings;
        elButton.onmouseleave = hideButtonSettings;
        elButton.classList.add('wptb-ph-element', 'wptb-element-button-' + window.wptb_num['button']);
        window.addElementOptions('button', elButton);
        window.wptb_num['button']++;
        tinyMCE.init({
            target: el_B,
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
            }
        });

        return elButton;
    };
})(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function ($) {

    window.copyImage = function (event) {
        var srcList = event.target.parentNode.parentNode,
            newList = srcList.cloneNode(true),
            container = srcList.parentNode,
            listItems = newList.querySelectorAll('article');
        newList.onmouseenter = showListSettings;
        newList.onmouseleave = hideListSettings;
        for (var i = listItems.length - 1; i >= 0; i--) {
            var cont = listItems[i].getElementsByClassName('wptb-list-item-content')[0];
            listItems[i].onmouseenter = showListItemSettings;
            listItems[i].onmouseleave = hideListItemSettings;
            cont.id = '';
            tinyFastCall(cont);
            cont.onkeyup = listItemKeyListener;
        }

        var infArr = newList.className.match(/wptb-element-(.+)-(\d)+/i),
            elName = infArr[1],
            oldClass = infArr[0],
            oldClassOptionsPanelClass = "wptb-options-" + elName + "-" + infArr[2];

        var newOptionsPanel = $('.' + oldClassOptionsPanelClass).clone(true, true),
            oldOptionsPanel = document.querySelector('.' + oldClassOptionsPanelClass);
        oldOptionsPanel.parentNode.appendChild(newOptionsPanel[0]);

        var newClass = "wptb-element-" + elName + "-" + wptb_num['list'];
        var newClassOptionsPanelClass = "wptb-options-" + elName + "-" + wptb_num['list'];

        newList.classList.add(newClass);
        newList.classList.remove(oldClass);

        newOptionsPanel.removeClass(oldClassOptionsPanelClass);
        newOptionsPanel.addClass(newClassOptionsPanelClass);

        wptb_num['list']++;

        container.appendChild(newList);
    };

    window.showImageSettings = function (event) {
        var btnDelete = document.createElement('span'),
            btnCopy = document.createElement('span'),
            actions = document.createElement('span'),
            previous,
            i;
        actions.classList.add('wptb-actions');
        btnDelete.classList.add('dashicons', 'dashicons-trash', 'delete-action');
        btnCopy.classList.add('dashicons', 'dashicons-admin-page', 'duplicate-action');
        delete document.getElementsByClassName('wptb-actions');
        previous = document.getElementsByClassName('wptb-directlyhovered');
        for (i = 0; i < previous.length; i++) {
            previous[i].classList.remove('wptb-directlyhovered');
        };
        this.classList.add('wptb-directlyhovered');

        btnDelete.onclick = function () {
            var list = this.parentNode.parentNode,
                tdContainer = list.parentNode;
            $('#add-elements a').trigger('click');
            tdContainer.removeChild(list);
        };
        btnCopy.onclick = copyList;

        actions.append(btnCopy, btnDelete);
        this.append(actions);
    };

    window.hideImageSettings = function (event) {
        this.classList.remove('wptb-directlyhovered');
        var actions = this.getElementsByClassName('wptb-actions')[0];
        if (actions != undefined) {
            var parent = actions.parentNode;
            parent.removeChild(actions);
        }
    };

    window.newImage = function (text) {
        var imgWrap = document.createElement('div');
        imgWrap.classList.add('wptb-img-wrapper');
        var imgBtn = document.createElement('button');
        imgBtn.classList.add('button');
        imgBtn.classList.add('wptb-img-btn');
        imgBtn.innerHTML = text != undefined ? text : 'Choose Image';
        imgWrap.appendChild(imgBtn);

        Medialibrary(imgBtn);
        $(imgBtn).click(function () {
            Medialibrary(this);
        });
        return imgWrap;
    };

    window.Medialibrary = function (button) {
        // Set all variables to be used in scope
        button.frame;
        if (button.frame) {
            if (button.selectedId) {
                // choose the selected image
                var selection = button.frame.state().get('selection');
                selection.add(wp.media.attachment(button.selectedId));
            }
            button.frame.open();
            return;
        }

        // Create a new media frame
        button.frame = wp.media({
            title: 'Select The image',
            button: {
                text: 'Use this media'
            },
            multiple: false
        });

        // When an image is selected in the media frame...
        button.frame.on('select', function () {
            button.selectedId = button.frame.state().get('selection').models[0].id;
            var attachment = button.frame.state().get('selection').first().toJSON(),
                url = attachment.url,
                wrapper = button.parentNode;

            // if there's already an image
            if (_typeof(button.img) == 'object') {
                $(button.img).prop('src', url);
                return;
            }

            // making image relative to the button in its objec
            button.img = document.createElement('img');
            button.img.classList.add('wptb-ph-element');
            button.img.classList.add('wptb-element-img-' + window.wptb_num["image"]);
            $(button.img).prop('src', url);
            $(button.img).css('width', '100%');

            button.innerHTML = 'Change Image';
            wrapper.appendChild(button.img);

            window.wptb_num["image"]++;
        });
    };

    window.changeImageBtn = function (button, frame) {};
})(jQuery);
(function ($) {

    window.copyList = function (event) {
        var td = event.target.parentNode.parentNode.parentNode,
            temp = [],
            srcList = event.target.parentNode.parentNode.querySelectorAll('ul article .wptb-list-item-content');

        for (var i = 0; i < srcList.length; i++) {
            temp.push(srcList[i].innerHTML);
        }
        var copy = newList(temp);
        td.appendChild(copy);
    };

    window.deleteList = function () {
        var act = this.parentNode.parentNode,
            el = act.parentNode;
        el.removeChild(act);
        window.add_Elements_tab();
    };

    window.showListSettings = function (event) {
        this.classList.add('wptb-directlyhovered');
        var btnDelete = document.createElement('span'),
            btnCopy = document.createElement('span'),
            actions = document.createElement('span'),
            previous,
            i;
        actions.classList.add('wptb-actions');
        btnDelete.classList.add('dashicons', 'dashicons-trash', 'delete-action');
        btnCopy.classList.add('dashicons', 'dashicons-admin-page', 'duplicate-action');
        btnDelete.onclick = window.deleteList;
        btnCopy.onclick = window.copyList;
        actions.appendChild(btnCopy);
        actions.appendChild(btnDelete);
        this.appendChild(actions);
    };

    window.hideListSettings = function (event) {
        this.classList.remove('wptb-directlyhovered');
        var actions = this.querySelector('.wptb-actions');
        if (actions != undefined) {
            var parent = actions.parentNode;
            parent.removeChild(actions);
        }
    };

    window.showListItemSettings = function (event) {
        //el Article
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
            var duplicate = newListItem(html);
            article.parentNode.appendChild(duplicate);
        };

        actions.append(btnCopy, btnDelete);
        this.appendChild(actions);
    };

    window.hideListItemSettings = function (event) {
        this.classList.remove('wptb-directlyhovered');
        var actions = this.parentNode.querySelector('.wptb-actions');
        if (actions != undefined) {
            var parent = actions.parentNode;
            parent.removeChild(actions);
        }
    };

    window.newList = function (innerElements) {
        var elList = document.createElement('div');
        //elList.classList.add('editable');
        var el_L = document.createElement('ul');
        if (!innerElements) for (var i = 0; i < 3; i++) {
            el_L.appendChild(newListItem('List Item ' + (i + 1)));
        } else {
            for (var i = 0; i < innerElements.length; i++) {
                el_L.appendChild(newListItem(innerElements[i]));
            }
        }
        elList.appendChild(el_L);
        elList.onmouseenter = showListSettings;
        elList.onmouseleave = hideListSettings;
        elList.classList.add('wptb-ph-element', 'wptb-element-list-' + window.wptb_num['list']);
        window.addElementOptions('list', elList);
        window.wptb_num['list']++;

        return elList;
    };

    window.newListItem = function (text) {
        if (text == undefined) text = 'New List Item';
        var duplicate = document.createElement('article');
        var divdot = document.createElement('div'),
            divcontent = document.createElement('div'),
            libullet = document.createElement('li');
        divdot.classList.add('wptb-list-item-style-dot');
        divcontent.classList.add('wptb-list-item-content');
        libullet.classList.add('wptb-bullet');
        duplicate.appendChild(divdot);
        duplicate.appendChild(divcontent);
        divdot.appendChild(libullet);
        divcontent.innerHTML = text;
        tinyFastCall(divcontent);
        divcontent.onkeyup = window.listItemKeyListener;
        divcontent.parentNode.onmouseenter = window.showListItemSettings;
        divcontent.parentNode.onmouseleave = window.hideListItemSettings;
        return duplicate;
    };

    window.listItemKeyListener = function (event) {
        var key = event.which != undefined ? event.which : event.keyCode,
            liEl = $(this).parent(),
            duplicate,
            lastP;
        if (key !== 13 || window.dontAddItems !== undefined && window.dontAddItems === true) {
            return;
        }
        event.preventDefault();
        duplicate = newListItem();
        liEl.after(duplicate);
        duplicate.querySelector('.wptb-list-item-content').focus();

        lastP = this.childNodes[this.childNodes.length - 1];
        this.removeChild(lastP);
        if (this.innerHTML.trim() == '<p><br data-mce-bogus="1"></p>') {
            this.innerHTML = 'New List Item';
        }
        return false;
    };
})(jQuery);
(function ($) {

    window.add_Elements_tab = function () {
        document.getElementById('element-options').getElementsByTagName('a')[0].classList.remove('active');
        document.getElementById('add-elements').getElementsByTagName('a')[0].classList.add('active');
        document.getElementsByClassName('wptb-elements-container')[0].style.display = 'table';
        document.getElementsByClassName('wptb-settings-section')[0].style.display = 'block';
        document.getElementById("element-options-group").style.display = 'none';
    };

    window.Element_options_tab = function () {
        document.getElementById('add-elements').getElementsByTagName('a')[0].classList.remove('active');
        document.getElementById('element-options').getElementsByTagName('a')[0].classList.add('active');

        document.getElementsByClassName('wptb-elements-container')[0].style.display = 'none';
        document.getElementsByClassName('wptb-settings-section')[0].style.display = 'none';
        document.getElementById("element-options-group").style.display = 'block';
        var children = document.getElementById("element-options-group").childNodes;
        for (var i = 0; i < children.length; i++) {
            if (children[i].style) children[i].style.display = 'none';
        }
    };

    window.addElementOptions = function (wptbElement, el) {
        var prop = $(".wptb-" + wptbElement + "-options-prototype").clone();
        prop.removeClass("wptb-" + wptbElement + "-options-prototype"); // remove prototype from the class
        prop.addClass('wptb-options-' + wptbElement + "-" + wptb_num[wptbElement]);
        document.getElementById("element-options-group").appendChild(prop[0]);
        //special cases to elements if needed
        switch (wptbElement) {
            case 'text':
                listener_to_element(prop.find('.wptb-color-picker'));
                prop.find('.wptb-color-picker').wpColorPicker();
                break;
        }
        wptb_num[wptbElement]++;
    };

    /**
     * to listen to the elements that will change dynamically
     * change by other javascript code then will trigger the change event to them
     * 
     * @param {string} element
     * @returns {void}
     */
    window.listener_to_element = function (element) {
        element.data('old_value', element.val());
        window.setInterval(function () {
            var value = element.val();
            var old_value = element.data('old_value');
            if (value != old_value) {
                old_value = value;
                element.trigger('change');
            }
        }, 300);
    };

    window.tryToChangeMCEWidth = function (e) {
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
        //if(this.scrollTop > && )
        //                document.getElementById('wpcd_fixed_toolbar').style.left = 'calc(50% - '+width+')';  
    };

    window.tinyFastCall = function (obj) {
        tinyMCE.init({
            target: obj,
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
                    window.tryToChangeMCEWidth();
                });
            }
        });
    };

    window.inputNumber = function (el) {

        var min = el.min || false;
        var max = el.max || false;

        var els = {};

        els.dec = el.previousSibling;
        els.inc = el.nextSibling;

        init(el);

        function init(el) {

            els.dec.onclick = decrement;
            els.inc.onclick = increment;

            els.dec.onmousedown = function (e) {
                e.preventDefault();
            };

            els.inc.onmousedown = function (e) {
                e.preventDefault();
            };

            function decrement() {
                var value = el.value;
                value--;
                if (!min || value >= min) {
                    el.value = value;
                }
            }

            function increment() {
                var value = el.value;
                value++;
                if (!max || value <= max) {
                    el.value = value++;
                }
            }
        }
    };
})(jQuery);
(function ($) {
    window.selectedCells = [];
    window.initTable = function () {

        document.getElementsByClassName('wptb-table-generator')[0].style.display = 'none';
        var settings = document.getElementsByClassName('wptb-settings-items');
        for (var i = 0; i < settings.length; i++) {
            settings[i].classList.add('visible');
        }

        //Add Color Picker for Row and Header Background Colors
        $('#wptb-even-row-bg').wpColorPicker();
        $('#wptb-odd-row-bg').wpColorPicker();
        $('#wptb-table-header-bg').wpColorPicker();

        //Create a HTML Table element.
        var table = document.createElement('table');
        table.classList.add('wptb-preview-table');

        //Get the count of columns and rows.
        var columnCount = parseInt(document.getElementById('wptb-columns-number').value);
        var rowCount = parseInt(document.getElementById('wptb-rows-number').value);

        //Add the header row.
        var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = createCell();
            row.appendChild(headerCell);
            row.classList.add('wptb-table-head', 'wptb-row');
            headerCell.dataset.yIndex = 0;
            headerCell.dataset.xIndex = i;
        }

        //Add the data rows.
        for (var i = 1; i < rowCount; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var headerCell = createCell();
                row.appendChild(headerCell);
                row.classList.add('wptb-row');
                headerCell.dataset.yIndex = i;
                headerCell.dataset.xIndex = j;
            }
        }

        //Appending the table to the container in UI
        var wptbTable = document.getElementsByClassName("wptb-table-setup")[0];
        wptbTable.innerHTML = '';
        wptbTable.appendChild(table);

        window.bindKeydownHandler();
        window.bindClickHandler();
    };

    window.createCell = function () {
        var cell = document.createElement("td"),
            allowDrop = function allowDrop(event) {
            event.target.classList.add('wptb-allow-drop');
            event.currentTarget.classList.add('wptb-allow-drop');
            if (event.type == 'dragover') {
                event.stopPropagation();
                event.preventDefault();
                return true;
            }
        };
        cell.classList.add('wptb-droppable', 'wptb-cell');
        cell.ondrop = function (event) {

            event.preventDefault();
            event.stopPropagation();
            event.target.classList.remove('wptb-allow-drop');

            if (wptbElement == 'text') {
                var textEl = window.newText();
                event.target.appendChild(textEl);
                textEl.click();
            } else if (wptbElement == 'image') {
                var img = window.newImage();
                event.target.appendChild(img);
            } else if (wptbElement == 'button') {
                var button = window.newButton();
                event.target.appendChild(button);
                button.click();
            } else if (wptbElement == 'list') {
                var listEl = window.newList();
                event.target.appendChild(listEl);
                listEl.click();
            }
        };
        cell.ondragenter = allowDrop;
        cell.ondragleave = function (event) {
            event.target.classList.remove('wptb-allow-drop');
        };
        cell.ondragover = allowDrop;
        cell.onclick = selectIndividualCell;
        cell.onmousedown = startCellSelection;
        cell.onmouseover = goOnWithCellSelection;
        cell.onmouseup = endCellSelection;
        return cell;
    };

    window.selectIndividualCell = function () {

        for (var i = 0; i < selectedCells.length; i++) {
            selectedCells[i].classList.remove('highlighted');
        }

        window.selectedCells = [this];
        window.activeColumn = this.dataset.xIndex;
        window.activeRow = this.dataset.yIndex;
        undoAllPreviousHighlights();
        activateIndividualActions();
        deactivateNoneActions();
        deactivateGroupActions();
        highlightRow(this);
        highlightColumn(this);
        this.classList.add('highlighted');
        var buttons = document.getElementsByClassName('wptb-relative-action');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].dataset.xIndex = this.dataset.xIndex;
            buttons[i].dataset.yIndex = this.dataset.yIndex;
        }
    };

    window.undoAllPreviousHighlights = function () {
        var table = document.getElementsByClassName('wptb-preview-table')[0],
            columnCount = parseInt(document.getElementById('wptb-columns-number').value),
            rowCount = parseInt(document.getElementById('wptb-rows-number').value);
        for (var i = 0; i < rowCount; i++) {
            var row = table.getElementsByTagName('tr')[i];
            for (var j = 0; j < columnCount; j++) {
                row.getElementsByTagName('td')[j].classList.remove('highlighted', 'highlighted-row-first', 'highlighted-row-inner', 'highlighted-row-last', 'highlighted-column-first', 'highlighted-column-inner', 'highlighted-column-last');
                //window.activeRow = window.activeColumn = undefined;
                window.selectedCells = [];
            }
        }
    };

    window.activateNoneActions = function () {

        var inputs = document.getElementsByClassName('none');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
    };

    window.deactivateNoneActions = function () {

        var inputs = document.getElementsByClassName('none');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
    };

    window.activateIndividualActions = function () {

        var inputs = document.getElementsByClassName('individual');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
    };

    window.deactivateGroupActions = function () {

        var inputs = document.getElementsByClassName('group');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
    };

    window.activateGroupActions = function () {

        var inputs = document.getElementsByClassName('group');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = false;
        }
    };

    window.deactivateIndividualActions = function () {

        var inputs = document.getElementsByClassName('individual');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].disabled = true;
        }
    };

    window.highlightRow = function (td) {
        var parentRow = td.parentNode,
            columnCount = parseInt(document.getElementById('wptb-columns-number').value);
        for (var i = 0; i < columnCount; i++) {
            var classToAdd = i == 0 ? 'highlighted-row-first' : i == columnCount - 1 ? 'highlighted-row-last' : 'highlighted-row-inner';
            var ttd = parentRow.getElementsByTagName('td')[i];
            if (ttd !== td) {
                ttd.classList.add(classToAdd);
            }
        }
    };

    window.highlightColumn = function (td) {

        var index,
            parentRow = td.parentNode;
        columnCount = parseInt(document.getElementById('wptb-columns-number').value), rowCount = parseInt(document.getElementById('wptb-rows-number').value), table = document.getElementsByClassName('wptb-preview-table')[0];
        for (var i = 0; i < columnCount; i++) {
            if (parentRow.getElementsByTagName('td')[i] === td) {
                index = i;
                break;
            }
        }

        console.log('Actual value of index', index);

        for (var i = 0; i < rowCount; i++) {
            var classToAdd = i == 0 ? 'highlighted-column-first' : i == rowCount - 1 ? 'highlighted-column-last' : 'highlighted-column-inner';
            var tr = table.getElementsByTagName('tr')[i];
            if (tr.getElementsByTagName('td')[index] !== td) {
                tr.getElementsByTagName('td')[index].classList.add(classToAdd);
            }
        }
    };

    window.startCellSelection = function () {
        this.classList.add('highlighted');
        window.selectMode = true;
        window.selectedCells.push(this);
    };

    window.goOnWithCellSelection = function () {
        if (window.selectMode) {
            this.classList.add('highlighted');
            window.selectedCells.push(this);
        }
    };

    window.endCellSelection = function () {
        window.selectMode = false;
    };

    window.bindKeydownHandler = function () {
        document.onkeydown = function (e) {
            if (e.target.className === 'mce-textbox') {
                window.dontAddItems = true;
                if (event.which === 13 || event.which === 27) {
                    setTimeout(function () {
                        window.dontAddItems = false;
                        document.querySelector('.wptb-list-item-content.mce-edit-focus').click();
                    }, 250);
                }
            }
        };
    };

    window.bindClickHandler = function () {

        /*
            * event click to the whole document and then check if it's to one
            * the created element to show it's option
            */
        document.onclick = function (e) {
            setTimeout(function () {
                //window.tryToChangeMCEWidth();
            }, 500);
            var $this = $(e.target);

            if (e.target.classList.contains('wptb-admin-container')) {
                console.log('Click out of the table');
                undoAllPreviousHighlights();
                activateNoneActions();
                deactivateIndividualActions();
                deactivateGroupActions();
            }

            if (e.target.className.match(/delete-action/)) {
                return;
            }
            if (e.target.id.match(/mceu_([0-9])*-button/)) {
                window.dontAddItems = false;
            }

            var el_options = false; // this var will carry the element that will be shown its options

            // check if this element or one of it's parent should display its options
            if ($this.hasClass('wptb-ph-element')) {
                el_options = $this;
            } else if ($this.parents().hasClass('wptb-ph-element')) {
                el_options = $this.parents('.wptb-ph-element');
            }

            // check to show element's options
            if (el_options && el_options.length != 0) {
                window.Element_options_tab();

                /**
                 * will carry the extracted infotrmation from the class
                 * @example class => wptb-ph-element wptb-element-text-0
                 *          result => [
                 *              0 => wptb-element-text-0
                 *              1 => text-0
                 *              2 => text-
                 *          ]
                 * @type array
                 */
                var infArr = el_options.attr('class').match(/wptb-element-((.+-)\d+)/i);

                /*
                 * will carry the class name of the element's options
                 * @example wptb-text-options wptb-options-text-0
                 * @type String
                 */
                var optionsClass = '.wptb-' + infArr[2] + 'options' + '.wptb-options-' + infArr[1];
                $(optionsClass).show();

                //Binds the range slider and input for text font size.
                var sliders = document.getElementsByClassName('wptb-text-font-size-slider');
                for (var i = 0; i < sliders.length; i++) {
                    sliders[i].onchange = function () {
                        this.parentNode.parentNode.childNodes[3].childNodes[1].value = this.value;
                    };
                }

                //Binds the range slider and input for text font size.
                var numbers = document.getElementsByClassName('wptb-text-font-size-number');
                for (var i = 0; i < numbers.length; i++) {
                    numbers[i].onchange = function () {
                        this.parentNode.parentNode.childNodes[1].childNodes[1].value = this.value;
                    };
                }
            } else {
                //show the add elements option
                if ($this.is('#add-elements') || $this.parents('#add-elements').length !== 0 || $this.hasClass('wptb-builder-panel') || $this.parents('.wptb-builder-panel').length !== 0) {
                    window.add_Elements_tab();
                }
            }
        };

        document.getElementById('wptb-add-end-row').onclick = addRow('end');
        document.getElementById('wptb-add-start-row').onclick = addRow('start');
        document.getElementById('wptb-add-end-column').onclick = addColumn('end');
        document.getElementById('wptb-add-start-column').onclick = addColumn('start');
        document.getElementById('wptb-delete-row').onclick = deleteRow;
        document.getElementById('wptb-delete-column').onclick = deleteColumn;
    };

    window.addRow = function (pos) {

        if (typeof pos == 'string' && pos == 'end') return function (evt) {
            var columnCount = parseInt(document.getElementById('wptb-columns-number').value),
                rowCount = parseInt(document.getElementById('wptb-rows-number').value),
                table = document.getElementsByClassName('wptb-preview-table')[0];
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var headerCell = createCell();
                row.appendChild(headerCell);
                headerCell.dataset.yIndex = rowCount;
                headerCell.dataset.xIndex = j;
            }
            row.classList.add('wptb-row');
            document.getElementById('wptb-rows-number').value = rowCount + 1;
        };
        if (typeof pos == 'string' && pos == 'start') return function (evt) {
            var columnCount = parseInt(document.getElementById('wptb-columns-number').value),
                rowCount = parseInt(document.getElementById('wptb-rows-number').value),
                table = document.getElementsByClassName('wptb-preview-table')[0];
            row = table.insertRow(0);
            for (var j = 0; j < columnCount; j++) {
                var headerCell = createCell();
                row.appendChild(headerCell);
                headerCell.dataset.yIndex = rowCount;
                headerCell.dataset.xIndex = j;
            }
            row.classList.add('wptb-row');
            document.getElementById('wptb-rows-number').value = rowCount + 1;
        };
    };

    window.addColumn = function (pos) {

        if (typeof pos == 'string' && pos == 'end') return function (evt) {
            var columnCount = parseInt(document.getElementById('wptb-columns-number').value),
                rowCount = parseInt(document.getElementById('wptb-rows-number').value),
                table = document.getElementsByClassName('wptb-preview-table')[0];
            for (var i = 0; i < rowCount; i++) {
                var headerCell = createCell();
                table.getElementsByTagName('tr')[i].appendChild(headerCell);
                headerCell.dataset.yIndex = i;
                headerCell.dataset.xIndex = columnCount;
            }
            document.getElementById('wptb-columns-number').value = columnCount + 1;
        };
        if (typeof pos == 'string' && pos == 'start') return function (evt) {
            var columnCount = parseInt(document.getElementById('wptb-columns-number').value),
                rowCount = parseInt(document.getElementById('wptb-rows-number').value),
                table = document.getElementsByClassName('wptb-preview-table')[0];
            for (var i = 0; i < rowCount; i++) {
                var headerCell = createCell();
                table.getElementsByTagName('tr')[i].innerHTML = '<td class="wptb-droppable wptb-cell"></td>' + table.getElementsByTagName('tr')[i].innerHTML;
                headerCell.dataset.yIndex = i;
                headerCell.dataset.xIndex = 0;
            }
            document.getElementById('wptb-columns-number').value = columnCount + 1;
        };
    };

    window.recalculateIndexes = function () {
        var table = document.getElementsByClassName('wptb-preview-table')[0],
            trs = table.getElementsByTagName('tr');
        for (var i = 0; i < trs.length; i++) {
            var tds = trs[i].getElementsByTagName('td');
            for (var j = 0; j < tds.length; j++) {

                if (i == 0) {
                    tds[j].parentNode.class = '';
                    tds[j].parentNode.classList.add('wptb-row', 'wptb-table-head');
                } else {
                    tds[j].parentNode.class = '';
                    tds[j].parentNode.classList.add('wptb-row');
                }

                tds[j].dataset.xIndex = j;
                tds[j].dataset.yIndex = i;
            }
        }
    };

    window.addRowBefore = function () {
        var table = document.getElementsByClassName('wptb-preview-table')[0],
            referenceRow = table.getElementsByTagName('tr')[this.dataset.yIndex],
            columnCount = parseInt(document.getElementById('wptb-columns-number').value),
            newrow = document.createElement('tr');
        for (var j = 0; j < columnCount; j++) {
            var headerCell = createCell();
            newrow.appendChild(headerCell);
        }
        table.childNodes[0].insertBefore(newrow, referenceRow);
        recalculateIndexes();
        document.getElementById('wptb-rows-number').value = rowCount + 1;
        var buttons = document.getElementsByClassName('wptb-relative-action');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].dataset.yIndex++;
        }
    };

    window.addRowAfter = function () {
        var table = document.getElementsByClassName('wptb-preview-table')[0],
            columnCount = parseInt(document.getElementById('wptb-columns-number').value),
            referenceRow = table.getElementsByTagName('tr')[this.dataset.yIndex];
        newrow = document.createElement('tr');
        for (var j = 0; j < columnCount; j++) {
            var headerCell = createCell();
            newrow.appendChild(headerCell);
        }
        table.childNodes[0].insertBefore(newrow, referenceRow.nextSibling);
        recalculateIndexes();
        document.getElementById('wptb-rows-number').value = rowCount + 1;
    };

    window.addColumnBefore = function () {
        var table = document.getElementsByClassName('wptb-preview-table')[0],
            rowCount = parseInt(document.getElementById('wptb-rows-number').value),
            columnCount = parseInt(document.getElementById('wptb-columns-number').value);
        for (var i = 0; i < rowCount; i++) {
            var referenceTd = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[this.dataset.xIndex],
                newTd = createCell();
            table.getElementsByTagName('tr')[i].insertBefore(newTd, referenceTd);
        }
        recalculateIndexes();
        var buttons = document.getElementsByClassName('wptb-relative-action');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].dataset.xIndex++;
        }
        document.getElementById('wptb-columns-number').value = columnCount + 1;
    };

    window.addColumnAfter = function () {
        var table = document.getElementsByClassName('wptb-preview-table')[0],
            rowCount = parseInt(document.getElementById('wptb-rows-number').value),
            columnCount = parseInt(document.getElementById('wptb-columns-number').value);
        for (var i = 0; i < rowCount; i++) {
            var referenceTd = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[this.dataset.xIndex],
                newTd = createCell();
            table.getElementsByTagName('tr')[i].insertBefore(newTd, referenceTd.nextSibling);
        }
        recalculateIndexes();
        document.getElementById('wptb-columns-number').value = columnCount + 1;
    };

    window.deleteRow = function () {
        var num = window.activeRow,
            table = document.getElementsByClassName('wptb-preview-table')[0],
            row = table.getElementsByTagName('tr')[num],
            rowCount = parseInt(document.getElementById('wptb-rows-number').value),
            tbody = row.parentNode;
        if (rowCount == 1 && columnCount == 1 || tbody == undefined) {
            return;
        }
        tbody.removeChild(row);
        document.getElementById('wptb-rows-number').value = rowCount - 1;
        undoAllPreviousHighlights();
    };

    window.deleteColumn = function () {
        var table = document.getElementsByClassName('wptb-preview-table')[0],
            num = window.activeColumn,
            rowCount = parseInt(document.getElementById('wptb-rows-number').value),
            columnCount = parseInt(document.getElementById('wptb-columns-number').value);
        if (rowCount == 1 && columnCount == 1) {
            return;
        }
        for (var i = 0; i < rowCount; i++) {
            var td = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[num],
                tr = td.parentNode;
            tr.removeChild(td);
        }
        document.getElementById('wptb-columns-number').value = columnCount - 1;
        undoAllPreviousHighlights();
    };

    window.mergeCells = function () {};

    window.splitCells = function () {};
})(jQuery);
(function ($) {

    window.copyText = function (event) {
        var td = event.target.parentNode.parentNode.parentNode,
            copy = newText(event.target.parentNode.parentNode.childNodes[0].innerHTML);
        td.appendChild(copy);
    };

    window.deleteText = function (evt) {
        var act = this.parentNode.parentNode,
            el = act.parentNode;
        el.removeChild(act);
        window.add_Elements_tab();
    };

    window.showTextSettings = function (event) {
        this.classList.add('wptb-directlyhovered');
        var btnDelete = document.createElement('span'),
            btnCopy = document.createElement('span'),
            actions = document.createElement('span'),
            previous,
            i;
        actions.classList.add('wptb-actions');
        btnDelete.classList.add('dashicons', 'dashicons-trash', 'delete-action');
        btnCopy.classList.add('dashicons', 'dashicons-admin-page', 'duplicate-action');
        btnDelete.onclick = window.deleteText;
        btnCopy.onclick = window.copyText;
        actions.appendChild(btnCopy);
        actions.appendChild(btnDelete);
        this.appendChild(actions);
    };

    window.hideTextSettings = function (event) {
        var formerActions = this.getElementsByClassName('wptb-actions');
        if (formerActions && formerActions[0]) {
            var par = formerActions[0].parentNode;
            par.removeChild(formerActions[0]);
        }
        this.classList.remove('wptb-directlyhovered');
    };

    window.newText = function (text) {
        var elText = document.createElement('div');
        var elText2 = document.createElement('div');
        elText2.classList.add('editable');
        var elP = document.createElement('p');
        elP.innerHTML = text != undefined ? text : 'Text';
        elText2.appendChild(elP);
        elText.appendChild(elText2);
        elText.onmouseenter = showTextSettings;
        elText.onmouseleave = hideTextSettings;
        elText.classList.add('wptb-ph-element', 'wptb-element-text-' + window.wptb_num['text']);
        window.addElementOptions('text', elText);
        window.wptb_num['text']++;
        window.tinyFastCall(elText.childNodes[0]);
        $(elText).click();
        return elText;
    };
})(jQuery);
var wptbElement;

//numbers of elements that have been added
window.wptb_num = new Array();
window.wptb_num["text"] = 0;
window.wptb_num["image"] = 0;
window.wptb_num["list"] = 0;
window.wptb_num["button"] = 0;

jQuery(document).ready(function ($) {

    //Column and Row number Selector.
    inputNumber(document.getElementById('wptb-columns-number'));
    inputNumber(document.getElementById('wptb-rows-number'));

    //document.getElementById('wptb_builder').onscroll = tryToChangeMCEWidth;

    //Generate table and bind associated functions.
    document.onready = function () {
        document.getElementById("wptb-generate-table").onclick = function () {

            //Runs when an element is dropped on a cell.
            initTable();

            /**
             * this function will be called 
             * when a property of any elemnet is changed
             * to determine which element that we should edit
             * and then call edititng_property Function
             * @returns {void}
             */
            function detect_element_for_property() {
                var option = this,
                    parent = option;
                while (!parent.classList.contains('.wptb-element-options')) {
                    parent = parent.parentNode;
                }
                var classes = parent.attr("class");

                /**
                 * will carry the extracted infotrmation from the class
                 * @example class =>wptb-options-text-0
                 *          result => [
                 *              0 => wptb-options-text-0
                 *              1 => text
                 *              2 => 0
                 *          ]
                 * @type array
                 */
                var infArr = classes.match(/wptb-options-(.+)-(\d+)/i);

                var type = infArr[1];
                var num = infArr[2];
                var element = document.querySelector('.wptb-ph-element.wptb-element-' + type + '-' + num);
                editing_property(element, option);
            }

            /**
             * will change the element according to the value of option
             * 
             * @param {object} element that will change according to the value of option
             * @param {object} option input element
             * @returns {void}
             */
            function editing_property(element, option) {
                // type of property @Ex: font-size,color ....
                var type = option.data('type');
                var val = option.val();
                switch (type) {
                    case 'font-size':
                        element.find("p").css('font-size', val + 'px');
                        break;
                    case 'color':
                        element.find("p").css('color', val);
                        break;
                    case 'list-class':
                        if (val == 'unordered') {
                            element.querySelector('[data-type=list-style-type]').parentNode.style.display = 'flex';
                            var bullets = element.querySelectorAll('article .wptb-list-item-style-dot li');
                            for (var i = 0; i < bullets.length; i++) {
                                bullets[i].style.listStyleType = 'disc';
                            }
                            document.querySelector('[data-type=list-style-type]').value = 'disc';
                        } else {
                            element.querySelector('[data-type=list-style-type]').parentNode.style.display = 'none';
                            var bullets = element.querySelectorAll('article .wptb-list-item-style-dot li');
                            for (var i = 0; i < bullets.length; i++) {
                                bullets[i].style.listStyleType = 'decimal';
                            }
                        }
                        break;
                    case 'numbering-list-style-type':
                    case 'list-style-type':
                        var bullets = element.querySelectorAll('article .wptb-list-item-style-dot li');
                        for (var i = 0; i < bullets.length; i++) {
                            bullets[i].style.listStyleType = val.toLowerCase();
                        }
                        break;
                }
            }
            $(document.body).on('change input, change select', '.wptb-element-property', detect_element_for_property);

            //Triggers when table border setting changes.
            function addBorder(value) {
                document.getElementsByClassName('wptb-preview-table')[0].style.border = value + 'px solid';
            }

            //Binds the range slider and input, also triggers table border change.
            document.getElementById('wptb-table-border-slider').onchange = function () {
                document.getElementById('wptb-table-border-number').value = this.value;
                addBorder(this.value);
            };

            //Binds the range slider and input, also triggers table border change.
            document.getElementById('wptb-table-border-number').onchange = function () {
                document.getElementById('wptb-table-border-slider').value = this.value;
                addBorder(this.value);
            };

            //Triggers when cell padding setting changes.
            function addCellPadding(value) {
                var tableCells = document.getElementsByClassName('wptb-preview-table')[0].getElementsByTagName('td');
                for (var i = 0; i < tableCells.length; i++) {
                    tableCells[i].style.padding = value + 'px';
                }
            }

            //Binds the range slider and input, also triggers cell padding change.
            document.getElementById('wptb-table-cell-slider').onchange = function () {
                document.getElementById('wptb-table-cell-number').value = this.value;
                addCellPadding(this.value);
            };

            //Binds the range slider and input, also triggers cell padding change.
            document.getElementById('wptb-table-cell-number').onchange = function () {
                document.getElementById('wptb-table-cell-slider').value = this.value;
                addCellPadding(this.value);
            };

            document.getElementById('wptb-activate-cell-management-mode').onclick = function () {
                if (this.value == "Manage Cells") {
                    document.getElementsByClassName('wptb-cell-management')[0].classList.add('visible');
                    this.value = "Close Cell Management Mode";
                } else {
                    document.getElementsByClassName('wptb-cell-management')[0].classList.remove('visible');
                    this.value = "Manage Cells";
                }
            };

            //Triggers when apply inner border setting changes.
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

            //Binding Checkbox Change, triggers inner border add.
            document.getElementById('wptb-inner-border-check').onchange = function () {
                var _val = this.checked ? 'checked' : 'unchecked';
                addInnerBorder(_val);
            };

            //Triggers when cell padding setting changes.
            function addInnerBorderSize(value) {
                var tableCells = document.getElementsByClassName('wptb-preview-table')[0].getElementsByTagName('td');
                for (var i = 0; i < tableCells.length; i++) {
                    tableCells[i].style.border = value + 'px solid';
                }
            }

            //Binds the range slider and input, also triggers cell padding change.
            document.getElementById('wptb-table-inner-border-slider').onchange = function () {
                document.getElementById('wptb-table-inner-border-number').value = this.value;
                addInnerBorderSize(this.value);
            };

            //Binds the range slider and input, also triggers cell padding change.
            document.getElementById('wptb-table-inner-border-number').onchange = function () {
                document.getElementById('wptb-table-inner-border-slider').value = this.value;
                addInnerBorderSize(this.value);
            };
        };

        document.getElementById('wptb-add-row-before').onclick = window.addRowBefore;
        document.getElementById('wptb-add-row-after').onclick = window.addRowAfter;
        document.getElementById('wptb-add-column-before').onclick = window.addColumnBefore;
        document.getElementById('wptb-add-column-after').onclick = window.addColumnAfter;
    }; // Of document.onready

    //When dragging starts for Text element
    function itemDragStart(event) {
        wptbElement = event.target.id.substring(5, event.target.id.length);

        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
    }

    //On drag elements.
    document.getElementById('wptb-text').ondragstart = itemDragStart;
    document.getElementById('wptb-image').ondragstart = itemDragStart;
    document.getElementById('wptb-button').ondragstart = itemDragStart;
    document.getElementById('wptb-list').ondragstart = itemDragStart;
});
//# sourceMappingURL=admin.js.map
