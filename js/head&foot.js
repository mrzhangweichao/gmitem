
$(function(){
	//用户；
	if(getCookie("user")){
		var $username = getCookie("user");
		$username = decodeURI($username);
		$(".link_login").html($username);
		$(".link_login").attr("href","cart.html");
	}else{
		$(".link_login").html("登录");
		$(".link_login").attr("href","login.html");
	}
	
	
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
	$.get("json/json-wzdh.json",function(data){
		for(var i in data){
			var $data = data[i];
			$(".listwrap").append("<dl class='odl'><dt>"+data[i].Tit+"</dt><dd></dd></dl>")
			
			for(var j=0;j<$data.List.length;j++){
			   
				$(".listwrap dl").eq(i).find("dd").append("<ul></ul>")
				
				var $data1 = $data.List[j];
				for(var n=0;n<$data1.s.length;n++){
					$(".listwrap dl").eq(i).find("dd").find("ul").eq(j).append("<li><a href='http:"+$data1.s[n].href+"'>"+$data1.s[n].title+"</a></li>")
				}
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
	
	/*商品搜索下拉*/
	$("#search-type-dropdown").hover(function(){
		$("#search-type-dropdown .search-type-list").css({"display":"block"});
		$("#search-type-dropdown .search-type-list").find("li").hover(function(){
			$(this).addClass("hover").siblings().removeClass("hover");
		})
		$("#search-type-dropdown .search-type-list").find("li").click(function(){
			$(".search-type-selected").html($(this).html());
			$(this).parent().css({"display":"none"});
		})
	},function(){
		$("#search-type-dropdown .search-type-list").css({"display":"none"});
	})
	
	/*商品搜索框下面的关键词结构生成*/
	$.ajax({
		type:"get",
		url:"json/search-botm.json",
		async:true,
		success:function(data){
			for(var i in data.data){
				$(".hotkeyword").append("<a href='"+data.data[i].url+"'>"+data.data[i].title+"</a>")
			}
		}
	})
	
	/*搜索下拉列表关闭*/
//	$("#closeSearch").click(function(){
//		$("#searchTips").css({"display":"none"});
//	})
//  var val = $("#searchInput").val();
//   $.getJSON("http://www.lefeng.com/api/neptune/search/suggestion/v2?keyword="+val,function(data){
//   	console.log(data);
//   })
      
    $("#searchInput").bind("input",function(){
      	var val = $(this).val();
        $.ajax({
        	type:"get",
			url:"https://suggest.taobao.com/sug?code=utf-8&q="+val+"&_ksTS=1514364012641_1374&callback=jsonp1375&area=b2c&code=utf-8&k=1&bucketid=9&src=tmall_pc",
			async:true,
			dataType:"jsonp",
			success:function(data){
				var html = "";
				if(data.result){
					for(var i=0;i<data.result.length;i++){
						
					   html += "<li class='search_pro'><a>"+data.result[i][0]+"</a><span class='search_pro_num'>约<b>"+data.result[i][1]+"</b>条</span></li>"
				    }
				
				$(".searchabout").html(html);
				$(".related-keyword").html($("#searchInput").val());
				$(".searchtips").show();
				
				$(".close_btn").click(function(){
					$(".searchtips").hide();
				});
						
				$(".searchabout").find("li").click(function(){
					$("#searchInput").val($(this).find("a").html());
					$(".searchtips").hide();
				})
				
				$("#searchTips").mouseleave(function(){
					$(".searchtips").hide();
				});
				
				
				
                }
			}
		
        })
        
      
	})
	/*购物车显示隐藏效果*/
	$(".mygome-side").hover(function(){
		$(".cartlinkbox").addClass("hover");
		$(".menuhide").show();
		$(".cartlink b").addClass("hover_b");
		$(".hdrcarttext").addClass("hover_span");
	},function(){
		$(".cartlinkbox").removeClass("hover");
		$(".menuhide").hide();
		$(".cartlink b").removeClass("hover_b");
		$(".hdrcarttext").removeClass("hover_span");
	})
	
	/*尾部显示隐藏*/
	$(".code-sm").hover(function(){
		$(this).children("div").show();
	},function(){
		$(this).children("div").hide();
	})
	
	/*侧边栏*/
	$(".s_h").hover(function(){
		
		$(this).find($(".show")).animate({"left":-82},200);
		$(this).find($(".sanj")).show(200);
	},function(){
		$(this).find($(".show")).animate({"left":35},200);
		$(this).find($(".sanj")).hide(200);
	})
	$(".sm").hover(function(){
		$(this).find("em").animate({"left":-140},200);
		$(this).find($(".sanj")).show(200);
	},function(){
		$(this).find("em").animate({"left":35},200);
		$(this).find($(".sanj")).hide(200);
	})
	//返回顶部；
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		if(scrollTop > 1000){
			$(".db").fadeIn();
		}else{
			$(".db").fadeOut();
		}
	})
	$(".db").click(function(){
		$("html,body").animate({"scrollTop":0},600);
	})
	
	//点击显示隐藏侧边栏购物车；
       //console.log($(".cart"));
	   $(".cart").click(function(){
	   	  $("#gome-bar-box").animate({"right":"35px"})
	   })
	   $(".hideshow").click(function(){
	   	  $("#gome-bar-box").animate({"right":"-275px"})
	   });
	   
	   
})


