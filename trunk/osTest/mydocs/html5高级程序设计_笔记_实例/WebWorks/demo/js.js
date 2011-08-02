/**
 * 公用方法
 */

/**
 * 获取时间
 * @param
 */
function getTime()
{
	var date = new Date();
	return date.getTime();
}


/**
 * 判断是否为数字
 * @param	s
 */
function IsNum(s)
{
    if (s!=null && s!="")
    {
        return !isNaN(s);
    }
    return false;
}


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