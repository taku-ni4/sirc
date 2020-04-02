// header height(scroll offset) for mobile
offset = 80;

$(function() {
	// show "page top" button
	var topBtn = $('#page-top');
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			if(!topBtn.hasClass("op-visible")) topBtn.addClass("op-visible");
		} else {
			if(topBtn.hasClass("op-visible")) topBtn.removeClass("op-visible");
		}
	});
	// when click "page top" button
	topBtn.click(function () {
	$('body,html').animate({
		scrollTop: 0
	}, 500);
	return false;
	});
});

// smoothScroll settings
$('a[href*="#"]').SmoothScroll({
	duration: 1000,
	easing  : 'easeOutQuint',
	offset	: offset
});

// when click accordion block
$(".d-block-accordion dt").click(function(){
	$(this).siblings(".d-block-accordion-description").slideToggle(300);
	if($(this).hasClass("d-open")){
		$(this).removeClass("d-open");
		$(this).parents("dl").removeClass("d-open");
	}else{
		$(this).addClass("d-open");
		$(this).parents("dl").addClass("d-open");
	}
});
//when click accordion process block
$(".d-block-process-accordion dt").click(function(){
	$(this).siblings(".d-block-process-description").slideToggle(300);
	if($(this).hasClass("d-open")){
		$(this).removeClass("d-open");
		$(this).parents("li").removeClass("d-open");
	}else{
		$(this).addClass("d-open");
		$(this).parents("li").addClass("d-open");
	}
});

// tree expansion
$(".jsTreeExpansion").click(function(){
	var parent = $(this).closest("li.op-contents-tree-item");
	var icon = $(parent).children(".op-contents-tree-item-outer").find(".jsTreeExpansionIcon")
	//child = $(this).closest("li.op-contents-tree-item").children("ul.op-contents-tree").children("li.op-contents-tree-item");
	var child = $(parent).children("ul.op-contents-tree").children("li.op-contents-tree-item");
	all_open_child =  $(this).closest("li.op-contents-tree-item").find(".d-open");

	//when already open
	if($(icon).hasClass("d-open")){
		//close child
		//$(child).removeClass("d-open");
		//close all children
		$(all_open_child).removeClass("d-open");
		$(icon).removeClass("d-open");
	}else{
		//open child
		$(child).addClass("d-open");
		//add class for arrow icon
		$(icon).addClass("d-open");
	}
});
// add cursor style for tree
$(".jsTreeExpansion").css("cursor","pointer");

/* --- for mobile --- */
show_tree = 0;
show_search = 0;
function setWindowOverlay(){
	window.scrollY = $(window).scrollTop();
	$("main").css('top',-window.scrollY + offset);
	$("main").addClass("op-window-overlay");
	$("body").addClass("c-fixed");
}
function delWindowOverlay(){
	$("main").removeClass("op-window-overlay");
	$("main").removeAttr("style");
	$(window).scrollTop(window.scrollY);
	$("body").removeClass("c-fixed");
}
function delOverlayVisible(){
	$(".op-overlay-menu-container").removeClass("op-visible");
	$(".op-overlay-menu-tree").removeClass("op-visible");
	$(".op-overlay-menu-search").removeClass("op-visible");
}
function openOverlay(content){
	switch(content){
		case "search":
			delOverlayVisible();
			setWindowOverlay();
			$(".op-overlay-menu-container").addClass("op-visible");
			$(".op-overlay-menu-search").addClass("op-visible");
			break;
		case "tree":
			delOverlayVisible();
			setWindowOverlay();
			$(".op-overlay-menu-container").addClass("op-visible");
			$(".op-overlay-menu-tree").addClass("op-visible");
			break;
	}
}
function closeOverlay(){
	delOverlayVisible();
	delWindowOverlay();
	show_search = 0;
	show_tree = 0;
}
// when click header "search"
$(".op-header-control-search").click(function(){
	if(!show_search){
		openOverlay("search")
		show_search = 1;
	}else{
		closeOverlay();
	}
});
// when click header "menu"
$(".op-header-control-nav").click(function(){
	if(!show_tree){
		openOverlay("tree")
		show_tree = 1;
	}else{
		closeOverlay();
	}
});
// when click out of overlay contents
$("main").click(function(){
	if($("main").hasClass("op-window-overlay")) closeOverlay();
});
// when window resize
$(window).resize(function(){
	closeOverlay();
});

