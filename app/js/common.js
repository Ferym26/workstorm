$(document).ready(function() {

	//Слайдер
	$(".owl-carousel").owlCarousel({
		loop: true,
		margin: 10,
		nav: true,
		dots: true,
		navText: [],
		responsiveClass: true,
		touchDrag: false,
		responsive:{
			0:{
					items:1
			},
			768:{
					items:2
			},
			1200:{
					items:3
			}
		}
	});

	//Tabs
	$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('.tabs').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});


	//Animate.scss + WayPoints JS plugin with settings in sass
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
	//Init animation
	// .item - target item
	// animation-name - class from _animation.sass
	$(".item").animated("animation-name");
	

	//Переход по якорям
	//Функция плавности (easing) http://easings.net/ru#
	$("a.menuLink").click(function() {
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + "px"
		}, {
			duration: 1000,
			easing: "easeOutCubic"
		});
		return false;
	});


	//переключатель active
	$(".class").click(function() {
		$(".class").removeClass("active");
		$(this).addClass("active")
	});


	//прокрутка страницы вверх
	$('#js_btnUp').click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, {
			duration: 1000,
			easing: "easeOutQuart"
			});
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

	console.log("All fine, Dude!");

});
