$(function(){
	//获取商品id；
	var str = location.search;
	var proId = str.split("=")[1];
	var curnum = str.split("=")[2]
	
	$.get("json/json-floor.json",function(data){
		for(var s=0;s<data.length;s++){
			var $data = data[s];
			for(var j in $data.cnt.m){
				if($data.cnt.m[j].id == proId){
					$(".fl_box").append('<div class="pic"><a href="detail.html?id='+$data.cnt.m[j].id+'"><img src="'+$data.cnt.m[j].mImgsrc+'" alt="" /></a></div><div class="txt"><p class="pro_name"><a href="detail.html?id='+$data.cnt.m[j].id+'">'+$data.cnt.m[j].title+'</a></p><p class="pro_num"><span>版本:<i>A成人款750g</i></span><span>数量:<em class="pNum">'+curnum+'</em></span></p></div>');
                    //$(".fl_box").append('')
				}
			}
		}
		console.log(proId)
		$(".fh").click(function(){
			location.href = "detail.html?id="+proId+""
			
		})
		
		//top购物车；
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
		
		//console.log(curnum);
		
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
		
		
	})
})
