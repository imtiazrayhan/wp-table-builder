var WPTB_innerElementSet = function  ( element ) {
    
    element.ondragenter = function (e) {
        var div;
        if ( e.dataTransfer.types.indexOf( 'wptbelement' ) == -1 && e.dataTransfer.types.indexOf( 'wptb-moving-mode' ) == -1 ) {
            return;
        }
        WPTB_DropHandle(this, e);
        
        element.classList.add( 'wptb-ondragenter' );
    }
    element.ondragover = function (e) {
        e.preventDefault();
        WPTB_DropHandle(this, e);
    }
    element.ondragleave = function () {
        
    }
    element.ondrop = function(e) {
        this.classList.remove( 'wptb-ondragenter' );
        let element, classId;
        e.preventDefault();
        e.stopPropagation();

        if (!e.dataTransfer.getData('wptbElement') && !e.dataTransfer.getData('node')) {
            return;
        }
        let wptbDropHandle,
            wptbDropBorderMarker;
        if ( document.getElementsByClassName( 'wptb-drop-handle' ).length > 0 ) {
            wptbDropHandle = document.getElementsByClassName( 'wptb-drop-handle' )[0];
        }
        if( document.getElementsByClassName( 'wptb-drop-border-marker' ).length > 0 ) {
            wptbDropBorderMarker = document.getElementsByClassName( 'wptb-drop-border-marker' )[0];
        }

        if ( e.dataTransfer.getData( 'wptbElement' ) ) {
            element = WPTB_Helper.newElementProxy( e.dataTransfer.getData( 'wptbElement' ) );
            element = element.getDOMElement();
        } else {
            classId = e.dataTransfer.getData( 'node' );
            element = document.getElementsByClassName( classId )[0];
            //element.classList.remove( 'wptb-moving-mode' );
        }
        
        if( wptbDropHandle.style.display == 'block' ) {
            let td;
            if( wptbDropHandle.dataset.text == 'Drop Here' ) {
                td = wptbDropHandle.getDOMParentElement();
                td.appendChild( element );
            } else {
                let innerElement = wptbDropHandle.getDOMParentElement();
                td = innerElement.parentNode;

                if( wptbDropHandle.dataset.text == 'Above Element' ) {
                    td.insertBefore( element, innerElement );
                } else if( wptbDropHandle.dataset.text == 'Below Element' ) {
                    let innerElementNext = innerElement.nextSibling;
                    td.insertBefore( element, innerElementNext );
                }
            }
            let thisRow = td.parentNode
            if( thisRow.classList.contains( 'wptb-table-head' ) ) {
                let table = WPTB_Helper.findAncestor( thisRow, 'wptb-preview-table' );
                WPTB_Helper.dataTitleColumnSet( table );
            }
            
            // start item javascript if item is new
            let infArr = element.className.match(/wptb-element-(.+)-(\d+)/i);
            let elemKind = infArr[1];
            if ( e.dataTransfer.getData( 'wptbElement' ) && ( elemKind == 'text' || elemKind == 'button' || elemKind == 'image' || elemKind == 'star_rating' || elemKind == 'list' ) ) {
                //WPTB_Helper.elementStartScript( element );
            }
        } else {
            return;
        }
        
        wptbDropHandle.style.display = 'none';
        wptbDropBorderMarker.style.display = 'none';

        WPTB_innerElementSet( element );
        
        if( ! element.classList.contains( 'wptb-image-container' ) || element.classList.contains( 'wptb-moving-mode' ) ) {
            element.classList.remove( 'wptb-moving-mode' );
            let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
            wptbTableStateSaveManager.tableStateSet();
        } 
        return true;
    }
    element.onmouseover = function(e) {
        element.classList.remove( 'wptb-ondragenter' );
    }
}