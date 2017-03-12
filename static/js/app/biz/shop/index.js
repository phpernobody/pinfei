// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('O([\'h\',\'r\',\'N/e/j\'],4(h,r,j){3 2={8:1,b:0};2.I=4(C){2.b=C.b||0;6(P(G.u)!==\'Q\'){j.M(G.u)}6(!2.q){2.8=1}f{2.q=t}2.n();2.o();$(\'.5-g\').i({R:4(){2.n()}})};2.o=4(){$("a").s(4(){2.q=x});$(\'.S\').L(\'s\').s(4(){3 d=$(A).J(\'.5-e-E\').B(\'d\');3 m=$(A).J(\'.5-e-E\').B(\'m\');6(m==V){11.12=h.l(\'e/13\',{14:d})}f{j.Z({d:d,y:1})}})};2.l=4(){3 9=\'\';6(2.b==0){9=\'w\'}f{9=\'10/w\'}p 9};3 k=t;2.n=4(){6(k){p}k=x;3 9=2.l();3 v={8:2.8,b:2.b};h.T(9,v,4(H){3 7=H.7;6(7.y<=0){$(\'.5-g\').i(\'z\');$(\'.5-g\').U()}f{$(\'.5-g\').i(\'I\');6(7.K.F<=0||7.K.F<7.W){$(\'.5-g\').i(\'z\')}6(7.8==1){3 c="#D"}f{3 c="#D .5-e-X"}2.8++;h.r(c,\'Y\',7,2.8>1);2.o();k=t}})};p 2});',62,67,'||modal|var|function|fui|if|result|page|url||merchid||goodsid|goods|else|content|core|infinite|picker|isloading|getUrl|type|getList|bindEvents|return|toGoods|tpl|click|false|cartcount|param|get_recommand|true|total|stop|this|data|args|recommand|item|length|window|ret|init|closest|list|unbind|changeCartcount|biz|define|typeof|undefined|onLoading|buy|json|lazyload|20|pagesize|group|tpl_recommand|open|merch|location|href|detail|id'.split('|'),0,{}))

define(['core', 'tpl', 'biz/goods/picker'], function (core, tpl, picker) {
    var modal = {
        page: 1,
        merchid: 0
    };
    modal.init = function (args) {
        modal.merchid = args.merchid || 0;
        if (typeof(window.cartcount) !== 'undefined') {
            picker.changeCartcount(window.cartcount)
        }
        if (!modal.toGoods) {
            modal.page = 1
        } else {
            modal.toGoods = false
        }
        modal.getList();
        modal.bindEvents();
        $('.fui-content').infinite({
            onLoading: function () {
                modal.getList()
            }
        })
    };
    modal.bindEvents = function () {
        $("a").click(function () {
            modal.toGoods = true
        });
        $('.buy').unbind('click').click(function () {
            var goodsid = $(this).closest('.fui-goods-item').data('goodsid');
            var type = $(this).closest('.fui-goods-item').data('type');
            if (type == 20) {
                location.href = core.getUrl('goods/detail', {
                    id: goodsid
                })
            } else {
                picker.open({
                    goodsid: goodsid,
                    total: 1
                })
            }
        });

        $('.se-shoppe').click(function() {
        	var url = $(this).attr('data-url');
        	console.log($(this).attr('data-url'))
        	window.location.href = url;
        });
    };
    modal.getUrl = function () {
        var url = '';
        if (modal.merchid == 0) {
            url = 'get_recommand'
        } else {
            url = 'merch/get_recommand'
        }
        return url
    };
    var isloading = false;
    modal.getList = function () {
        if (isloading) {
            return
        }
        isloading = true;
        var url = modal.getUrl();
        var param = {
            page: modal.page,
            merchid: modal.merchid
        };
        core.json(url, param, function (ret) {
            var result = ret.result;
            if (result.total <= 0) {
                $('.fui-content').infinite('stop');
                $('.fui-content').lazyload()
            } else {
                $('.fui-content').infinite('init');
                if (result.list.length <= 0 || result.list.length < result.pagesize) {
                    $('.fui-content').infinite('stop')
                }
                if (result.page == 1) {
                    var c = "#recommand"
                } else {
                    var c = "#recommand .fui-goods-group"
                }
                modal.page++;
                core.tpl(c, 'tpl_recommand', result, modal.page > 1);
                modal.bindEvents();
                isloading = false
            }
        })
    };
    return modal
});