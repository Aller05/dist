!function(t){t.module("app",["ui.router","ngTouch","infinite-scroll"]).controller("appController",["$scope","$location",function(e,o){document.body.addEventListener("touchstart",function(){}),e.title="往期内容",e.isNav=!1,e.loginIn=!1,e.click=function(t){e.title=t,e.isNav=!e.isNav,e.$broadcast("calltitle",{title:t})},e.$on("authortitle",function(t,o){e.title=o.title+"的主页"}),e.autoNav=function(){e.homeItem=document.getElementsByTagName("homelist").length>0?document.getElementsByTagName("homelist"):document.getElementsByClassName("author-list"),t.forEach(e.homeItem,function(t,o,a){t.addEventListener("click",function(){"tabbar"!=event.target.id&&e.isNav&&(e.isNav=!e.isNav,e.$apply(),event.stopPropagation())},!0)})},e.swipeRight=function(){"-1"!=o.url().indexOf("detail")?e.$broadcast("swipeBack"):(e.isNav=!e.isNav,e.autoNav())},e.swipeLeft=function(){e.isNav&&(e.isNav=!e.isNav)},e.nav=function(){e.isNav=!e.isNav,event.stopPropagation(),e.autoNav()}}])}(angular),function(t){t.module("app").config(["$sceDelegateProvider",function(t){t.resourceUrlWhitelist(["self","http://139.199.107.194:8088/**","http://127.0.0.1/api/**"])}])}(angular),function(t){t.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("app",{url:"/app",views:{home:{templateUrl:"view/home_tpl.html",controller:"homeController"},past:{templateUrl:"view/past_tpl.html",controller:"pastController"},author:{templateUrl:"view/author_tpl.html",controller:"authorController"},content:{},my:{}}}).state("app.home",{url:"/home",controller:[function(){window.scrollTo(0,0)}],template:"<homelist></homelist>"}).state("app.past",{url:"/past",controller:[function(){window.scrollTo(0,0)}],template:"<homelist></homelist>"}).state("app.detail",{url:"/detail/:index",controller:["$scope","$stateParams",function(t,e){t.listItem=t.homelist[e.index]}],template:"<detail></detail>"}).state("app.author",{url:"/author",template:"<authorlist></authorlist>"}).state("app.authordetail",{url:"/authordetail/:index",controller:["$scope","$stateParams","myHttp",function(t,e,o){t.$emit("authortitle",{title:t.authrolist[e.index].name}),t.isLoading=!0;var a={url:"http://139.199.107.194:8088/moment/author.php",method:"jsonp",params:{id:t.authrolist[e.index].uid}};o.getHttp(a,function(e){t.homelist=e.posts,t.authormsg=e.author,t.isLoading=!1},function(t){console.log(t)})}],template:"<homelist></homelist>"}),e.otherwise("app/past")}])}(angular),function(t){t.module("app").directive("authorlist",function(){return{restrict:"EA",templateUrl:"view/tpl/authorlist_tpl.html"}})}(angular),function(t){t.module("app").directive("detail",["$timeout","$window",function(t,e){return{restrict:"EA",template:'<div id="detail-content"  ng-class="{detailCss:isDetailCss}" ></div>',link:function(e,o,a){window.scrollTo(0,0),t(function(){e.isDetailCss=!1},1),o.html(e.listItem.content);for(var n=o.find("img"),i=1;i<n.length-1;i++){var l=e.fangdaolian+e.listItem.photos[i-1].small.url;n[i].setAttribute("src",l)}n[0].setAttribute("src",e.fangdaolian+e.listItem.author.avatar),n[n.length-1].setAttribute("src",e.fangdaolian+e.listItem.author.avatar)},replace:!0}}])}(angular),function(t){t.module("app").directive("homelist",function(){return{restrict:"EA",templateUrl:"view/tpl/homelist_tpl.html"}})}(angular),function(t){t.module("app").directive("login",["$timeout",function(t){return{restrict:"EA",templateUrl:"view/tpl/login_tpl.html",link:function(e,o,a){e.blur=function(o){t(function(){"user"==o?e.userblur=!1:e.passwordblur=!1},100)}}}}])}(angular),function(t){t.module("app").directive("nav",["$location","$timeout","$state",function(t,e,o){return{restrict:"EA",templateUrl:"view/tpl/nav_tpl.html",link:function(o,a,n){o.$on("calltitle",function(t,e){o.preTitleName=e.title}),a.find("a")[1].style.display="none",o.$location=t,o.$watch("$location.url()",function(t,e){"-1"!=t.indexOf("detail")&&(a.find("a")[0].style.display="none",a.find("a")[1].style.display="block")}),o.goBack=function(){a.find("a")[0].style.display="block",a.find("a")[1].style.display="none",e(function(){o.isDetailCss=!0},1),o.preTitleName&&(o.title=o.preTitleName),window.history.back()},o.$on("swipeBack",function(){o.goBack()})}}}])}(angular),function(t){t.module("app").directive("tabbar",function(){return{restrict:"EA",templateUrl:"view/tpl/tabbar_tpl.html"}})}(angular),function(t){t.module("app").controller("authorController",["$scope","myHttp",function(t,e){t.isLoading=!0,t.fangdaolian="http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=";var o={url:"http://139.199.107.194:8088/moment/authorlist.php",method:"jsonp",params:null};e.getHttp(o,function(e){t.authrolist=e.authors,t.isLoading=!1},function(t){console.log(t)})}])}(angular),function(t){t.module("app").controller("homeController",["$scope","myHttp",function(t,e){t.isLoading=!0,t.isDetailCss=!0,t.fangdaolian="http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=";var o={url:"http://139.199.107.194:8088/moment/homelist.php",method:"jsonp",params:null};e.getHttp(o,function(e){t.homelist=e.posts,t.isLoading=!1},function(t){console.log(t)})}])}(angular),function(t){t.module("app").controller("pastController",["$scope","myHttp","$location",function(t,e,o){t.pastnow=!0,t.fangdaolian="http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=";var a=1,n=new Date;t.homelist=[],t.pastData=function(){t.isLoading=!0;var o=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+(n.getDate()-a),i={url:"http://139.199.107.194:8088/moment/past.php",method:"jsonp",params:{index:o}};e.getHttp(i,function(e){e.posts[0].topdata=e.date;for(var o=0;o<e.posts.length;o++)t.homelist.push(e.posts[o]);console.log(t.homelist),t.isLoading=!1},function(t){console.log(t)})},t.pastData(),t.scrollaa=function(){"/app/past"!=o.url()||t.isLoading||(console.log(123),a++,t.pastData())}}])}(angular),function(t){t.module("app").service("myHttp",["$http",function(t){this.getHttp=function(e,o,a){if("post"==e.method){var n="";for(var i in e.params)n+=i+"="+e.params[i]+"&";n=n.slice(0,-1),t({url:e.url,method:e.method,headers:{"Content-Type":"application/x-www-form-urlencoded"},data:n}).then(function(t){o(t.data)}).catch(function(t){a(t)})}else"get"!=e.method&&"jsonp"!=e.method||t({url:e.url,method:e.method,params:e.params}).then(function(t){o(t.data)}).catch(function(t){a(t)})}}])}(angular);