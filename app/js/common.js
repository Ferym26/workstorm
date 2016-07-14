$(document).ready(function() {

	//Animate CSS + WayPoints javaScript Plugin
	//Example: $(".element").animated("zoomInUp");
	//Author URL: http://webdesign-master.ru
	// (function($) {
	// 	$.fn.animated = function(inEffect) {
	// 		$(this).each(function() {
	// 			var ths = $(this);
	// 			ths.css("opacity", "0").addClass("animated").waypoint(function(dir) {
	// 				if (dir === "down") {
	// 					ths.addClass(inEffect).css("opacity", "1");
	// 				};
	// 			}, {
	// 				offset: "90%"
	// 			});

	// 		});
	// 	};
	// })(jQuery);

	//var element = $(".elementClass");
	//var waypoints =  element.css("opacity", "0").waypoint(function(direction) {
	//	element.addClass("animated anim-title3");
	//}, {
	//  offset: '75%'
	//});
	

	//Переход по якорям
	/**/



	//прокрутка страницы вверх
	$('#btnUp').click(function() {
		$('html, body').animate({scrollTop: 0}, 500);
		return false;
	});

	//Запуск анимаций
	// var waypoint = new Waypoint({
	// 	element: document.getElementById('anim1'),
	// 	handler: function(direction) {
	// 		$("#anim1").addClass("anim1");
	// 	},
	// 	offset: "80%"
	// })





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
