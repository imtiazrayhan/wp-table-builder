<?php

namespace WP_Table_Builder\Inc\Frontend;

use WP_Table_Builder\Inc\Admin\Preview;

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @link       http://wptablebuilder.com/
 * @since      1.0.0
 *
 * @author    Imtiaz Rayhan
 */
class Frontend {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string $plugin_name The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string $version The current version of this plugin.
	 */
	private $version;

	/**
	 * The text domain of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string $plugin_text_domain The text domain of this plugin.
	 */
	private $plugin_text_domain;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @param string $plugin_name The name of this plugin.
	 * @param string $version The version of this plugin.
	 * @param string $plugin_text_domain The text domain of this plugin.
	 *
	 * @since       1.0.0
	 */
	public function __construct( $plugin_name, $version, $plugin_text_domain ) {

		$this->plugin_name        = $plugin_name;
		$this->version            = $version;
		$this->plugin_text_domain = $plugin_text_domain;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		add_action( 'wptb_frontend_enqueue_style', array( $this, 'unqueue_styles_start' ) );

	}

	public function unqueue_styles_start() {
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/wp-table-builder-frontend.css', array(), $this->version, 'all' );
	}

    /**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		add_action( 'wptb_frontend_enqueue_script', array( $this, 'unqueue_script_start' ) );
	}

	/**
	 * Enqueue scripts at custom plugin hook
	 */
	public function unqueue_script_start(  ) {
		wp_enqueue_script( 'event-catcher', plugin_dir_url( __FILE__ ) . 'js/wp-table-builder-event-catcher.js', array( 'jquery' ), $this->version, true );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/wp-table-builder-frontend.js', array( 'jquery' ), $this->version, true );
	}

	/**
	 * Enqueue header scripts.
	 */
	public function enqueue_header_scripts() {
		global $post;

		$includes_shortcode = Frontend::has_shortcode( $post );

		if ( $includes_shortcode ) {
			wp_enqueue_script( 'event-catcher', plugin_dir_url( __FILE__ ) . 'js/wp-table-builder-event-catcher.js', array( 'jquery' ), $this->version, true );
		}
	}

	/**
	 * Enqueue footer scripts.
	 */
	public function enqueue_footer_scripts() {
		global $post;

		$includes_shortcode = Frontend::has_shortcode( $post );

		if ( $includes_shortcode ) {
			wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/wp-table-builder-frontend.js', array( 'jquery' ), $this->version, true );
		}

	}

	/**
	 * Check if supplied post object has our shortcode.
	 *
	 * @param {object} $current_post post object
	 *
	 * @return bool whether post has the plugin shortcode or not
	 */
	public static function has_shortcode( $current_post ) {
		if ( $current_post !== null ) {
			$content = $current_post->post_content;

			if ( $content === null || $content === "" ) {
				return false;
			}

			// regexp test for checking current post content has the shortcode of our plugin
			return filter_var( preg_match( '/.*(\[wptb (.+)?\]).*/', $content ), FILTER_VALIDATE_BOOLEAN );
		}
	}
}
