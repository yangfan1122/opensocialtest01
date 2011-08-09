var console = document.getElementById("console");//控制台输出
document.getElementById("clear").onclick = clear;//清空控制台

function test(str)
{
	console.innerHTML += str +"<br>---------------------<br>";
}
function clear()
{
	console.innerHTML = "";
}