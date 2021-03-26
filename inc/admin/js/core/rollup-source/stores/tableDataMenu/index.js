import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import tableDataPlugins from './plugins';
import { createBasicStore, defaultTranslationGetter } from '../general';
import modalWindow from '../modules/modalWindow';

// use vuex store model
Vue.use(Vuex);

/**
 * Default store object for table data menu.
 *
 * @type {Object}
 */
const defaultStore = {
	state,
	mutations,
	actions,
	getters: defaultTranslationGetter(getters),
	plugins: [tableDataPlugins],
	modules: {
		modalWindow: {
			namespaced: true,
			...modalWindow,
		},
	},
};

/**
 * Create table data menu store.
 *
 * @param {Object} extraOptions extra store options object
 * @return {Object} table data menu store
 */
const createStore = (extraOptions) => {
	return createBasicStore(defaultStore, extraOptions);
};

/**
 * @module create table data menu.
 */
export default createStore;
