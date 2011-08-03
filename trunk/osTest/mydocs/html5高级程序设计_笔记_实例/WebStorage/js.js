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