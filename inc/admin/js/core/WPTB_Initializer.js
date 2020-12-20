const WPTB_Initializer = function () {
	const MIN_COLUMNS = 1;
	const MIN_ROWS = 1;
	const MAX_COLUMNS = 30;
	const MAX_ROWS = 30;

	const tableGenerator = document.body;
	(columnsDecrementButton = tableGenerator.getElementsByClassName('wptb-input-number-decrement')[0]),
		(columnsIncrementButton = tableGenerator.getElementsByClassName('wptb-input-number-increment')[0]),
		(rowsDecrementButton = tableGenerator.getElementsByClassName('wptb-input-number-decrement')[1]),
		(rowsIncrementButton = tableGenerator.getElementsByClassName('wptb-input-number-increment')[1]),
		(columnsInput = document.getElementById('wptb-columns-number')),
		(rowsInput = document.getElementById('wptb-rows-number'));

	// columnsDecrementButton.onclick = function () {
	//         if (columnsInput.value > MIN_COLUMNS) {
	//                 columnsInput.value--;
	//         }
	// };
	//
	// columnsIncrementButton.onclick = function () {
	//         if (columnsInput.value < MAX_COLUMNS) {
	//                 columnsInput.value++;
	//         }
	// };
	//
	// rowsDecrementButton.onclick = function () {
	//         if (rowsInput.value > MIN_ROWS) {
	//                 rowsInput.value--;
	//         }
	// };
	//
	// rowsIncrementButton.onclick = function () {
	//         if (rowsInput.value < MAX_ROWS) {
	//                 rowsInput.value++;
	//         }
	// };

	// document.getElementById( 'wptb-generate-table' ).onclick = function (  ) {
	//         var columns = document.getElementById('wptb-columns-number').value,
	//             rows = document.getElementById('wptb-rows-number').value;
	//
	//         //wptbTableStateSaveManager.tableStateClear();
	//
	//         WPTB_Table(columns, rows);
	//
	//         let wptbTableStateSaveManager = new WPTB_TableStateSaveManager();
	//         wptbTableStateSaveManager.tableStateSet();
	// }

	// register and setup section buttons
	WPTB_Helper.registerSections([
		'elements',
		'table_settings',
		'cell_settings',
		'options_group',
		'table_responsive_menu',
		'manage_cells',
		'background_menu',
	]);

	// setup section related panel buttons
	WPTB_Helper.setupSectionButtons();

	// activate elements section for startup
	WPTB_Helper.activateSection('elements');

	// side bar toggle setup
	WPTB_Helper.setupSidebarToggle('.wptb-panel-toggle-section .wptb-panel-drawer-icon');

	// setup panel sections that have the ability to be toggled on/off
	WPTB_Helper.setupPanelToggleButtons();

	// setup responsive menu both at left and builder panel
	new WptbResponsive('table_responsive_menu', 'wptbResponsiveApp', '.wptb-builder-content');

	// get builder section from url parameter for easy switch at page load
	WPTB_Helper.getSectionFromUrl();

	// automatically show element controls when dropped to table
	WPTB_Helper.showControlsOnElementMount();

	// show elements list menu on left panel on removing elements from table
	WPTB_Helper.showElementsListOnRemove();

	// block tinyMCE from activation at manage cells menu
	WPTB_Helper.blockTinyMCEManageCells();

	// initialize header toolbox
	new WPTB_HeaderToolbox('.wptb-plugin-header-toolbar').init();

	// redirect active menu to elements after closing manage cells menu
	document.addEventListener('wp-table-builder/table-edit-mode/closed', () => {
		WPTB_Helper.activateSection('elements');
	});

	WPTB_Helper.calledByBlock();

	// initialize notification manager
	WPTB_NotificationManager.init();
};
