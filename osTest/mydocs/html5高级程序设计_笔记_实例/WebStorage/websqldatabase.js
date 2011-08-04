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



//http://test1.myyule.com.cn:8089/template/yf/test/WebStorage/websqldatabase.html
var arr = [];
var insert;
var db = openDatabase('db', '1.0', 'my first database', 2 * 1024 * 1024);

function showDatabase()
{
	db.transaction(function(tx)
		{
			tx.executeSql('CREATE TABLE IF NOT EXISTS racers (id integer primary key autoincrement, name)');

			for (var i = 0; i < arr.length; i++)
			{
				tx.executeSql('INSERT INTO racers (name) VALUES (?)', [arr[i]]);
			}

			doQuery();
		});
}
function doQuery()
{
	db.transaction(function(tx)
		{
			tx.executeSql('SELECT * from racers', [], function(tx, result)
				{
					// log SQL result set
					for (var i = 0; i < result.rows.length; i++)
					{
						var item = result.rows.item(i);
						test(item.id+":"+item.name);
					}
				});
		});
}

function insertHandler()
{
	arr.push(insert.value);
	test(arr);
}
function clearArrHandler()
{
	arr=[];
	test(arr);
}
function showHandler()
{
	/*
	if(arr.length>0)
	{
		showDatabase();
	}
	else
	{
		alert("木有数据！");
	}
	*/
	
	showDatabase();
}

function loadDemo()
{
	document.getElementById("insert").onclick = insertHandler;
	document.getElementById("clearArr").onclick = clearArrHandler;
	document.getElementById("show").onclick = showHandler;
	
	document.getElementById("clear").onclick = clear;
	insert = document.getElementById("input");
}


if (window.addEventListener) 
{ 
	window.addEventListener("load", loadDemo, true);
} 
else 
{  
	window.attachEvent("load", loadDemo);  
}
 