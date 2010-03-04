var givenGifts={};
var globalGiftList=['a cashew nut','a peanut','a hazelnut','a red pistachio nut'];

function giveGift() {
	var nut=document.getElementById('nut').value;//已选中的option的值   礼物序号
	var friend=document.getElementById('person').value;
	//alert("friend="+friend+" , nut="+nut);
	givenGifts[friend]=nut;// 人id, 礼物序号
	var json=gadgets.json.stringify(givenGifts);//将 JavaScript 值转换为 JSON 字符串。 

	var req=opensocial.newDataRequest();
	req.add(req.newUpdatePersonAppDataRequest("VIEWER", 'gifts', json));//newUpdatePersonAppDataRequest 创建项目以请求更新指定用户的应用程序域。处理后，不返回任何数据。
	req.send();
}

function makeOptionsMenu() {
	var html = new Array();
	html.push('<select id="nut">');
	for (var i = 0; i < globalGiftList.length; i++) {
		html.push('<option value="', i, '">', globalGiftList[i], '</option>');
	}
	html.push('</select>');
	document.getElementById('gifts').innerHTML=html.join('');
}

function loadFriends() {
	var req=opensocial.newDataRequest();
	req.add(req.newFetchPersonRequest("VIEWER"), 'viewer');

	var viewerFriends=opensocial.newIdSpec({"userId":"VIEWER","groupId":"FRIENDS"});
	var opt_params={};
	opt_params[opensocial.DataRequest.PeopleRequestFields.MAX]=100;
	req.add(req.newFetchPeopleRequest(viewerFriends, opt_params), 'viewerFriends');

	req.send(onLoadFriends);
}

function onLoadFriends(data) {//朋友列表
	var viewer=data.get('viewer').getData();
	var viewerFriends=data.get('viewerFriends').getData();

	html = new Array();
	html.push('<select id="person">');
	viewerFriends.each(function(person) {
	            if (person.getId()) {
	              html.push('<option value="', person.getId(), '">', person.getDisplayName(), '</option>');
	            }
	          });
	html.push('</select>');
	document.getElementById('friends').innerHTML=html.join('');
}

function init() {
	loadFriends();
	makeOptionsMenu();
}

gadgets.util.registerOnLoadHandler(init);