
/**
 * パラメータ取得
 *
 * @param {any} name
 * @param {any} url
 */
function getParameter(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 *正規表現用にエスケープ
 *
 * @param {any} str
 */
function escapeRegExp(str) {
    return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
}

/**
 * 検索
 *
 * @param {any} word
 * @param {any} index
 */
function getResult(word, index) {

    var data = index.filter(function (element) {
        //検索
        var regex = new RegExp(escapeRegExp(word), 'gm');
        return regex.test(element.Text);

    }).map(function (element, index, array) {
        //該当文字列とかの整形
        var target = "";
        var maxlength = element.Text.length;
        var match;
        var start;
        var end;
        var regex = new RegExp(escapeRegExp(word), 'gm');
        while (match = regex.exec(element.Text)) {
            //該当箇所の前後20文字を羅列する
            //切り出し開始位置
            start = match.index - 20;
            if (start < 0) {
                start = 0;
            }
            //切り出し終了位置
            end = match.index + word.length + 20;
            if (end > maxlength) {
                end = maxlength;
            }

            //開始文字
            if (start > 0) {
                target += "...";
            }

            //切り出し
            target += element.Text.substring(start, end);

            //終了文字
            if (end != maxlength) {
                target += "...";
            }

        }

        //強調表示
        element.Text = target.replace(regex, '<span class="op-search-highlite">$&</span>');

        return element;
    });


    var ret = {
        count: data.length,
        data: data
    };

    return ret;

}