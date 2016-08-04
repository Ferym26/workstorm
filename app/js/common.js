$(document).ready(function() {

	//Animate.scss + WayPoints JS plugin with settings in sass	
	(function($) {
		$.fn.animated = function(animName) {
			$(this).each(function() {
				var ths = $(this);			
				$(this).css("opacity", "0").addClass("animated").waypoint(function(dir) {
					ths.addClass(animName);
				}, {
				 offset: '80%'
				});

			});	 		
		};
	})(jQuery);

	//Init animation
	// .item - target item
	// animation-name - class from _animation.sass
	$(".item").animated("animation-name");
	

	//Переход по якорям
	/**/



	//прокрутка страницы вверх
	$('#btnUp').click(function() {
		$('html, body').animate({scrollTop: 0}, 500);
		return false;
	});


	//Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));


	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};


	//E-mail Ajax Send
	$("#form1").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});


	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};


});
