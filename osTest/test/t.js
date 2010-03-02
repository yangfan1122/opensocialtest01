gadgets.util.registerOnLoadHandler(init);
document.getElementById("txt").innerHTML = "out put here~~";

function init() {
	requestMe();
}


//从容器请求社交信息
function requestMe() {
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest(opensocial.IdSpec.PersonId.VIEWER), "viewer");
  req.send(handleRequestMe);
};

function handleRequestMe(data) {
  var viewer = data.get("viewer");
  if (viewer.hadError()) {
    //Handle error using viewer.getError()...
	alert(viewer.getError());
    return;
  }

  //No error. Do something with viewer.getData()...
  alert("viewer.getData() = "+viewer.getData());
  doSomethingWithMyData(viewer.getData());
}

function doSomethingWithMyData(data) {
     alert("data = "+data);
}




