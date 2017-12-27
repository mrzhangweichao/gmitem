$(function(){
	//用户；
	$(".homeCart_link_cart").click(function(){

		$(this).attr("href","cart.html");
	})
	
	
	
	
	/*放大镜*/
	//获取商品id；
	var str = location.search;
	var proId = str.split("=")[1];
	
	$.get("json/json-floor.json",function(data){
		var proArr = [];
		var $str1 = "";
		for(var i=0;i<data.length;i++){
			var $data = data[i];
			
			//proArr.push($data.cnt.m);
			for(var j in $data.cnt.m){
				proArr.push($data.cnt.m[j]);
			}
			
			
		}
        for(var k=0;k<proArr.length;k++){
        	if(proArr[k].id == proId){
        		
    		/*右侧*/
        		
    		//商品名字；
  		   $(".pro_name").prepend("<h1>"+proArr[k].title+"</h1>");
    		//商品价格；
        	$(".pro_price").append('<div class="pro_price_t"><span class="t_l">国 &nbsp;&nbsp;美 &nbsp;&nbsp;价</span><div class="t_r"><span class="proPrice"><em>￥</em>'+proArr[k].price+'</span><a href="" class="reduce">降价通知</a></div></div><div class="pro_price_b"><span class="cuxiao">促 &nbsp;&nbsp;销</span><div class="tuangou"><span class="tg">团购</span><em cuxiaoPrice>￥138,</em><a href="">立即参加<i>></i></a></div></div>')	
        		
        		//大中小图片
        		for(var m=0;m<proArr[k].detailImg.length;m++){
        			
        			$(".pro_big_list").append("<li><a href='"+proArr[k].url+"'><img src='"+proArr[k].detailImg[m]+"'></a></li>");
        			$(".img_big_list").append("<li><img src='"+proArr[k].detailImg[m]+"'></li>");
        			$(".pro_min_list").append("<li><img src='"+proArr[k].detailImg[m]+"'></li>")
        		}
        		
        	}
        }
		
		//点击小图显示对应的图片；
	    $(".pro_min_list li").eq(0).addClass("hover");
	    $(".pro_min_list li").hover(function(){
			var $index = $(this).index();
			$(".pro_min_list li").removeClass("hover");
			$(this).addClass("hover").siblings().removeClass("hover");
			$(".pro_big_list li").eq($index).show().siblings().hide();
			$(".img_big_list li").eq($index).show().siblings().hide();
		})
		
		/*放大镜效果*/
		$(".midArea").mousemove(function(e){
			$(".zoom").show();
			$(".big_img").show();
			var evt = e || event;
			var _left = evt.pageX - $(".cnt_left").offset().left - $(".zoom").width()/2;
			var _top = evt.pageY - $(".cnt_left").offset().top - $(".zoom").height()/2;
			
			if(_left <= 0){
				_left = 0;
			}
			if(_left >= $(".midArea").width() - $(".zoom").width()){
				_left = $(".midArea").width() - $(".zoom").width();
			}
			if(_top <= 0){
				_top = 0;
			}
			if(_top >= $(".midArea").height() - $(".zoom").height()){
				_top = $(".midArea").height() - $(".zoom").height();
			}
			
			$(".zoom").css({"left":_left,"top":_top});
			
			$(".img_big_list li").each(function(index){
				
				$(".img_big_list li").eq(index).css({"left":-($(".zoom").offset().left - $(".cnt_left").offset().left)/$(".midArea").width()*$(".img_big_list li").eq(index).width(),"top":-($(".zoom").offset().top - $(".cnt_left").offset().top)/$(".midArea").height()*$(".img_big_list li").eq(index).height()});
			})
		    
		})
		$(".midArea").mouseleave(function(){
			$(".zoom").hide();
			$(".big_img").hide();
		})
		
		/*商品种类选择*/
		$(".pro_style li").eq(0).addClass("hover");
		$(".pro_style li").hover(function(){
			$(this).addClass("hover").siblings().removeClass("hover");
		})
		/*手机二维码显示隐藏*/
		$(".phone_buy").hover(function(){
			$(".saoma").show();
		},function(){
			$(".saoma").hide();
		})
		
		/*******************详情页加入购物车 s********************/
		
		var $proNumBox = $("#commerceItemQuantityId");
        if(getCookie("cart")){
        	var obj = JSON.parse(getCookie("cart"));
        }else{
        	var obj = {};
        }
        var num = 0;
        for(var i in obj){
        	num += obj[i];
        }
        $proNumBox.html(num);
        $("#pro_Num").html(num);

        var proTotalNum = 0;
        var proTotalMoney = 0;
		
		//购物车中商品结构;
		for(var s=0;s<data.length;s++){
        	var $proData = data[s];
        	for(var j in $proData.cnt.m){
        		if(obj[$proData.cnt.m[j].id]){
        			//console.log("aaa");
        			$(".cart_pro_list").prepend('<li><a href="detail.html?id='+$proData.cnt.m[j].id+'" class="pro_pic"><img src="'+$proData.cnt.m[j].mImgsrc+'" alt="" /></a><div class="pro_mesg"><p class="proname"><a href="detail.html?id='+$proData.cnt.m[j].id+'">'+$proData.cnt.m[j].title+'</a></p><div class="pro_p_n"><span class="proPrice">￥<i>'+$proData.cnt.m[j].price+'</i></span><div class="proNum" data_id="'+$proData.cnt.m[j].id+'">'+obj[$proData.cnt.m[j].id]+'</div><a class="deleteBtn" data_id="'+$proData.cnt.m[j].id+'">删除</a></div></div></li>');
        			//console.log(obj[$proData.cnt.m[j].id])
        		    proTotalNum += Number(obj[$proData.cnt.m[j].id]);
             	    proTotalMoney += $proData.cnt.m[j].price*obj[$proData.cnt.m[j].id];
        		}
        		
        	}
        	
        }
		//商品总数；
        $(".prototal_num").html(proTotalNum);
        //商品总价
        $(".cart_footer").find("strong").html("￥" + proTotalMoney);
        
        //商品总数函数；
         function totalNum(){
        	proTotalNum = 0;
        	for(var j in obj){
        		proTotalNum += obj[j];
        	}
        	//console.log(proTotalNum);
        	$(".prototal_num").html(proTotalNum);
        }
         
        //商品总价数函数；
        function totalMoney(){
        	proTotalMoney = 0;
        	for(var i=0;i<data.length;i++){
        		var $_data = data[i];
        		for(var s in $_data.cnt.m){
        			for(var j in obj){
        				if($_data.cnt.m[s].id == j){
        					proTotalMoney += obj[j]*$_data.cnt.m[s].price;
        				}
        			}
        		}
        	}
        	//console.log(proTotalMoney);
        	$(".cart_footer").find("strong").html("￥" + proTotalMoney);
        }
        
        
	    //点击加入购物车商品；

//		//直接改变
//		$("#changeNum").change(function(){
//			var curNum = $("#changeNum").val();
//			$("#changeNum").val(curNum);
//			console.log($("#changeNum").val())
//		})
        var curNum = 1; 
        //加；
        $("#add").click(function(){
        	//var changenum = $("#changeNum").val();
        	curNum++;
        	$("#changeNum").val(curNum)
        })
		//减；
		$("#minus").click(function(){
        	//var changenum = $("#changeNum").val();
        	curNum--;
        	if(curNum < 1){
        		curNum = 1;
        	}
        	$("#changeNum").val(curNum)
        })
		//直接改变；
		$("#changeNum").change(function(){
		    $("#changeNum").val();
		    curNum = $("#changeNum").val();
		})
		
		//点击加入购物车；
		$("#btn").click(function(){
			for(var i=0;i<data.length;i++){
				var $curPro = data[i];
				for(var j in $curPro.cnt.m){
					if($curPro.cnt.m[j].id == proId){
						if(!obj[proId]){
							obj[proId] = 0;
						}
						obj[proId] += Number(curNum);
						var str = JSON.stringify(obj);
        	            setCookie("cart",str,7);
					}
				}
			}
			location.href = "cartSuccess.html?id="+proId+"="+curNum+"";
			isEmpty(num);
		})
		
		//删除当前商品;
        deleteCurPro();
        function deleteCurPro(){
        	$(".deleteBtn").click(function(){
	        	//console.log("qqq")
	        	var $curProId = $(this).attr("data_id");
	            
	        	$(this).parent().parent().parent().remove();
	        	getCookie("cart");
	        	//console.log(obj[$curProId])
	        	delete obj[$curProId];
	        	strCookie=JSON.stringify(obj);
				setCookie("cart",strCookie,7);
				//totalNum();
				//totalMoney();
				var newNum = 0;
				for(var i in obj){
					newNum += obj[i];
				}
				num = newNum;
				$proNumBox.html(num);
        	    $("#pro_Num").html(num);
        	    colorChnge(num);
                cartIsPro(num);
        	    isEmpty(num);
	        })
        }

		//侧边栏购物车 判断是否有商品；
        function cartIsPro(num){
        	if(num > 0){
        		$(".cart_empty").hide();
        		$(".cart_pro").show();
        		$(".cart_footer").show();
        	}else{
        		$(".cart_empty").show();
        		$(".cart_pro").hide();
        		$(".cart_footer").hide();
        	}
        }
        cartIsPro(num);
        //购物车商品数量变颜色；
        function colorChnge(num){
        	if(num > 0){
	        	$(".shopnum").css({"background":"#dd00a7"});
	        	$(".shopnum").find("i").css({    "border-color": "transparent transparent transparent #dd00a7"});
	        	$(".car_num").css({"background":"#dd00a7"});
	        	$(".point").css({    "border-color": "transparent transparent transparent #dd00a7"});
	        }else{
	        	$(".shopnum").css({"background":"#a5a5a5"});
	        	$(".shopnum").find("i").css({    "border-color": "transparent transparent transparent #a5a5a5"});
	        	$(".car_num").css({"background":"#a5a5a5"});
	        	$(".point").css({    "border-color": "transparent transparent transparent #a5a5a5"});
	        }
        }
        colorChnge(num);
       
		function isEmpty(num){
			if(num > 0){
				$(".hdrcarttext").html("<a class='hdrcarttext' href='cart.html'>去购车结算</a>");
				$("#csEmptyMessage").html("<a href='cart.html'>购物车</a>")
			}else{
				$(".hdrcarttext").html("<span class='hdrcarttext'>购物车空了</span>");
				$("#csEmptyMessage").html("<a href='cart.html'>购物车</a>中还没有商品，赶紧选购吧！")
			}
		}
		isEmpty(num);
		
		
		
		/*******************详情页加入购物车 e********************/
		
	})
	
	
	
	
    
	
	
	
})

