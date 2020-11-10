/**
 * Data table getter methods.
 *
 * @type {Object}
 */
const getters = {
	/**
	 * Get visibility state.
	 *
	 * @param {Object} state store state
	 * @return {boolean} visibility
	 */
	isVisible(state) {
		return state.visibility;
	},
	/**
	 * Get current screen of data table.
	 *
	 * @param {Object} state store state
	 * @return {string} current screen
	 */
	currentScreen(state) {
		return state.screen;
	},
	/**
	 * Get soft selected source card id.
	 *
	 * Soft selected card is the one that is selected but not confirmed.
	 *
	 * @param {Object} state store state
	 * @return {string} soft selected card id
	 */
	getSoftSelectedSourceCardId(state) {
		return state.dataSource.card.softSelectedId;
	},
	/**
	 * Get pro version status of the plugin.
	 *
	 * @param {Object} state store state
	 * @return {boolean} pro version status
	 */
	getProStatus(state) {
		return state.proEnabled;
	},
	/**
	 * Get active tab group id for source setup
	 *
	 * @param {Object} state store state
	 * @param {string} sourceId source id
	 * @return {Function} function to get active setup group tab
	 */
	currentSetupGroupTab: (state) => (sourceId) => {
		return state.dataSource.setup[sourceId].controlGroupTab;
	},
	/**
	 * Get active tab group id for source setup.
	 *
	 * @param {Object} state store state
	 * @param {Object} getters getters
	 * @return {boolean} source setup or not
	 */
	// eslint-disable-next-line no-shadow
	isActiveScreenSourceSetup(state, getters) {
		const { currentScreen } = getters;

		return currentScreen.match(/^(.+)Setup$/g);
	},
	/**
	 * Get active tab group id for source setup.
	 *
	 * @param {Object} state store state
	 * @return {boolean} app busy status
	 */
	busyStatus(state) {
		return state.busy;
	},
	/**
	 * Whether any data source is imported on setup.
	 *
	 * @param {Object} state store state
	 * @return {boolean} imported or not
	 */
	isSetupDataImported(state) {
		return Array.isArray(state.dataManager.tempData) ? state.dataManager.tempData.values.length > 0 : false;
	},
	/**
	 * Get current control values for given source
	 *
	 * @param {Object} state store state
	 */
	getSetupControls: (state) => (sourceId) => {
		return state.dataSource.setup[sourceId].controls;
	},
	/**
	 * Get current control values of temp data manager.
	 *
	 * @param {Object} state store state
	 * @return {Object} control values
	 */
	getDataManagerControls(state) {
		return state.dataManager.controls;
	},
	/**
	 * Get data values of temp data manager.
	 *
	 * @param {Object} state store state
	 * @return {Array} temp data manager data
	 */
	getDataManagerData(state) {
		return state.dataManager.data;
	},
	/**
	 * Get temp data values of data manager.
	 *
	 * @param {Object} state store state
	 * @return {Array} temp data
	 */
	getDataManagerTempData(state) {
		return state.dataManager.tempData.values;
	},
	/**
	 * Generate unique id.
	 *
	 * @return {Function} generate function
	 */
	generateUniqueId: () => (length = 5) => {
		const variables = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5'];
		let key = '';

		for (let i = 0; i < length; i += 1) {
			key += variables[Math.floor(Math.random() * variables.length)];
		}

		return key;
	},
	/**
	 * Get data manager row id of a given index.
	 *
	 * @param {Object} state store state
	 * @return {function(*): (*|0)} function that can be used with an argument
	 */
	getDataManagerRowId: (state) => (index) => {
		if (state.dataManager.tempData.rowIds[index]) {
			return state.dataManager.tempData.rowIds[index];
		}
		return 0;
	},
	/**
	 * Get data manager column id of a given index.
	 *
	 * @param {Object} state store state
	 * @return {function(*): (*|0)} function that can be used with an argument
	 */
	getDataManagerColId: (state) => (index) => {
		if (state.dataManager.tempData.colIds[index]) {
			return state.dataManager.tempData.colIds[index];
		}
		return 0;
	},
};

export default getters;
