var WPTB_ElementOptions = function ( element, index, kindIndexProt ) {

    var node = element.getDOMElement(), elemIdClass;

    prop = document.querySelector(".wptb-" + element.kind + "-options-prototype").cloneNode(true);
    prop.classList.remove("wptb-" + element.kind + "-options-prototype"); // remove prototype from the class
    elemIdClass = 'wptb-options-' + element.kind + "-" + index;

    var properties = prop.getElementsByClassName('wptb-element-property');

    for (var i = 0; i < properties.length; i++) {
        properties[i].dataset.element = elemIdClass;
    }

    prop.classList.add(elemIdClass);
    document.getElementById("element-options-group").appendChild(prop);
    
    if ( kindIndexProt ) {
        if ( element.kind == 'button' ) {
            let affectedEl = document.getElementsByClassName( 'wptb-element-' + kindIndexProt )[0],
                wptbButtonWrapper,
                wptbButtonA,
                wptbButton,
                wptbSize;
        
            if ( affectedEl ) {
                wptbSize = affectedEl.className.match(/wptb-size-([a-z]+)/i);
            }
            
            if( wptbSize && Array.isArray( wptbSize ) ) {
                var b = prop.getElementsByClassName('wptb-btn-size-btn');
                
                for ( var i = 0; i < b.length; i++ ) {
                    b[i].classList.remove( 'selected' );
                    
                    if ( b[i].innerHTML == wptbSize[1] ) {
                        b[i].classList.add( 'selected' );
                    }
                }
            }
            
            if( affectedEl ) {
                wptbButtonWrapper = affectedEl.getElementsByClassName( 'wptb-button-wrapper' );
                
                wptbButtonA = affectedEl.getElementsByTagName( 'a' );
                
                wptbButton = affectedEl.getElementsByClassName( 'wptb-button' );
            }
            
            if ( wptbButtonWrapper ) {
                let buttonAlignment = wptbButtonWrapper[0].style.justifyContent,
                buttonAlignmentSelect = prop.querySelector( 'select[data-type="button-alignment"]' ),
                    selectOption = buttonAlignmentSelect.getElementsByTagName( 'option' ),
                    selectOptionVal;
                
                if ( buttonAlignment == 'flex-start' ) {
                    selectOptionVal = 'left';
                } else if ( buttonAlignment == 'center' || ! buttonAlignment ) {
                    selectOptionVal = 'center';
                } else if ( buttonAlignment == 'flex-end' ) {
                    selectOptionVal = 'right';
                }
                
                for ( let i = 0; i < selectOption.length; i++ ) {
                    if ( selectOption[i].value == selectOptionVal ) {
                        selectOption[i].selected = true;
                    }
                }
            }
            
            if ( wptbButtonA.length > 0 ) {
                let buttonHref = wptbButtonA[0].getAttribute( 'href' ), 
                    buttonLinkTarget = wptbButtonA[0].getAttribute( 'target' ),
                    buttonId = wptbButtonA[0].getAttribute( 'id' ),
                    
                    
                    buttonHrefInput = prop.querySelector( 'input[data-type="button-link"]' ),
                    buttonLinkTargetInput = prop.querySelector( 'input[data-type="button-link-target"]' ),
                    buttonLinkTargetInputId = buttonLinkTargetInput.getAttribute( 'id' ),
                    buttonLinkTargetInputLabel = buttonLinkTargetInput.parentNode.getElementsByTagName( 'label' )[0],
            
                    buttotIdInput = prop.querySelector( 'input[data-type="button-id"]' );

                buttonLinkTargetInputId = buttonLinkTargetInputId + '-' + kindIndexProt.split( '-' )[1];
                buttonLinkTargetInput.setAttribute( 'id', buttonLinkTargetInputId );
                buttonLinkTargetInputLabel.setAttribute( 'for', buttonLinkTargetInputId );

                buttonHrefInput.value = buttonHref;

                if( buttonLinkTarget && buttonLinkTarget == '_blank') {
                    buttonLinkTargetInput.checked = true;
                }
                
                buttotIdInput.value = buttonId;
            }
            
            if( wptbButton ) {
                let buttonTextColor = wptbButton[0].style.color,
                    buttonColor = wptbButton[0].style.backgroundColor,
                    buttonTextColorInput = prop.querySelector( 'input[data-type="button-text-color"]' ),
                    buttonBackgroundColorInput = prop.querySelector( 'input[data-type="button-color"]' );
                
            
                buttonTextColorInput.value = WPTB_Helper.rgbToHex( buttonTextColor );
                
                buttonBackgroundColorInput.value = WPTB_Helper.rgbToHex( buttonColor );
                
            }
        } else if ( element.kind == 'image' ) {
            let affectedEl = document.getElementsByClassName( 'wptb-element-' + kindIndexProt );
            if ( affectedEl.length > 0 ) {
                let elementsA = affectedEl[0].getElementsByTagName( 'a' );
                if ( elementsA.length > 0 ) {
                    let a = elementsA[0];

                    if ( a ) {
                        // set select according to the alignment of the image
                        let imgAlign;
                        if( a.style.float == 'none' ) {
                            imgAlign = 'center';
                        } else {
                            imgAlign = a.style.float;
                        }
                        let imageAlignmentSelect = prop.querySelector( 'select[data-type="image-alignment"]' ),
                        selectOption = imageAlignmentSelect.getElementsByTagName( 'option' );

                        for ( let i = 0; i < selectOption.length; i++ ) {
                            if ( selectOption[i].value == imgAlign ) {
                                selectOption[i].selected = true;
                            }
                        }

                        a.onclick = function( e ) {
                            e.preventDefault();
                        }

                        // set text link for input field of setting panel
                        let imageLinkHref = a.getAttribute( 'href' ),
                            inputImageLink = prop.querySelector( 'input[data-type="image-link"]' );
                        if ( imageLinkHref ) {
                            inputImageLink.value = imageLinkHref;
                        }

                        // set checkbox for target of link 
                        let imageLinkTarget = a.getAttribute( 'target' ),
                            imageLinkTargetInput = prop.querySelector( 'input[data-type="image-link-target"]' ),
                            imageLinkTargetInputId = imageLinkTargetInput.getAttribute( 'id' ),
                            imageLinkTargetInputLabel = imageLinkTargetInput.parentNode.getElementsByTagName( 'label' )[0];

                        imageLinkTargetInputId = imageLinkTargetInputId + '-' + kindIndexProt.split( '-' )[1];

                        imageLinkTargetInput.setAttribute( 'id', imageLinkTargetInputId );
                        imageLinkTargetInputLabel.setAttribute( 'for', imageLinkTargetInputId );

                        if ( imageLinkTarget && imageLinkTarget == '_blank' ) {
                            imageLinkTargetInput.checked = true;
                        }

                        // set value for input fields of image size
                        let imgWidth = a.style.width;
                        if ( imgWidth ) {
                            let imageWidthInputRange = prop.querySelector( 'input[type="range"][data-type="image-size"]' ),
                                imageWidthInputNumber = prop.querySelector( 'input[type="number"][data-type="image-size"]' );

                            imageWidthInputRange.value = parseInt( imgWidth );
                            imageWidthInputNumber.value = parseInt( imgWidth );
                        }

                        let img = a.getElementsByTagName( 'img' );
                        if ( img.length > 0 ) {
                            // set value for input field of alternative text image
                            let imgAlternativeText = img[0].getAttribute('alt'),
                                imageAlternativeTextInput = prop.querySelector( 'input[type="text"][data-type="alternative-text"]' );

                            imageAlternativeTextInput.value = imgAlternativeText;
                        }
                    }
                }
            }
        } else if ( element.kind == 'text' ) {
            let affectedEl = document.getElementsByClassName( 'wptb-element-' + kindIndexProt );
            if ( affectedEl.length > 0 ) {
                let elementFontSize = affectedEl[0].style.fontSize,
                    elementTextColor = affectedEl[0].style.color;
                let textFontSizeInputRange = prop.querySelector( 'input[type="range"][data-type="font-size"]' ),
                    textFontSizeInputNumber = prop.querySelector( 'input[type="number"][data-type="font-size"]' ),
                    textColorInput = prop.querySelector( 'input[type="text"][data-type="color"]' );

                textFontSizeInputRange.value = parseInt( elementFontSize ) ? parseInt( elementFontSize ) : 10;
                textFontSizeInputNumber.value = parseInt( elementFontSize ) ? parseInt( elementFontSize ) : 10;
                textColorInput.value = WPTB_Helper.rgbToHex( elementTextColor );
            }
        } else if ( element.kind == 'list' ) {
            let elementList = document.getElementsByClassName( 'wptb-element-' + kindIndexProt );
            if ( elementList.length > 0 ) {
                let elementListColor = elementList[0].querySelector( 'p' ).style.color;
                let listColorInput = prop.querySelector( 'input[type="text"][data-type="list-text-color"]' );
                listColorInput.value = WPTB_Helper.rgbToHex( elementListColor );
                
                let elementListItem = elementList[0].querySelectorAll( 'li' );
                if ( elementListItem.length > 0 ) {
                    let listItemP = elementListItem[0].querySelector( 'p' );
                    let listItemPClasses = listItemP.classList;
                    //listItemPClasses = [...listItemPClasses];
                    if ( listItemPClasses.length > 0 ) {
                        let elementListClassSelect = prop.querySelector( 'select[data-type="list-class"]' );
                        if ( elementListClassSelect ) {
                            elementListClassSelect.value = 'unordered';
                            
                            let listIconSelectLabel = elementListClassSelect.parentNode.nextSibling;
                            for ( let i = 0; i < 10; i++ ) {
                                if ( listIconSelectLabel.nodeType == '1' ) {
                                    break;
                                } else {
                                    listIconSelectLabel = listIconSelectLabel.nextSibling;
                                }
                            }
                            if ( listIconSelectLabel ) {
                                let listIconSelectLabelId = listIconSelectLabel.getAttribute( 'id' );
                                listIconSelectLabel.setAttribute( 'id', listIconSelectLabelId + '-' + kindIndexProt );
                                listIconSelectLabel.style.display = 'flex';
                            }
                            
                            let elementListStyleTypeSelect = prop.querySelector( 'select[data-type="list-style-type"]' );
                            if ( elementListStyleTypeSelect ) {
                                elementListStyleTypeSelect.parentNode.style.display = 'flex';
                                
                                if( listItemPClasses.contains( 'wptb-list-style-type-disc' ) ) {
                                    elementListStyleTypeSelect.value = 'disc';
                                } else if( listItemPClasses.contains( 'wptb-list-style-type-circle' ) ) {
                                    elementListStyleTypeSelect.value = 'circle';
                                } else if( listItemPClasses.contains( 'wptb-list-style-type-square' ) ) {
                                    elementListStyleTypeSelect.value = 'square';
                                } else if ( listItemPClasses.contains( 'wptb-list-style-type-none' ) ) {
                                    elementListStyleTypeSelect.value = 'none';
                                }
                            }
                        }
                    }
                }
                
                let elementListItemContent = elementList[0].getElementsByClassName( 'wptb-list-item-content' );
                if ( elementListItemContent.length > 0 ) {
                    let listItemPTextAlignArr = [];
                    for ( let i = 0; i < elementListItemContent.length; i++ ) {
                        let p = elementListItemContent[i].querySelector( 'p' );
                        if ( p ) {
                            if ( p.style.textAlign ) {
                                listItemPTextAlignArr.push( p.style.textAlign );
                            } else {
                                listItemPTextAlignArr.push( 'left' );
                            }
                        }
                        
                    }
                    
                    let listItemPTextAlignLeftCount = 0,
                        listItemPTextAlignCenterCount = 0,
                        listItemPTextAlignRightCount = 0;
                    
                    if ( listItemPTextAlignArr.length > 0 ) {
                        for ( let i = 0; i < listItemPTextAlignArr.length; i++ ) {
                            if ( listItemPTextAlignArr[i] ) {
                                if ( listItemPTextAlignArr[i] == 'left' ) {
                                    listItemPTextAlignLeftCount++;
                                } else if ( listItemPTextAlignArr[i] == 'center' ) {
                                    listItemPTextAlignCenterCount++;
                                } else if ( listItemPTextAlignArr[i] == 'right' ) {
                                    listItemPTextAlignRightCount++;
                                }
                            }
                        }
                    }
                    
                    let elementListAlignmentSelect = prop.querySelector( 'select[data-type="list-alignment"]' ),
                        maxListItemTAlLeftC = Math.max( listItemPTextAlignLeftCount, listItemPTextAlignCenterCount, listItemPTextAlignRightCount );
                
                    if ( listItemPTextAlignLeftCount == maxListItemTAlLeftC ) {
                        elementListAlignmentSelect.value = 'left';
                    } else if ( listItemPTextAlignCenterCount == maxListItemTAlLeftC ) {
                        elementListAlignmentSelect.value = 'center';
                    } else if ( listItemPTextAlignRightCount == maxListItemTAlLeftC ) {
                        elementListAlignmentSelect.value = 'right';
                    }
                }
            } 
        } else if( element.kind == 'star_rating' ) {
            let affectedEl = document.getElementsByClassName( 'wptb-element-' + kindIndexProt );
            if( affectedEl.length > 0 ) {
                let wptbRatingStarsBox = affectedEl[0].querySelector( '.wptb-rating-stars-box' );
                if( wptbRatingStarsBox ) {
                    let wptbRatingStarsBoxBackGround = wptbRatingStarsBox.style.backgroundColor;
                    let starBoxBackgroundColorInput = textColorInput = prop.querySelector( 'input[type="text"][data-type="star-background-color"]' );
                    starBoxBackgroundColorInput.value = WPTB_Helper.rgbToHex( wptbRatingStarsBoxBackGround );
                    
                    
                    let ratingStar = wptbRatingStarsBox.querySelector( 'li' );
                    if( ratingStar ) {
                        let ratingStarSize = ratingStar.style.fontSize,
                            ratingStarColor = ratingStar.style.color;
                        let starSizeInputRange = prop.querySelector( 'input[type="range"][data-type="star-size"]' ),
                            starSizeInputNumber = prop.querySelector( 'input[type="number"][data-type="star-size"]' ),
                            starColorInput = prop.querySelector( 'input[type="text"][data-type="star-color"]' );

                        starSizeInputRange.value = parseInt( ratingStarSize ) ? parseInt( ratingStarSize ) : 10;
                        starSizeInputNumber.value = parseInt( ratingStarSize ) ? parseInt( ratingStarSize ) : 10;
                        starColorInput.value = WPTB_Helper.rgbToHex( ratingStarColor );
                    }
                    
                    let successBox = wptbRatingStarsBox.querySelector( '.wptb-success-box' );
                    if( successBox ) {
                        let showNumberRatingCheckbox = prop.querySelector( 'input[type="checkbox"][data-type="show-number-rating"]' );
                        if( successBox.style.display == 'block' ) {
                            showNumberRatingCheckbox.checked = true;
                            let numeralRatingOptionContainers = prop.getElementsByClassName( 'wptb-numeral-rating-option-container' );
                            for( let i = 0; i < numeralRatingOptionContainers.length; i++ ) {
                                numeralRatingOptionContainers[i].style.display = 'block';
                            }
                        } else {
                            showNumberRatingCheckbox.checked = false;
                        }
                        
                        let wptbTextMessage = successBox.querySelector( '.wptb-text-message' );
                        if( wptbTextMessage ) {
                            let numberRatingSize = wptbTextMessage.style.fontSize;
                            let numberRatingColor = wptbTextMessage.style.color;
                            
                            let numberSizeInputRange = prop.querySelector( 'input[type="range"][data-type="numeral-rating-size"]' ),
                            numberSizeInputNumber = prop.querySelector( 'input[type="number"][data-type="numeral-rating-size"]' ),
                            numberColorInput = prop.querySelector( 'input[type="text"][data-type="numeral-rating-color"]' );

                            numberSizeInputRange.value = parseInt( numberRatingSize ) ? parseInt( numberRatingSize ) : 10;
                            numberSizeInputNumber.value = parseInt( numberRatingSize ) ? parseInt( numberRatingSize ) : 10;
                            numberColorInput.value = WPTB_Helper.rgbToHex( numberRatingColor );
                        }
                    }
                }
            }
        }
    }

    node.onclick = function () {
        var infArr = this.className.match(/wptb-element-((.+-)\d+)/i),
            optionsClass = '.wptb-' + infArr[2] + 'options' +
                '.wptb-options-' + infArr[1];

        document.getElementsByClassName('wptb-elements-container')[0].style.display = 'none';
        document.getElementsByClassName('wptb-settings-section')[0].style.display = 'none';
        document.getElementById("element-options-group").style.display = 'block';

        var children = document.getElementById("element-options-group").childNodes;
        for (var i = 0; i < children.length; i++) {
            if (children[i].style)
                children[i].style.display = 'none';
        }

        document.querySelector(optionsClass).style.display = 'block';

                //var listStyleType, textAlign;

//        switch (element.kind) {

//            case 'text':
//                jQuery(prop).find('[data-type=color]').wpColorPicker({ defaultColor: node.style.color });
//                prop.querySelector('[type=number][data-type=font-size]').value
//                    = prop.querySelector('[type=range][data-type=font-size]').value
//                    = node.style.fontSize.substring(0, node.style.fontSize.length - 2);
//                break;
//            case 'list':
//                textAlign = node.querySelector('li p').style.textAlign;
//                listStyleType = node.querySelector('li').style.listStyleType;
//                if ( prop.querySelector( 'select[data-type=list-class]' ) ) {
//                console.log(textAlign);
//                console.log(listStyleType);
//                console.log(listStyleType);
//                console.log(prop);
//                    prop.querySelector('select[data-type=list-class]').selectedIndex = ( listStyleType == 'decimal' ? 0 : 1 );
//                }
//                if ( prop.querySelector('select[data-type=list-style-type]') ) {
//                    prop.querySelector('select[data-type=list-style-type]').selectedIndex = (listStyleType == 'circle' ? 0 : (listStyleType == 'square' ? 1 : 2));
//                }
//                if ( prop.querySelector('select[data-type=list-alignment]') ) {
//                    prop.querySelector('select[data-type=list-alignment]').selectedIndex = (textAlign == 'left' ? 0 : (textAlign == 'center' ? 1 : 2));
//                }
//                break;
//            case 'image':
//                break;
//            case 'button':
//                jQuery(prop).find('[data-type=button-color]').wpColorPicker({ defaultColor: node.style.backgroundColor });
//                break;
//
//        }
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
                var b = this.parentNode.getElementsByClassName('wptb-btn-size-btn');
                for (var i = 0; i < b.length; i++) {
                    b[i].classList.remove('selected');
                }
                this.classList.add('selected');
                
                let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
                wptbTableStateSaveManager.tableStateSet();
            }
        }
    }

    var optionControls = prop.getElementsByClassName('wptb-element-property');

    for (var i = 0; i < optionControls.length; i++) {
        if (optionControls[i].classList.contains('wptb-color-picker')) {
            jQuery(optionControls[i]).wpColorPicker({
                change: function (event, ui) {
                    WPTB_Helper.wpColorPickerChange( event, ui );
                    
                    //console.log(event);
                    WPTB_Helper.wpColorPickerCheckChangeForTableStateSaving( event );
                },
                clear: function( event ) {
                    WPTB_Helper.wpColorPickerChange( event );
                }
            });
        }

        if ( optionControls[i].dataset.type === 'font-size' || optionControls[i].dataset.type === 'image-size' ||
               optionControls[i].dataset.type === 'star-size' || optionControls[i].dataset.type === 'numeral-rating-size' ) {
            var slider = optionControls[i].parentNode.parentNode.getElementsByClassName('wptb-size-slider')[0];
            slider.oninput = function () {
                this.parentNode.parentNode.getElementsByClassName('wptb-size-number')[0].value = this.value;
                this.parentNode.parentNode.getElementsByClassName('wptb-size-number')[0].onchange( event );
            }
        }

//        if (optionControls[i].dataset.type === 'image-size') {
//            var slider = optionControls[i].parentNode.parentNode.getElementsByClassName('wptb-size-slider')[0];
//            slider.oninput = function () {
//                this.parentNode.parentNode.getElementsByClassName('wptb-size-number')[0].value = this.value;
//                this.parentNode.parentNode.getElementsByClassName('wptb-size-number')[0].onchange( event );
//            }
//        }
//        
//        if ( optionControls[i].dataset.type === 'star-size' ) {
//            var slider = optionControls[i].parentNode.parentNode.getElementsByClassName('wptb-size-slider')[0];
//            slider.oninput = function () {
//                this.parentNode.parentNode.getElementsByClassName('wptb-size-number')[0].value = this.value;
//                this.parentNode.parentNode.getElementsByClassName('wptb-size-number')[0].onchange( event );
//            }
//        }

        optionControls[i].onchange = function ( event ) {
            var n_Class = this.dataset.element,
                infArr = n_Class.match(/wptb-options-(.+)-(\d+)/i),
                type = infArr[1],
                num = infArr[2],
                affectedEl = document.getElementsByClassName('wptb-element-' + type + '-' + num)[0],
                val = this.value;

            switch ( this.dataset.type ) {
                case 'src':
                    var img = affectedEl.getElementsByTagName("img")[0];
                    img.src = this.value;
                    break;
                case 'alternative-text':
                    var img = affectedEl.getElementsByTagName('img')[0];
                    img.alt = this.value;
                    break;
                case 'image-link':
                    affectedEl.getElementsByTagName('a')[0].href = WPTB_Helper.linkHttpCheckChange( this.value );
                    break;
                case 'image-link-target':
                    if (this.checked == true) {
                        affectedEl.getElementsByTagName('a')[0].target = '_blank';
                    } else {
                        affectedEl.getElementsByTagName('a')[0].target = '_self';
                    }
                    break;
                case 'image-link-nofollow':
                    if (this.checked == true) {
                        affectedEl.getElementsByTagName('a')[0].rel = 'nofollow';
                    } else {
                        affectedEl.getElementsByTagName('a')[0].removeAttribute('rel');
                    }
                    break;
                case 'image-size':
                    affectedEl.getElementsByTagName('a')[0].style.width = this.value + '%';
                    affectedEl.getElementsByTagName('a')[0].style.height = 'auto';
                    this.parentNode.parentNode.getElementsByClassName('wptb-size-slider')[0].value = this.value;
                    break;
                case 'image-alignment':
                    let wptbImageFloatValue = '';
                    if( this.value == 'center' ) {
                        wptbImageFloatValue = 'none';
                    } else {
                        wptbImageFloatValue = this.value;
                    }
                    affectedEl.querySelector( '.wptb-image-wrapper a' ).style.float = wptbImageFloatValue;
                    break;
                case 'font-size':
                    affectedEl.style.fontSize = val + 'px';
                    this.parentNode.parentNode.getElementsByClassName('wptb-size-slider')[0].value = this.value;
                    break;
                case 'button-alignment':
                    var jc = '';
                    if (this.value == 'left') {
                        jc = 'start';
                    } else if (this.value == 'right') {
                        jc = 'flex-end';
                    } else {
                        jc = 'center';
                    }
                    affectedEl.getElementsByClassName('wptb-button-wrapper')[0].style.justifyContent = jc;
                    break;
                case 'button-link':
                    if ( this.value ) {
                        affectedEl.getElementsByTagName( 'a' )[0].href = WPTB_Helper.linkHttpCheckChange( this.value );
                    } else {
                        affectedEl.getElementsByTagName( 'a' )[0].removeAttribute( 'href' );
                    }
                    break;
                case 'button-link-target':
                    if (this.checked == true) {
                        affectedEl.getElementsByTagName('a')[0].target = '_blank';
                    } else {
                        affectedEl.getElementsByTagName('a')[0].target = '_self';
                    }
                    break;
                case 'button-link-nofollow':
                    if (this.checked == true) {
                        affectedEl.getElementsByTagName('a')[0].rel = 'nofollow';
                    } else {
                        affectedEl.getElementsByTagName('a')[0].removeAttribute( 'rel' );
                    }
                    break;
                case 'button-id':
                    if( this.value ) {
                        affectedEl.getElementsByTagName( 'a' )[0].id = this.value;
                    } else {
                        affectedEl.getElementsByTagName( 'a' )[0].removeAttribute( 'id' );
                    }
                case 'button-color':
                    break;
                case 'list-alignment':
                    let listItems = affectedEl.querySelectorAll('li');
                    for (var i = 0; i < listItems.length; i++) {
                        let p = listItems[i].querySelector( 'p' );
                        if ( p ) {
                            p.style.textAlign = this.value;
                        }
                    }
                    break;
                case 'list-class':
                    let parentNode = event.target
                            .parentNode
                            .parentNode
                            .querySelector('[data-type=list-style-type]')
                            .parentNode,
                        parentNodeSettingItem = parentNode.parentNode;
                    if (val == 'unordered') {
                        parentNode.style.display = 'flex';
                        
                        parentNodeSettingItem.querySelector( '.wptb-list-icon-select-label' ).style.display = 'flex';
                        let listItem = affectedEl.querySelectorAll('li');
                        for (var i = 0; i < listItem.length; i++) {
                            let p = listItem[i].querySelector( 'p' );
                            p.removeAttribute ( 'class' );
                            p.classList.add( 'wptb-list-style-type-disc' );
                        }
                        parentNodeSettingItem.querySelector('[data-type=list-style-type]').value = 'disc';
                    } else {
                        parentNode.style.display = 'none';
                        parentNodeSettingItem.querySelector( '.wptb-list-icon-select-label' ).style.display = 'none';
                        var listItem = affectedEl.querySelectorAll('li');
                        for (var i = 0; i < listItem.length; i++) {
                            let p = listItem[i].querySelector( 'p' );
                            p.removeAttribute ( 'class' );
                        }
                    }
                    break;
                case 'list-style-type':
                    var listItem = affectedEl.querySelectorAll('li');
                    for (var i = 0; i < listItem.length; i++) {
                        let p = listItem[i].querySelector( 'p' );
                        p.removeAttribute ( 'class' );
                        p.classList.add( 'wptb-list-style-type-' + val.toLowerCase() );
                    }
                    break;
                case 'star-size':
                    let ratingStar = affectedEl.querySelectorAll('li');
                    for( let i = 0; i < ratingStar.length; i++ ) {
                        ratingStar[i].style.fontSize = val + 'px';
                        ratingStar[i].style.height = val + 'px';
                    }
                    break;
                case 'show-number-rating':
                    let wptbNumeralRatingOptionContainer = WPTB_Helper.findAncestor( this, 'wptb-star_rating-options' )
                    .getElementsByClassName( 'wptb-numeral-rating-option-container' );
                    
                    let ratingNumber = affectedEl.getElementsByClassName( 'wptb-rating-star-selected' ).length;
                    
                    let wptbTextMessage = affectedEl.querySelector( '.wptb-text-message' );
                    
                    if( wptbNumeralRatingOptionContainer.length > 0 ) {
                        let val = this.checked ? 'checked' : 'unchecked';
                        if( val== 'checked' ) {
                            for ( let i = 0; i < wptbNumeralRatingOptionContainer.length; i++ ) {
                                wptbNumeralRatingOptionContainer[i].style.display = 'block';
                            }
                            wptbTextMessage.parentNode.style.display = 'block';
                            wptbTextMessage.innerHTML = ratingNumber;
                        } else if ( val == 'unchecked' ) {
                            for ( let i = 0; i < wptbNumeralRatingOptionContainer.length; i++ ) {
                                wptbNumeralRatingOptionContainer[i].style.display = 'none';
                            }
                            wptbTextMessage.parentNode.style.display = 'none';
                        }
                    }
                    break;
                case 'numeral-rating-size':
                    let wptbTextMessageSize = affectedEl.querySelector('.wptb-text-message');
                    wptbTextMessageSize.style.fontSize = val + 'px';
                    wptbTextMessageSize.style.height = val + 'px';
                    wptbTextMessageSize.style.lineHeight = val + 'px';
                    break;
            }
            
            
            if( event.target.classList.contains( 'wptb-size-slider' ) || event.target.classList.contains( 'wptb-size-slider' ) ) {
                event.target.onmouseup = function() {
                    let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
                    wptbTableStateSaveManager.tableStateSet();
                }
            } else {
                let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
                wptbTableStateSaveManager.tableStateSet();
            }
        }
    }
};