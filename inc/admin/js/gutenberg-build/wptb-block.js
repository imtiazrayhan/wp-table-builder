!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=26)}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.React}()},function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},function(e,t){!function(){e.exports=this.wp.components}()},function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}e.exports=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}},function(e,t,n){var r=n(18);e.exports=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},function(e,t,n){var r=n(19),a=n(3);e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!=typeof t?a(e):t}},function(e,t){!function(){e.exports=this.ReactDOM}()},function(e,t,n){var r=n(20),a=n(21),c=n(22),l=n(24);e.exports=function(e,t){return r(e)||a(e,t)||c(e,t)||l()}},function(e,t){!function(){e.exports=this.wp.data}()},function(e,t){!function(){e.exports=this.wp.blocks}()},function(e,t){!function(){e.exports=this.wp.apiFetch}()},function(e,t){function n(){return e.exports=n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},n.apply(this,arguments)}e.exports=n},function(e,t){!function(){e.exports=this.wp.blockEditor}()},function(e,t){function n(t,r){return e.exports=n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},n(t,r)}e.exports=n},function(e,t){function n(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e.exports=n=function(e){return typeof e}:e.exports=n=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(t)}e.exports=n},function(e,t){e.exports=function(e){if(Array.isArray(e))return e}},function(e,t){e.exports=function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,c=void 0;try{for(var l,i=e[Symbol.iterator]();!(r=(l=i.next()).done)&&(n.push(l.value),!t||n.length!==t);r=!0);}catch(e){a=!0,c=e}finally{try{r||null==i.return||i.return()}finally{if(a)throw c}}return n}}},function(e,t,n){var r=n(23);e.exports=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}},function(e,t){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}},function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(6),a=n.n(r),c=n(0),l=n(14),i=n(2),o=n(1),s=n.n(o),u=n(7),b=n.n(u),d=n(8),p=n.n(d),f=n(3),h=n.n(f),m=n(9),v=n.n(m),w=n(10),O=n.n(w),y=n(4),j=n.n(y),g=n(15),S=n.n(g),E=n(16),T=n.n(E),k=s.a.createContext({attributes:{},setAttributes:function(){},savedTable:null,setSavedTable:function(){},blockData:{}});function _(e){return function(t){return Object(c.createElement)(k.Consumer,null,(function(n){return Object(c.createElement)(e,T()({},n,t))}))}}var x=n(11),P=n.n(x);function N(e){var t=e.searchTerm,n=e.updateSearch;return Object(c.createElement)("div",{className:"wptb-table-search"},Object(c.createElement)("input",{value:t,onChange:function(e){return n(e.target.value)},type:"text",placeholder:Object(i.__)("search for tables","wp-table-builder")}),""!==t?Object(c.createElement)("div",{className:"wptb-search-clear",onClick:function(){return n("")}},"X"):"")}function R(e){var t=e.show,n=e.children;return Object(c.createElement)("div",{className:"wptb-block-overlay wptb-basic-appear-anim",style:{display:t?"flex":"none"}},n)}function I(e){var t=e.tables,n=e.rowSelected,r=e.selectedId,a=e.searchTerm,l=function(e){var t="".concat(e),n=new RegExp("(".concat(a,")"),"ig");return t.replace(n,'<span class="wptb-block-search-indicator">$&</span>')};return Object(c.createElement)("div",{className:"wptb-table-list"},t.map((function(e){return Object(c.createElement)("div",{onClick:n(e.id),className:"wptb-table-list-row wptb-basic-appear-anim ".concat(r===e.id?"selected":""),key:e.id},Object(c.createElement)("div",{className:"wptb-table-list-title",dangerouslySetInnerHTML:{__html:l(e.title)}}),Object(c.createElement)("div",{className:"wptb-table-list-id",dangerouslySetInnerHTML:{__html:l(e.id)}}))})),Object(c.createElement)(R,{show:t.length<=0},Object(i.__)("no tables found","wp-table-builder")))}var C=_((function(e){var t=e.content,n=e.scale,r=e.blockData.tableCssUrl,a=s.a.createRef();return Object(o.useEffect)((function(){if(null!==t&&void 0!==r){var e=document.createElement("div");e.attachShadow({mode:"open"}),Object.keys(r).map((function(t){Object.prototype.hasOwnProperty.call(r,t)&&function(e,t,n){var r=document.createElement("link");r.setAttribute("rel","stylesheet"),r.setAttribute("href",t),r.setAttribute("media","all"),r.setAttribute("id",e),n.appendChild(r)}(t,r[t],e.shadowRoot)}));var c=document.createRange();c.setStart(document,0);var l=c.createContextualFragment(t);e.shadowRoot.appendChild(l);var i=a.current,o=e.shadowRoot.querySelector("table"),s=o.dataset.wptbTableContainerMaxWidth,u="700px",b="100%";if(s&&(u="".concat(s,"px"),b="".concat(s,"px")),o.style.width=n?u:b,i.innerHTML="",i.appendChild(e),n){var d=i.getBoundingClientRect(),p=d.width,f=d.height,h=o.getBoundingClientRect(),m=p/(h.width+40),v=f/(h.height+40),w=Math.min(m,v);if(o.style.transform="scale(".concat(w,")"),window.navigator.vendor.includes("Google")&&"separate"===o.style.borderCollapse){var O=parseInt(o.dataset.borderSpacingColumns,10),y=parseInt(o.dataset.wptbCellsWidthAutoCount,10);o.style.marginLeft="".concat((y+1)*O*-1,"px")}}}})),Object(c.createElement)("div",{ref:a,className:"wptb-table-preview wptb-unselectable"},Object(c.createElement)("span",{className:"dashicons dashicons-grid-view no-table-selected-preview"}))}));function D(e){var t=e.type,n=e.onClick,r=e.children,a=e.disabled;return Object(c.createElement)("div",{onClick:n,className:"wptb-block-button wptb-unselectable ".concat(t||"primary"," ").concat(a?"wptb-block-button-disabled":"")},r)}function B(e){var t=e.searchTerm,n=e.updateSearch,r=e.selectedId,a=e.rowSelected,l=e.filteredTables,s=e.selectedTable,u=e.saveTable,b=e.footerRightPortal,d=e.savedId,p=e.setSelectScreen;return Object(c.createElement)("div",{className:"wptb-table-select"},Object(c.createElement)("div",{className:"wptb-table-list-wrapper"},Object(c.createElement)(N,{searchTerm:t,updateSearch:n}),Object(c.createElement)(I,{searchTerm:t,selectedId:r,rowSelected:a,tables:l()})),Object(c.createElement)(C,{scale:!0,content:s?s.content:null}),null!==b?P.a.createPortal(Object(c.createElement)(o.Fragment,null,d>=0?Object(c.createElement)(D,{onClick:function(){return p(!1)},type:"negative"},Object(i.__)("cancel","wp-table-builder")):"",Object(c.createElement)(D,{disabled:!s,onClick:u},Object(i.__)("select","wp-table-builder"))),b.current):"")}function M(e){var t=e.selectedTable,n=e.footerRightPortal,r=e.changeToSelect;return Object(c.createElement)("div",{className:"wptb-table-selected-view wptb-basic-appear-anim"},Object(c.createElement)(C,{scale:!0,content:t?t.content:null}),null!==n?P.a.createPortal(Object(c.createElement)(D,{onClick:r},Object(i.__)("change","wp-table-builder")),n.current):"")}var A=n(12),U=n.n(A),F=n(13);function L(e){var t=e.show;return Object(c.createElement)(R,{show:t},Object(c.createElement)("div",{className:"wptb-busy-overlay dashicons dashicons-update-alt"}))}function V(e){var t=e.builderUrl,n=e.show,r=e.builderVisibility,a=e.updateSelection,l=Object(o.useState)(t),i=U()(l,2),s=i[0],u=i[1],b=Object(o.useState)(!1),d=U()(b,2),p=d[0],f=d[1],h=Object(o.useRef)(null);return Object(o.useEffect)((function(){(function(e){if(e){var t=new URL(e);t.searchParams.append("gutenberg",!0),u(t.toString())}}(t),n)&&(Object(F.select)("core/edit-post").getPreference("features").fullscreenMode||Object(F.dispatch)("core/edit-post").toggleFeature("fullscreenMode"),f(!1),h.current.addEventListener("load",(function(){f(!0),(h.current.contentDocument||h.current.contentWindow.document).addEventListener("gutenbergClose",(function(e){var t=e.detail;!0!==t&&a&&"function"==typeof a&&a(t),r(!1)}))})))})),Object(c.createElement)("div",{className:"wptb-block-builder-wrapper ".concat(n?"":"hide")},n?Object(c.createElement)(o.Fragment,null,Object(c.createElement)("div",{style:{display:p?"none":"flex"},className:"wptb-block-builder-load-indicator"},Object(c.createElement)(L,{show:!0})),Object(c.createElement)("iframe",{ref:h,className:"wptb-block-builder",src:s})):"")}var W=n(17),z=n(5);function H(e){var t=e.label,n=e.value;return Object(c.createElement)(z.PanelRow,null,Object(c.createElement)("div",{className:"wptb-block-info-label"},t),Object(c.createElement)("div",{className:"wptb-block-info-value"},n))}function $(e){var t=e.header,n=e.table;return Object(c.createElement)(W.InspectorControls,null,Object(c.createElement)(z.Panel,null,Object(c.createElement)(z.PanelBody,{title:t,initialOpen:!0},n?Object(c.createElement)(o.Fragment,null,Object(c.createElement)(H,{label:Object(i.__)("ID","wp-table-builder"),value:n.id}),Object(c.createElement)(H,{label:Object(i.__)("title","wp-table-builder"),value:n.title}),Object(c.createElement)(H,{label:Object(i.__)("shortcode","wp-table-builder"),value:"[wptb id=".concat(n.id,"]")}),Object(c.createElement)(H,{label:Object(i._x)("tags","modified date","wp-table-builder"),value:n.wptb_table_tags.length>0?n.wptb_table_tags.map((function(e){return e.name})).join(","):Object(i.__)("No Tags","wp-table-builder")}),Object(c.createElement)(H,{label:Object(i._x)("Modified at","modified date","wp-table-builder"),value:new Intl.DateTimeFormat("default").format(new Date(n.modified))})):Object(c.createElement)(z.PanelRow,null,Object(c.createElement)("i",null,Object(i.__)("no table selected","wp-table-builder"))))))}function q(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var G=_(function(e){v()(r,e);var t,n=(t=r,function(){var e,n=j()(t);if(q()){var r=j()(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return O()(this,e)});function r(e){var t;return b()(this,r),(t=n.call(this,e)).state={selectedId:Number.parseInt(t.props.attributes.id,10),savedId:Number.parseInt(t.props.attributes.id,10),searchTerm:"",footerRightPortal:null,fullPreview:!1,showBuilder:!1,builderUrl:e.builderUrl},t.state.selectScreen=-1===t.state.savedId,t.state.expanded=-1===t.state.savedId,t.toggleBlock=t.toggleBlock.bind(h()(t)),t.slideMain=t.slideMain.bind(h()(t)),t.rowSelected=t.rowSelected.bind(h()(t)),t.selectedTable=t.selectedTable.bind(h()(t)),t.updateSearch=t.updateSearch.bind(h()(t)),t.filteredTables=t.filteredTables.bind(h()(t)),t.saveTable=t.saveTable.bind(h()(t)),t.changeToSelect=t.changeToSelect.bind(h()(t)),t.setSelectScreen=t.setSelectScreen.bind(h()(t)),t.openNewTableBuilder=t.openNewTableBuilder.bind(h()(t)),t.openTableEditBuilder=t.openTableEditBuilder.bind(h()(t)),t.setBuilderVisibility=t.setBuilderVisibility.bind(h()(t)),t.updateSelection=t.updateSelection.bind(h()(t)),t.mainRef=s.a.createRef(),t.footerRightPortal=s.a.createRef(),t}return p()(r,[{key:"componentDidMount",value:function(){this.slideMain(),this.setState({footerRightPortal:this.footerRightPortal})}},{key:"updateSelection",value:function(e){var t=this;return this.props.getTables().then((function(){t.setState({selectedId:Number.parseInt(e,10)}),t.saveTable()}))}},{key:"toggleBlock",value:function(e){e.preventDefault(),this.setState((function(e){return{expanded:!e.expanded}}))}},{key:"slideMain",value:function(){var e=this.state.expanded?"slideDown":"slideUp";jQuery(this.mainRef.current)[e]()}},{key:"filteredTables",value:function(){var e=this;return""===this.state.searchTerm?this.props.tables:this.props.tables.filter((function(t){var n=new RegExp("(".concat(e.state.searchTerm,")"),"gi");return n.test(t.title)||n.test("".concat(t.id))}))}},{key:"componentDidUpdate",value:function(){this.slideMain(),this.props.setAttributes({id:this.state.savedId})}},{key:"rowSelected",value:function(e){var t=this;return function(n){n.preventDefault(),t.setState({selectedId:e})}}},{key:"selectedTable",value:function(){var e=this;return this.props.tables.filter((function(t){return e.state.selectedId===t.id}))[0]}},{key:"savedTable",value:function(){var e=this;return this.props.tables.filter((function(t){return e.state.savedId===t.id}))[0]}},{key:"saveTable",value:function(){this.props.setSavedTable(this.state.selectedId),this.setState({savedId:this.state.selectedId,selectScreen:!1})}},{key:"updateSearch",value:function(e){this.setState({searchTerm:e})}},{key:"changeToSelect",value:function(){this.setState({selectScreen:!0})}},{key:"setSelectScreen",value:function(e){this.setState({selectScreen:e})}},{key:"setBuilderVisibility",value:function(e){this.setState({showBuilder:e})}},{key:"openNewTableBuilder",value:function(){this.setState({builderUrl:this.props.blockData.builderUrl,showBuilder:!0})}},{key:"openTableEditBuilder",value:function(){var e=new URL(this.props.blockData.builderUrl);e.searchParams.append("table",this.state.selectScreen?this.state.selectedId:this.state.savedId),this.setState({builderUrl:e.toString(),showBuilder:!0})}},{key:"render",value:function(){var e=this;return Object(c.createElement)(o.Fragment,null,Object(c.createElement)($,{header:Object(i.__)("Info","wp-table-builder"),table:this.state.selectScreen?this.selectedTable():this.props.savedTable}),Object(c.createElement)("div",{style:{display:this.state.fullPreview?"none":"grid"},className:"wptb-block-wrapper wptb-basic-appear-anim"},Object(c.createElement)(L,{show:this.props.isFetching()}),Object(c.createElement)("div",{className:"wptb-block-header"},Object(c.createElement)("div",{className:"wptb-plugin-left-toolbox"},Object(c.createElement)("div",{className:"wptb-plugin-brand"},"WP Table Builder"),Object(c.createElement)("div",{className:"wptb-plugin-selected-header-info"},this.props.savedTable?this.props.savedTable.title:Object(i.__)("No table selected","wp-table-builder"))),Object(c.createElement)("div",{className:"wptb-header-toolbox"},Object(c.createElement)("div",{className:"wptb-block-tool dashicons dashicons-insert",title:Object(i.__)("new table","wp-table-builder"),onClick:this.openNewTableBuilder}),this.filteredTables().length>0?Object(c.createElement)("div",{className:"wptb-block-tool dashicons dashicons-edit-large",title:Object(i.__)("edit table","wp-table-builder"),onClick:this.openTableEditBuilder}):"",this.state.savedId>=0?Object(c.createElement)(o.Fragment,null,Object(c.createElement)("div",{className:"wptb-block-tool dashicons dashicons-fullscreen-alt",onClick:function(){return e.setState({fullPreview:!0})},title:Object(i.__)("maximize preview","wp-table-builder")})):"",Object(c.createElement)("div",{className:"wptb-block-toggle dashicons wptb-block-tool","aria-expanded":this.state.expanded,onClick:this.toggleBlock}))),Object(c.createElement)("div",{ref:this.mainRef},Object(c.createElement)("div",{className:"wptb-block-main"},this.state.selectScreen?Object(c.createElement)(B,{searchTerm:this.state.searchTerm,updateSearch:this.updateSearch,selectedId:this.state.selectedId,rowSelected:this.rowSelected,filteredTables:this.filteredTables,selectedTable:this.selectedTable(),saveTable:this.saveTable,footerRightPortal:this.state.footerRightPortal,savedId:this.state.savedId,setSelectScreen:this.setSelectScreen}):Object(c.createElement)(M,{footerRightPortal:this.state.footerRightPortal,selectedTable:this.props.savedTable,changeToSelect:this.changeToSelect})),Object(c.createElement)("div",{className:"wptb-block-footer"},Object(c.createElement)("div",{className:"wptb-block-footer-left"}),Object(c.createElement)("div",{ref:this.footerRightPortal,className:"wptb-block-footer-right"})))),Object(c.createElement)("div",{style:{display:this.state.fullPreview?"flex":"none"},className:"wptb-block-full-preview wptb-basic-appear-anim"},Object(c.createElement)("div",{className:"dashicons dashicons-fullscreen-exit-alt wptb-block-minimize-button wptb-block-tool wptb-block-shadow",onClick:function(){return e.setState({fullPreview:!1})},title:Object(i.__)("minimize preview","wp-table-builder")}),Object(c.createElement)(C,{content:this.props.savedTable?this.props.savedTable.content:null})),Object(c.createElement)(V,{builderVisibility:this.setBuilderVisibility,show:this.state.showBuilder,builderUrl:this.state.builderUrl,updateSelection:this.updateSelection}))}}]),r}(s.a.Component));function Q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function X(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}var J=function(e){v()(r,e);var t,n=(t=r,function(){var e,n=j()(t);if(X()){var r=j()(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return O()(this,e)});function r(e){var t;b()(this,r),t=n.call(this,e);var c=e.attributes,l=e.setAttributes,o=e.blockData;return t.setSavedTable=t.setSavedTable.bind(h()(t)),t.state={tables:[],attributes:c,setAttributes:l,savedTable:null,setSavedTable:t.setSavedTable,blockData:o,fetching:!1,isFetching:function(){return t.state.fetching},setFetch:function(e){t.setState({fetching:e})},getTables:function(){return t.state.setFetch(!0),S()({path:"/wp/v2/wptb-tables?status=draft&per_page=-1"}).then((function(e){t.setState({tables:e.map((function(e){return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Q(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,{},{id:e.id,content:e.meta._wptb_content_,title:""===e.title.rendered?"".concat(Object(i.__)("Table","wp-table-builder")," #").concat(e.id):e.title.rendered})}))}),t.state.setFetch(!1)}))}},t}return p()(r,[{key:"setSavedTable",value:function(e){this.setState({savedTable:this.state.tables.filter((function(t){return t.id===e}))[0]})}},{key:"componentDidMount",value:function(){var e=this;this.state.getTables().then((function(){e.setSavedTable(e.state.attributes.id)}))}},{key:"render",value:function(){return Object(c.createElement)(k.Provider,{value:this.state},Object(c.createElement)(G,null))}}]),r}(s.a.Component);n(25);function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var Y=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},wptbBlockData);wptbBlockData=void 0,Object(l.registerBlockType)(Y.blockName,{title:Object(i.__)("WP Table Builder","wp-table-builder"),description:Object(i.__)("WP Table Builder editor block","wp-table-builder"),category:"widgets",icon:"editor-table",attributes:{id:{type:"number",default:"-1"}},transforms:{from:[{type:"shortcode",tag:"wptb",attributes:{id:{type:"number",shortcode:function(e){return e.id}}},priority:1}]},edit:function(e){var t=e.attributes,n=e.setAttributes;return Object(c.createElement)(J,{attributes:t,setAttributes:n,blockData:Y})},save:function(e){var t=e.attributes;return t.id>=0?"[wptb id=".concat(t.id,"]"):""}})}]);