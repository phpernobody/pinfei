// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('P([\'n\',\'o\',\'O/B/l\'],7(n,o,l){G 6={b:1,8:\'\',g:0};6.h=7(q){6.8=q.8;6.g=q.g;l.h();i(!6.F){6.b=1}r{6.F=Q}6.k();$(\'.d-9\').f({R:7(){6.k()}});$(\'.s-p\').z(7(){$(\'.d-j-M a\').S(\'U\');6.c(5)});L.j({m:$(\'#j\'),J:{j:7(){6.c(\'\')},I:7(){6.c(0)},H:7(){6.c(1)},T:7(){6.c(2)},15:7(){6.c(3)},14:7(){6.c(4)}}});$(".m .d-u").z(7(){6.13=V})};6.c=7(8){i(8==5){$(\'.s-p\').x(\'A\',\'11\')}r{$(\'.s-p\').x(\'A\',\'#12\')}$(\'.d-9\').f(\'h\');$(\'.9-t\').C(),$(\'.m\').X(\'\'),$(\'.f-v\').E();6.b=1,6.8=8,6.k()};6.v=7(){6.b++};6.k=7(){n.W(\'B/Y\',{b:6.b,8:6.8,g:6.g},7(D){G e=D.e;i(e.10<=0){$(\'.9-t\').E();$(\'.d-9\').f(\'y\')}r{$(\'.9-t\').C();$(\'.d-9\').f(\'h\');i(e.u.w<=0||e.u.w<e.N){$(\'.d-9\').f(\'y\')}}6.b++;n.o(\'.m\',\'Z\',e,6.b>1);l.h()})};K 6});',62,68,'||||||modal|function|status|content||page|changeTab|fui|result|infinite|merchid|init|if|tab|getList|op|container|core|tpl|delete|params|else|icon|empty|list|loading|length|css|stop|click|color|order|hide|ret|show|toOrder|var|tab1|tab0|handlers|return|FoxUI|danger|pagesize|biz|define|false|onLoading|removeClass|tab2|active|true|json|html|get_list|tpl_order_index_list|total|red|999|toGoods|tab4|tab3'.split('|'),0,{}))


define(['core', 'tpl', 'biz/order/op'], function (core, tpl, op) {
    var modal = {
        page: 1,
        status: '',
        merchid: 0
    };
    modal.init = function (params) {
        modal.status = params.status;
        modal.merchid = params.merchid;
        op.init();
        if (!modal.toOrder) {
            modal.page = 1
        } else {
            modal.toOrder = false
        }
        modal.getList();
        $('.fui-content').infinite({
            onLoading: function () {
                modal.getList()
            }
        });
        $('.icon-delete').click(function () {
            $('.fui-tab-danger a').removeClass('active');
            modal.changeTab(5)
        });
        FoxUI.tab({
            container: $('#tab'),
            handlers: {
                tab: function () {
                    modal.changeTab('')
                },
                tab0: function () {
                    modal.changeTab(0)
                },
                tab1: function () {
                    modal.changeTab(1)
                },
                tab2: function () {
                    modal.changeTab(2)
                },
                tab3: function () {
                    modal.changeTab(3)
                },
                tab4: function () {
                    modal.changeTab(4)
                }
            }
        });
        $(".container .fui-list").click(function () {
            modal.toGoods = true
        })
    };
    modal.changeTab = function (status) {
        if (status == 5) {
            $('.icon-delete').css('color', 'red')
        } else {
            $('.icon-delete').css('color', '#999')
        }
        $('.fui-content').infinite('init');
        $('.content-empty').hide(),
        $('.container').html(''),
        $('.infinite-loading').show();
        modal.page = 1,
        modal.status = status,
        modal.getList()
    };
    modal.loading = function () {
        modal.page++
    };
    modal.getList = function () {
        core.json('abonus/order/get_list', {
            page: modal.page,
            status: modal.status,
            merchid: modal.merchid
        }, function (ret) {
            var result = ret.result;
            if (result.total <= 0) {
                $('.content-empty').show();
                $('.fui-content').infinite('stop')
            } else {
                $('.content-empty').hide();
                $('.fui-content').infinite('init');
                if (result.list.length <= 0 || result.list.length < result.pagesize) {
                    $('.fui-content').infinite('stop')
                }
            }
            modal.page++;
            core.tpl('.container', 'tpl_order_index_list', result, modal.page > 1);
            op.init()
        })
    };
    return modal
});