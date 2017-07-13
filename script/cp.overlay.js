(function () {
    if ($.DynaCP === undefined) {
        $.DynaCP = {};
    }
    if(!supportPromise()){
    	ES6Promise.polyfill();
    }
    if ($.DynaCP.parseJson === undefined) {
        $.DynaCP.parseJson = function (json) {
            return new Promise(function (resolve, reject) {
                try {
                    resolve($.parseJSON(json))
                } catch (e) {
                    reject(e)
                }
            })
        }
    }
    $.DynaCP.Overlay = {};

    function supportPromise() {
    	return window.Promise && window.fetch;
    }

    function closeOverlay() {
        if ($('#cp-overlay').length !== 0) {
            $('#cp-overlay').fadeOut(500, function () {
                $('#cp-overlay').remove();
            });
        }
    }
    
    $.DynaCP.Overlay.createOverlayError = function (err_msg){
    	var overlay = $('#cp-overlay');
    	if(overlay.length > 0){
    		var overlay_error = overlay.find('.cp-overlay-error');
    		if(overlay_error.length > 0){
    			overlay_error.html(err_msg);
    		}else{
    			var overlay_header = overlay.find('.cp-overlay-header');
    			if(overlay_header.length > 0){
    				overlay_error = $('<div class="cp-overlay-error">'+err_msg+'</div>');
    				overlay_error.insertAfter(overlay_header);
    			}
    		}
    	}
    }

    $.DynaCP.Overlay.createOverlay = function (content, init) {
        closeOverlay();
        var overlay = $('<div id="cp-overlay"></div>'), logoRow = $('<div id="cp-overlay-logo"><img src="/tc/navbar-logo.png"></div>');
        var wrap = $('<div id="cp-overlay-content-wrap"></div>'), close = $('<div id="cp-overlay-close"><span class="fa fa-close"></span></div>');
        wrap.html(content);
        overlay.append(logoRow);
        overlay.append(wrap);
        overlay.append(close);
        $('body').append(overlay);
        $('#cp-overlay-close').click(function () {
            closeOverlay();
        });
        init();
        $('#cp-overlay').fadeIn(500);
    }

    $.DynaCP.Overlay.closeOverlay = function () {
        closeOverlay();
    }

})();