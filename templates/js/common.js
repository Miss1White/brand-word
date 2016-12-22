$(function(){

	window.report={
		resultList:'',
		loadNext:false,
		searchInput:"",
		params:{
        },
		init:function(){
			this.event();
		},
		event:function(){
			var _this=this;

			var height = window.scrollMaxY || window.innerHeight;
          	document.querySelector('.container').style.minHeight = height - 30 + 'px';

          	//iphone绑定active
			var a = document.getElementsByTagName('a');
			for(var i = 0; i < a.length; i++)
			{
			  a[i].addEventListener('touchstart',function(){},false);
			}


			$(".search-btn").on("click",function(){
				$(".content-bottom").show();
				$('html,body').animate({scrollTop:$('.content-bottom').offset().top}, 800)
			})
			$(".search-icon").on('click',function(){
				_this.searchInput=$.trim($(".search-bar input").val())
				_this.params={
	                'param' : _this.searchInput,
	                'pageSize':'20',
	                'currentPage':0,
	                'country':1,
	                'device':0
				}
				_this.loadNext=false;
				$(".result-list").html("");
				_this.loadMore();
			})
			$(document).on('scroll',function(){
				var bheight = $(window).height();//获取窗口高度
				var sheight = $("body")[0].scrollHeight;//获取滚动条高度，[0]是为了把jq对象转化为js对象
				var stop = $("body").scrollTop();//滚动条距离顶部的距离
				if(stop==sheight-bheight && _this.loadNext){//当滚动条到顶部的距离等于滚动条高度减去窗口高度时
					console.log(22);
					_this.loadMore();
				}
			});
		},
		loadMore:function(){
			var _this=this;
	        _this.params.currentPage++;
			_this.resultList='';
			
			$.ajax({
				url:'/search',
				type:'GET',
				data:_this.params,
				beforeSend:function(){
					$(".search .loading").show();
				},
				success:function(data){
					$(".search .loading").hide();
					if(500 == data.status){
						_this.resultList='<div class="chartPlace" style="width:100px;height:30px;margin:30px auto;font-size:10px;">没有搜索到结果,<br>请搜索其他APP!</div>'
					}else{
						for(var i=0 ;i <data.length-2;i++){
							_this.resultList+='<div class="result-one">\
										<div class="result-one-icon">\
											<img src="'+data[i].icon+'">\
										</div>\
										<div class="app-info">\
											<span>'+data[i].title+'</span>\
											<span>'+data[i].developer+'</span>\
										</div>\
										<div class="go-into">\
											<a href="/grab?appId='+data[i].appId+'">抢了谁</a>\
											<a href="/begrab?appId='+data[i].appId+'">被谁抢</a>\
										</div>\
								</div>';
						}
						if(data[data.length-1] && data[data.length-1].appcount == 20){
							_this.loadNext=true;
						}
					}
					$(".result-list").append(_this.resultList);

				}
			})
		},
		errorImg:function errorImg(img){
			img.src="../images/lazyLoad.png";
			img.onerror = null;
		}
	}
	window.report.init();

	
	
});
	function validateForm(){
		window.report.searchInput=$.trim($(".search-bar input").val())
		window.report.params={
            'param' : window.report.searchInput,
            'pageSize':'20',
            'currentPage':0,
            'country':1,
            'device':0
		}
		window.report.params.loadNext=false;
		$(".result-list").html("");
		window.report.loadMore();
		$(".search-bar input").blur();
		return false;
	}
