function thisMovie(movieName) {
	if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
    } else {
             return document[movieName];
    }
}

function atoj(str){
	document.getElementById("test").innerHTML = str;
}

function jtoaHandler(){
	document.getElementById("test").innerHTML = "a <- j";
	thisMovie("swfId").jtoa("jsjsjsjsjsjs");
}



//Gadget
var viewer;// 类型：opensocial.Person
var viewerFriends;// 类型：opensocial.Collection


/* 显示基本信息 */
function showBasic() {
	/* 显示 VIEWER 名字 */
	document.getElementById('test').innerHTML=viewer.getDisplayName();

	/* 显示 VIEWER 的朋友名字 */
	var html=new Array  ;
	viewerFriends.each(function(friend) {
	            html.push(friend.getDisplayName() + ", ");
	          });
	document.getElementById('friends').innerHTML=html.join('');
}



/* 发送 Opensocial API 请求 */
function reloadAll() {
	var req=new opensocial.DataRequest  ;
	req.add(req.newFetchPersonRequest('VIEWER'),'v');
	req.add(req.newFetchPeopleRequest('VIEWER_FRIENDS'),'vf');
	req.send(onReloadAll);
}



/* 处理 Opensocial API 响应 */
function onReloadAll(dataResponse) {
	/* 获取数据 */
	viewer=dataResponse.get('v').getData()||{};
	viewerFriends=dataResponse.get('vf').getData()||{};

	/* 显示数据 */
	showBasic();
}



/* Gadget 执行入口 */
function init() {
	reloadAll();
}

gadgets.util.registerOnLoadHandler(init);

