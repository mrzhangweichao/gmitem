$(function(){
	
	//登录下的链接点击展开；
     $(".corp-login").on("mouseenter",".more",function(){
     	$(this).css({"background-position":"0 -25px"});
		$("#corp-login").animate({"height":"80px"},200)
     })
	 $(".corp-login").mouseleave(function(){
	 	$(".more").css({"background-position":"0 0"});
		$("#corp-login").animate({"height":"26px"},200)
	 })
	 
	//扫码登录；
	$("#tabLeft").find("a").click(function(){
		$(this).addClass("cur");
		$("#tabRight").find("a").removeClass("cur");
		$(".sm-login-box").show();
		$(".login-k").hide();
	})
	//账户登录；
	$("#tabRight").find("a").click(function(){
		$(this).addClass("cur");
		$("#tabLeft").find("a").removeClass("cur");
		$(".sm-login-box").hide();
		$(".login-k").show();
	})
	
	//二维码图片与手机图片切换；
	$(".qrcode-main").hover(function(){
		$(".qrcode-Image").animate({"left":0},200);
		$(".qrcode-help").fadeIn(200);
	},function(){
		$(".qrcode-Image").animate({"left":"75px"},200);
		$(".qrcode-help").fadeOut(200);
	})
	
	
	//获取焦点；
	
	$("#user").focus(function(){
		$(this).css({"border-color":"#666"});
	});
	$("#psw").focus(function(){
		$(this).css({"border-color":"#666"});
	});
	//登录；
	$("#user").blur(function(){
		$(this).css({"border-color":"#ccc"});
	})
	$("#psw").blur(function(){
		$(this).css({"border-color":"#ccc"});
	})
	
	//自动登录；
	if(getCookie("username")){
		var $userName = getCookie("username");
		$userName = decodeURI($userName);
		$("#user").val($userName);
		$("#psw").val(getCookie("password"));
		$("#zd_login").prop("checked",true);
	}
	//登录跳转；
	$(".login_btn").click(function(){
		$.ajax({
	    			
			type:"get",
			
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			
			async:true,
			
			data:{status:"login",userID:$("#user").val(),password:$("#psw").val()},
			
			success:function(data){
				
				if(data == 0){
					$(".alert_box").show();
					$(".alert_box").find("p").html("用户名不存在");
				}
				
				if(data == 2){
					
					$(".alert_box").show();
					$(".alert_box").find("p").html("用户名或密码不匹配，请重新输入");
					
				}
				
				if(data !=0 && data != 2){
					
					location.href = "home.html";
					var username = $("#user").val();
					username = encodeURI(username);
					var psw = $("#psw").val();

					if($("#zd_login:checked")){
						setCookie("username",username,7);
					    setCookie("password",psw,7);
					}else{
						removeCookie("username");
						removeCookie("password");
					}
					
					setCookie("user",username,7);
					
				}
				
			}
			
		})
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	/*尾部显示隐藏*/
	$(".code-sm").hover(function(){
		$(this).children("div").show();
	},function(){
		$(this).children("div").hide();
	})
})
