$(function(){

	/*二级菜单*/
	$.get("json/nav1.json",function(data){
		
		var $ul = $(".nav-menubox");
		for(let i=0;i<data.length;i++){
			var menu = data[i];
			
			//创建ul下的li;
			var $li = $("<li class='nav-item'><h2 class='n-tit'><a href='#'></a></h2><div class='n-info'></div></li>")
			$ul.append($li);
			
			for(let j=0;j<menu.navList.length;j++){
                
				$(".n-tit a").eq(i).html(menu.navList[j].Tit);
				
			}
			
			for(let n=0;n<menu.navList[0].List.length;n++){
				
				let $div_a = $("<a>"+menu.navList[0].List[n].title+"</a>")
				$(".n-info").eq(i).append($div_a);
			}
			
		    
		      
		}
		
		/*菜单显示隐藏*/
		   $(".categorys-warp ").on("mouseenter",".nav-menubox li",function(){
		        $(this).addClass("hover_li").siblings().removeClass("hover_li");
		        $(this).find(".n-tit a").addClass("hover_a").siblings().removeClass();
		        $(this).find(".n-info a").addClass("hover_a");
		        $(".nav-subbox").eq($(this).index()).show().siblings().hide();
		        
		   })

		   
		   	$(".categorys-warp .nav-menubox li").mouseenter(function(){
		   	$(".n-tit a").removeClass("hover_a");
		   	$(".n-info a").removeClass("hover_a");
		   		
		   	$(this).find(".n-tit a").addClass("hover_a");
		   	$(this).find(".n-info a").addClass("hover_a");
		   })
		   
		   $(".categorys-warp").on("mouseleave",function(){
		   	   $(".categorys-warp .nav-menubox li").removeClass("hover_li");
		   	   $(".n-tit a").removeClass("hover_a");
		   	   $(".n-info a").removeClass("hover_a");
		   	   $(".nav-subbox").hide();
		   })
		
		
		
		$.get("json/nav2.json",function(data){
		   	
        	for(var i=0;i<data.length;i++){
        		var menu2 = data[i];
        		
        		var $divWrap = $("<div class='nav-subbox clearfix'><div class='sort-warp clearfix'></div><div class='advert-warp edit-mode'></div></div>")
        		$(".submenu-warp").append($divWrap);
        		
        		for(let j=0;j<menu2.navList.length;j++){
        			$(".sort-warp").eq(i).append("<dl><dt>"+menu2.navList[j].Tit+"</dt><dd></dd></dl>")
        			
        	        var menu3 = menu2.navList[j]
        	        
        	        for(let k=0;k<menu3.List.length;k++){
        	        	$(".sort-warp").eq(i).find("dl dd").eq(j).append("<a href='"+menu3.List[k].link+"'>"+menu3.List[k].title+"</a>")
        	        }
                } 
                
                for(var n=0;n<menu2.navImg.length;n++){
                	$(".advert-warp").eq(i).append("<a href='"+menu2.navImg[n].url+"'><img src='"+menu2.navImg[n].imgsrc+"'></a>")
                }
                
        	}
        	
        	
        })
		
		
	})
	
	/*banner轮播图*/
	$.get("json/banner-json.json",function(data){
		var str="";
		for(var i=0;i<data.length;i++){
			
			$(".slideBox .hd .oul").append("<li></li>");
			$(".slideBox .bd ul").append("<li><a href='"+data[i].url+"'><img src='"+data[i].imgsrc+"'></a></li>")
		}
		
		var count = 0;
		var timer = setInterval(function(){
			change();
		},3000)

        $(".next").click(function(){
        	clearInterval(timer);
        	change();
        })
        
        $(".prev").click(function(){
        	clearInterval(timer);
        	count -= 2;
        	change();
        })
        $(".slideBox .hd .oul li").eq(0).addClass("on")
        $(".slideBox .hd .oul li").hover(function(i){
        	clearInterval(timer);
        	
        	count = $(this).index() - 1;
        	
        	change();
        },function(){
        	timer = setInterval(function(){
				change();
			},3000)
        })
        
        $(".slideBox").mouseleave(function(){
        	clearInterval(timer);
        	timer = setInterval(function(){
				change();
			},3000)
        })
        var num = $(".bd ul li").length;
		function change(){
			count++;
			if(count == num){
				count = 0;
			}
			if(count == -1){
				count = $(".bd ul li").length - 1;
			}
			
			$(".hd .oul li").removeClass("on");
			
			$(".hd .oul li").eq(count).addClass("on").siblings(). removeClass("on");
			$(".bd ul li").eq(count).animate({"opacity":".9"},300).siblings().animate({"opacity":0},300);       
			
		}
		
	})
	
	/*banner下面三张图*/
	$.get("json/banner-btom.json",function(data){
		for(var i=0;i<data.length;i++){
			$(".advert_list").append("<li><a href='http:"+data[i].url+"' class='pic'><img src='"+data[i].imgsrc+"'></a></li>")
		}
	})
	
	/*banner右侧区域*/
	$.get("json/banner-right.json",function(data){
		for(var i=0;i<data.length;i++){
			$(".r-activity-img").append("<a href=''><img src=''></a>");
			var $data = data[i];
			
			for(var j=0;j<$data.t.length;j++){
				
			    $(".r-activity-img a").eq(i).attr("href",$data.t[j].url);
			    $(".r-activity-img a img").eq(i).attr("src",$data.t[j].imgsrc);
			}  
			

			for(var k in $data.b){
				
				$(".coupon-box ul").append("<li></li>");
				var $data1 = $data.b[k];
				
				for(var m=0;m<$data1.length;m++){
			        $(".coupon-box ul li").eq(k).append("<div class='coupon-item'><span class='c-img'><a href='"+$data1[m].url+"'><img src='"+$data1[m].imgsrc+"'></a></span><a class='c-btn'>进店</a></div>");
				}
			}
		}
		
		/*点击按钮优惠券变化*/
		var $step = 0;
		$(".next").click(function(){
			$step++;
			if($step == $(".coupon-box ul li").length){
				$step = 0;
			}
			$(".coupon-box ul li").eq($step).addClass("hover").siblings().removeClass("hover");
		})
		$(".prev").click(function(){
			$step--;
			if($step == -1){
				$step = $(".coupon-box ul li").length - 1;
			}
			$(".coupon-box ul li").eq($step).addClass("hover").siblings().removeClass("hover");
		})
	})
	
	
	/*精彩圈子*/
	$.get("json/json-jsqz.json",function(data){
		for(var i=0;i<data.length;i++){
			$(".pluspc-car-list").append("<li><div class='pluspc-car-imgbox'><a href='"+data[i].url+"'><img src='"+data[i].imgsrc+"'></a></div><div class='pluspc-car-infobox'><span>"+data[i].title+"</span><a href='"+data[i].url+"'>"+data[i].name+"</a></div><div class='pluspc-car-last'>成员：<span>"+data[i].cy+"</span>话题：<span>"+data[i].ht+"</span></div></li>")
		}

		$(".pluspc-car-list li").hover(function(){
			
			$(".pluspc-car-list").find("img").eq($(this).index()).addClass("hover_img");
		},function(){
			$(".pluspc-car-list").find("img").eq($(this).index()).removeClass("hover_img");
		})
	})
	
	/*content-品牌盛宴-人群导购-清单*/
	$.get("json/content-3bf.json",function(data){
		for(var i=0;i<data.length;i++){

			$(".brand-show").append("<div class='fl mr15'><div class='brand-tit'>"+data[i].Tit+"</div><div class='brand-list'><ul></ul></div></div>")
		
			$(".brand-show > div").eq(0).addClass("brand-m");
			$(".brand-show > div").eq(1).addClass("guide");
			 
			var $data = data[i];

			for(var j=0;j<$data.List.length;j++){
				$(".brand-show .mr15 ul").eq(i).append("<li class='oli'><a href='"+$data.List[j].url+"'><img src='"+$data.List[j].imgsrc+"'></a></li>")
			}
		}
	
	})
	
	/*必buy清单*/
	$.get("json/content-3bf-r.json",function(data){
		$(".brand-show").append("<div class='needbuy fr'><div class='brand-tit'>"+data.Tit+"</div><div class='need-nav'><ul></ul></div><div class='brand-list'></div></div>");
		
		for(var i=0;i<data.topNav.length;i++){
			$(".need-nav ul").append("<li><b>"+data.topNav[i].cnt+"</b><span><em class='people'>"+data.topNav[i].num+"</em>人在逛</span></li>")
		}
		
		var $data = data.List;
		for(var j=0;j<$data.length;j++){
			$(".needbuy .brand-list").append("<ul class='need-item'></ul>");
		    var $list = $data[j];
		    for(var k=0;k<$list.pro.length;k++){
		    	
		    	$(".need-item").eq(j).append("<li><a class='name' href='"+$list.pro[k].url+"'>"+$list.pro[k].title+"</a><span class='price'>￥<i>"+$list.pro[k].price+"</i></span><a href='"+$list.pro[k].url+"' class='pic'><img src='"+$list.pro[k].img+"'></a></li>")
		    }
		}
		
		/*tab切换效果*/
		$(".need-nav ul li").eq(0).addClass("active");
		$(".need-item").eq(0).addClass("active-ul")
		$(".need-nav ul li").hover(function(){
			
			$(this).addClass("active").siblings().removeClass("active");
			$(".need-item").removeClass("active");
			$(".need-item").eq($(this).index()).addClass("active-ul").siblings().removeClass("active-ul");
		},function(){
			$(this).siblings().removeClass("active");
			$(".need-item").eq($(this).index()).siblings().removeClass("active-ul");
		})
	})
	
	/*猜你喜欢*/
	$.get("json/json-like.json",function(data){
		  $(".guess-list").append("<ul></ul>");
		  for(var i=0;i<data.length;i++){
		  	  $(".guess-list ul").append("<li></li>");
		  	  
		  	  var $data = data[i];
		  	  for(var j in $data){
		  	  	$(".guess-list ul li").eq(i).append("<div class='guess-item'><a class='pic' href='"+$data[j].url+"'><img src='"+$data[j].imgsrc+"'></a><div class='name'><a href='"+$data[j].url+"'>"+$data[j].title+"</a></div><div class='price'>￥<i class='minPrice'>"+$data[j].price+"</i></div></div>")
		  	  }
		  }
		  
		  /*点击前后运动*/
		 var step = 0;
		 $(".guess-list ul li").eq(0).addClass("show");
		 $(".guess-btn .next").click(function(){
		 	step++;
		 	if(step == $(".guess-list ul li").length){
		 		step = 0;
		 	}
		 	$(".guess-list ul li").eq(step).addClass("show").siblings().removeClass("show");
		 })
		 $(".guess-btn .prev").click(function(){
		 	step--;
		 	if(step == -1){
		 		step = $(".guess-list ul li").length - 1;
		 	}
		 	$(".guess-list ul li").eq(step).addClass("show").siblings().removeClass("show");
		 })
	})
	
	/*楼层布局结构生成*/

	$.get("json/json-floor.json",function(data){
		for(let i=0;i<data.length;i++){
			$("#floorWrap").append("<div class='floor-wrap'><div class='floor-area wbox'><div class='model-head'><h2 class='model-name'>"+data[i].totalTitle+"</h2><ul class='model-keywords'></ul></div><div class='floor-body'></div></div></div>");
			var $data = data[i];
			
			//导航条;
			$(".floors-item").append("<li><a class='a_on'>"+data[i].totalTitle+"</a></li>");
			
			//头部nav
			for(var j=0;j<$data.headList.length;j++){
				$(".model-keywords").eq(i).append("<li><h4><a href='"+$data.headList[j].url+"'>"+$data.headList[j].name+"</a></h4></li>")
			}
			
			//内容区域生成左中右三个块；
			
			for(var k in $data.cnt){
				$(".floor-body").eq(i).append("<p></p>")
			}
			$(".floor-body").eq(i).children("p").eq(0).attr("class","flo-l-box");
			$(".floor-body").eq(i).children("p").eq(1).attr("class","flo-m-box");
			$(".floor-body").eq(i).children("p").eq(2).attr("class","flo-r-box");
			
			//左边区域；
			$(".floor-body").eq(i).children("p").eq(0).append("<div class='floor-advert'><div class='hd'><ul></ul></div><div class='bd'><ul></ul></div></div><div class='keyword-area'></div>");
			
			for(var m=0;m<$data.cnt.l.t.length;m++){
				$(".floor-body").eq(i).children("p").eq(0).find(".bd").find("ul").append("<li><a href='"+$data.cnt.l.t[m].url+"'><img src='"+$data.cnt.l.t[m].lImgsrc+"'></a></li>");
				$(".floor-body").eq(i).children("p").eq(0).find(".hd").find("ul").append("<li>•</li>");
			}
			for(var n=0;n<$data.cnt.l.b.length;n++){
				$(".floor-body").eq(i).children("p").eq(0).find(".keyword-area").append("<a href='"+$data.cnt.l.b[n].link+"'>"+$data.cnt.l.b[n].name+"</a>")
			}

			//中间区域；
			$(".floor-body").eq(i).children("p").eq(1).append("<ul class='pro-list'></ul>")
			for(var a in $data.cnt.m){
				$(".floor-body").eq(i).children("p").eq(1).find(".pro-list").append("<li class='pro-item'><div class='pro-area'><div class='pic'><a href='detail.html?id="+$data.cnt.m[a].id+"'><img src ='"+$data.cnt.m[a].mImgsrc+"'></a></div><div class='txt'><div class='name'><a href='"+$data.cnt.m[a].url+"'>"+$data.cnt.m[a].title+"</a></div><div class='price'>￥<i>"+$data.cnt.m[a].price+"</i></div></div></div><div class='layer-area'><span class='price'>￥<i class='minPrice'>"+$data.cnt.m[a].price+"</i></span><span class='txt_btn' data_id='"+$data.cnt.m[a].id+"'>加入购物车</span></div></li>")
			}
			
			//显示加入购物车按钮；
			$(".floor-body").eq(i).find(".flo-m-box").find(".pro-list").find(".pro-item").hover(function(){
				$(this).find(".layer-area").show();
			},function(){
				$(this).find(".layer-area").hide();
			})
			
			
			//右边区域；
			for(var b=0;b<$data.cnt.r.length;b++){
				$(".floor-body").eq(i).children("p").eq(2).append("<a href='"+$data.cnt.r[b].url+"'><img src='"+$data.cnt.r[b].rImgsrc+"'></a>")
			}
			
			/*左侧小轮播效果*/
			/*            */
			
			
			$(".floor-body").eq(i).children("p").eq(0).find(".hd").find("li").eq(0).addClass("on");
			$(".floor-body").eq(i).children("p").eq(0).find(".bd").find("li").eq(0).addClass("shows");
			
			$(".floor-body").eq(i).find(".flo-l-box").find(".hd").find("li").hover(function(){
				
				var index = $(this).index();	
				//$(".floor-body").eq(i).children("p").eq(0).find(".bd").find("li").eq(index).addClass("shows").siblings().removeClass("shows");
				$(".floor-body").eq(i).children("p").eq(0).find(".bd").find("li").eq(index).animate({"opacity":1},200).siblings().animate({"opacity":0},200)
				$(this).addClass("on").siblings().removeClass("on");
			})
			/*                */

		}

        //console.log($(".floor-wrap").eq(1).offset().top)
        /*滑动滚动条横导航栏*/
       var flag = true;
       $(window).scroll(function(){
       	    if(flag){
       	    	var scrollTop = $(this).scrollTop();
       	    
	       	    if(scrollTop > 1800){
	       	    	$(".fixed-bar").css({"position":"fixed"})
	       	    }else{
	       	    	$(".fixed-bar").css({"position":"absolute"})
	       	    }
	       	    
	       	    $(".a_on").eq(0).addClass("hover-a")
	       	    $(".floor-wrap").each(function(index){
	       	    	var _top = $(this).offset().top - $(this).height()/2;;
	       	    	
	       	    	//console.log(scrollTop,_top)
	       	    	if(scrollTop >= _top){
	       	    		$(".a_on").removeClass("hover-a");
									$(".a_on").eq(index).addClass("hover-a").siblings().removeClass("hover-a");
								}
	       	    })
	       	    
       	    }  
       })
       
       $(".floors-item li").click(function(){
       	   flag = false;
       	   var index = $(this).index();
       	   $(".a_on").removeClass("hover-a");
       	   $(".a_on").eq(index).addClass("hover-a").siblings().removeClass("hover-a");
		   
		   var _top = $(".floor-wrap").eq(index).offset().top - 50;
		   $("html,body").animate({"scrollTop":_top},500,function(){
						flag = true;
					});
       	
       })
       
       
    /****************************添加购物车区域 s***********************/
        var $btn = $(".flo-m-box").find(".txt_btn");
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
        $btn.click(function(){
        	var curProId = $(this).attr("data_id");
        	if(!obj[curProId]){
        		obj[curProId] = 1;
        	}else{
        		obj[curProId]++;
        	}
        	var str = JSON.stringify(obj);
        	setCookie("cart",str,7);
        	num++;
        	$proNumBox.html(num);
        	$("#pro_Num").html(num);
        	//购物车商品数量变颜色；
	        colorChnge(num);
            cartIsPro(num);
            //bePro(num);
            for(var s=0;s<data.length;s++){
	        	var $proData = data[s];
	        	for(var j in $proData.cnt.m){
	        		if($proData.cnt.m[j].id == curProId && obj[$proData.cnt.m[j].id] ==1){
	        			//console.log("aaa");
	        			$(".cart_pro_list").prepend('<li><a href="detail.html?id='+$proData.cnt.m[j].id+'" class="pro_pic"><img src="'+$proData.cnt.m[j].mImgsrc+'" alt="" /></a><div class="pro_mesg"><p class="proname"><a href="detail.html?id='+$proData.cnt.m[j].id+'">'+$proData.cnt.m[j].title+'</a></p><div class="pro_p_n"><span class="proPrice">￥<i>'+$proData.cnt.m[j].price+'</i></span><div class="proNum" data_id="'+$proData.cnt.m[j].id+'">'+obj[$proData.cnt.m[j].id]+'</div><a class="deleteBtn" data_id="'+$proData.cnt.m[j].id+'">删除</a></div></div></li>')
	        		}
	        	}
	        }
            //console.log($(".proNum"))
            $(".proNum").each(function(){
            	var curId = $(this).attr("data_id");
            	var curNum = $(this).html();
            	if(curId == curProId){
            		if(obj[curId] == 1){
            			curNum = 1;
            		}else{
            			curNum++;
            		}
            		$(this).html(curNum);
            	}
                
            });
            totalNum();
            totalMoney();
            deleteCurPro();
            isEmpty(num);
        })

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
         //console.log(proTotalNum)
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
        
        //删除当前商品;
        deleteCurPro();
        function deleteCurPro(){
        	$(".deleteBtn").click(function(){
	        	console.log("qqq")
	        	var $curProId = $(this).attr("data_id");
	            
	        	$(this).parent().parent().parent().remove();
	        	getCookie("cart");
	        	//console.log(obj[$curProId])
	        	delete obj[$curProId];
	        	strCookie=JSON.stringify(obj);
				setCookie("cart",strCookie,7);
				totalNum();
				totalMoney();
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
        
       /********************添加购物车区域 e******************************/
       
       
	})
	
	/*foot部分*/
	$.get("json/foot-json.json",function(data){
		$(".market-box").append("<ul></ul>")
		for(var i=0;i<data.length;i++){
			$(".market-box").find("ul").append("<li><h3>"+data[i].title+"</h3><div class='txt'></div></li>");
			var $data = data[i];
			for(var j=0;j<$data.list.length;j++){
				$(".market-box ul li").eq(i).find(".txt").append("<a href='"+$data.list[j].url+"'>"+$data.list[j].name+"</a>")
			}
		}
	})
})
