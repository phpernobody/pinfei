// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('w([\'d\',\'l\'],5(d,l){m 4={8:1,a:\'\'};4.i=5(){$(\'.c-6\').9({x:5(){4.e()}});h(4.8==1){4.e()}y.o({b:$(\'#o\'),v:{A:5(){4.f(1)},t:5(){4.f(2)},u:5(){4.f(3)}}})};4.f=5(a){$(\'.c-6\').9(\'i\');$(\'.6-k\').j(),$(\'.9-s\').g(),$(\'#b\').z(\'\');4.8=1,4.a=a,4.e()};4.e=5(){d.G(\'I/J/H\',{8:4.8,a:4.a},5(n){m 7=n.7;h(7.C<=0){$(\'#b\').j();$(\'.6-k\').g();$(\'.c-6\').9(\'r\')}B{$(\'#b\').g();$(\'.6-k\').j();$(\'.c-6\').9(\'i\');h(7.q.p<=0||7.q.p<7.D){$(\'.c-6\').9(\'r\')}}4.8++;d.l(\'#b\',\'E\',7,4.8>1)})};F 4});',46,46,'||||modal|function|content|result|page|infinite|level|container|fui|core|getList|changeTab|show|if|init|hide|empty|tpl|var|ret|tab|length|list|stop|loading|level2|level3|handlers|define|onLoading|FoxUI|html|level1|else|total|pagesize|tpl_commission_down_list|return|json|get_list|commission|down'.split('|'),0,{}))

define(['core', 'tpl'], function (core, tpl) {
    var modal = {
        page: 1,
        level: ''
    };
    modal.init = function () {
        $('.fui-content').infinite({
            onLoading: function () {
                modal.getList()
            }
        });
        if (modal.page == 1) {
            modal.getList()
        }
        FoxUI.tab({
            container: $('#tab'),
            handlers: {
                level1: function () {
                    modal.changeTab(1)
                },
                level2: function () {
                    // modal.changeTab(2)
                    modal.getAgentList();
                },
                level3: function () {
                    modal.changeTab(3)
                }
            }
        });

        $(document).on('click', '.change-tab', function() {
            modal.getAgentList();
        });
    };
    modal.changeTab = function (level, agentid) {
        $('.fui-content').infinite('init');
        $('.content-empty').hide(),
        $('.infinite-loading').show(),
        $('#container').html('');
        modal.page = 1,
        modal.level = level,
        modal.getList()
    };
    modal.getAgentList = function () {
        $('.fui-content').infinite('init');
        $('.content-empty').hide(),
        $('.infinite-loading').show(),
        $('#container').html('');

        core.json('commission/down/get_agent_list', {
            page: modal.page,
            level: modal.level
        }, function (ret) {
            var result = ret.result;

            if (result.total <= 0) {
                $('#container').hide();
                $('.content-empty').show();
                $('.fui-content').infinite('stop')
            } else {
                $('#container').show();
                $('.content-empty').hide();
                $('.fui-content').infinite('init');
                if (result.list.length <= 0 || result.list.length < result.pagesize) {
                    $('.fui-content').infinite('stop')
                }
            }
            modal.page++;
            console.log(result)
            result.disLevel = 2;
            core.tpl('#container', 'tpl_commission_down_list', result, modal.page > 1)
        })
    };
    modal.getList = function () {
        core.json('commission/down/get_list', {
            page: modal.page,
            level: modal.level
        }, function (ret) {
            var result = ret.result;

            if (result.total <= 0) {
                $('#container').hide();
                $('.content-empty').show();
                $('.fui-content').infinite('stop')
            } else {
                $('#container').show();
                $('.content-empty').hide();
                $('.fui-content').infinite('init');
                if (result.list.length <= 0 || result.list.length < result.pagesize) {
                    $('.fui-content').infinite('stop')
                }
            }
            modal.page++;
            result.disLevel = 1;
            core.tpl('#container', 'tpl_commission_down_list', result, modal.page > 1)
        })
    };
    return modal
});