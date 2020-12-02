import { parseElementType, parseTableElementId } from '.';
import { objectDeepMerge } from '../stores/general';

/**
 * Operator type.
 *
 * @param {Object} options options object
 * @param {DataManager} dataManager data manager instance
 * @class
 */
function OperatorType(options, dataManager) {
	const defaultOptions = {
		name: 'default',
		methods: {
			calculateMaxRows() {
				return null;
			},
			getOperatorResult(operatorOptions) {
				return [];
			},
		},
	};

	// merge default options with the supplied ones
	this.options = objectDeepMerge(defaultOptions, options);
	this.dataManager = dataManager;

	/**
	 * Raise option methods to instance context to use context related properties.
	 */
	const upliftMethodsToInstanceContext = () => {
		// eslint-disable-next-line array-callback-return
		Object.keys(this.options.methods).map((method) => {
			if (Object.prototype.hasOwnProperty.call(this.options.methods, method)) {
				this[method] = this.options.methods[method].bind(this);
			}
		});
	};

	upliftMethodsToInstanceContext();
}

/**
 * Highest/lowest operator options.
 *
 * @type {Object}
 */
const highestLowest = {
	methods: {
		calculateMaxRows() {
			return 1;
		},
		getOperatorResult({ compareColumn, operatorType }) {
			const newValuesArray = this.dataManager.getValues();
			newValuesArray.sort((a, b) => {
				const aVal = Number.parseFloat(this.dataManager.getColumnValueByIndex(0, compareColumn, [a]));
				const bVal = Number.parseFloat(this.dataManager.getColumnValueByIndex(0, compareColumn, [b]));

				return (aVal - bVal) * (operatorType === 'highest' ? -1 : 1);
			});

			return newValuesArray;
		},
	},
};

/**
 * Operator type options that will be used to generator operators in operator factory.
 *
 * @type {Object}
 */
const operatorTypeOptions = {
	highest: highestLowest,
	lowest: highestLowest,
};

/**
 * Operator factory for easy operator functions.
 *
 * @param {Object} operatorOptions individual operator options.
 * @param {DataManager} dataManager DataManager instance
 * @class
 */
function OperatorFactory(operatorOptions, dataManager) {
	/**
	 * Operator type instances.
	 *
	 * Operator name will be used as key and its instance will be used at its value.
	 * This object will be populated with instances based on OperatorType object at factory instance generation.
	 *
	 * @type {Object}
	 */
	let operatorTypeInstances = {};

	/**
	 * Get operator type instance.
	 *
	 * @param {string} operatorName operator name
	 * @return {Object} operator type instance
	 */
	this.getOperator = (operatorName) => {
		return operatorTypeInstances[operatorName];
	};

	/**
	 * Create operator type instances.
	 */
	const createOperators = () => {
		operatorTypeInstances = {};

		Object.keys(operatorOptions).map((optionName) => {
			if (Object.prototype.hasOwnProperty.call(operatorOptions, optionName)) {
				operatorTypeInstances[optionName] = new OperatorType(
					{
						name: optionName,
						...operatorOptions[optionName],
					},
					dataManager
				);
			}
		});
	};

	/**
	 * Operator factory startup hook
	 */
	const startUp = () => {
		createOperators();
	};

	// start operator factory initialization
	startUp();
}

/**
 * Data manager for various data operations.
 *
 * @param {Array} values values array
 * @param {Object} bindings bindings object
 * @class
 */
