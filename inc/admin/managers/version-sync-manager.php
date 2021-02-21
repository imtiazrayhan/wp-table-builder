<?php

namespace WP_Table_Builder\Inc\Admin\Managers;

// if called directly, abort
use function add_filter;
use function is_wp_error;

if ( ! defined( 'WPINC' ) ) {
	die();
}

/**
 * Class Version_Sync_Manager.
 * @package WP_Table_Builder\Inc\Admin\Managers
 */
class Version_Sync_Manager {

	/**
	 * Subscribers list.
	 *
	 * This array will contain subscriber slug name as keys and instances as values.
	 * @var array
	 */
	private static $subscribers = [];

	/**
	 * Initialization state.
	 * @var bool
	 */
	private static $initialized = false;

	/**
	 * Initialize version sync manager.
	 */
	public static function init() {
		if ( ! static::$initialized ) {
			add_filter( 'upgrader_pre_download', [ __CLASS__, 'call_subs' ], 10, 4 );
		}

		static::$initialized = true;
	}

	/**
	 * If supplied id is a subscriber.
	 *
	 * @param string $sub_id subscriber id
	 *
	 * @return bool is subscribed or not
	 */
	private static function is_subscribed( $sub_id ) {
		return isset( static::$subscribers[ $sub_id ] );
	}

	/**
	 * Get a subscriber.
	 *
	 * @param string $sub_id subscriber id
	 *
	 * @return object|null subscriber context or null if no subscriber is found
	 */
	private static function get_subscriber( $sub_id ) {
		$sub = null;

		if ( static::is_subscribed( $sub_id ) ) {
			$sub = static::$subscribers[ $sub_id ];
		}

		return $sub;
	}

	/**
	 * Call subscribers.
	 *
	 * Subscribers will be called at every time an update/downgrade package is started downloading through WordPress upgrader methods. This filter hook will be used as a short circuit to continue/stop current update process depending on values available and responses gathered from subscribers of the manager.
	 *
	 * @param bool $status status of download
	 * @param string $package package url
	 * @param Object $context upgrader class context
	 * @param array $hook_extra extra hook arguments
	 *
	 * @return bool status of download process
	 */
	public static function call_subs( $status, $package, $context, $hook_extra ) {
		$final_status = $status;
		if ( isset( $hook_extra['plugin'] ) ) {
			$slug = static::parse_slug_from_relative_path( $hook_extra['plugin'] );

			// only continue logic operations if slug of plugin that is currently being on install process is a subscribed one
			if ( static::is_subscribed( $slug ) ) {
				// get subscriber context of the addon currently in install process
				$active_sub = static::get_subscriber( $slug );

				if ( $active_sub !== null ) {
					$version = $active_sub->parse_version_from_package( $package );

					// filter subscriber array to get all subscribers except the one currently target of the install process
					$other_subs = array_filter( static::$subscribers, function ( $sub_id ) use ( $slug ) {
						return $sub_id !== $slug;

					}, ARRAY_FILTER_USE_KEY );

					$final_status = array_reduce( array_keys( $other_subs ), function ( $carry, $sub_id ) use ( $slug, $version, $other_subs ) {
						$sub_status = $other_subs[ $sub_id ]->version_sync_logic( $slug, $version );
						if ( is_wp_error( $sub_status ) ) {
							$carry = $sub_status;
						}

						return $carry;
					}, $final_status );
				}
			}
		}

		return $final_status;
	}

	/**
	 * Parse plugin slug from its relative path of entry file to plugin directory.
	 *
	 * @param string $relative_path relative path
	 *
	 * @return null|string slug or null if no slug found from path
	 */
	private static function parse_slug_from_relative_path( $relative_path ) {
		$match = [];
		preg_match( '/^.+\/(.+)\.php$/', $relative_path, $match );

		if ( isset( $match[1] ) ) {
			return $match[1];
		}

		return null;
	}

	/**
	 * Subscribe to version sync manager events.
	 *
	 * @param string $slug slug name
	 * @param Object $instance subscriber class instance
	 */
	public static function subscribe( $slug, $instance ) {
		if ( is_subclass_of( $instance, 'WP_Table_Builder\Inc\Admin\Base\Version_Sync_Base' ) ) {
			static::$subscribers[ $slug ] = $instance;
		}
	}
}
