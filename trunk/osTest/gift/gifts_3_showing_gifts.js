var givenGifts={};
var globalGiftList=['a cashew nut','a peanut','a hazelnut','a red pistachio nut'];

function updateGiftList(viewer, data, friends) {
	var json=null;
	if (data[viewer.getId()]) {
		json=data[viewer.getId()]['gifts'];
	}

	if (! json) {
		givenGifts={};
	}
	try {
		givenGifts=gadgets.json.parse(gadgets.util.unescapeString(json));
	} catch (e) {
		givenGifts={};
	}

	var html = new Array();
	html.push('You have given:');
	html.push('<ul>');
	html.push('here?');
	for (i in givenGifts) {
		if (i.hasOwnProperty) {
			html.push('<li>', friends.getById(i).getDisplayName(), ' received ', globalGiftList[givenGifts[i]], '</li>');
		}
	}
	html.push('</ul>');
	document.getElementById('given').innerHTML=html.join('');
}

function giveGift() {
	var nut=document.getElementById('nut').value;
	var friend=document.getElementById('person').value;

	givenGifts[friend]=nut;
	var json=gadgets.json.stringify(givenGifts);
	alert("giveGift 1?");
	var req=opensocial.newDataRequest();
	req.add(req.newUpdatePersonAppDataRequest("VIEWER", 'gifts', json));
	req.add(req.newFetchPersonRequest("VIEWER"), 'viewer');
	alert("giveGift 2?");
	var viewerFriends=opensocial.newIdSpec({"userId":"VIEWER","groupId":"FRIENDS"});
	var opt_params={};
	opt_params[opensocial.DataRequest.PeopleRequestFields.MAX]=100;
	req.add(req.newFetchPeopleRequest(viewerFriends, opt_params), 'viewerFriends');
	alert("giveGift 3?");
	var viewer=opensocial.newIdSpec({"userId":"VIEWER"});
	req.add(req.newFetchPersonAppDataRequest(viewer, 'gifts'), 'data');
	alert("giveGift 4?");
	req.send(onLoadFriends);
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

	var viewer=opensocial.newIdSpec({"userId":"VIEWER"});
	req.add(req.newFetchPersonAppDataRequest(viewer, 'gifts', opt_params), 'data');
	alert("刷新朋友列表");
	req.send(onLoadFriends);
}

function onLoadFriends(data) {
	var viewer=data.get('viewer').getData();
	var viewerFriends=data.get('viewerFriends').getData();
	var giftData=data.get('data').getData();

	html = new Array();
	html.push('<select id="person">');
	viewerFriends.each(function(person) {
	            if (person.getId()) {
	              html.push('<option value="', person.getId(), '">', person.getDisplayName(), '</option>');
	            }
	          });
	html.push('</select>');
	document.getElementById('friends').innerHTML=html.join('');

	updateGiftList(viewer, giftData, viewerFriends);
}

function init() {
	loadFriends();
	makeOptionsMenu();
}

gadgets.util.registerOnLoadHandler(init);