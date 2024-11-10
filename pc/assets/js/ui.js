if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
var H5 = H5 || {};
H5 = {
	/* 페이지 로드함수 */
	init : function(){
		var funcThis = this;
		$(function(){
			if(touchstart){
				$("html").addClass("touchmode");
			}else{
				$("html").removeClass("touchmode");
			}
			funcThis.dimLayerControl();
			funcThis.layerCommon();
		});
		$(window).on("load",function(){
		});
	},
	layerCommon : function(){
		var $hlog_target = $(".hlog_target"),
			$hlog_layer = $(".hlog_layer"),
			$util_haslayer_item = $(".util_haslayer_item");
		$hlog_target.on("click",function(){
			var $this = $(this),
				$t_n = $this.next(".hlog_layer");
			$this.toggleClass("active");
			$t_n.slideToggle();
			//$util_haslayer_item.click();
			//$(".utilmenu_layer").slideUp();
		});
		$util_haslayer_item.on("click",function(e){
			e.preventDefault();
			var $this = $(this),
				$t_child = $this.find(".utilmenu_layer");
			$t_child.fadeToggle();
			//$hlog_target.click();
		});
		$(document).on("click",function(e){
			/* if(!$(e.target).parents(".hlogdata").length){
				$hlog_target.removeClass("active");
				$hlog_layer.slideUp();
			}else if(!$(e.target).parents(".util_haslayer_item").length){
				$(e.target).find(".utilmenu_layer").slideUp();
			} */
			/* if(!$(e.target).closest(".hlogdata , util_haslayer_item").length){
				$hlog_target.removeClass("active");
				$hlog_layer.slideUp();
				$(e.target).find(".utilmenu_layer").slideUp();
			} */
			if(!$(e.target).closest(".hlogdata").length){
				$hlog_target.removeClass("active");
				$hlog_layer.slideUp();
			}
			if(!$(e.target).closest(".util_haslayer_item").length){
				$(".utilmenu_layer").fadeOut();
			}
		});

		function leftMenu(){
			const gnb_li = $(".gnb_list > li");
			const gnb_zone = $(".gnb_zone");
			const gnb_one = $(".gnb_one");
			const page_wrap = $(".page_wrap");
			const btn_depth_toggle = $(".btn_depth_toggle");
			const acc_item = $(".acc_one,.acc_two");
			const acc_one = $(".acc_one");
			const acc_two = $(".acc_two");
			const acc_three = $(".acc_three");
			let left_dim = null;
			let opentTime = 0;
			let closeTime = 0;
			if(gnb_zone.length && $(".left_dim").length === 0){
				page_wrap.append("<div class='left_dim' />");
				left_dim = $(".left_dim");
			}
			gnb_one.on("click",function(e){
				const thisItem = $(this);
				const thisParent = thisItem.closest("li");
				const thisGnb = thisParent.find(".gnb_depth_wrap");

				if(thisGnb.length){
					e.preventDefault();
				}

				gnb_li.not(thisParent).removeClass("active");

				thisParent.toggleClass("active");
				left_dim.fadeToggle();
				thisGnb.addClass("active");

				if(thisParent.hasClass("active")){
					openMotionPanel(thisGnb);
				}else{
					closePanel(thisGnb);
				}
			});
			
			btn_depth_toggle.on("click",function(){
				const thisItem = $(this);
				const thisParent = thisItem.closest("li");
				const thisGnb = thisParent.find(".gnb_depth_wrap");
				
				closePanel(thisGnb);
				thisParent.removeClass("active");
				left_dim.fadeOut();
			});
			
			acc_item.on("click",function(){
				const thisItem = $(this);
				const thisParent = thisItem.closest("li");
				
				thisParent.toggleClass("active");
			});
			
			left_dim.on("click",function(){
				closePanel($(".gnb_depth_wrap.active"));
				gnb_li.removeClass("active");
				left_dim.fadeOut();
			});
			function openMotionPanel(gnb){
				if(opentTime){
					clearTimeout(opentTime);
				}
				opentTime = setTimeout(()=>{
					gnb.addClass("motion");
				},20);
			}
			function closePanel(gnb){
				if(closeTime){
					clearTimeout(closeTime);
				}	
				gnb.removeClass("motion");
				closeTime = setTimeout(()=>{
					gnb.removeClass("active");
				},520);
			}
		}
		leftMenu();
	},
	dimLayerControl : function(){
		var thisUI = this;
		$(document).on("click",".btn_layerclose , .closetrigger",function(){
			thisUI.dimLayerHide($(this).parents(".dimlayer_z"));
		});
	},
	dimLayerShow : function(target,callback){
		$(function(){
			action(target,callback);
		});
		function action(target,callback){
			var $target = $(target),
				$t_layer_td = null,
				$t_layer_tit_low = null,
				$t_layer_tit_low_height = 0,
				$t_layer_td_cssptd = 0,
				$t_layer_td_csspbd = 0,
				$t_btn_lysm_w = null,
				$t_btn_lysm_w_height = 0,
				$t_layer_cont = null,
				$t_layer_box = null,
				$t_layer_box_height = 0;
			
			$(".dimlayer_z").hide();
			$target.show();
			setTimeout(function(){
				$t_layer_td = $target.find(".dimlayer_td");
				$t_layer_td_cssptd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-top")) : 0;
				$t_layer_td_csspbd = $t_layer_td.length ? parseInt($t_layer_td.css("padding-bottom")) : 0;
				$t_layer_box = $target.find(".layer_box");
				$t_layer_box_height = $t_layer_box.length ? $t_layer_box.outerHeight() : 0;
				
				boxHeight();
				
				if($t_layer_box_height+$t_layer_td_cssptd+$t_layer_td_csspbd > $(window).height()){
					$("html,body").addClass("touchDis");
				}
				$(window).on("resize",function(){
					boxHeight();
				});
				if(callback){
					callback();
				}
			},50);
			
			function boxHeight(){
				$t_layer_tit_low = $target.find(".layer_tit_low");
				$t_layer_tit_low_height = $t_layer_tit_low.length ? $t_layer_tit_low.outerHeight() : 0;
				$t_btn_lysm_w = $target.find(".btn_lysm_w");
				$t_btn_lysm_w_height = $t_btn_lysm_w.length ? $t_btn_lysm_w.outerHeight() : 0;
				$t_layer_cont = $target.find(".layer_cont");
				$t_layer_cont.css("max-height",$(window).height() - ($t_layer_td_cssptd+$t_layer_td_csspbd+$t_btn_lysm_w_height+$t_layer_tit_low_height));
			}
		}
		function getScrollBarWidth() {
		    var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		        widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
		    $outer.remove();
		    return 100 - widthWithScroll;
		};
	},
	dimLayerHide : function(target){
		$(function(){
			action(target);
		});
		
		function action(target){
			var $target = $(target);
			$(".dimlayer_z").hide();
			$target.hide();
			$("html,body").removeClass("touchDis");
		}
	},
	sctabFunc : function(){
		var $sctab_z = $(".sctab_z");
		$sctab_z.each(function(){
			var $t_sctab_z = $(this),
				$t_sccont_w = $(".sccont_w",$t_sctab_z),
				$t_sccont = $(".sccont",$t_sctab_z),
				$t_sctab_td = $(".sctab_td",$t_sctab_z);
			$t_sctab_td.on("click",function(e){
				var $this = $(this),
					$t_target = $($this.attr("href"));
				e.preventDefault();
				$t_sctab_td.removeClass("active");
				$this.addClass("active");
				if($t_target.length){
					$t_sccont.hide();
					$t_target.show();
				}
			});
		});
	},
	tabDrag(target,callback){
		const tabContainer = document.querySelectorAll(target);
		if(tabContainer.length){
			tabContainer.forEach((domContainer)=>{
				let isDragging = false;
				let startX;
				let scrollLeft;
		
				domContainer.addEventListener('mousedown', (e) => {
					isDragging = true;
					domContainer.classList.add('active');
					startX = e.pageX - domContainer.offsetLeft;
					scrollLeft = domContainer.scrollLeft;
				});
		
				domContainer.addEventListener('mouseleave', () => {
					isDragging = false;
				});
		
				domContainer.addEventListener('mouseup', () => {
					isDragging = false;
				});
		
				domContainer.addEventListener('mousemove', (e) => {
					if (!isDragging) return;
					e.preventDefault();
					const x = e.pageX - domContainer.offsetLeft;
					const walk = (x - startX) * 2; // 드래그 속도 조절
					domContainer.scrollLeft = scrollLeft - walk;
				});
		
				domContainer.addEventListener('click', (e) => {
					if (!isDragging) { // 드래그 중이 아닐 때만 탭 클릭 동작
						if (e.target.classList.contains('sc_tab')) {
							if(callback){
								callback(e.target);
							}
							
							// 원하는 액션 추가
						}
					}
				});
			});
		}
	}
};
H5.init();