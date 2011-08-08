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

/**
 *	写入数据
 */
function showDatabaseINSERT()
{
	db.transaction(function(tx)
		{
			tx.executeSql('CREATE TABLE IF NOT EXISTS racers (id integer primary key autoincrement, data)');
			/*
			for (var i = 0; i < arr.length; i++)
			{
				tx.executeSql('INSERT INTO racers (data) VALUES (?)', [arr[i]]);
			}
			*/
			tx.executeSql('INSERT INTO racers (data) VALUES (?)', [insert.value]);
			
			//doQuery();
		});
}

/**
 *	读
 */
function doQuery()
{
	db.transaction(function(tx)
		{
			tx.executeSql('SELECT * from racers', [], function(tx, result)
				{
					for (var i = 0; i < result.rows.length; i++)
					{
						var item = result.rows.item(i);
						test(item.id+":"+item.data);
					}
				});
		});
}

/**
 *	清空
 */
function clearDB()
{
	db.transaction(function(tx)
		{
			tx.executeSql('SELECT * from racers', [], function(tx, result)
				{
					for (var i = 0; i < result.rows.length; i++)
					{
						var item = result.rows.item(i);
						tx.executeSql('DELETE FROM racers');
					}
				});

		});
}

function insertHandler()
{
	arr.push(insert.value);
	showDatabaseINSERT();
}
function clearArrHandler()
{
	clearDB();
	arr=[];
}
function showHandler()
{
	doQuery();
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
 