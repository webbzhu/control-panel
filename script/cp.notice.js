(function() {
	if ($.DynaCP === undefined) {
		$.DynaCP = {};
	}
	$.DynaCP.Notice = {};
	var timeout, noticePopHtml = '<div id="cp-notice"></div>';

	$.DynaCP.Notice.createNotice = function(msg) {
		var popup = $('#cp-notice');
		if (popup.length == 0) {
			popup = $(noticePopHtml);
			popup.html(msg);
			$('body').append(popup);
			$('#cp-notice').animate({
				height : '48px'
			});
			timeout = setTimeout(removeNotice, 2000);
		} else {
			if (timeout !== undefined) {
				clearTimeout(timeout);
			}
			popup.html(msg);
			timeout = setTimeout(removeNotice, 2000);

		}
	}

	function removeNotice() {
		if ($('#cp-notice').length != 0) {
			$('#cp-notice').fadeOut(500, function() {
				$('#cp-notice').remove();
				timeout = undefined;
			});
		}
	}

})();