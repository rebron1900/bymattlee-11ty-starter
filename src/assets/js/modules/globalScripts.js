/* ***** ----------------------------------------------- ***** **
** ***** Global Scripts JS
** ***** ----------------------------------------------- ***** */

/* global jQuery, Main, Modernizr */
(function($){
	'use strict';

	Main.modules.globalScripts = function() {

		var $body = $('body'),
			upgradeMessage = '<div class="c-upgrade_browser_message"><a href="http://outdatedbrowser.com/" class="c-upgrade_browser_message-link" target="_blank">For a better experience, please upgrade your browser to the latest version. Click here upgrade.</a></div>',

			modernizrCheck = function() {

				// Display message for user to upgrade if browser does not support flexbox
				if (Modernizr['flexbox'] == false
					|| Modernizr['flexwrap'] == false) {
					$body.append(upgradeMessage);
				}

			};

		return {
			init: function() {
				modernizrCheck();
			}
		}
		
	};

})(jQuery);