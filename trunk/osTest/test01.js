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
var viewer;// ���ͣ�opensocial.Person
var viewerFriends;// ���ͣ�opensocial.Collection


/* ��ʾ������Ϣ */
function showBasic() {
	/* ��ʾ VIEWER ���� */
	document.getElementById('test').innerHTML=viewer.getDisplayName();

	/* ��ʾ VIEWER ���������� */
	var html=new Array  ;
	viewerFriends.each(function(friend) {
	            html.push(friend.getDisplayName() + ", ");
	          });
	document.getElementById('friends').innerHTML=html.join('');
}



/* ���� Opensocial API ���� */
function reloadAll() {
	var req=new opensocial.DataRequest  ;
	req.add(req.newFetchPersonRequest('VIEWER'),'v');
	req.add(req.newFetchPeopleRequest('VIEWER_FRIENDS'),'vf');
	req.send(onReloadAll);
}



/* ���� Opensocial API ��Ӧ */
function onReloadAll(dataResponse) {
	/* ��ȡ���� */
	viewer=dataResponse.get('v').getData()||{};
	viewerFriends=dataResponse.get('vf').getData()||{};

	/* ��ʾ���� */
	showBasic();
}



/* Gadget ִ����� */
function init() {
	reloadAll();
}

gadgets.util.registerOnLoadHandler(init);

