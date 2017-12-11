/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
Template.home.rendered = function() {
	const w = new WOW().init();

	// TODO: End after home destroyed

	// make sure div stays full width/height on resize
	// global vars
	const winWidth = $(window).width();
	const winHeight = $(window).height();

	// set initial div height / width
	$("#intro").css({
	  width: winWidth,
	  height: winHeight
	});

	$(window).resize(() =>
	  $("#intro").css({
	    width: $(window).width(),
	    height: $(window).height()
	})
	);

	//Skroll doesn't work so well on mobile imo
	if (!Utils.isMobile) {
		const options = {
			forceHeight: false,
			smoothScrolling: false
		};

		return skrollr.init(options).refresh();
	}
};

Template.home.destroyed = () =>
	//For Skrollr
	$('body').attr('style','')
;