// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('U([\'m\',\'l\'],5(m,l){v 2={3:\'\',r:\'\',4:\'\',a:p n,o:p n,h:p n,};2.T=5(3,r){2.3=3;2.r=r;m.l(\'#E\',\'K\',2.3,A);$("#D F").k(5(e){$(6).Z().11("H");$(6).Y("H");v 8={};9($(6).7("b")){$(\'#C\').B(\'b\',$(6).7(\'b\'))}$("#P").10("x",$(6).7("x"));9($(6).7("3")==\'u\'){2.o=p n;2.h=p n;2.I();8.u=1}X{2.J($(6).7("3"));8.u=0}8.4=2.4;8.o=2.o;8.a=2.a;8.h=2.h;m.l(\'#E\',\'K\',8,A);2.G()});$("#D F[7-3=u]").k()};2.J=5(M){2.4=2.3.4[M];9(16(2.4)!=\'j\'){$.i(2.4,5(R,t){2.w(t.c)})}s 2.4};2.I=5(){$.i(2.3.1a[0],5(12,y){9(2.3.4[y.c]!=j){$.i(2.3.4[y.c],5(19,f){9(f.O==1){2.o.Q(f)}9(2.3.a[f.c]!=j){$.i(2.3.a[f.c],5(17,z){9(z.O==1){2.h.Q(z)}})}})}})};2.14=5(d){9(2.3.4[d]!=j){2.4[d]=2.3.4[d];$.i(2.4[d],5(R,t){2.w(t.c)});s 2.4[d]}};2.w=5(g){9(2.3.a[g]!=j){2.a[g]=2.3.a[g];s 2.a[g]}};2.G=5(){$(".S").k(5(){v 8={};$("#C").15();9($(6).7("b")!=\'\'){$("#C").B("b",$(6).7("b")).S()}$("#P").B("x",$(6).7("x"));8.q=$(6).7("q");8.4=2.w($(6).7("4"));m.l(\'#E\',\'18\',8,A);2.N()})};2.N=5(){$(".W-V-13.L").k(5(){v q=$(6).7(\'L\');$("#D F[7-3="+q+"]").k()})};s 2});',62,73,'||modal|cate|children|function|this|data|result|if|grandchildren|src|id|parentid||citem|childrenid|recommend_grandchildren|each|undefined|click|tpl|core|Array|recommend_children|new|pid|cateset|return|item|recommend|var|get_grandchildren|href|pitem|gitem|false|attr|advimg|tab|container|nav|click_grandchildren|on|get_recommend|get_category|tpl_shop_category_list|prev|cateid|click_prev|isrecommand|advurl|push|index|show|init|define|icon|fui|else|addClass|siblings|prop|removeClass|pindex|col|get_children|hide|typeof|gindex|tpl_shop_category_show_list|cindex|parent'.split('|'),0,{}))

define(['core', 'tpl'], function (core, tpl) {
    var modal = {
        cate: '',
        cateset: '',
        children: '',
        grandchildren: new Array,
        recommend_children: new Array,
        recommend_grandchildren: new Array,
        activecate: ''
    };
    modal.getQueryString = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
    modal.init = function (cate, cateset) {
        modal.cate = cate;
        modal.cateset = cateset;
        core.tpl('#container', 'tpl_shop_category_list', modal.cate, false);
        $("#tab nav").click(function (e) {
            modal.activecate = $(this).attr('data-cate');

            if (modal.getQueryString('cate')) {
                // window.location.href = window.location.href.split('mid=')[0] + 'mid=' + modal.activecate;
                window.history.replaceState(window.history.state, '', window.location.href.split('cate=')[0] + 'cate=' + modal.activecate);
            } else {
                // window.location.href = window.location.href + '&mid=' + modal.activecate;
                window.history.replaceState(window.history.state, '', window.location.href + '&cate=' + modal.activecate);
            }
// console.log(window.history)
            

            console.log('activecate', modal.activecate)
            $(this).siblings().removeClass("on");
            $(this).addClass("on");
            var result = {};
            if ($(this).data("src")) {
                $('#advimg').attr('src', $(this).data('src'))
            }
            $("#advurl").prop("href", $(this).data("href"));
            if ($(this).data("cate") == 'recommend') {
                modal.recommend_children = new Array;
                modal.recommend_grandchildren = new Array;
                modal.get_recommend();
                result.recommend = 1
            } else {
                modal.get_category($(this).data("cate"));
                result.recommend = 0
            }
            result.children = modal.children;
            result.recommend_children = modal.recommend_children;
            result.grandchildren = modal.grandchildren;
            result.recommend_grandchildren = modal.recommend_grandchildren;
            core.tpl('#container', 'tpl_shop_category_list', result, false);
            modal.click_grandchildren()
        });

        var cate = '';

        if (modal.activecate && modal.activecate !== '')
        {
            cate = modal.activecate;
        } else {
            cate = modal.getQueryString('cate');
console.log(cate)
            if (!cate) {
                cate = 'recommend';
            }
        }    

        $("#tab nav[data-cate=" + cate + "]").click()
    };
    modal.get_category = function (cateid) {
        modal.children = modal.cate.children[cateid];
        if (typeof(modal.children) != 'undefined') {
            $.each(modal.children, function (index, item) {
                modal.get_grandchildren(item.id)
            })
        }
        return modal.children
    };
    modal.get_recommend = function () {
        $.each(modal.cate.parent[0], function (pindex, pitem) {
            if (modal.cate.children[pitem.id] != undefined) {
                $.each(modal.cate.children[pitem.id], function (cindex, citem) {
                    if (citem.isrecommand == 1) {
                        modal.recommend_children.push(citem)
                    }
                    if (modal.cate.grandchildren[citem.id] != undefined) {
                        $.each(modal.cate.grandchildren[citem.id], function (gindex, gitem) {
                            if (gitem.isrecommand == 1) {
                                modal.recommend_grandchildren.push(gitem)
                            }
                        })
                    }
                })
            }
        })
    };
    modal.get_children = function (parentid) {
        if (modal.cate.children[parentid] != undefined) {
            modal.children[parentid] = modal.cate.children[parentid];
            $.each(modal.children[parentid], function (index, item) {
                modal.get_grandchildren(item.id)
            });
            return modal.children[parentid]
        }
    };
    modal.get_grandchildren = function (childrenid) {
        if (modal.cate.grandchildren[childrenid] != undefined) {
            modal.grandchildren[childrenid] = modal.cate.grandchildren[childrenid];
            return modal.grandchildren[childrenid]
        }
    };
    modal.click_grandchildren = function () {
        $(".show").click(function () {
            var result = {};
            $("#advimg").hide();
            if ($(this).data("src") != '') {
                $("#advimg").attr("src", $(this).data("src")).show()
            }
            $("#advurl").attr("href", $(this).data("href"));
            result.pid = $(this).data("pid");
            result.children = modal.get_grandchildren($(this).data("children"));
            core.tpl('#container', 'tpl_shop_category_show_list', result, false);
            modal.click_prev()
        })
    };
    modal.click_prev = function () {
        $(".fui-icon-col.prev").click(function () {
            var pid = $(this).data('prev');
            $("#tab nav[data-cate=" + pid + "]").click()
        })
    };
    return modal
});