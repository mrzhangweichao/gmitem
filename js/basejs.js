/*1.由于通过类名class和name属性获取DOM对象有兼容性的问题，以下可以封装一个函数*/
function getByClass(classname){
	var allItems=document.getElementByTagName("*");
	var result = [];
	for(var i=0;i<allItems.length;i++){
		var cn = allItems[i].className;
		var arr = cn.split(" ");
		for(var j=0;j<arr.length;j++){
			if(arr[j] === classname){
				result.push(allItems[i]);
				break;
			}
		}
	}
	return result;
}
//console.log(getByClass("test3"));

/*2.获取div的某些样式  封装一个函数;获取div的某些样式;存在兼容(IE中是currentStyle；现代浏览器中是getComputedStyle);*/
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	return getComputedStyle(obj,null)[attr];
}


/*3.添加事件监听器封装兼容函数*/
function addEvent(obj,type,fun){
	//考虑相同点；
	//事件名称(type)，处理函数(fun) 都可能不同  用形参表示；
	//不同点是写法不同；
	if(obj.addEventListener){
		obj.addEventListener(type,fun,false);
	}else{
		obj.attachEvent("on"+type,fun);
	}
}
/*4.移除事件监听器封装兼容函数*/
//obj为事件对象；
function removeEvent(obj,type,fun){
	if(obj.removeEventListener){
		obj.removeEventListener(type,fun);
	}else{
		obj.datachEvent("on"+type,fun);
	}
}

/*5.封装cookie*/
//保存一个数据；name表示cookie名，value表示cookie值，day表示天数；
function setCookie(name,value,day){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+day);
	document.cookie = name + "=" + value + ";expires=" + oDate;
}

//获取；cookie名为**的cookie值；
function getCookie(name){
	var strCookie = document.cookie;//获取的存储的cookie是字符串；（strCookie就是：name=zhang; oge=20; sex=man;中间有;和空格)；
	//需要对字符串进行分割(; )；//分号加空格；
	var arrCookie = strCookie.split("; ")//转化为数组；
	for(var i=0;i<arrCookie.length;i++){
		//把数组中的每一项以“=”分割，判断形参和分割后的数组中的第一元素是否相等，相等则返回第二个元素；
	//数组的形式（ ["age1=21", "age=20", "name=zhaotao1", "aaaa=11111"]）	；
	var arr=arrCookie[i].split("=");
	if(arr[0] == name){
		return arr[1];
	}
	}
}

//删除；
function removeCookie(name){
	setCookie(name,1,-1);
}
//调用：setCookie("name","zhao",10);
//	    setCookie("age",20,10);
//     	setCookie("age1",21,10);


/*6.运动封装函数*/
			//当多个属性需要改变的时候，可以考虑传一个JSON数据{"width":400,"left":500,"height":300}
			function startMove(obj, json,fn){
				clearInterval(obj.timer);
				obj.timer = setInterval(function() {
					var flag=true;
					for(var attr in json) {
						if(attr == "opacity"){
							var iCur = Math.round(getStyle(obj,attr)*100);
						}else{
							var iCur = parseInt(getStyle(obj, attr)); //取到当前值
						}
						
						//var iSpeed = Math.ceil((iTarget - iCur)/10);
						//json[attr]是目标值
						
						var iSpeed = (json[attr] - iCur) / 8;//其实就是obj每次走了剩下的1/8；

						iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                        //当剩下距离小于1/8时，iSpeed的值小于1，由于像素最小应为1px,所以iSpeed的值取不到1，用Math.ceil对其向上取整，为负数时，向下取整，让iSpeed的值为小与1的数时取到1；
						//console.log(iCur, iSpeed);
						
						if(attr == "opacity"){
							obj.style.opacity = (iCur + iSpeed)/100;
							obj.style.filter = "alpha(opacity="+(iCur+iSpeed)+")";
						}else{
							obj.style[attr] = iCur + iSpeed + "px";
						}

						//当iCur和iTarget相等时清除定时器

						if(iCur != json[attr]) {
							flag=false;
						}
					}
					//多属性都达到目标值时，才去清除定时器
					if(flag){
						clearInterval(obj.timer);
						if(fn){
							fn();
						}
					}

				}, 30);
				

			}
/*7.拖拽*/
function drag(ele){
	ele.onmousedown = function(e){
				var evt = e || event;
				var disX = evt.offsetX;
				var disY = evt.offsetY;
				//把这个鼠标移动事件添加到移动对象上，当鼠标移动过快，会脱离移动对象
				//onmousemove添加到document
				document.onmousemove = function(e){
					var evt = e || event;
					var x = evt.clientX - disX;
					var y = evt.clientY - disY;
					
					if(x <= 0){
						x = 0;
					}
					
					if(x >= document.documentElement.clientWidth - ele.offsetWidth){
						x = document.documentElement.clientWidth - ele.offsetWidth;
					}
					
					if(y<=0){
						
						y = 0;
					}
					
					if(y >= document.documentElement.clientHeight - ele.offsetHeight){
						y = document.documentElement.clientHeight - ele.offsetHeight;
					}
					
					
					ele.style.left = x + "px";
					ele.style.top = y + "px";
					
				}
				
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup=null;
				}
				
			}
			
}
/*8.tab切换*/
function tab(ele,classname){
	for(var i=0;i<ele.length;i++){
		ele[i].onclick=function(){
			for(var j=0;j<ele.length;j++){
			    ele[j].className="";
		    }
			this.className=classname;	
		}
	}
}

/*9.Ajax封装函数 */
function Ajax(type,url,data,fnSuc,fnFail){
	var xhr=XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');//创建一个Ajax对象（兼容写法）；
	var str="";
	for(var i in data){
		str += i+"="+data[i]+"&";
	}
	str=str.replace(/&$/,"");
	if(type.toUpperCase() == "GET"){
		xhr.open("GET",url+"?"+str,true);
		xhr.send();
	}else{
		xhr.open("POST",url,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}
	xhr.onreadystatechange=function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				if(fnSuc){
					var data=xhr.responseText;
					fnSuc(data);
				}	
			}else{
				if(fnFail){
					fnFail();
				}
			}
		}
	}
}
//Ajax函数调用；
/*var data={"name":"kobe","age":36};
	Ajax("GET","test.php",data,foo,bar);
	function foo(data){
		alert(data);
	}
	function bar(){
		alert("数据错误");
	}*/
