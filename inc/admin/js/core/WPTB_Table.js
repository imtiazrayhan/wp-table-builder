var array = [], WPTB_Table = function (columns, rows) {

    /* The members of the class */
    var settings = document.getElementsByClassName('wptb-settings-items'),
            wptbTableSetup = document.getElementsByClassName("wptb-table-setup")[0],
            table, row, cell,
            maxAmountOfCells,
            maxAmountOfRows;

    //HERE ARE THE PRIVATE FUNCTIONS
    /*
     * This function toggles buttons visibility in cell edit mode
     * (according to the amount of currently selected cells), and
     * highlights visually the clicked cell if it is not highlighted, or
     * removes highlight if clicked cell is already highlighted. 
     * It too toggles the bits of our abstract representation.
     * @param Event this is the event instance of the click performed over a cell.
     */
    var mark = function ( event ) {
        var rs = this.rowSpan,
            cs = this.colSpan,
            markedCells,
            noCells = document.getElementsByClassName('wptb-no-cell-action'),
            singleCells = document.getElementsByClassName('wptb-single-action'),
            multipleCells = document.getElementsByClassName('wptb-multiple-select-action'),
            cellSettings = document.getElementById( 'wptb-left-scroll-panel-cell-settings' ),
            position = getCoords(this),
            row = position[0],
            column = position[1];
        if ( ! document.select.isActivated() ) {
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
                multipleCells[i].setAttribute('disabled', 'disabled');
            }
            for (var i = 0; i < noCells.length; i++) {
                noCells[i].classList.add('visible');
                noCells[i].removeAttribute('disabled');
            }
            for (var i = 0; i < singleCells.length; i++) {
                singleCells[i].classList.remove('visible');
                singleCells[i].setAttribute('disabled', 'disabled');
            }
            cellSettings.classList.remove( 'visible' );
            
            let wptbRowMove = new WPTB_RowMove();
            wptbRowMove.rowMovingFieldHide();
        } else if (markedCells === 1) {
            for (var i = 0; i < multipleCells.length; i++) {
                multipleCells[i].classList.remove('visible');
                multipleCells[i].setAttribute('disabled', 'disabled');
            }
            for (var i = 0; i < noCells.length; i++) {
                noCells[i].classList.remove('visible');
                noCells[i].setAttribute('disabled', 'disabled');
            }
            for (var i = 0; i < singleCells.length; i++) {
                singleCells[i].classList.add('visible');
                singleCells[i].removeAttribute('disabled');
            }
            let cellHighlighted = document.querySelector( '.wptb-highlighted' );
            if( cellHighlighted ) {
                let wptbTableColumnWidthSlider = document.getElementById( 'wptb-table-column-width-slider' );
                let wptbTableColumnWidthNumber = document.getElementById( 'wptb-table-column-width-number' );
                let tableColumnWidthAutoFixedCheckbox = document.getElementById( 'wptb-table-column-width-auto-fixed' );
                let width = cellHighlighted.style.width;
                if( width ) {
                    wptbTableColumnWidthSlider.value = parseFloat( width, 10 );
                    wptbTableColumnWidthNumber.value = parseFloat( width, 10 );
                    tableColumnWidthAutoFixedCheckbox.checked = true;
                } else if( cellHighlighted.dataset.wptbFixedWidth ) {
                    wptbTableColumnWidthSlider.value = cellHighlighted.dataset.wptbFixedWidth;
                    wptbTableColumnWidthNumber.value = cellHighlighted.dataset.wptbFixedWidth;
                    tableColumnWidthAutoFixedCheckbox.checked = true;
                } else {
                    let cellWidth = WPTB_Helper.getColumnWidth( table, cellHighlighted );
                    wptbTableColumnWidthSlider.value = cellWidth;
                    wptbTableColumnWidthNumber.value = cellWidth;
                    tableColumnWidthAutoFixedCheckbox.checked = false;
                }
                
                
                let wptbTableRowHeightSlider = document.getElementById( 'wptb-table-row-height-slider' );
                let wptbTableRowHeightNumber = document.getElementById( 'wptb-table-row-height-number' );
                let tableRowHeightAutoFixedCheckbox = document.getElementById( 'wptb-table-row-height-auto-fixed' );
                let height = cellHighlighted.style.height;
                if( height ) {
                    wptbTableRowHeightSlider.value = parseFloat( height, 10 );
                    wptbTableRowHeightNumber.value = parseFloat( height, 10 );
                    tableRowHeightAutoFixedCheckbox.checked = true;
                } else if( cellHighlighted.dataset.wptbFixedHeight ) {
                    wptbTableRowHeightSlider.value = cellHighlighted.dataset.wptbFixedHeight;
                    wptbTableRowHeightNumber.value = cellHighlighted.dataset.wptbFixedHeight;
                    tableRowHeightAutoFixedCheckbox.checked = true;
                } else {
                    let cellHeight = WPTB_Helper.getRowHeight( table, cellHighlighted );
                    wptbTableRowHeightSlider.value = cellHeight;
                    wptbTableRowHeightNumber.value = cellHeight;
                    tableRowHeightAutoFixedCheckbox.checked = false;
                }
            }
            cellSettings.classList.add( 'visible' );
            
            let wptbRowMove = new WPTB_RowMove();
            wptbRowMove.rowMovingFieldPutActive();
        } else {
            for (var i = 0; i < multipleCells.length; i++) {
                if (table.isSquare(array)) {
                    multipleCells[i].classList.add('visible');
                    multipleCells[i].removeAttribute('disabled');
                } else {
                    multipleCells[i].classList.remove('visible');
                    multipleCells[i].setAttribute('disabled', 'disabled');
                }
            }
            for (var i = 0; i < noCells.length; i++) {
                noCells[i].classList.remove('visible');
                noCells[i].setAttribute('disabled', 'disabled');
            }
            for (var i = 0; i < singleCells.length; i++) {
                singleCells[i].classList.remove('visible');
                singleCells[i].setAttribute('disabled', 'disabled');
            }
            cellSettings.classList.remove( 'visible' );
            
            let wptbRowMove = new WPTB_RowMove();
            wptbRowMove.rowMovingFieldHide();
        }
    };

    /* 
     * This function fills an array with 1's according to the actual design
     * of HTML table.
     * @returns an array of arrays containing an abstract representation
     * of HTML table.
     * @deprecated
     * */

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
                    } else {
                        cols.push(1);
                    }
                }
            }

            matriz.push(cols);

        }
        return matriz;
    };

    /*
     * This function gets the number and position of cell spaces in current row that are occuped 
     * by upper rowspanned cells.
     * @param number the number of row where we wish to calculate the carried rowspans up to.
     * @return an array with the remaining rowspans in each column.
     */
    var carriedRowspans = function (row) {
        var carried = [], tds, cols;

        for (var i = 0; i < maxAmountOfCells; i++) {
            carried[i] = 0;
        }

        if (row == -1) {
            return carried;
        }

        for (var i = 0; i <= row; i++) {
            cellsBuffer = table.rows[i].getElementsByTagName('td');
            cellPointer = 0;

            for (var xPosition = 0; xPosition < maxAmountOfCells; xPosition += stepsToMove) {
                stepsToMove = 1;

                if (carried[xPosition]) {
                    carried[xPosition]--;
                } else {
                    celda = cellsBuffer[cellPointer++];
                    if (celda.rowSpan > 1) {
                        for (k = 0; k < celda.colSpan; k++) {
                            carried[xPosition + k] = celda.rowSpan - 1;
                        }
                        stepsToMove = celda.colSpan;
                    } else if (celda.colSpan > 1) {
                        stepsToMove = celda.colSpan;
                    }
                }
            }

        }
        return carried;
    };

    /*
     * A helpful function for showing
     * the abstract table in console.
     * @param Array our abstract table.
     */
    var drawTable = function (a) {
        var string = 'DRAWING TABLE:\n';
        for (var i = 0; i < a.length; i++) {

            for (var j = 0; j < a[i].length; j++) {
                string += ' ' + a[i][j];
            }
            string += '\n';
        }
        table.isSquare(a);
    };

    /*
     * It resets all the bits of our abstract representation
     * to 0 and removes the highlighting class of all cells.
     */

    var undoSelect = function () {
        var noCells = document.getElementsByClassName('wptb-no-cell-action'),
                singleCells = document.getElementsByClassName('wptb-single-action'),
                multipleCells = document.getElementsByClassName('wptb-multiple-select-action'),
                cellSettings = document.getElementById( 'wptb-left-scroll-panel-cell-settings' ),
                tds = table.getElementsByClassName('wptb-highlighted');
        while (tds.length) {
            tds[0].classList.remove('wptb-highlighted');
        }
        cellSettings.classList.remove( 'visible' );
        for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].length; j++) {
                array[i][j] = 0;
            }
        }
        for (var i = 0; i < multipleCells.length; i++) {
            multipleCells[i].classList.remove('visible');
            multipleCells[i].setAttribute('disabled', 'disabled');
        }
        for (var i = 0; i < noCells.length; i++) {
            noCells[i].classList.add('visible');
            noCells[i].removeAttribute('disabled');
        }
        for (var i = 0; i < singleCells.length; i++) {
            singleCells[i].classList.remove('visible');
            singleCells[i].setAttribute('disabled', 'disabled');
        }
    };

    /*
     * This fills the abstract representation of our table with 
     * zeros, at the start. the max amount of cells is the greatest sum
     * of all colspans for row.
     */

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
        var maxAmountOfRows = table.rows.length;

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

    /*
     * This function gets the sum of all colspans in a row.
     * @param number the number of row to be used as reference.
     */
    var getActualPointsInRow = function (row) {
        var tds = table.rows[row].getElementsByTagName('td'),
                points = 0;
        for (var i = 0; i < tds.length; i++) {
            points += tds[i].colSpan;
        }
        return points;
    }

    /*
     * This function gets us the exact coordinates of
     * an exact cell, in a more reliable way than xIndex and yIndex,
     * these last ones were meant to be used for getting the cell trough them.
     * @param DOMElement the cell to get the coordinates.
     */
    var getCoords = function (search) {
        var skipInCols = [], cell;

        for (var i = 0; i < maxAmountOfCells; i++) {
            skipInCols[i] = 0;
        }

        for (var i = 0; i < table.rows.length; i++) {
            var cellsBuffer = table.rows[i].getElementsByTagName('td');
            cellPointer = 0;
            for (var xPosition = 0; xPosition < maxAmountOfCells; xPosition += stepsToMove) {
                stepsToMove = 1;

                if (skipInCols[xPosition]) {
                    skipInCols[xPosition]--;
                } else {
                    var td = cellsBuffer[cellPointer++];
                    if (td == search) {
                        return [i, xPosition];
                    }
                    if (td.rowSpan > 1) {
                        for ( let k = 0; k < td.colSpan; k++ ) {
                            skipInCols[xPosition + k] = td.rowSpan - 1;
                        }
                        stepsToMove = td.colSpan;
                    } else if (td.colSpan > 1) {
                        stepsToMove = td.colSpan;
                    }
                }
            }
        }
    };

    jQuery('#wptb-table-header-bg').val('');
    jQuery('#wptb-even-row-bg').val('');
    jQuery('#wptb-odd-row-bg').val('');
    jQuery('#wptb-table-border-color').val('');
    jQuery('#wptb-table-inner-border-number,#wptb-table-inner-border-slider').val('0');
    jQuery('#wptb-table-border-number,#wptb-table-border-slider').val('0');
    jQuery('#wptb-table-padding-number,#wptb-table-padding-slider').val('15');

    if (columns || rows) {
        //END OF PRIVATE FUNCTIONS
        for (var i = 0; i < settings.length; i++) {
            if (settings[i].id !== 'wptb-apply-inner-border') {
                settings[i].classList.add('visible');
            }
        }

        //Create a HTML Table element.
        table = document.createElement( 'table' );
        table.classList.add( 'wptb-preview-table' );
        table.dataset.reconstraction = 1;
        table.dataset.wptbAdaptiveTable = 1;
        //Add the data rows.
        for (var i = 0; i < rows; i++) {

            row = table.insertRow(-1);
            row.classList.add( 'wptb-row' );

            for (var j = 0; j < columns; j++) {
                cell = new WPTB_Cell(mark);
                cell.setCoords(i, j);
                row.appendChild(cell.getDOMElement());
            }
        }
    } else {
        let wptb_preview_table = document.getElementsByClassName( 'wptb-preview-table' );

        if (wptb_preview_table.length > 0) {
            table = wptb_preview_table[0];

            let cells = table.getElementsByTagName('td');

            if (cells.length > 0) {
                for (let i = 0; i < cells.length; i++) {
                    WPTB_Cell(mark, cells[i]);
                }
            }
        }
    }
    
    table.mark = mark;

    /*
     * This just toggles visibility of cell edit bar, and toggles 
     * cell selecting mode.
     */

    table.toggleTableEditMode = function () {
        let bar = document.getElementsByClassName('wptb-edit-bar'),
                cellModeBackground = document.getElementById('wptb-cell_mode_background'),
                leftScrollPanelCurtain = document.getElementById('wptb-left-scroll-panel-curtain'),
                leftScrollPanelCellSettings = document.getElementById( 'wptb-left-scroll-panel-cell-settings' ),
                wptbPreviewTable = document.getElementsByClassName('wptb-preview-table');
        if (wptbPreviewTable.length > 0) {
            wptbPreviewTable = wptbPreviewTable[0];
        }

        if ( bar.length > 0 ) {
            for ( let i = 0; i < bar.length; i++ ) {
                if ( bar[i].classList.contains( 'visible' ) ) {
                    document.select.deactivateMultipleSelectMode();
                    bar[i].classList.remove( 'visible' );
                    cellModeBackground.classList.remove( 'visible' );
                    leftScrollPanelCurtain.classList.remove( 'visible' );
                    leftScrollPanelCellSettings.classList.remove( 'visible' );
                    wptbPreviewTable.parentNode.classList.remove( 'wptb-preview-table-manage-cells' );
                    let wptbPreviewTableTds = wptbPreviewTable.getElementsByTagName( 'td' );
                    if ( wptbPreviewTableTds.length > 0 ) {
                        for ( let i = 0; i < wptbPreviewTableTds.length; i++ ) {
                            wptbPreviewTableTds[i].classList.remove( 'wptb-highlighted' );
                        }
                    }
                } else {
                    document.select.activateMultipleSelectMode();
                    bar[i].classList.add( 'visible' );
                    cellModeBackground.classList.add( 'visible' );
                    leftScrollPanelCurtain.classList.add( 'visible' );
                    wptbPreviewTable.parentNode.classList.add( 'wptb-preview-table-manage-cells' );
                }
            }

        }
    }

    /*
     * For assigning to each cell xIndex and y Index attributes,
     * these are the column number and row number of cell in table. 
     */

    table.recalculateIndexes = function ( start ) {
        let trs = this.getElementsByTagName('tr'), tds, maxCols = 0, maxColsFull = 0,
                tdsArr = [];
        let wptbTopRowAsHeader = document.getElementById( 'wptb-top-row-as-header' );
        
        for (var i = 0; i < trs.length; i++) {
            if ( i == 0 ) {
                if ( start == undefined ) {
                    trs[i].style.backgroundColor = jQuery('#wptb-table-header-bg').val();
                }
                if( wptbTopRowAsHeader.checked ) {
                    if( start == undefined ) {
                        this.classList.add( 'wptb-table-preview-head' );               
                        trs[i].classList.add( 'wptb-table-head' )
                    }  ;
                } else {
                    if( start == undefined ) {
                        this.classList.remove( 'wptb-table-preview-head' );
                        trs[i].classList.remove( 'wptb-table-head' );
                    }
                }
            } else {
                if (i % 2 == 0) {
                    if ( start == undefined ) {
                        trs[i].style.backgroundColor = jQuery('#wptb-odd-row-bg').val();
                    }
                    trs[i].classList.remove( 'wptb-table-head' );
                } else {
                    if ( start == undefined ) {
                        trs[i].style.backgroundColor = jQuery('#wptb-even-row-bg').val();
                    }
                    trs[i].classList.remove( 'wptb-table-head' );
                }
            }

            tdsArr[i];
            tds = trs[i].getElementsByTagName('td');

            if (tdsArr[i] == undefined) {
                tdsArr[i] = [];
            }

            let jMainIter = 0;
            for (var j = 0; j < tds.length; j++) {
                if (tdsArr[i][j] != undefined) {
                    for (let y = 0; y < 100; y++) {
                        if (tdsArr[i][jMainIter] != undefined) {
                            jMainIter++;
                            continue;
                        }
                        tdsArr[i][jMainIter] = tds[j];
                        tds[j].dataset.xIndex = jMainIter;
                        break;
                    }
                } else {
                    tdsArr[i][j] = tds[j];
                    tds[j].dataset.xIndex = jMainIter;
                }
                tds[j].dataset.yIndex = i;

                if (tds[j].colSpan > 1) {
                    for (let k = 1; k < tds[j].colSpan; k++) {
                        jMainIter++;
                        tdsArr[i][jMainIter] = 'tdDummy';
                    }
                }

                if (tds[j].rowSpan > 1) {
                    for (let x = 1; x < tds[j].rowSpan; x++) {
                        if (tdsArr[i + x] == undefined) {
                            tdsArr[i + x] = [];
                        }
                        for (let z = 0; z < tds[j].colSpan; z++) {
                            tdsArr[i + x][jMainIter - tds[j].colSpan + 1 + z ] = 'tdDummy';
                        }
                    }
                }
                jMainIter++;
                if( i == 0 ) {
                    maxColsFull = jMainIter;
                }
            }
            if (j > maxCols) {
                maxCols = j;
            }
        }
        this.columns = maxCols;
        this.maxCols = maxColsFull;
    }
    
     table.addColumnWidth = function( value, cleaner ) {
        let highlighted  = table.getElementsByClassName( 'wptb-highlighted' );
        if( highlighted.length > 0 ) {
            for( let k = 0; k < highlighted.length; k++ ) {
                let dataXIndex = highlighted[k].dataset.xIndex;
                if( dataXIndex ) {
                    function tableTdsFor( dataXIndex, colspan ) {
                        let tableRows = table.rows;
                        let widthIsSet = false;
                        let arrayTdsFromPreviousRow = [];
                        for( let i = 0; i < tableRows.length; i++ ) {
                            let row = tableRows[i];
                            let tds = row.children;
                            for( let j = 0; j < tds.length; j++ ) {
                                let td = tds[j];
                                if( td.dataset.xIndex == dataXIndex ) {
                                    if( value ) {
                                        if( td.colSpan == colspan ) {
                                            td.style.width = value + 'px';
                                            td.removeAttribute( 'data-wptb-fixed-width' );
                                            widthIsSet = true;
                                            let tableColumnWidthAutoFixedCheckbox = document.getElementById( 'wptb-table-column-width-auto-fixed' );
                                            if( ! tableColumnWidthAutoFixedCheckbox.checked ) {
                                                tableColumnWidthAutoFixedCheckbox.checked = true;
                                            }
                                        } else {
                                            td.style.width = null;
                                            td.dataset.wptbFixedWidth = value;
                                            if( i == tableRows.length - 1 && ! widthIsSet ) {
                                                tableTdsFor( dataXIndex, colspan + 1 );
                                            }
                                        }
                                    } else if( cleaner ) {
                                        td.style.width = null;
                                        td.removeAttribute( 'data-wptb-fixed-width' );
                                    } else {
                                        if( td.dataset.wptbFixedWidth ) {
                                            if( td.colSpan == colspan ) {
                                                td.style.width = td.dataset.wptbFixedWidth + 'px';
                                                td.removeAttribute( 'data-wptb-fixed-width' );
                                            } 
                                        } else if( td.style.width ) {
                                            for( let z = 0; z < arrayTdsFromPreviousRow.length; z++ ) {
                                                arrayTdsFromPreviousRow[z].style.width = td.style.width;
                                            }
                                            arrayTdsFromPreviousRow = [];
                                        } else {
                                            arrayTdsFromPreviousRow.push( td );
                                        }
                                    }
                                    break;
                                } 
                            }
                        }
                    }
                    
                    tableTdsFor( dataXIndex, 1 );
                }
            }
            
            table.tdDefaultWidth();
        }
    }
    
    table.tdDefaultWidth = function() {
        let rows = table.rows;
        
        let tableTdsSumMaxWidth = 0;
        let tableTdsSumMaxWidthFixed = 0;
        let tableTdsSumMaxWidthAuto = 0;
        
        let wptbTableSetup = document.getElementsByClassName( 'wptb-table-setup' )[0];
        let wptbTableSetupWidth = wptbTableSetup.offsetWidth;
        
        let arrayCellsWidthFixedHelper = [];
        let arrayCellsWidthAutoHelper = [];
        let tdPaddingCommon = 0;
        let tableTdBorderCommonWidth = 0;
        let cssForTdsWidthAuto = '';
        
        for( let i = 0; i < rows.length; i++ ) {
            let tds = rows[i].children;
            for( let j = 0; j < tds.length; j++ ) {
                let td = tds[j];
                
                if( ! arrayCellsWidthFixedHelper[parseInt( td.dataset.xIndex )] && ! arrayCellsWidthAutoHelper[parseInt( td.dataset.xIndex )] ) {
                    if( td.style.width ) {
                        arrayCellsWidthFixedHelper[parseInt( td.dataset.xIndex )] = parseFloat( td.style.width );
                        td.removeAttribute( 'data-wptb-css-td-auto-width' );
                    } else {
                        if( ! td.dataset.wptbFixedWidth ) {
                            arrayCellsWidthAutoHelper[parseInt( td.dataset.xIndex )] = 100;
                            td.dataset.wptbCssTdAutoWidth = true;
                        }
                    }
                    
                    if( window.getComputedStyle( td, null ) ) {
                        let tdStyleObj = window.getComputedStyle( td, null );
                        let tdPaddingLeft = tdStyleObj.getPropertyValue( 'padding-left' );
                        let tdPaddingRight = tdStyleObj.getPropertyValue( 'padding-right' );
                        tdPaddingCommon = parseFloat( tdPaddingLeft, 10 ) + parseFloat( tdPaddingRight, 10 );

                        let tableTdBorderLeftWidth = tdStyleObj.getPropertyValue( 'border-left-width' );
                        let tableTdBorderRightWidth = tdStyleObj.getPropertyValue( 'border-right-width' );
                        tableTdBorderCommonWidth = parseFloat( tableTdBorderLeftWidth, 10 ) + parseFloat( tableTdBorderRightWidth, 10 );
                        if( arrayCellsWidthFixedHelper[parseInt( td.dataset.xIndex )] ) {
                            arrayCellsWidthFixedHelper[parseInt( td.dataset.xIndex )] += tdPaddingCommon;
                            arrayCellsWidthFixedHelper[parseInt( td.dataset.xIndex )] += tableTdBorderCommonWidth;
                        } else {
                            arrayCellsWidthAutoHelper[parseInt( td.dataset.xIndex )] += tdPaddingCommon;
                            arrayCellsWidthAutoHelper[parseInt( td.dataset.xIndex )] += tableTdBorderCommonWidth;
                        }
                    }
                } else if( arrayCellsWidthAutoHelper[parseInt( td.dataset.xIndex )] ) {
                    if( ! td.dataset.wptbFixedWidth ) {
                        td.dataset.wptbCssTdAutoWidth = true;
                    }
                } else if( arrayCellsWidthFixedHelper[parseInt( td.dataset.xIndex )] ) {
                    td.removeAttribute( 'data-wptb-css-td-auto-width' );
                }
            }
        }
        
        for( let i = 0; i < arrayCellsWidthFixedHelper.length; i++ ) {
            if( arrayCellsWidthFixedHelper[i] ) {
                tableTdsSumMaxWidthFixed += arrayCellsWidthFixedHelper[i];
            }
        }
        
        let CellsWidthAutoCount = 0;
        for( let i = 0; i < arrayCellsWidthAutoHelper.length; i++ ) {
            if( arrayCellsWidthAutoHelper[i] ) {
                tableTdsSumMaxWidthAuto += arrayCellsWidthAutoHelper[i];
                CellsWidthAutoCount++;
            }
        }
        
        let tableFullStyleObj = window.getComputedStyle( table, null );
        let borderLeftWidth = tableFullStyleObj.getPropertyValue( 'border-left-width' );
        let borderRightWidth = tableFullStyleObj.getPropertyValue( 'border-right-width' );
        let tableBorderCommon = parseFloat( borderLeftWidth, 10 ) + parseFloat( borderRightWidth, 10 );
        tableTdsSumMaxWidth = tableTdsSumMaxWidthFixed + tableTdsSumMaxWidthAuto + tableBorderCommon;
        
        table.dataset.wptbTableTdsSumMaxWidth = tableTdsSumMaxWidth;
        if( CellsWidthAutoCount ) {
            table.dataset.wptbCellsWidthAutoCount = CellsWidthAutoCount;
            if( table.mergingСellsHorizontally ) {
                table.dataset.wptbFixedWidthSize = tableTdsSumMaxWidthFixed - tableBorderCommon;
            } else {
                table.removeAttribute( 'data-wptb-fixed-width-size' );
            }
        } else {
            table.removeAttribute( 'data-wptb-fixed-width-size' );
            table.removeAttribute( 'data-wptb-cells-width-auto-count' );
        }
        
        let styleElementCreate = false;
        let tableTdWidthAuto;
        if( tableTdsSumMaxWidth < wptbTableSetupWidth ) {
            if( CellsWidthAutoCount ) {
                table.style.minWidth = '100%';
                if( table.mergingСellsHorizontally ) {
                    table.style.width = null;
                    let tableTdsWidthAutoCommon = wptbTableSetupWidth - tableTdsSumMaxWidthFixed - tableBorderCommon;
                    tableTdWidthAuto = tableTdsWidthAutoCommon / CellsWidthAutoCount;
                    tableTdWidthAuto = tableTdWidthAuto - tdPaddingCommon - tableTdBorderCommonWidth;
                    styleElementCreate = true;
                } else {
                    table.style.width = '100%';
                }
            } else {
                table.style.width = null;
                table.style.minWidth = null;
                table.style.maxWidth = tableTdsSumMaxWidth + 'px';
            }
        } else {
            table.style.maxWidth = null;
            table.style.minWidth = tableTdsSumMaxWidth + 'px';
            table.style.width = null;
            tableTdWidthAuto = '100'
            styleElementCreate = true;
        }
        
        let head = document.head;
        if( head ) {
            let cssForTdsWidthAutoOld = head.querySelector( 'style[data-wptb-td-auto-width="true"]' );
            if( cssForTdsWidthAutoOld ) {
                head.removeChild( cssForTdsWidthAutoOld );
            }
        }
        
        if( styleElementCreate ) {
            cssForTdsWidthAuto = document.createElement( 'style' );
            cssForTdsWidthAuto.setAttribute( 'data-wptb-td-auto-width', true );
            cssForTdsWidthAuto.innerHTML = '[data-wptb-css-td-auto-width=true]{width:' + tableTdWidthAuto + 'px}';
            if( head ) {
                head.appendChild( cssForTdsWidthAuto );
            }
        }
    }
    
    table.addRowHeight = function( value, cleaner ) {
        let highlighted  = table.getElementsByClassName( 'wptb-highlighted' );
        if( highlighted.length > 0 ) {
            for( let k = 0; k < highlighted.length; k++ ) {
                let dataYIndex = highlighted[k].dataset.yIndex;
                if( dataYIndex ) {
                    function tableTdsFor( dataYIndex, rowspan ) {
                        let tableRows = table.rows;
                        let heightIsSet = false;
                        let arrayTdsPrevious = [];
                        for( let i = 0; i < tableRows.length; i++ ) {
                            let row = tableRows[i];
                            let tds = row.children;
                            for( let j = 0; j < tds.length; j++ ) {
                                let td = tds[j];
                                if( td.dataset.yIndex == dataYIndex ) {
                                    if( value ) {
                                        if( td.rowSpan == rowspan ) {
                                            td.style.height = value + 'px';
                                            td.removeAttribute( 'data-wptb-fixed-heidht' );
                                            heightIsSet = true;
                                            let tableColumnHeightAutoFixedCheckbox = document.getElementById( 'wptb-table-row-height-auto-fixed' );
                                            if( ! tableColumnHeightAutoFixedCheckbox.checked ) {
                                                tableColumnHeightAutoFixedCheckbox.checked = true;
                                            }
                                            continue;
                                        } else {
                                            td.style.height = null;
                                            td.dataset.wptbFixedHeight = value;
                                            if( j == tds.length - 1 && ! heightIsSet ) {
                                                tableTdsFor( dataYIndex , rowspan + 1 );
                                            }
                                        }
                                    } else if( cleaner ) {
                                        td.style.height = null;
                                        td.removeAttribute( 'data-wptb-fixed-heidht' );
                                    } else {
                                        if( td.dataset.wptbFixedHeight ) {
                                            if( td.rowSpan = rowspan ) {
                                                td.style.height = td.dataset.wptbFixedHeight + 'px';
                                                td.removeAttribute( 'data-wptb-fixed-width' );
                                            }
                                        } else if( td.style.height ) {
                                            for( let z = 0; z < arrayTdsPrevious.length; z++ ) {
                                                arrayTdsPrevious[z].style.height = td.style.height;
                                            }
                                            arrayTdsPrevious = [];
                                        } else {
                                            arrayTdsPrevious.push( td );
                                        }
                                    }
                                } 
                            }
                        }
                    }
                    
                    tableTdsFor( dataYIndex, 1 );
                }
            }
        }
    }
    
    table.reconstraction = function() {
        let tds = table.getElementsByTagName( 'td' );
        let wptbAdaptiveTableChoseBlock = document.getElementsByClassName( 'wptb-adaptive-table-chose-block' );
        if( wptbAdaptiveTableChoseBlock.length > 0 ) {
            wptbAdaptiveTableChoseBlock = wptbAdaptiveTableChoseBlock[0];
        }
        table.mergingСellsHorizontally = false;
        table.mergingCellsVertically = false;
        table.dataset.reconstraction = 1;
        wptbAdaptiveTableChoseBlock.style.display = 'block';
        let forBreak = 0;
        for( let i = 0; i < tds.length; i++ ) {
            if( tds[i].colSpan > 1 ) {
                table.dataset.reconstraction = 0;
                wptbAdaptiveTableChoseBlock.style.display = 'none';
                table.mergingСellsHorizontally = true;
                forBreak++;
            }
            
            if( tds[i].rowSpan > 1 ) {
                table.dataset.reconstraction = 0;
                wptbAdaptiveTableChoseBlock.style.display = 'none';
                table.mergingCellsVertically = true;
                forBreak++;
            }
            
            if( forBreak == 2 ) {
                break;
            }
        }
    }

    /*
     * As simple as it is: adds a column to the end of table.
     */
    table.addColumnEnd = function () {
        let td,
            currentTable = document.getElementsByClassName('wptb-preview-table'),
            currentTableTd,
            currentTdStyle;
        if (currentTable.length > 0) {
            currentTableTd = currentTable[0].querySelector('td');
        }

        if (currentTableTd) {
            currentTdStyle = currentTableTd.getAttribute('style');
        }
        
        for (var i = 0; i < table.rows.length; i++) {
            td = new WPTB_Cell(mark);
            
            if (currentTdStyle) {
                td.getDOMElement().setAttribute('style', currentTdStyle);
                td.getDOMElement().style.width = null;
            }
            
            table.rows[i].appendChild(td.getDOMElement());
            array[i].push(0);
        }
        
        maxAmountOfCells++;
        table.recalculateIndexes();
        table.tdDefaultWidth();
        table.addRowHeight();
        WPTB_Helper.dataTitleColumnSet( table );
        undoSelect();
        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
        wptbTableStateSaveManager.tableStateSet();
    };

    /*
     * As simple as it looks: adds a column to the start of table.
     */

    table.addColumnStart = function () {
        let td,
            firstCell,
            currentTable = document.getElementsByClassName('wptb-preview-table'),
            currentTableTd,
            currentTdStyle;
        if ( currentTable.length > 0 ) {
            currentTableTd = currentTable[0].querySelector('td');
        }

        if ( currentTableTd ) {
            currentTdStyle = currentTableTd.getAttribute('style');
        }
        
        for (var i = 0; i < table.rows.length; i++) {
            td = new WPTB_Cell(mark);
            if (currentTdStyle) {
                td.getDOMElement().setAttribute('style', currentTdStyle);
                td.getDOMElement().style.width = null;
            }
            firstCell = table.rows[i].getElementsByTagName('td')[0];
            if (firstCell) {
                table.rows[i].insertBefore(td.getDOMElement(), firstCell);
            } else {
                table.rows[i].appendChild(td.getDOMElement());
            }
            array[i].push(0);
        }

        maxAmountOfCells++;
        table.recalculateIndexes();
        table.tdDefaultWidth();
        table.addRowHeight();
        WPTB_Helper.dataTitleColumnSet( table );
        undoSelect();
        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
        wptbTableStateSaveManager.tableStateSet();
    };

    /*
     * Well, not so simple as previous functions.
     * It adds a column after a certain column of reference.
     * @param integer the column number to be used as reference.
     *	If empty, then the first highlighted cell is used as reference.
     */

    table.addColumnAfter = function (c_pos) {
        let rows = table.rows,
            cellPointer,
            cellsBuffer,
            cell = document.querySelector('.wptb-highlighted'),
            cellStyle = cell.getAttribute('style'),
            pos = c_pos != undefined && typeof c_pos === 'number' ? c_pos : getCoords(cell)[1];
    
        
    
        if( maxAmountOfCells - pos - cell.colSpan + 1 == 1 ) {
            table.addColumnEnd();
        } else {
            let pendingInsertion = false,
                stepsToMove,
                td, bro,
                carriedRowspans = [],
                currentCell;

            for (var i = 0; i < maxAmountOfCells; i++) {
                carriedRowspans.push(0);
            }

            for (var i = 0; i < rows.length; i++) {
                cellPointer = 0;
                cellsBuffer = rows[i].getElementsByTagName('td');
                pendingInsertion = false;
                for (var xPosition = 0;
                        xPosition < maxAmountOfCells;
                        xPosition += stepsToMove) {
                    stepsToMove = 1;

                    if (pendingInsertion) {
                        td = new WPTB_Cell(mark);
                        if (cellStyle) {
                            td.getDOMElement().setAttribute('style', cellStyle);
                            td.getDOMElement().style.width = null;
                        }
                        if (currentCell && rows[i].contains(currentCell)) {
                            bro = currentCell.nextSibling;
                            if (bro) {
                                rows[i].insertBefore(td.getDOMElement(), bro);
                            } else {
                                rows[i].appendChild(td.getDOMElement());
                            }
                        } else {
                            rows[i].insertBefore(td.getDOMElement(), cellsBuffer[0]);
                        }
                        break;
                    } else if (carriedRowspans[xPosition] > 0) {
                        // If no pending insertion, let's check if no rowspan from upper cells is pending in current position
                        if (pos == xPosition) {
                            pendingInsertion = true;
                        }
                    } else {
                        currentCell = cellsBuffer[cellPointer++];
                        if (currentCell.rowSpan > 1) {
                            stepsToMove = currentCell.colSpan;
                            for (var k = 0; k < currentCell.colSpan; k++) {
                                carriedRowspans[xPosition + k] = currentCell.rowSpan;
                                if (xPosition + k == pos) {
                                    pendingInsertion = true;
                                }
                            }
                        } else if (currentCell.colSpan > 1) {
                            stepsToMove = currentCell.colSpan;
                            for (var k = 0; k < currentCell.colSpan; k++) {
                                if (xPosition + k == pos) {
                                    pendingInsertion = true;
                                }
                            }
                        } else if (xPosition == pos) {
                            pendingInsertion = true;
                        }
                    }
                }

                for (var l = 0; l < maxAmountOfCells; l++) {
                    if (carriedRowspans[l] > 0)
                        carriedRowspans[l]--;
                }

            }

            for (var i = 0; i < array.length; i++) {
                array[i].push(0);
            }
            maxAmountOfCells++;
            drawTable(array);
            table.recalculateIndexes();
            table.addColumnWidth();
            table.addRowHeight();
            WPTB_Helper.dataTitleColumnSet( table );
            undoSelect();
            let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
            wptbTableStateSaveManager.tableStateSet();
        }
    };

    /*
     * For preventing us to take a lot of time,
     * This is just calling the function addColumnAfter, but
     * using the previous column to current one as reference.
     * @see addColumnAfter
     */

    table.addColumnBefore = function () {
        var cell = document.querySelector('.wptb-highlighted'),
                pos = getCoords(cell)[1];

        if (pos === 0) {
            table.addColumnStart();
        } else {
            table.addColumnAfter(pos - 1);
        }
    };

    /*
     * Luckily, thisfunction is simple, 
     * it just add a row to the end of table.
     */

    table.addRowToTheEnd = function () {
        let r = table.insertRow(-1),
                td,
                aux,
                currentTable = document.getElementsByClassName('wptb-preview-table'),
                currentTableTd,
                currentTdStyle;
        r.classList.add( 'wptb-row' );
        if (currentTable.length > 0) {
            currentTableTd = currentTable[0].querySelector('td');
        }

        if (currentTableTd) {
            currentTdStyle = currentTableTd.getAttribute('style');
        }

        for (var i = 0; i < maxAmountOfCells; i++) {
            td = new WPTB_Cell(mark);
            if (currentTdStyle) {
                td.getDOMElement().setAttribute('style', currentTdStyle);
            }
            r.appendChild(td.getDOMElement());
        }
        aux = Array.from(array[0]);
        array.push(aux);
        drawTable(array);
        table.recalculateIndexes();
        table.addColumnWidth();
        WPTB_Helper.dataTitleColumnSet( table );
        undoSelect();
        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
        wptbTableStateSaveManager.tableStateSet();
    };

    /*
     * Yet another simple function, 
     * it just add a row to the start of table.
     */

    table.addRowToTheStart = function () {
        let r = table.insertRow(0),
                td,
                aux,
                currentTable = document.getElementsByClassName('wptb-preview-table'),
                currentTableTd,
                currentTdStyle;
        r.classList.add( 'wptb-row' );
        if (currentTable.length > 0) {
            currentTableTd = currentTable[0].querySelector('td');
        }

        if (currentTableTd) {
            currentTdStyle = currentTableTd.getAttribute('style');
        }

        for (var i = 0; i < maxAmountOfCells; i++) {
            td = new WPTB_Cell(mark);
            if (currentTdStyle) {
                td.getDOMElement().setAttribute('style', currentTdStyle);
            }
            r.appendChild(td.getDOMElement());
        }
        aux = Array.from(array[0]);
        array.push(aux);
        drawTable(array);
        table.recalculateIndexes();
        table.addColumnWidth();
        WPTB_Helper.dataTitleColumnSet( table );
        undoSelect();
        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
        wptbTableStateSaveManager.tableStateSet();
    };

    /* 
     * This function adds a row before the current one.
     * Since the biggest factor of problem is a not-started but ongoing rowspan,
     * the most of the troubles is not here.
     */

    table.addRowBefore = function () {
        let cell = document.querySelector('.wptb-highlighted'),
            cellStyle = cell.getAttribute('style'),
            row = getCoords(cell)[0],
            cellNew;
        for( let i = row - 1; i >= 0; i-- ) {
            let rowChildren = table.rows[i].children;
            let rowChildrenLength = rowChildren.length;
            if( rowChildrenLength > 0 ) {
                for( let j = 0; j < rowChildrenLength; j++ ) {
                    if( rowChildren[j].rowSpan == 1 ) {
                        row = i;
                        cellNew = true;
                        break;
                    }
                }
            }
            if ( cellNew ) {
                break;
            }
        }

        if (row === 0) {
            table.addRowToTheStart();
        } else {
            table.addRowAfter( row, cellStyle );
        }
    };

    /*
     * Well... by the name convention of the previous 3 functions,
     * it's pretty obvious that this functions attaches a new
     * row after highlighted cell row. The greatest obstacle it was
     * the possibility of a TR not having the exact amount of columns
     * occuped by actual node but rowspanned upper cells. For that purpose
     * it was created the function realTimeArray.
     * @see realTimeArray
     */

    table.addRowAfter = function ( row, cellStyle ) {
        let cellRowSpan,
            rowAfter,
            aux;
            
        if ( ( row == undefined || typeof row !== 'number' ) && cellStyle == undefined ) {
            let cell = document.querySelector('.wptb-highlighted');
            cellStyle = cell.getAttribute('style'),
            row = getCoords(cell)[0],
            cellRowSpan = cell.rowSpan,
            rowAfter = row + cellRowSpan - 1;
        } else {
            rowAfter = row;
        }
        
        
        let cellsColSpan = 0;
        if ( rowAfter < table.rows.length -1 ) {
            for( let i = 0; i <= rowAfter ; i++ ) {
                let tableRowsIChildren = table.rows[i].children,
                    tableRIChildrenLength = tableRowsIChildren.length;
                if( tableRIChildrenLength > 0 ) {
                    for( let j = 0; j < tableRIChildrenLength; j++ ) {
                        let rowIRowSpan = tableRowsIChildren[j].rowSpan;

                        if ( rowIRowSpan - 1  + i > rowAfter ) {
                            tableRowsIChildren[j].rowSpan++;
                        }
                    }
                }
            }
            
            let rNext = table.rows[rowAfter + 1],
                rNextChildren = rNext.children,
                rNextChildrenLength = rNextChildren.length;
                
            if( rNextChildrenLength > 0 ) {
                for ( let i = 0; i < rNextChildrenLength; i++ ) {
                    cellsColSpan += rNextChildren[i].colSpan;
                }
            }
        } else {
            cellsColSpan = array[0].length;
        }
        
        let r = table.insertRow( rowAfter + 1 );
        r.classList.add( 'wptb-row' );
        
        for ( j = 0; j < cellsColSpan; j++ ) {
            let td = new WPTB_Cell( mark );
            td.getDOMElement().setAttribute( 'style', cellStyle );
            td.getDOMElement().style.width = null;
            td.getDOMElement().style.height = null;
            r.appendChild( td.getDOMElement() );
        }

        aux = Array.from(array[0]);
        array.push(aux);
        drawTable(array);
        table.recalculateIndexes();
        table.addColumnWidth();
        WPTB_Helper.dataTitleColumnSet( table );
        undoSelect();
        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
        wptbTableStateSaveManager.tableStateSet();
    };
    
    /*
     * This function checks the current selected cells
     * make a rectangular shape.
     * @param Array the abstract table.
     * @return false, if not making a rectangle, or
     *	Array an array containing number of rows and columns, if selection makes a rectangle.
     */

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
                    if ( j < columnStart || columnStart == -1 ) {
                        columnStart = j;
                    }
                    if ( i < rowStart || rowStart == -1 ) {
                        rowStart = i;
                    }
                }
            }
            
        }

        for (var i = a.length - 1; i > -1; i--) {
            for (var j = a[i].length - 1; j > -1; j--) {
                if (a[i][j] == 1) {
                    if ( j > columnEnd ) {
                        columnEnd = j;
                    }
                    if ( i > rowEnd ) {
                        rowEnd = i;
                    }
                }
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

    /*
     * This function merges all selected cells.
     * Well, actually sets the colspan and rowspan of first 
     * upper left  cell in selection and deletes the another selected cells.
     */

    table.mergeCells = function () {
        var dimensions = table.isSquare(array),
            rowspan = dimensions[0],
            colspan = dimensions[1],
            first = document.querySelector('.wptb-highlighted'),
            tds = [].slice.call(document.getElementsByClassName('wptb-highlighted'), 1),
            tdsChildrenNew = [];

        for (let i = 0; i < tds.length; i++) {
            let tdsInternalElements = tds[i].getElementsByClassName('wptb-ph-element');
            if (tdsInternalElements.length > 0) {
                let tdsIntElemLength = tdsInternalElements.length;
                for (let j = 0; j < tdsIntElemLength; j++) {
                    tdsChildrenNew.push(tdsInternalElements[j]);
                }
            }
            let p = tds[i].parentNode;
            p.removeChild(tds[i]);
        }
        if (tdsChildrenNew.length > 0) {
            for (let i = 0; i < tdsChildrenNew.length; i++) {
                first.appendChild(tdsChildrenNew[i]);
            }
        }

        first.colSpan = colspan;
        first.rowSpan = rowspan;
        table.recalculateIndexes();
        table.reconstraction();
        let firstWidth = first.style.width;
        let firstDataFixedWidth = first.dataset.wptbFixedWidth;
        if( firstWidth ) {
            table.addColumnWidth( parseFloat( firstWidth, 10 ) );
        } else if( firstDataFixedWidth ) {
            table.addColumnWidth();
        } else {
            table.addColumnWidth( false, true );
        }
        
        let firstHeight = first.style.height;
        let firstDataFixedHeight = first.dataset.wptbFixedHeight;
        if( firstHeight ) {
            table.addRowHeight( parseFloat( firstHeight, 10 ) );
        } else if( firstDataFixedHeight ) {
            table.addRowHeight();
        } else {
            table.addRowHeight( false, true );
        }
        WPTB_Helper.dataTitleColumnSet( table );
        undoSelect();
        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
        wptbTableStateSaveManager.tableStateSet();
    };

    /*
     * This functions makes the exact inverse as above.
     * It resets colspan and rowspan and appends 
     * the same amount in cells to the table.
     * @bug
     */

    table.splitCell = function () {
        var cell = document.getElementsByClassName('wptb-highlighted')[0],
            rowspan = cell.rowSpan,
            colspan = cell.colSpan,
            cellStyles = cell.getAttribute('style'),
            row = getCoords(cell)[0],
            thisRow = table.rows[row],
            cellXIndex =cell.dataset.xIndex;
    
        cell.rowSpan = 1;
        cell.colSpan = 1;
        
        for (let i = 1; i < colspan; i++) {
            let td = new WPTB_Cell(mark);
            td.getDOMElement().setAttribute('style', cellStyles);
            td.getDOMElement().classList.add( 'wptb-highlighted' );
            if ( cell.nextSibling ) {
                thisRow.insertBefore( td.getDOMElement(), cell.nextSibling );
            } else {
                thisRow.appendChild( td.getDOMElement() );
            }
            
        }

        if (rowspan > 1) {
            for (let i = 1; i < rowspan; i++) {
                let rowChildInsertBefore = undefined,
                    rowNext = table.rows[row + i],
                    rowChildren = rowNext.children,
                    rowChildrenLength = rowChildren.length;
            
                if ( rowChildrenLength > 0 ) {
                    for ( let k = 0; k < rowChildrenLength; k++ ) {
                        if ( Number( rowChildren[k].dataset.xIndex ) > Number( cellXIndex ) ) {
                            rowChildInsertBefore = rowChildren[k];
                            break;
                        } 
                    }
                }
                for ( let j = 0; j < colspan; j++ ) {
                    let td = new WPTB_Cell( mark );
                    td.getDOMElement().setAttribute( 'style', cellStyles );
                    if ( rowChildInsertBefore != undefined ) {
                        rowNext.insertBefore( td.getDOMElement(), rowChildInsertBefore );
                    } else {
                        rowNext.appendChild( td.getDOMElement() );
                    }
                }
            }
        }

        table.recalculateIndexes();
        table.reconstraction();
        table.addColumnWidth();
        table.addRowHeight();
        WPTB_Helper.dataTitleColumnSet( table );
        undoSelect();
        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
        wptbTableStateSaveManager.tableStateSet();
    };

    /*
     * Searches for rowspanned cells up to row number meeting it.
     * @param number the number of row where the function
     * must search up to.
     */

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

    }

    /*
     * This function explores the table and adds 
     * a cell for each lacking one for each row
     * to meet an even amount of cells.
     */

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
                //table.rows[i].insertBefore( td.getDOMElement(), rows[i].nextSibling );
            }
        }
    };

    /*
     * This function deletes the row of currently
     * selected cell. 
     */

    table.deleteRow = function () {
        let cell = document.querySelector('.wptb-highlighted'),
            cellStyles = cell.getAttribute('style'),
            rowspan = cell.rowSpan,
            row = getCoords(cell)[0],
            thisRow,
            aux;
    
        if ( rowspan == undefined ) rowspan = 1;
        
        for ( let i = 0; i < rowspan; i++ ) {
            thisRow = table.rows[row];
            let thisRowChildren = thisRow.children,
                nextRow = table.rows[row + 1],
                nextRowChildren,
                nextRowChildrenLength,
                tdArr = [];

            if( nextRow != undefined ) {
                nextRowChildren = nextRow.children;
                nextRowChildrenLength = nextRowChildren.length;
                for (let j = 0; j < thisRowChildren.length; j++) {
                    if ( thisRowChildren[j].rowSpan > 1 ) {
                        let td = new WPTB_Cell(mark);
                            td.getDOMElement().setAttribute('style', cellStyles);
                            td.getDOMElement().colSpan = thisRowChildren[j].colSpan;
                            td.getDOMElement().rowSpan = thisRowChildren[j].rowSpan - 1;

                        let nextRowChildrenK = undefined;
                        for ( let k = 0; k < nextRowChildrenLength; k++ ) {
                            if ( Number( nextRowChildren[k].dataset.xIndex ) > Number( thisRowChildren[j].dataset.xIndex ) ) {
                                nextRowChildrenK = nextRowChildren[k];
                                break;
                            } 
                        }

                        if ( nextRowChildrenK ) {
                            tdArr.push( [td, nextRowChildrenK] );
                        } else {
                            tdArr.push( [td] );
                        }
                    }
                }

                if ( tdArr.length > 0 ) {
                    for ( let k = 0; k < tdArr.length; k++ ) {
                        if ( tdArr[k][1] != undefined ) {
                            nextRow.insertBefore( tdArr[k][0].getDOMElement(), tdArr[k][1] );
                        } else {
                            nextRow.appendChild( tdArr[k][0].getDOMElement() );
                        }
                    }
                }
            }
            
            let tableRows = table.rows;
            if ( tableRows.length > 0 ) {
                for ( let j = 0; j < row; j++ ) {
                    let jRowChildren = tableRows[j].children;
                    if ( jRowChildren.length > 0 ) {
                        for ( let x = 0; x < jRowChildren.length; x++ ) {
                            if ( jRowChildren[x].rowSpan - 1 >= row - j ) {
                                jRowChildren[x].rowSpan--;
                            }
                        }
                    }
                }
            }
            aux = Array.from(array[0]);
            array.pop(aux);
            drawTable(array);
            table.getElementsByTagName('tbody')[0].removeChild(table.rows[row]);
            
            if( table.rows.length == 0 ) {
                table.toggleTableEditMode();
                wptbTableSetup.innerHTML = '';
                WPTB_Helper.settingsPanelClear();
                document.getElementsByClassName('wptb-table-generator')[0].style.display = 'table';
            }
            
            table.recalculateIndexes();
            WPTB_Helper.dataTitleColumnSet( table );
        }
        
        undoSelect();
        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
        wptbTableStateSaveManager.tableStateSet();
    }

    /*
     * This function deletes the column of currently
     * selected cell. Again, this is way more complicated than
     * delete row case.
     */

    table.deleteColumn = function () {
        let cell = document.querySelector('.wptb-highlighted'),
            cellXIndex = cell.dataset.xIndex,
            colspan = cell.colSpan;
        
        for ( let i = 0; i < colspan; i++ ) {
            for ( let j = 0; j < table.rows.length; j++ ) {
                let rowChildren = table.rows[j].children;
                let rowChildrenLength = rowChildren.length;
                if( rowChildrenLength > 0 ) {
                    for ( let k = rowChildrenLength - 1; k >= 0; k-- ) {
                        if ( Number( rowChildren[k].dataset.xIndex ) == Number( cellXIndex ) ) {
                            if ( rowChildren[k].colSpan > 1 ) {
                                rowChildren[k].colSpan--;
                            } else {
                                table.rows[j].removeChild( rowChildren[k] );
                            }
                            break;
                        } else if( Number( rowChildren[k].dataset.xIndex ) < Number( cellXIndex ) && 
                                Number( rowChildren[k].dataset.xIndex ) + 
                                Number( rowChildren[k].colSpan -1 ) >= cellXIndex ) {
                            if ( rowChildren[k].colSpan > 1 ) {
                                rowChildren[k].colSpan--;
                            }
                            break;
                        }
                    }
                }
            }
            
            for ( let j = 0; j < table.rows.length; j++ ) {
                if (array[j] != undefined)
                    array[j].pop();
            }
            
            maxAmountOfCells--;
            
            if( table.querySelectorAll( 'td' ).length == 0 ) {
                table.toggleTableEditMode();
                wptbTableSetup.innerHTML = '';
                WPTB_Helper.settingsPanelClear();
                document.getElementsByClassName('wptb-table-generator')[0].style.display = 'table';
            }
            
            table.recalculateIndexes();
            table.tdDefaultWidth();
            WPTB_Helper.dataTitleColumnSet( table );
        }
        
        undoSelect();
        let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
        wptbTableStateSaveManager.tableStateSet();
    };

    document.getElementsByClassName('wptb-table-generator')[0].style.display = 'none';

    array = fillTableArray();

    undoSelect();
    drawTable(array);

    wptbTableSetup.appendChild(table);
    //if (columns || rows) {
        table.recalculateIndexes( true );
    //}
    table.reconstraction();
    table.tdDefaultWidth();
    
    wptbTableSetup.onresize = function() {
        table.tdDefaultWidth();
    };

    WPTB_LeftPanel();
    
    // this code gets the ID of the active element in the toolbar 
    // and stores it in the data attribute of the common container element "wpcd_fixed_toolbar"
