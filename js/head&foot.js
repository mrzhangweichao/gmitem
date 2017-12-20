
$(function(){
	/*head-img 显示隐藏*/
	$(".close-gome-topad i").click(function(){
		console.log("aaa")
		$("#gome-topad-sm").hide();
	})
	
	/*国美会员*/
	$("#gome-user").hover(function(){
		$(this).addClass("hover");
		$("#gome-user .public-dropdown").css({"height":"auto"})
	},function(){
		$(this).removeClass("hover");
		$("#gome-user .public-dropdown").css({"height":0})
	})
	
	/*国美会员隐藏框中的左右切换*/
	var $count = 0;
	$("#user-icon .user-icon-prev").click(function(){
		$count--;
		if($count <= 0){
			$count = 0;
		}
		$("#user-icon div ul").animate({"left":-240*$count+"px"},500)
	})
	$("#user-icon .user-icon-next").click(function(){
		$count++;
		if($count >= 2){
			$count = 2;
		}
		console.log($count)
		$("#user-icon div ul").animate({"left":-240*$count+"px"},500)
	})
	
	/*我的国美*/
	$("#gome-mygome").hover(function(){
		$("#gome-mygome .public-dropdown").css({"height":"auto"});
	    $(this).addClass("hover");
	},function(){
		$("#gome-mygome .public-dropdown").css({"height":0});
		$(this).removeClass("hover");
	})
	
	/*服务中心*/
	$("#gome-service").hover(function(){
		$("#gome-service .public-dropdown").css({"height":"auto"});
	    $(this).addClass("hover");
	},function(){
		$("#gome-service .public-dropdown").css({"height":0});
		$(this).removeClass("hover");
	})
	
	/*网站导航数据结构*/
	$.ajax({
		type:"get",
		url:"json/nav-wzdh.json",
		async:true,
		success:function(data){
			for(var i in data){
				/*console.log(i);*/
				$("#gome-sitemap .public-dropdown").append($("<dl><dt>"+i+"</dt><dd></dd></dl>"))
			}
			for(var i in data["主题促销"]){
				/*console.log(data["主题促销"])*/
				$("#gome-sitemap .public-dropdown dl").eq(0).append("<ul></ul>")
			}
			/*for(var i in data["主题促销"].list1){
				console.log(data["主题促销"].list1[i].title)
			}*/
			for(var i in data["特色分类"]){
				$("#gome-sitemap .public-dropdown dl").eq(1).append("<ul></ul>")
			}
			for(var i in data["便捷服务"]){
				$("#gome-sitemap .public-dropdown dl").eq(2).append("<ul></ul>")
			}
			for(var i in data["更多热点"]){
				$("#gome-sitemap .public-dropdown dl").eq(3).append("<ul></ul>")
			}
			for(var i in data["国美旗下"]){
				$("#gome-sitemap .public-dropdown dl").eq(4).append("<ul></ul>")
			}
			
		}
	})
	
	
	/*网站导航*/
	$("#gome-sitemap").hover(function(){
		$("#gome-sitemap .public-dropdown").css({"height":"auto"});
	    $(this).addClass("hover");
	},function(){
		$("#gome-sitemap .public-dropdown").css({"height":0});
		$(this).removeClass("hover");
	})
	
	/*手机国美*/
	$("#gome-phone").hover(function(){
		$("#gome-phone .public-dropdown").css({"height":"auto"});
	    $(this).addClass("hover");
	},function(){
		$("#gome-phone .public-dropdown").css({"height":0});
		$(this).removeClass("hover");
	})
	
	
	
	
	
	
	
	
	
})


