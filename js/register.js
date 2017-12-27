$(function(){
	
	/**************注册验证start*************************/
	
	//获取焦点；
	
	$("form").find(".i_text").focus(function(){
		$(this).css({"border-color":"#666"});
		$(this).parent().find(".mesg1").show();
		$(this).parent().find(".mesg2").hide();
		$(this).parent().find(".alert_log").hide();
	})
	
	//用户名;
	var flag1 = 0;
	$(".username").find("input").blur(function(){	
		var oRegtel1_user = /^[\da-zA-Z-_\u4e00-\u9f5a]{4,20}$/g;
		var oRegtel2_user = /^[a-z0-9_-]{1,3}$/g;//小于4购物字符;
		var oRegtel3_user = /^\d+$/;//纯数字；
		var oRegtel4_user = /^$/;
		
	    if(oRegtel4_user.test($(this).val())){
	    	//flag1 = 0;
			$(this).css({"border-color":"red"});
			$(this).parent().find(".mesg1").hide();
			$(this).parent().find(".mesg2").show();
			$(this).parent().find(".mesg2").find("span").html("请输入用户名");
			$(this).parent().find(".alert_log").hide()
		}
        if(oRegtel2_user.test($(this).val())){
        	//flag1 = 0;
        	$(this).parent().find(".mesg2").show();
			$(this).parent().find(".mesg2").find("span").html("用户名长度只能在4-20个字符之间");
			$(this).parent().find(".alert_log").hide();
			$(this).parent().find(".mesg1").hide();
			$(this).css({"border-color":"red"});
        }
		if(oRegtel1_user.test($(this).val())){
			if(oRegtel3_user.test($(this).val())){
				flag1 = 0;
				$(this).css({"border-color":"red"});
				$(this).parent().find(".mesg2").show();
				$(this).parent().find(".mesg2").find("span").html("不能是纯数字，请重新输入");
				$(this).parent().find(".alert_log").hide();
				$(this).parent().find(".mesg1").hide();
			}else{
				flag1 = 1;
				$(this).css({"border-color":"#ccc"});
				$(this).parent().find(".mesg1").hide();
				$(this).parent().find(".mesg2").hide();
				$(this).parent().find(".alert_log").show();
			}
		}else{
			flag1 = 0;
			$(this).css({"border-color":"red"});
			$(this).parent().find(".mesg2").show();
			$(this).parent().find(".mesg2").find("span").html("只能由中文、英文、数字及“-”、“_”组成");
			$(this).parent().find(".alert_log").hide();
			$(this).parent().find(".mesg1").hide();
		}
		//console.log(flag1)
	})
	//console.log(flag1)
	
	//密码；
	var flag2 = 0;
	$(".psw").find("input").bind("input",function(){
		var safe = 0;
		var oRegtel1_psw = /^[\da-zA-Z-_!@#$%^&*]{6,20}$/g;
		var oRegtel2_psw = /^\d+$/;
		var oRegtel3_psw = /^[a-zA-Z]+$/g;
		var oRegtel4_psw = /^[-_!@#$%^&*]+$/;
		var oRegtel5_psw = /^[\da-zA-Z]+$/;
		var oRegtel6_psw = /^[\d-_!@#$%^&*]+$/;
		var oRegtel7_psw = /^[a-z-_!@#$%^&*]+$/;
		$(".an_quan").show();
		if(oRegtel1_psw.test($(this).val())){
			$(this).css({"border-color":"#ccc"});
			$(this).parent().find(".mesg1").hide();
			$(this).parent().find(".mesg2").hide();
			$(this).parent().find(".alert_log").show();
			safe = 3;
			if(oRegtel5_psw.test($(this).val()) || oRegtel6_psw.test($(this).val()) || oRegtel7_psw.test($(this).val())){
				safe = 2;
				if(oRegtel2_psw.test($(this).val()) || oRegtel3_psw.test($(this).val()) || oRegtel4_psw.test($(this).val())){
					safe = 1;
				}
			}
			flag2 = 1;
	    }
		if(safe == 0){
			$(".psw_r").css({"background":"#a5a5a5"});
			$(".psw_z").css({"background":"#a5a5a5"});
			$(".psw_q").css({"background":"#a5a5a5"});
		}
		if(safe == 1){
			$(".psw_r").css({"background":"#cc0000"});
		}
		if(safe == 2){
			$(".psw_r").css({"background":"#cc0000"});
			$(".psw_z").css({"background":"#cc0000"});
		}
		if(safe == 3){
			$(".psw_r").css({"background":"#cc0000"});
			$(".psw_z").css({"background":"#cc0000"});
			$(".psw_q").css({"background":"#cc0000"});
		}
		//console.log(flag2);
	})

	//再次输入密码；
	var flag3 = 0;
	$(".psw_agin").find("input").blur(function(){
		var $psw = $(".psw").find("input").val();
		//console.log($psw)
		if($(this).val() == $psw){
			flag3 = 1;
			$(this).css({"background":"#fff"});
			$(this).css({"border-color":"ccc"});
			$(this).parent().find(".mesg1").hide();
			$(this).parent().find(".mesg2").hide();
			$(this).parent().find(".alert_log").show();
		}else if($(this).val() != $psw){
			flag3 = 0;
			$(this).css({"background":"#fff"});
			$(this).css({"border-color":"red"});
			$(this).parent().find(".mesg2").show();
			$(this).parent().find(".mesg2").find("span").html("两次输入密码不一致");
		}
		//console.log(flag3)
	})
	
	//手机号；
	var flag4 = 0;
	$(".tel").find("input").focus(function(){
		$(this).parent().find(".mesg1").hide();
		$(this).parent().find(".mesg2").show();
		$(this).parent().find(".alert_log").hide();
	})
	$(".tel").find("input").blur(function(){
		
		var oRegtel_tel =  /^((13[0-9])|(15[^4])|(17[6-8])|(18[0-9])|(145,147))\d{8}$/;
		if(oRegtel_tel.test($(this).val())){
			flag4 = 1;
			$(this).css({"border-color":"#ccc"});
			$(this).parent().find(".mesg1").hide();
		    $(this).parent().find(".mesg2").hide();
		    $(this).parent().find(".alert_log").show(); 
		}else{
			$(this).css({"border-color":"red"});
			$(this).parent().find(".mesg1").show();
			$(this).parent().find(".mesg2").hide();
		    $(this).parent().find(".alert_log").hide();
		}
		//console.log(flag4)
	})

	//短信验证；
	flag5 = 0;
	$(".tel_yz").find("input").blur(function(){
		var oRegtel_telYz = /^\d{6}$/;
		if(oRegtel_telYz.test($(this).val())){
			flag5 = 1;
			$(this).css({"border-color":"#ccc"});
		}else{
			$(this).css({"border-color":"red"});
			flag5 = 0;
		}
		//console.log(flag5)
	})
	
	//推荐码；
	var flag6 = 0; 
	$(".tui_jian").find("input").blur(function(){
		var oRegtel1_tj = /^[\da-zA-Z-_\u4e00-\u9f5a]+$/g;
		var oRegtel2_tj = /^$/;
		if(oRegtel1_tj.test($(this).val()) || oRegtel2_tj.test($(this).val())){
			flag6 = 1;
			$(this).css({"border-color":"#ccc"});
		}
		//console.log(flag6)
	})
	
	$("form").find(".i_text").blur(function(){
		if($(this).css({"border-color":"#ccc"})){
			//console.log("aaa");
		};
	})
	
    //注册；
    $("#registerBtn").click(function(){
    	if(flag1 && flag2 && flag3 && flag4 && flag5 && flag6){
    		var userName = $(".username").find("input").val();
    		var passWord = $(".psw").find("input").val();
    		$.ajax({
    			type:"get",
    			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
    			async:true,
    			data:{status:"register",userID:userName,password:passWord},
    			success:function(data){
    				$(".t_kuang").find("span").click(function(){
    					$(".mengBan").hide();
	    				$(".t_kuang").hide();
    				})
    				if(data == 0){
    					$(".mengBan").show();
	    				$(".t_kuang").show();
	    				$(".t_kuang").find("p").html("用户名已存在，请重新注册")
	    				//$(".qr_qx").hide();
	    				$(".qxBtn").click(function(){
	    					$(".mengBan").hide();
	    				    $(".t_kuang").hide();
	    				});
	    				$(".qrBtn").click(function(){
	    					$(".mengBan").hide();
	    				    $(".t_kuang").hide();
	    				});
    				}
    				if(data == 2){
    					$(".mengBan").show();
	    				$(".t_kuang").show();
	    				$(".t_kuang").find("p").html("服务器故障，请重试！")
	    				//$(".qr_qx").hide();
	    				$(".qxBtn").click(function(){
	    					$(".mengBan").hide();
	    				    $(".t_kuang").hide();
	    				});
	    				$(".qrBtn").click(function(){
	    					$(".mengBan").hide();
	    				    $(".t_kuang").hide();
	    				});
    				}
    				if(data == 1){
    					$(".mengBan").show();
	    				$(".t_kuang").show();
	    				$(".t_kuang").find("p").html("注册成功,是否登录？")
	    				$(".qxBtn").click(function(){
	    					$(".mengBan").hide();
	    				    $(".t_kuang").hide();
	    				});
	    				$(".qrBtn").click(function(){
	    					location.href = "login.html";
	    				});
    				}
    				
    			}
    		})
    	}
    })
  
	
	
	
	/****************注册验证end**************************/
	
	/*尾部显示隐藏*/
	$(".code-sm").hover(function(){
		$(this).children("div").show();
	},function(){
		$(this).children("div").hide();
	})
})
