$(function(){
	// ツリーをスマホ用レフトメニューにコピー
	$(".op-contents-left").clone(true).appendTo($(".op-overlay-menu-tree"));
	// 検索フォームをスマホ用レフトメニューにコピー
	$(".op-header-search").clone(true).appendTo($(".op-overlay-menu-search"));
});