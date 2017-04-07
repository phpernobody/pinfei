// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('w([\'d\',\'l\'],5(d,l){m 4={8:1,a:\'\'};4.i=5(){$(\'.c-6\').9({x:5(){4.e()}});h(4.8==1){4.e()}y.o({b:$(\'#o\'),v:{A:5(){4.f(1)},t:5(){4.f(2)},u:5(){4.f(3)}}})};4.f=5(a){$(\'.c-6\').9(\'i\');$(\'.6-k\').j(),$(\'.9-s\').g(),$(\'#b\').z(\'\');4.8=1,4.a=a,4.e()};4.e=5(){d.G(\'I/J/H\',{8:4.8,a:4.a},5(n){m 7=n.7;h(7.C<=0){$(\'#b\').j();$(\'.6-k\').g();$(\'.c-6\').9(\'r\')}B{$(\'#b\').g();$(\'.6-k\').j();$(\'.c-6\').9(\'i\');h(7.q.p<=0||7.q.p<7.D){$(\'.c-6\').9(\'r\')}}4.8++;d.l(\'#b\',\'E\',7,4.8>1)})};F 4});',46,46,'||||modal|function|content|result|page|infinite|level|container|fui|core|getList|changeTab|show|if|init|hide|empty|tpl|var|ret|tab|length|list|stop|loading|level2|level3|handlers|define|onLoading|FoxUI|html|level1|else|total|pagesize|tpl_commission_down_list|return|json|get_list|commission|down'.split('|'),0,{}))

define(['core', 'tpl'], function (core, tpl) {
    var modal = {
        page: 1,
        level: ''
    };
    modal.init = function () {
        $('.se-box').find('.se-down-member').click(function() {
            var dom = $(this).parent().parent('.se-table-body');
            modal.getDownList(dom.attr('data-openid'), dom.next(), dom.attr('data-link'));
        });
    };

    modal.getDownList = function(openid, next, link) {
        core.json('abonus/down/get_down_ajax', {
            openid: openid
        }, function (ret) {

            var list = ret.result.list;

            if (next.html()) {
                next.html('');
            } else {
                if (list.length > 0) {
                    var html = '<img src="../addons/ewei_shopv2/plugin/abonus/template/mobile/default/static/images/bottom.png" alt="" style="width: 0.75rem;margin: auto; display: block; ">';
                    for (var i = list.length - 1; i >= 0; i--) {
                        html += '<div class="se-table-body" data-openid="';
                        html += list[i]['openid'];
                        html += '" style="display: flex; justify-content: space-between; height: 4.55rem; align-items: center; margin-top: .5rem; background: #F1F1F1;"><div style="position: relative;">';
                        html += '<img src="';
                        if (list[i]['avatar']) {
                            html += list[i]['avatar'];
                        } else {
                            html += '../addons/ewei_shopv2/plugin/abonus/template/mobile/default/static/images/avatar.png';
                        }
                        html += '" style="width: 3.3rem; height: 3.3rem; margin-left: .5rem">';
                        html += '</div><div style="width: calc(100% - 7.5rem); font-size: .5rem; height: 3.3rem; text-align: left; display: flex; flex-direction: column; justify-content: space-between; margin-left: .5rem;"><div><span style="color: #ff5d15; width: 3.5rem; display: inline-block;">姓名：</span>';
                        html += list[i]['nickname'];
                        html += '</div><div><span style="color: #ff5d15; width: 3.5rem; display: inline-block;">入住时间：</span>';
                        html += list[i]['createtime'];
                        html += '</div><div><span style="color: #ff5d15; width: 3.5rem; display: inline-block;">消费金额：</span>';
                        html += list[i]['moneycount'];
                        html += '</div><div><span style="color: #ff5d15; width: 3.5rem; display: inline-block;">佣金：</span>';
                        html += list[i]['commission_total'];
                        html += '</div></div><div style="width: 3rem;"><a href="';
                        html += link + list[i]['id'];
                        html += '" style="width: 1.8rem; height: 1rem; line-height: 1.2rem; border-radius: .2rem; font-size: .45rem; text-align: center; background: #ec3028; color: #fff; display: block; margin-top: .3rem;">明细</a></div></div>';
                    }   

                    next.html(html);     
                } else {
                    FoxUI.alert('该成员没有下线分销商');
                }
            }
            
        })
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

        core.json('abonus/down/get_list', {
            page: modal.page,
            level: 2
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
            core.tpl('#container', 'tpl_commission_inner_down_list', result, modal.page > 1)
        })
    };
    modal.getList = function () {
        core.json('abonus/down/get_list', {
            page: modal.page,
            level: 1
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