function DataManager(values = [], bindings = {}) {
	let innerValues = values;
	let innerBindings = bindings;

	/**
	 * Update values.
	 *
	 * @param {Array} newValues new values array
	 */
	this.updateValues = (newValues) => {
		innerValues = newValues;
	};

	/**
	 * Update bindings.
	 *
	 * @param {Object} newBindings
	 */
	this.updateBindings = (newBindings) => {
		innerBindings = newBindings;
	};

	/**
	 * Get id of a data column from index.
	 *
	 * @param {number} index column index
	 * @return {string} column id
	 */
	this.getColumnIdFromIndex = (index) => {
		return innerValues[0].values[index]?.colId;
	};

	/**
	 * Get all values of a column in data table.
	 *
	 * @param {string} columnId data table column id
	 * @param {Array} customValues custom values to use
	 * @return {Array} all values related to that column
	 */
	this.getColumnValues = (columnId, customValues = null) => {
		const valuesToUse = customValues || innerValues;
		return valuesToUse.reduce((carry, row) => {
			// eslint-disable-next-line array-callback-return
			row.values.map((cell) => {
				if (cell.colId === columnId) {
					carry.push(cell.value);
				}
			});

			return carry;
		}, []);
	};

	/**
	 * Get a column value by index.
	 *
	 * @param {number} index index
	 * @param {string} columnId column id
	 * @param {Array} customValues custom value array, is supplied values will be selected from here instead of store values
	 * @return {null|string} column value, null if none found on index or column id
	 */
	this.getColumnValueByIndex = (index, columnId, customValues = null) => {
		const columnValues = this.getColumnValues(columnId, customValues);

		let value = null;
		const newIndex = customValues ? 0 : index;
		if (columnValues) {
			if (columnValues[newIndex]) {
				value = columnValues[newIndex];
			}
		}

		return value;
	};

	/**
	 * Get a row object by its id.
	 *
	 * @param {string} rowId row id
	 * @return {Object} row object
	 */
	this.getRowById = (rowId) => {
		return innerValues.filter((row) => row.rowId === rowId)[0];
	};

	/**
	 * Get binding with a specific id.
	 *
	 * @param {string} id id for the target binding
	 * @param {string|null} type binding type, null for none
	 */
	this.getBinding = (id, type) => {
		if (innerBindings[type]) {
			return innerBindings[type][id];
		}

		return null;
	};

	/**
	 * Get values of data manager.
	 * This function will return immutable version of values.
	 *
	 * @return {Array} values array
	 */
	this.getValues = () => {
		return Array.from(innerValues);
	};
}

/**
 * Data table generator for frontend usage.
 *
 * @class
 */