//    let wptbPhElement = document.getElementsByClassName( 'wptb-ph-element' );
//    let wpcdFixedToolbar = document.getElementById( 'wpcd_fixed_toolbar' );
//    for ( let i = 0; i < wptbPhElement.length; i++ ) {
//        wptbPhElement[i].addEventListener( 'click', function( e ) {
//            let wptbToolbar = document.getElementById( 'wpcd_fixed_toolbar' ).children;
//            for ( let j = 0; j < wptbToolbar.length; j++ ) {
//                let elementStyles = window.getComputedStyle( wptbToolbar[j], 'null' );
//                if( elementStyles.getPropertyValue( 'display' ) == 'block' ) {
//                    wpcdFixedToolbar.dataset.toolbarActiveId = wptbToolbar[j].getAttribute( 'id' );
//                }
//            }
//        }, false );
//    }
    
//    let wptbPanelLeft = document.getElementsByClassName( 'wptb-panel-left' );
//    if( wptbPanelLeft.length > 0 ) {
//        wptbPanelLeft[0].addEventListener( 'click', function( e ) {
//            let toolbarActiveElementId = wpcdFixedToolbar.dataset.toolbarActiveId;
//            document.getElementById( toolbarActiveElementId ).style.display = '';
//        }, false );
//    }
    
//    let body = document.getElementsByTagName( 'body' );
//    if( body.length > 0 ) {
//        body[0].addEventListener( 'click', function( e ) {
//            if ( e.target.classList.contains( 'wptb-panel-left' ) || WPTB_Helper.findAncestor( e.target, 'wptb-panel-left' ) ) {
//                let toolbarActiveElementId = wpcdFixedToolbar.dataset.toolbarActiveId;
//                document.getElementById( toolbarActiveElementId ).style.display = '';
//            }
//        }, false );
//    }
};