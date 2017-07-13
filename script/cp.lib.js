(function() {
	if ($.DynaCP === undefined) {
		$.DynaCP = {};
	}
	$.DynaCP.Lib = {};
	$.DynaCP.Lib.createFragment = function(htmlStr) {
		var frag = document.createDocumentFragment(), temp = document
				.createElement("div");
		temp.innerHTML = htmlStr;
		for (; temp.firstChild;)
			frag.appendChild(temp.firstChild);
		return frag
	}
})();