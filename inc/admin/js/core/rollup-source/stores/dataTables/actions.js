/**
 * Data table store actions.
 *
 * @type {Object}
 */
const actions = {
	/**
	 * Change DOM visibility of app.
	 *
	 * @param {Function} commit mutation commit function
	 * @param {boolean} value visibility value
	 */
	setComponentVisibility({ commit }, value) {
		commit('appVisibility', value);
	},
	/**
	 * Change current screen.
	 *
	 * @param {Function} commit mutation commit function
	 * @param {string} screenName screen name to assign as current
	 */
	setCurrentScreen({ commit }, screenName) {
		commit('setScreen', screenName);
	},
	/**
	 * Change current screen.
	 *
	 * @param {Function} commit mutation commit function
	 */
	setCurrentScreenToDataSourceSelection({ commit }) {
		commit('setScreen', `DataSourceSelection`);
		// commit('resetToDefaults', 'dataSource.setup');
	},
	/**
	 * Soft select a source card.
	 *
	 * @param {{commit}} mutation commit function
	 * @param {string} sourceId selected source id
	 */
	softSelectCard({ commit }, sourceId) {
		commit('setSoftSelected', sourceId);
	},
	/**
	 * Start setup process for selected source type.
	 *
	 * For source setup to work, name your setup components as `SourceName`Setup where
	 *`SourceName` being the id for that source.
	 *
	 * @param {{commit, dispatch}} mutation commit function
	 * @param {string} sourceId selected source id
	 */
	startSourceSetup({ commit, dispatch }, sourceId) {
		// set source id
		commit('setSetupSourceId', sourceId);

		// reset selected data source
		commit('setSelectedDataSource', null);

		// clear temp data manager
		commit('clearTempDataManager');

		// set screen
		dispatch('setCurrentScreenFromId', sourceId);
	},
	/**
	 * Set current setup screen from id.
	 *
	 * @param {{dispatch}} vuex store object
	 * @param {string} sourceId source id
	 */
	setCurrentScreenFromId({ dispatch }, sourceId) {
		const screenName = `${sourceId[0].toUpperCase() + sourceId.slice(1)}Setup`;

		dispatch('setCurrentScreen', screenName);
	},
	/**
	 * Generate a new cell object.
	 *
	 * @param {{getters, commit}} vuex store object
	 * @param {{value,index}} payload
	 * @return {Object} cell object
	 */
	generateCell({ getters, commit }, { value, index }) {
		let colId = getters.getDataManagerColId(index);
		if (!colId) {
			colId = getters.generateUniqueId();
			commit('pushDataManagerColId', colId);
		}
		return { colId, value };
	},
	/**
	 * Generate a new row for data table manager.
	 *
	 * @param {{commit, getters, dispatch}} vuex store object
	 * @param {Array} colValues column values
	 * @return {Function} generated new row object
	 */
	generateRow({ commit, getters, dispatch }, colValues) {
		const rowId = getters.generateUniqueId();
		commit('pushDataManagerRowId', rowId);

		const rowObj = { rowId, values: [] };

		// eslint-disable-next-line array-callback-return
		colValues.map(async (value, i) => {
			const cellObject = await dispatch('generateCell', { value, index: i });
			rowObj.values.push(cellObject);
		});

		return rowObj;
	},
	/**
	 * Add temp data to data manager.
	 *
	 * @param {{commit, getters}} vuex store object
	 * @param {{data, markAsImported}} data data array
	 */
	addDataManagerTempData({ commit, dispatch }, { data, markAsImported }) {
		if (markAsImported === undefined) {
			// eslint-disable-next-line no-param-reassign
			markAsImported = true;
		}

		const confirmedData = Array.isArray(data) ? data : [];

		const maxCellsPerRow = confirmedData.reduce((carry, item) => {
			return Math.max(item.length, carry);
		}, 0);

		// fill missing cells per rows to maximum column count
		// eslint-disable-next-line array-callback-return
		confirmedData.map((r) => {
			if (r.length < maxCellsPerRow) {
				const difference = maxCellsPerRow - r.length;

				for (let i = 0; i < difference; i += 1) {
					r.push('');
				}
			}
		});

		commit('clearTempDataManager');

		confirmedData.map(async (r) => {
			await dispatch('addRowToDataManager', r);
		});

		if (markAsImported) {
			// mark data created status
			commit('setSetupSourceDataCreatedStatus', true);
		}

		commit('setHoverId', null);
	},
	/**
	 * Set tab of current active source setup.
	 *
	 * @param {{state,commit}} vuex store object
	 * @param {string} tabId tab id to change to
	 */
	setActiveTabGroupForCurrentSource({ state, commit }, tabId) {
		commit('setActiveControlTabGroup', { sourceId: state.dataSource.setup.sourceId, tabId });
	},
	/**
	 * Start select operation.
	 *
	 * @async
	 * @param {{commit}} vuex store object
	 * @param {string} callerId id of the component that started the operation
	 * @return {Promise} Promise object
	 */
	startRowSelectOperation({ commit }, callerId) {
		// set app to busy
		commit('setBusy', true);

		// reset selection data
		commit('resetSelectData');

		// enable row selection
		commit('setSelectionType', 'row');

		// enable select operation
		commit('setSelectStatus', true);

		// set operation caller id
		commit('setSelectCallerId', callerId);

		// send back a promise object which will be resolved when click operation occurs
		return new Promise((res) => {
			commit('setSelectIdResolve', (val) => {
				// end selection operation
				commit('setSelectStatus', false);
				commit('resetSelectData');

				// set app to idle
				commit('setBusy', false);

				res(val);
			});
		});
	},
	/**
	 * Cancel active select operation.
	 *
	 * @param {{state, commit}} vuex store object
	 */
	cancelRowSelectOperation({ state, commit }) {
		commit('setSelectStatus', false);
		state.dataManager.select.clickId.resolve(null);
		commit('resetSelectData');
	},
	/**
	 * Set value of data cell.
	 *
	 * @param {{getters}} vuex store object
	 * @param {{cellId, value}} payload
	 *
	 */
	setDataCellValue({ getters, commit }, { cellId, value }) {
		const { rowId, colId } = getters.parseCellId(cellId);

		commit('setDataCellObjectValue', { rowId, colId, value });
		commit('setSetupSourceDataCreatedStatus', true);
	},
	/**
	 * Add a new row to data manager.
	 *
	 * @async
	 * @param {{getters,dispatch,commit}} vuex store object
	 * @param {Array} colValues values for columns
	 */
	async addRowToDataManager({ getters, dispatch, commit }, colValues = []) {
		let innerColValues = colValues;

		if (colValues.length === 0) {
			innerColValues = Array.from(new Array(getters.getColCount)).map(() => '');
		}

		const rowObject = await dispatch('generateRow', innerColValues);
		commit('addRowToDataTable', rowObject);
	},
	/**
	 * Add a column to data manager.
	 *
	 * @param {{commit, getters, dispatch}} vuex store object
	 * @param {string} value value of the newly added cells
	 */
	async addColumnToDataManager({ commit, getters, dispatch }, value = '') {
		const colCount = getters.getColCount;
		const rowCount = getters.getRowCount;

		Array.from(new Array(rowCount))
			.map(() => '')
			.map(async (r, rowIndex) => {
				const cellObject = await dispatch('generateCell', { value, colCount });
				commit('addCellToDataTableRow', { rowIndex, cellObject });
			});
	},
	/**
	 * Delete a row object from data manager table.
	 *
	 * @param {{commit, getters}} vuex store object
	 * @param {string} rowId row id
	 */
	deleteDataTableRow({ commit, getters }, rowId) {
		const index = getters.getDataManagerIndexFromId(rowId);
		commit('deleteRowFromDataTable', rowId);

		// calculate hover id that will be focused on after delete operation
		const hoverRowIndex = index - 1 >= 0 ? index - 1 : index;
		const hoverRowId = getters.getDataManagerRowId(hoverRowIndex);
		const { colId } = getters.parseCellId(getters.getHoverId);
		commit('setHoverId', getters.formCellId(hoverRowId, colId));
	},
	/**
	 * Delete a column object from data manager table.
	 *
	 * @param {{commit}} vuex store object
	 * @param {string} colId column id
	 */
	deleteDataTableCol({ commit }, colId) {
		// @deprecated
		// const index = getters.getDataManagerIndexFromId(colId, 'col');

		commit('deleteColFromDataTable', colId);

		// @deprecated
		// // calculate hover id that will be focused on after delete operation
		// const hoverColIndex = index - 1 >= 0 ? index - 1 : index;
		// const hoverColId = getters.getDataManagerColId(hoverColIndex);
		// const { rowId } = getters.parseCellId(getters.getHoverId);
		// commit('setHoverId', getters.formCellId(rowId, hoverColId));

		commit('setHoverId', null);
	},
	/**
	 * Set current source in setup as selected.
	 *
	 * @param {{commit, getters}} vuex store object
	 */
	setCurrentSourceAsSelected({ commit, getters }) {
		const currentSourceInSetup = getters.getCurrentSourceSetupId;

		commit('setSelectedDataSource', currentSourceInSetup);
	},
	addOptionsAndDataToSave({ state }) {
		document.addEventListener('wptb:save:before', () => {
			const { dataSource, dataManager } = state;

			const dataToSave = { dataSource, dataManager };
			const stringified = JSON.stringify(dataToSave);
			const encoded = btoa(stringified);

			const table = document.querySelector(
				'.wptb-management_table_container .wptb-table-setup .wptb-preview-table'
			);
			if (table) {
				table.dataset.wptbDataTableOptions = encoded;
			}
		});
	},
};

export default actions;
