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
	
	
	
	
	/*尾部显示隐藏*/
	$(".code-sm").hover(function(){
		$(this).children("div").show();
	},function(){
		$(this).children("div").hide();
	})
	
	
	
	/********************************购物车start**************************/
	$.get("json/json-floor.json",function(data){
		
		if(getCookie("cart")){
        	var obj = JSON.parse(getCookie("cart"));
        }else{
        	var obj = {};
        }
//      var num = 0;
//      for(var i in obj){
//      	num += obj[i];
//      }
        

        var proTotalNum = 0;
        var proTotalMoney = 0;
        
        for(var k=0;k<data.length;k++){
			var $data = data[k];
			//console.log($data);
			for(var j in $data.cnt.m){
				for(var s in obj){
					if($data.cnt.m[j].id == s){
						$(".list_cnt").append('<ul class="cur_pro"><li class="qx_box"><input type="checkbox" checked="checked" class="dx"/></li><li class="pro_pic"><a href="detail.html?id='+$data.cnt.m[j].id+'"><img src="'+$data.cnt.m[j].mImgsrc+'"/></a></li><li class="pro_name"><div class="name_t"><a href="detail.html?id='+$data.cnt.m[j].id+'"><span>全球购超市</span><b>'+$data.cnt.m[j].title+'</b></a></div><div class="name_b"><i></i><span>不支持7天无理由退货</span></div></li><li class="banben"></li><li class="dan_price"><div>￥<span class="cur_proprice">'+$data.cnt.m[j].price+'</span></div></li><li class="pro_num" dataid="'+$data.cnt.m[j].id+'"><div class="num_box"><span class="jian">-</span><input type="text" value="'+obj[$data.cnt.m[j].id]+'" class="change_num"/><span class="jia">+</span></div></li><li class="curpro_tol">￥<span class="proNum">'+obj[$data.cnt.m[j].id]*$data.cnt.m[j].price+'</span></li><li class="delete"><div><p><a class="delete_btn" data_id="'+$data.cnt.m[j].id+'">删除</a></p><p><a href="">移入收藏夹</a></p></div></li></ul>')
					    proTotalNum += Number(obj[$data.cnt.m[j].id])
					    proTotalMoney += Number(obj[$data.cnt.m[j].id]*$data.cnt.m[j].price);
					    
					}
				}
			}
		}
        //console.log(proTotalMoney)
        $(".totalNum").html(proTotalNum);
        $(".totalMoney").html(proTotalMoney);
        
        //加；
        $(".jia").click(function(){
        	 var _this = $(this);
        	 var goodsID = $(this).parent().parent().attr("dataid");
        	 var curNum = $(this).parent().find("input").val();
        	 curNum++;
        	 $(this).parent().find("input").val(curNum);
        	 obj[goodsID]++;
        	 var str = JSON.stringify(obj);
        	setCookie("cart",str,7);
        	totalNum();
        	totalMoney();
        	curProMoney(goodsID,_this);
        })
        //减；
        $(".jian").click(function(){
        	 var _this = $(this);
        	 var goodsID = $(this).parent().parent().attr("dataid");
        	 var curNum = $(this).parent().find("input").val();
        	 curNum--;
        	 if(curNum < 1){
        	 	curNum = 1;
        	 }
        	 $(this).parent().find("input").val(curNum);
        	 obj[goodsID]--;
        	 if(obj[goodsID] < 1){
        	 	obj[goodsID] = 1;
        	 }
        	 var str = JSON.stringify(obj);
        	setCookie("cart",str,7);
        	totalNum();
        	totalMoney();
        	curProMoney(goodsID,_this);
        })
        //直接改变数量；
        $(".jian").next("input").change(function(){
        	var _this = this;
        	var goodsID = $(this).parent().parent().attr("dataid");
        	var curNum = $(this).val();
        	$(this).val(curNum);
        	obj[goodsID] = Number(obj[goodsID]+curNum);
        	var str = JSON.stringify(obj);
        	setCookie("cart",str,7);
        	totalNum();
        	totalMoney();
        	curProMoney(goodsID,_this);
        	
        })
        
        //删除；
        //console.log($(".delete_btn").parent().parent().parent());
        $(".delete_btn").click(function(){
        	var goodsID = $(this).attr("data_id");
        	$(this).parent().parent().parent().parent().remove();
        	console.log($(this).parent().parent())
        	delete obj[goodsID];
        	var str = JSON.stringify(obj);
        	setCookie("cart",str,7);
        	totalNum();
        	totalMoney();
        })
        
        //商品全删除；
        $(".delete_qpro").click(function(){
        	$("#delete").show();
        	$(".meng_ban").show();

        })
        $(".q_xbtn").click(function(){
        	$("#delete").hide();
        	$(".meng_ban").hide();
        })
        $(".q_rbtn").click(function(){
        	$(".dx:checked").each(function(){
      	         delete obj[$(this).parent().parent().find(".delete_btn").attr("data_id")]
            })
        	var str = JSON.stringify(obj);
        	setCookie("cart",str,7);
        	
        	$(".dx:checked").parent().parent().remove();
      
$("#delete").hide();
        	$(".meng_ban").hide();
        	tolMoney();
        	tolNum();
        })
        $(".g_b").click(function(){
        	$("#delete").hide();
        	$(".meng_ban").hide();
        })
        
        //当前商品总钱数；
        function curProMoney(goodsID,_this){
        	for(var i=0;i<data.length;i++){
        		var $_data = data[i];
        		for(var j in $_data.cnt.m){
        				if($_data.cnt.m[j].id == goodsID){
        					_this.parent().parent().next("li").find($(".proNum")).html(Number(obj[goodsID]*$_data.cnt.m[j].price));
        				}
        		}
        	}
        }
        
        //单选与多选；
        $(".dx").click(function(){
        	if($(this).prop("checked")){
        		$(this).parent().parent().css({"background":"pink"});
        	}else{
        		$(this).parent().parent().css({"background":"#fff"});                                             
        	}
        	if($(".dx:checked").length == $(".dx").length){
        		
        		$(".qxbtn").prop("checked",true);
        	}else{
        		$(".qxbtn").prop("checked",false);
        	}
        	tolMoney();
        	tolNum();
        });
        
        $(".qxbtn").click(function(){
        	var flag = $(this).prop("checked");
        	$("body input[type=checkbox]").prop("checked",flag);
        	if($(this).prop("checked")){
        		$(".dx").parent().parent().css({"background":"pink"});
        	}else{
        		$(".dx").parent().parent().css({"background":"#fff"});
        	}
        	tolMoney();
        	tolNum();
        })
        
        //全选与多选下的商品总价；
        function tolMoney(){
        	var tolmoney = 0;
        	$(".dx:checked").each(function(){
        		var curProNum = $(this).parent().parent().find(".pro_num").find("input").val();
        		var curProPrice = $(this).parent().parent().find(".dan_price").find(".cur_proprice").html();
        	tolmoney += Number(curProNum*curProPrice)
        	})
        	$(".totalMoney").html(tolmoney);
        }
        
        //全选与多选下的商品总数量；
        function tolNum(){
        	var tolnum = 0;
        	$(".dx:checked").each(function(){
        		var curProNum = $(this).parent().parent().find(".pro_num").find("input").val(); 
        		tolnum += Number(curProNum);
        	})
        	$(".totalNum").html(tolnum)
        }
        
        //商品总数；
        totalNum();
        function totalNum(){
        	proTotalNum = 0;
        	for(var i in obj){
        		//console.log(obj[i])
        		proTotalNum += obj[i];
        	}
        	$(".totalNum").html(proTotalNum);
        }
        //商品总钱数；
        totalMoney();
        function totalMoney(){
        	proTotalMoney = 0;
        	for(var i=0;i<data.length;i++){
        		var $_data = data[i];
        		for(var j in $_data.cnt.m){
        			for(var m in obj){
        				if($_data.cnt.m[j].id == m){
        					proTotalMoney += Number(obj[$_data.cnt.m[j].id]*$_data.cnt.m[j].price);
        				}
        			}
        			
        		}
        	}
        	$(".totalMoney").html(proTotalMoney);
        }
        
	})
	
	/********************************购物车end**************************/
	
	   
})