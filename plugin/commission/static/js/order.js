// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('A([\'c\',\'j\'],4(c,j){n 2={5:1,8:\'\'};2.d=4(){$(\'.a-6\').9({z:4(){2.e()}});f(2.5==1){2.e()}o.p({k:$(\'#p\'),y:{8:4(){2.b(\'\')},x:4(){2.b(0)},w:4(){2.b(1)},t:4(){2.b(3)}}})};2.b=4(8){$(\'.a-6\').9(\'d\');$(\'.6-i\').r(),$(\'.9-m\').q(),$(\'#k\').v(\'\');2.5=1,2.8=8,2.e()};2.m=4(){2.5++};2.e=4(){c.H(\'I/B/C\',{5:2.5,8:2.8},4(l){n 7=l.7;f(7.g.h<=0){$(\'.6-i\').q();$(\'.a-6\').9(\'s\')}D{$(\'.6-i\').r();$(\'.a-6\').9(\'d\');f(7.g.h<=0||7.g.h<7.G){$(\'.a-6\').9(\'s\')}}2.5++;c.j(\'#k\',\'E\',7,2.5>1);o.F.d()})};u 2});',45,45,'||modal||function|page|content|result|status|infinite|fui|changeTab|core|init|getList|if|list|length|empty|tpl|container|ret|loading|var|FoxUI|tab|show|hide|stop|status3|return|html|status1|status0|handlers|onLoading|define|order|get_list|else|tpl_commission_order_list|according|pagesize|json|commission'.split('|'),0,{}))


define(['core', 'tpl'], function (core, tpl) {
    var modal = {
        page: 1,
        status: ''
    };
    modal.init = function () {
        $('.fui-content').infinite({
            onLoading: function () {
                modal.getList()
            }
        });
        console.log('init' )
        if (modal.page == 1) {
            modal.getList()
        }
        FoxUI.tab({
            container: $('#tab'),
            handlers: {
                status: function () {
                    modal.changeTab('')
                },
                status0: function () {
                    modal.changeTab(0)
                },
                status1: function () {
                    modal.changeTab(1)
                },
                status3: function () {
                    modal.changeTab(3)
                }
            }
        })
    };
    modal.changeTab = function (status) {
        $('.fui-content').infinite('init');
        $('.content-empty').hide(),
        $('.infinite-loading').show(),
        $('#container').html('');
        modal.page = 1,
        modal.status = status,
        modal.getList()
    };
    modal.loading = function () {
        modal.page++
    };
    modal.getList = function () {
        // 获取url参数
        function getQueryString(name) {
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
          var r = window.location.search.substr(1).match(reg);
          if (r != null) return unescape(r[2]);
          return null;
        }

        var downid = getQueryString('downid');
        console.log(downid);

        var url = 'commission/order/get_list';
        if (downid) {
            url = 'commission/order/get_down_list';
        }

        core.json(url, {
            page: modal.page,
            status: modal.status,
            downid: downid
        }, function (ret) {
            console.log(ret.result);
            var result = ret.result;
            if (result.list.length <= 0) {
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
            core.tpl('#container', 'tpl_commission_order_list', result, modal.page > 1);
            // FoxUI.according.init()
        })

    };
    return modal
});