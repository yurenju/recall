"use strict";angular.module("recallApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","lumx"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("recallApp").controller("MainCtrl",["$scope","$http",function(a,b){function c(a){if(!a)return"";for(var b=[],c=0;c<a.length;c++)b.push(a.charCodeAt(c)<=57&&a.charCodeAt(c)>=48?String.fromCharCode(a.charCodeAt(c)+65248):"");return b.join("")}a.selected={section:"無"},a.districts=["內湖區","南港區"],a.sections=["無","一","二","三","四","五","六","七","八","九","十"],b.get("scripts/stations.json").success(function(b){a.stations=b,a.stationNames=[],angular.forEach(b,function(b,c){a.stationNames.push(c)})}),a.search=function(){var d={tkTimes:"1",searchType:"doorplate",cityCode:"63000000"};d.areaCode="南港區"===a.selected.district?"63000090":"63000100",d.section="無"===a.selected.section?"":a.selected.section,d.street=a.selected.street,d.lane=c(a.selected.lane),d.alley=c(a.selected.alley),d.number=c(a.selected.number),b({method:"POST",url:"/proxy/doorplateX/doorplateQuery",headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:function(a){return angular.element.param(a)},data:{page:1,rows:20}}).success(function(c){d.tkt=c.tkt,b({method:"POST",url:"/proxy/doorplateX/doorplateQuery",headers:{"Content-Type":"application/x-www-form-urlencoded"},transformRequest:function(a){return angular.element.param(a)},data:d}).success(function(b){if(console.log(b),b.rows.length>0){var c=b.rows[0].address.match(/(..里)(\d+)鄰/);c&&(a.selected.village=c[1],a.selected.neighborhood=parseInt(c[2],10))}})})},a.$watch("selected.village + selected.neighborhood",function(){if(delete a.selected.station,a.stations){var b=a.stations[a.selected.village];b&&angular.forEach(b.stations,function(b){return 0===b.range.length?void(a.selected.station=b):void angular.forEach(b.range,function(c){return c===parseInt(a.selected.neighborhood)?void(a.selected.station=b):void 0})})}})}]).filter("encodeURIComponent",["$window",function(a){return a.encodeURIComponent}]);