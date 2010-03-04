function loadFriends() {
	var req=opensocial.newDataRequest();
	req.add(req.newFetchPersonRequest(opensocial.IdSpec.PersonId.VIEWER), 'viewer');

	var viewerFriends=opensocial.newIdSpec({"userId":"VIEWER","groupId":"FRIENDS"});
	var opt_params={};
	opt_params[opensocial.DataRequest.PeopleRequestFields.MAX]=100;
	req.add(req.newFetchPeopleRequest(viewerFriends, opt_params), 'viewerFriends');

	req.send(onLoadFriends);
}

function onLoadFriends(data) {
	var viewer=data.get('viewer').getData();
	var viewerFriends=data.get('viewerFriends').getData();

	html = new Array();
	html.push('<ul>');
	viewerFriends.each(function(person) {
	            if (person.getId()) {
	              html.push('<li>', person.getDisplayName(), '</li>');
	            }
	          });
	html.push('</ul>');
	alert("viewer.getDisplayName() = "+viewer.getDisplayName());
	document.getElementById('friends').innerHTML=html.join('');
	gadgets.window.adjustHeight();
}

function init() {
	loadFriends();
}

gadgets.util.registerOnLoadHandler(init);