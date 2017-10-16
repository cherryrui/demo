/**
 * faye 对象数组排序
 * @param key 对象属性
 * @param desc false正序 true倒序
 * @returns {Function}
 */
let keySort = function(key, desc) {
    return function(a, b) {
        return desc ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
};
/**
 * faye 生成excel并下载
 * @param JSONData
 * @param ReportTitle
 * @param ShowLabel
 * @param attrs
 */
let json2pdf = function(JSONData, ReportTitle, ShowLabel, attrs) {
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = ReportTitle + escape('\r\n');
    if (ShowLabel) {
        var row = "";
        for (var index in arrData[0]) {
            for (let a in attrs) {
                if (index == a) {
                    row += attrs[a] + ',';
                }
            }
        }
        row = row.slice(0, -1);
        CSV += row + escape('\r\n');
    }
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        for (var index in arrData[i]) {
            for (let a in attrs) {
                if (index == a) {
                    row += '"' + arrData[i][index] + '",';
                }
            }
        }
        row.slice(0, row.length - 1);
        CSV += row + escape('\r\n');
    }
    if (CSV == '') {
        alert("Invalid data");
        return;
    }
    var fileName = ReportTitle.replace(/ /g, "_");
    var uri = 'data:text/pdf;charset=utf-8,' + CSV;
    var link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = fileName + ".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
/**
 * faye 数字转中文大些金额
 */
let digitUppercase = function(n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '负' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};
/**
 * faye 打印
 * @param text innerHtml
 */
let print = function(text) {
    let html = "<link rel='stylesheet' href='/css/bundle.css' /><link rel='stylesheet' href='/lib/antd.min.css' />" +
        "<link rel='stylesheet' href='/lib/print.css' media='print'/><style>.prePrint{display: block;float: right;}</style>" +
        "<div class='print' style='text-align: right;padding: 10px 52px 40px 0;'>" +
        "<button class='ant-btn ant-btn-primary prePrint print' onclick='window.print()'>打印</button></div>" + text;
    var printWindow = window.open();
    printWindow.document.write(html);
};

/***
 * faye 数字保留2位小数点并格式化
 */
let fmoney = function(money, digit) {
    money = parseFloat(money)
    money = money.toFixed(digit);
    if (null == money) {
        return "";
    }
    money = money + "";
    var array = money.split(".");
    var s = array[0];
    var r = "";
    var m = s.substring(0, 1);
    if ('-' == m) {
        s = s.substring(1);
    } else {
        m = "";
    }
    var f = s.split("").reverse();
    for (var i = 0; i < f.length; i++) {
        r += f[i] + ((i + 1) % 3 == 0 && (i + 1) != f.length ? "," : "");
    }
    var after = "";
    if (array.length > 1) {
        after = array[1];
        if (after.length > digit) {
            after = after.substring(0, digit);
        }
    }
    return m + r.split("").reverse().join("") + (array.length > 1 ? "." + after : "");
};
let url = "http://192.168.1.113";
export default {
    keySort: keySort,
    digitUppercase: digitUppercase,
    print: print,
    fmoney: fmoney,
    url: url,
};