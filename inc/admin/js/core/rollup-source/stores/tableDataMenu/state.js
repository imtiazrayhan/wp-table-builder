/**
 * Table data menu store state.
 *
 * @type {Object}
 */
const state = {
	app: {
		dirty: false,
		busy: false,
		message: {
			type: 'ok',
			content: '',
		},
	},
	editor: {
		activeId: null,
	},
	visibility: true,
	setupTab: 'dataManager',
	dataBackup: null,
};

/**
 * @module state
 */
export default state;