function DataTableGenerator() {
	/**
	 * Data manager instance
	 *
	 * @type {DataManager}
	 */
	this.dataManager = {
		_dataManager: null,
		get instance() {
			/* eslint-disable no-underscore-dangle */
			if (!this._dataManager) {
				this._dataManager = new DataManager();
			}

			return this._dataManager;
			/* eslint-enable no-underscore-dangle */
		},
	};

	/**
	 * Operator factory instance.
	 *
	 * @type {OperatorFactory}
	 */
	this.operatorFactory = new OperatorFactory(operatorTypeOptions, this.dataManager.instance);

	/**
	 * Update data manager instance.
	 *
	 * @param {Array} values values array
	 * @param {Object} bindings bindings object
	 */
	this.updateDataManager = (values = [], bindings = {}) => {
		this.dataManager.instance.updateValues(values);
		this.dataManager.instance.updateBindings(bindings);
	};

	/**
	 * Current bindings to be used for current generate process.
	 *
	 * @type {Object}
	 */
	this.currentBindings = {};

	/**
	 * Current values to be used for current generate process.
	 *
	 * @type {Object}
	 */
	this.currentValues = {};

	/**
	 * Parse target element into its cells and rows.
	 *
	 * @param {HTMLElement} table table element to be parsed
	 */
	const parseTable = (table) => {
		return Array.from(table.querySelectorAll('tr'));
	};

	/**
	 * Clear table body contents of a table.
	 *
	 * @param {HTMLElement} table table to be cleared
	 */
	const clearTable = (table) => {
		// eslint-disable-next-line no-param-reassign
		table.querySelector('tbody').innerHTML = '';
	};

	/**
	 * Get data table related id of a row element.
	 *
	 * @param {HTMLElement} rowElement row element
	 * @return {string|null} row element id, null if no id found
	 */
	const getRowId = (rowElement) => {
		return rowElement.dataset.dataTableRowId;
	};

	/**
	 * Get binding of a table element.
	 *
	 * @param {HTMLElement} tableElement table element
	 * @param {string} type binding type
	 * @return {null | string} binding
	 */
	const getTableElementBinding = (tableElement, type) => {
		const elementId = parseTableElementId(tableElement);
		let binding = null;

		if (elementId) {
			binding = this.dataManager.instance.getBinding(elementId, type);
		}

		return binding;
	};

	/**
	 * Get associated row binding for the given row element.
	 *
	 * @param {HTMLElement} rowElement row element
	 * @return {Object|null} binding for supplied row, null if no binding found
	 */
	const getRowBinding = (rowElement) => {
		const rowId = getRowId(rowElement);

		let binding = null;

		if (rowId) {
			binding = this.dataManager.instance.getBinding(rowId, 'row');
		}

		return binding;
	};

	/**
	 * Calculate maximum amount of rows that can be populated from a blueprint row.
	 *
	 * @param {HTMLElement} rowElement row element
	 */
	const calculateMaxRows = (rowElement) => {
		const rowBindingMode = getRowBinding(rowElement)?.mode;

		// if row binding mode is not defined for the row element, use auto as default
		if (rowBindingMode === 'auto' || !rowBindingMode) {
			return this.currentValues.length;
		}
		// max row calculations for operator mode
		if (rowBindingMode === 'operator') {
			const { operatorType } = getRowBinding(rowElement).operator;

			return this.operatorFactory.getOperator(operatorType).calculateMaxRows();
		}

		const cells = Array.from(rowElement.querySelectorAll('td'));

		return cells.reduce((carry, cell) => {
			const tableElements = Array.from(cell.querySelectorAll('.wptb-ph-element'));

			// max amount of column values can be applied to this cell
			let maxValue = 0;
			// eslint-disable-next-line array-callback-return
			tableElements.map((element) => {
				const colBinding = getTableElementBinding(element, 'column');

				if (colBinding) {
					maxValue = Object.keys(colBinding)
						// TODO [erdembircan] rewrite this with filter > map
						// eslint-disable-next-line array-callback-return
						.map((key) => {
							if (Object.prototype.hasOwnProperty.call(colBinding, key)) {
								return colBinding[key];
							}
						})
						// eslint-disable-next-line no-shadow
						.reduce((carry, binding) => {
							const values = this.dataManager.instance.getColumnValues(binding);
							return Math.max(values.length, carry);
						}, 0);
				}
			});

			return Math.max(maxValue, carry);
		}, 1);
	};

	/**
	 * Value apply list for different table elements.
	 *
	 * @type {Object}
	 */
	const valueApplyList = {
		text: (tableElement, value) => {
			const { text } = value;
			if (text) {
				const pElement = tableElement.querySelector('p');
				// since tinyMCE wraps text content with native font style elements, should be applying text value to first child node of paragraph element
				pElement.childNodes[0].textContent = value.text;
			}
		},
		button: (tableElement, value) => {
			const { text, link } = value;
			if (text) {
				const pElement = tableElement.querySelector('p');
				// since tinyMCE wraps text content with native font style elements, should be applying text value to first child node of paragraph element
				pElement.childNodes[0].textContent = value.text;
			}
			if (link) {
				const anchorElement = tableElement.querySelector('a');
				if (anchorElement) {
					anchorElement.href = link;
				}
			}
		},
	};

	/**
	 * Add value to a table element.
	 *
	 * @param {HTMLElement} tableElement table element
	 * @param {*} value value
	 * @param {Object} mapper mapper object to map values to certain element properties
	 */
	const addValueToTableElement = (tableElement, value, mapper = null) => {
		const tableElementType = parseElementType(tableElement);

		let elementValue = value;

		if (mapper) {
			// decide which mapper object to use, if no mapper property is defined for current table element type, use default mapper object
			const mapperIndex = mapper[tableElementType] ?? mapper.default ?? ['text'];

			// create a new value object with mapped properties
			elementValue = {};
			// eslint-disable-next-line array-callback-return
			mapperIndex.map((mapIndex) => {
				elementValue[mapIndex] = value;
			});
		}

		valueApplyList[tableElementType](tableElement, elementValue);
	};

	/**
	 * Batch populate table elements with their assigned binding values.
	 *
	 * @param {Array} tableElements an array of table elements
	 * @param {number} rowIndex index of current row this table elements belongs to
	 * @param {Array} customValues custom values to use for populate operation
	 */
	const batchPopulateTableElements = (tableElements, rowIndex, customValues = null) => {
		// eslint-disable-next-line array-callback-return
		tableElements.map((tableElement) => {
			const bindingColIdObject = getTableElementBinding(tableElement, 'column');
			if (bindingColIdObject) {
				const value = {};

				// eslint-disable-next-line array-callback-return
				Object.keys(bindingColIdObject).map((key) => {
					if (Object.prototype.hasOwnProperty.call(bindingColIdObject, key)) {
						value[key] = this.dataManager.instance.getColumnValueByIndex(
							rowIndex,
							bindingColIdObject[key],
							customValues
						);
					}
				});

				if (value) {
					addValueToTableElement(tableElement, value);
				}
			}
		});
	};

	/**
	 * Get table elements from a supplied row element.
	 *
	 * @param {HTMLElement} rowElement row element
	 * @return {Array} table element array
	 *
	 */
	const getTableElementsFromRow = (rowElement) => {
		return Array.from(rowElement.querySelectorAll('.wptb-ph-element'));
	};

	/**
	 * Get table elements from a supplied table cell.
	 *
	 * @param {HTMLElement} cellElement cell element
	 * @return {Array} table element array
	 *
	 */
	const getTableElementsFromCell = (cellElement) => {
		return Array.from(cellElement.querySelectorAll('.wptb-ph-element'));
	};

	/**
	 * Logic for different row bindings.
	 *
	 * @type {Object}
	 */
	const rowBindingLogicList = {
		auto: (rowElement, rowIndex) => {
			const cells = Array.from(rowElement.querySelectorAll('td'));

			// eslint-disable-next-line array-callback-return
			cells.map((cell, cellIndex) => {
				const cellTableElements = getTableElementsFromCell(cell);

				// get column value based on the index of the cell
				const currentColumnId = this.dataManager.instance.getColumnIdFromIndex(cellIndex);
				const columnValue = this.dataManager.instance.getColumnValueByIndex(rowIndex, currentColumnId);

				// eslint-disable-next-line array-callback-return
				cellTableElements.map((tableElement) => {
					if (columnValue) {
						addValueToTableElement(tableElement, columnValue, { default: ['text'], button: ['link'] });
					}
				});
			});
		},
		operator: (rowElement, rowIndex) => {
			const operatorOptions = getRowBinding(rowElement).operator;

			batchPopulateTableElements(
				getTableElementsFromRow(rowElement),
				rowIndex,
				this.operatorFactory.getOperator(operatorOptions.operatorType).getOperatorResult(operatorOptions)
			);
		},
	};

	/**
	 * Generate necessary data for table elements based on binding row mode
	 *
	 * @param {string} mode row binding mode type
	 * @param {HTMLElement} rowElement row element
	 * @param {number} rowIndex current row index
	 * @param {Object} modeOptions extra mode options if necessary
	 */
	const applyRowBindings = (mode, rowElement, rowIndex, modeOptions = {}) => {
		rowBindingLogicList[mode](rowElement, rowIndex, modeOptions);
	};

	/**
	 * Populate and generate a row element based on blueprint row.
	 *
	 * @param {number} index current index of row
	 * @param {HTMLElement} blueprintRow blueprint row element
	 * @return {HTMLElement} generated row
	 */
	const populateRow = (index, blueprintRow) => {
		const clonedRow = blueprintRow.cloneNode(true);

		const rowBinding = getRowBinding(clonedRow);

		// give priority to row auto mode over element column bindings
		if (rowBinding && rowBinding.mode && rowBinding.mode !== 'none') {
			applyRowBindings(rowBinding.mode, clonedRow, index);
		} else {
			const rowElements = getTableElementsFromRow(clonedRow);
			batchPopulateTableElements(rowElements, index);
		}

		return clonedRow;
	};

	/**
	 * Populate a blueprint row.
	 *
	 * @param {HTMLElement} row blueprint row
	 * @return {Array} populated blueprint rows
	 */
	const populateBlueprint = (row) => {
		const maxRows = calculateMaxRows(row);
		const populatedRows = [];
		for (let i = 0; i < maxRows; i += 1) {
			populatedRows.push(populateRow(i, row));
		}

		return populatedRows;
	};

	/**
	 * Generate a data table
	 *
	 * @param {HTMLElement} sourceTable source table to be generated with data
	 * @param {Object} bindings data bindings
	 * @param {Object} values data cell values
	 * @return {HTMLElement} generated data table
	 */
	this.generateDataTable = (sourceTable, bindings, values) => {
		this.updateDataManager(values, bindings);
		this.currentBindings = bindings;
		this.currentValues = values;
		return new Promise((res) => {
			const clonedTable = sourceTable.cloneNode(true);
			const tableBody = clonedTable.querySelector('tbody');

			const parsedRows = parseTable(clonedTable);
			clearTable(clonedTable);

			const populatedRows = parsedRows.reduce((carry, blueprintRow) => {
				const pR = populateBlueprint(blueprintRow);

				// eslint-disable-next-line no-param-reassign
				carry = [...carry, ...pR];

				return carry;
			}, []);

			populatedRows.map((r) => tableBody.appendChild(r));

			return res(clonedTable);
		});
	};
}

/** @module DataTableGenerator */
export default new DataTableGenerator();
