//公用方法

/**
 * 测试输出
 * @param	s
 */
function test(s)
{
	document.getElementById("console").innerHTML += s+"<br>-------------<br>"
}


/**
 * 清理console
 * @param
 */
function clear()
{
	document.getElementById("console").innerHTML = "";
}







// http://test1.myyule.com.cn:8089/template/yf/test/WebStorage/storagedemo1.html
var keyName = "setInputKey";
var input;

function init()
{
	document.getElementById("sessionGetBtn").onclick = sessionGetBtnHandler;
	document.getElementById("sessionSetBtn").onclick = sessionSetBtnHandler;

	document.getElementById("localGetBtn").onclick = localGetBtnHandler;
	document.getElementById("localSetBtn").onclick = localSetBtnHandler;

	document.getElementById("delBtn").onclick = delBtnHandler;
	document.getElementById("clearBtn").onclick = clearBtnHandler;


	document.getElementById("clear").onclick = clear;
	input = document.getElementById("setInput");

	//更新storage后的通信
	window.addEventListener("storage", displayStorageEvent, true);//？触发不到
}

function displayStorageEvent(e)
{
	var str = "key:"+e.key+", newValue:"+e.newValue+", oldValue:"+oldValue+", url:"+e.url+", storageArea:"+e.storageArea;
	test("更新 - "+str);
}

//session
function sessionGetBtnHandler()
{
	test("from sessionStorage: "+window.sessionStorage.getItem(keyName));
	//test(window.sessionStorage.keyName);//ff chromium各种失败
}
function sessionSetBtnHandler()
{
	window.sessionStorage.setItem(keyName, input.value);
	//window.sessionStorage.keyName = input.value;
}

//local
function localGetBtnHandler()
{
	test("from localStorage: "+window.localStorage.getItem(keyName));
}
function localSetBtnHandler()
{
	window.localStorage.setItem(keyName, input.value);
}

//del
function delBtnHandler()
{
	window.sessionStorage.removeItem(keyName);
	window.localStorage.removeItem(keyName);
}
function clearBtnHandler()
{
	window.sessionStorage.clear();
	window.localStorage.clear();
}



function loadDemo()
{
	if (window.sessionStorage && window.localStorage)
	{
		init();
	}
	else
	{
		alert("换个浏览器吧~ ff opera safari chrome都行~~");
	}
}

//ie8不支持window.addEventListener
if (window.addEventListener) 
{ 
	window.addEventListener("load", loadDemo, true);
} 
else 
{  
	window.attachEvent("load", loadDemo);  
}
 
