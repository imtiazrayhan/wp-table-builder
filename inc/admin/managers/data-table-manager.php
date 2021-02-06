<?php

namespace WP_Table_Builder\Inc\Admin\Managers;

use WP_Error;
use WP_Table_Builder\Inc\Common\Traits\Init_Once;
use WP_Table_Builder\Inc\Core\Init;
use function add_action;
use function add_filter;
use function add_post_meta;
use function get_post_meta;
use function register_post_type;
use function update_post_meta;
use function wp_insert_post;

// if called directly, abort
if ( ! defined( 'WPINC' ) ) {
	die();
}

/**
 * Class Data_Table_Manager.
 *
 * Manager for handling functionality related to data tables.
 *
 * @package WP_Table_Builder\Inc\Admin\Managers
 */
class Data_Table_Manager {
	use Init_Once;

	/**
	 * Table data custom WP post type name.
	 */
	const TABLE_DATA_POST_TYPE = 'wptb-table-data';

	/**
	 * Meta key of tables for table data post ids.
	 */
	const TABLE_POST_ID_META = '_wptb_table_data_id_';

	/**
	 * Initialize static class.
	 */
	public static function init() {
		if ( ! static::is_initialized() ) {
			static::register_table_data_type();// add data table data
			add_filter( 'wp-table-builder/filter/admin_data', [ __CLASS__, 'add_admin_data' ] );
			add_action( 'wp-table-builder/new_table_saved', [ __CLASS__, 'table_saved' ], 10, 2 );
			add_action( 'wp-table-builder/table_edited', [ __CLASS__, 'table_saved' ], 10, 2 );
			add_filter( 'wp-table-builder/title_listing', [ __CLASS__, 'title_listing' ], 10, 2 );
		}
	}

	/**
	 * Register table data post type to WordPress.
	 */
	public static function register_table_data_type() {
		// table data post type options
		$args = [
			'label'              => 'WPTB Table Data',
			'public'             => false,
			'exclude'            => true,
			'publicly_queryable' => false,
			'show_ui'            => false,
			'show_in_menu'       => false,
			'show_in_rest'       => false,
			'can_export'         => false,
			'supports'           => [ 'title', 'custom_fields' ],
			'rewrite'            => false,
		];

		register_post_type( self::TABLE_DATA_POST_TYPE, $args );
	}

	/**
	 * Filter title of table on table listing menu.
	 *
	 * @param string $title title
	 * @param string $table_id table id
	 *
	 * @return string table title
	 */
	public static function title_listing( $title, $table_id ) {
		if ( static::is_data_table_enabled( $table_id ) ) {
			if ( filter_var( preg_match( '/^Table \(ID #\b.+\)$/', $title ), FILTER_VALIDATE_BOOLEAN ) === true ) {
				$title = preg_replace( '/^(Table)(.+)$/', 'DataTable$2', $title );
			}
			$prefix = '<span class="dashicons dashicons-database"></span>';

			return $prefix . ' ' . $title;
		}

		return $title;
	}

	/**
	 * Check if table is a data table.
	 *
	 * @param string $table_id table id
	 *
	 * @return bool data table or not
	 */
	public static function is_data_table_enabled( $table_id ) {
		$status = get_post_meta( $table_id, '_wptb_data_table_', true );

		return filter_var( $status, FILTER_VALIDATE_BOOLEAN ) === true;
	}

	/**
	 * Table saved/edited action hook callback.
	 *
	 * @param string $id post id
	 * @param object $params parameter object
	 */
	public static function table_saved( $id, $params ) {
		// add data table meta to post to indicate its table type
		if ( property_exists( $params, 'wptbDataTable' ) ) {
			add_post_meta( $id, '_wptb_data_table_', 'true' );

			$table_data_id_exists      = property_exists( $params, 'wptbTableDataId' ) && $params->wptbTableDataId !== null;
			$table_data_content_exists = property_exists( $params, 'wptbTableDataContent' );

			// if no data id is present but have a data content, create a new table data object
			if ( ! $table_data_id_exists && $table_data_content_exists ) {
				$table_data_content = $params->wptbTableDataContent;

				// create a new table data post type
				$status = static::create_table_data_object( $table_data_content );

				if ( ! is_wp_error( $status ) ) {
					// add created table data post id to table post
					add_post_meta( $id, self::TABLE_POST_ID_META, $status );

					// send created table data post id to frontend
					add_filter( 'wp-table-builder/filter/saved_table_response_data', function ( $data ) use ( $status ) {
						if ( ! isset( $data['dataTable'] ) ) {
							$data['dataTable'] = [];
						}

						$data['dataTable']['tableDataId'] = $status;

						return $data;
					} );
				}
			} else if ( $table_data_id_exists && $table_data_content_exists ) {
				static::update_data_object_content( $params->wptbTableDataId, $params->wptbTableDataContent );
			}
		}
	}

	/**
	 * Update data content of table data post type.
	 *
	 * @param string $id table data post id
	 * @param string $content data content
	 */
	private static function update_data_object_content( $id, $content ) {
		update_post_meta( $id, '_wptb_data_content_', $content );
	}

	/**
	 * Create a new table data post type.
	 *
	 * @param string $data_content data content
	 *
	 * @return int|WP_Error id of created table data post or WP_Error
	 */
	private static function create_table_data_object( $data_content ) {
		return wp_insert_post( [
			'post_type'  => self::TABLE_DATA_POST_TYPE,
			'meta_input' => [
				'_wptb_data_content_' => $data_content
			]
		] );
	}

	/**
	 * Add data table related data to frontend script.
	 *
	 * @param array $admin_data admin data
	 *
	 * @return array admin data array
	 */
	public static function add_admin_data( $admin_data ) {
		$icon_manager = Init::instance()->get_icon_manager();
		$data_table   = [
			'iconList' => $icon_manager->get_icon_list(),
			'icons'    => [
				'csv'                 => $icon_manager->get_icon( 'file-csv' ),
				'database'            => $icon_manager->get_icon( 'database' ),
				'wordpressPost'       => $icon_manager->get_icon( 'wordpress-simple' ),
				'server'              => $icon_manager->get_icon( 'server' ),
				'chevronRight'        => $icon_manager->get_icon( 'chevron-right' ),
				'exclamationTriangle' => $icon_manager->get_icon( 'exclamation-triangle' ),
				'handPointer'         => $icon_manager->get_icon( 'hand-pointer' ),
				'sortUp'              => $icon_manager->get_icon( 'sort-alpha-up' ),
				'cog'                 => $icon_manager->get_icon( 'cog' ),
			],
			'proUrl'   => 'https://wptablebuilder.com/',
		];

		$admin_data['dataTable'] = $data_table;

		return $admin_data;
	}
}
