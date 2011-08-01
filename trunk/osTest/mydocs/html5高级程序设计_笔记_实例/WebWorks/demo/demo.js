function messageHandler(e)
{
	var _eNum = e.data;
	if(IsNum(_eNum))
	{
		postMessage("worker says: " + counter(_eNum));
	}
}

/**
 * 计算
 * @param	_num
 */
function counter(_num)
{
	var temp=0;
	while(_num)
	{
		temp += --_num;
	}
	return temp;
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


addEventListener("message", messageHandler, true);
