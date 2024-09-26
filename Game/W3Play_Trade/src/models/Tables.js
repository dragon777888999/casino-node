import {column_asc} from '../utils/array'

export default class TablesModel{
	constructor(tables) {
		this.tables = tables;
	}

	/**
	 * this method tries to find table with the same time on a different asset 
	 * @param {Number} asset_id 
	 * @param {Object} table 
	 * @returns {?Object}
	 */
	get_same_time_table(asset_id, table){
		if (!table) return;
		return this.tables.find(({asset, downtime, duration}) => (
			asset == asset_id && downtime == table.downtime && duration == table.duration
		))
	}

	/**
	 * this method gives the table for a specific asset with the lowest order number (first table)
	 * @param {Number} asset_id 
	 * @returns {?Object}
	 */
	get_default_table(asset_id){
		return this.tables.find(({asset, selected}) => (asset == asset_id && selected))
	}

	/**
	 * @param {Number} table_id 
	 * @returns {?Object}
	 */
	get_by_id(table_id){
		return this.tables.find(({id}) => id == table_id)
	}
}