import $ from 'jquery';
import "slick-carousel";
import noUiSlider from 'nouislider'
// import lightGallery from 'lightgallery';


// JQUERY FIX START
jQuery.event.special.touchstart = {
	setup: function (_, ns, handle) {
		this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
	},
};
jQuery.event.special.touchmove = {
	setup: function (_, ns, handle) {
		this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
	},
};
jQuery.event.special.wheel = {
	setup: function (_, ns, handle) {
		this.addEventListener("wheel", handle, { passive: true });
	},
};
jQuery.event.special.mousewheel = {
	setup: function (_, ns, handle) {
		this.addEventListener("mousewheel", handle, { passive: true });
	},
};
// JQUERY FIX END

$(function(){
	// BURGER START
	$(document).on('click', '.spectre-header__burger', function(){
		$('.spectre-header__popup').addClass('active');
	});
	$(document).on('click', '.spectre-header__popup-close', function(){
		$('.spectre-header__popup').removeClass('active');
	});
	// BURGER END


	// SLIDERS START
	$('.spectre-slider__slider').each(function(){
		let $slider = $(this),
			$items = $slider.find('.spectre-slider__item'),
			itemsLength = $items.length;

		if ( itemsLength > 1 ) {
			$slider.on('init', function(slick){
				$slider.append(`<div class="spectre-slider__pager"><span class="spectre-slider__current">1</span> / <span class="spectre-slider__total">${itemsLength}</span></div>`);
			});
			$slider.slick({
				dots: false,
				autoplay: false,
				autoplaySpeed: 15000,
				arrows: true,
				fade: true,
				infinite: true,
				pauseOnHover: false,
				rows: 0,
			});
			$slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
				$slider.find('.spectre-slider__current').text(currentSlide+1);
			});
		}
	});
	// SLIDERS END

	// CALC START
	let calc = {
		summ: 1500000,
		year: 1
	}
	let numberFormat = {
		to: function (value) {
			return value.toFixed(0);
		},
		from: function (value) {
			return Number(value);
		}
	};
	
	$('.spectre-calc__block-left-slider').each(function(){
		let $this = $(this),
			slider = $this.get(0),
			min = $this.data('min'),
			max = $this.data('max'),
			step = $this.data('step'),
			hasTooltips = ($this.hasClass('spectre-calc__block-left-slider--year')) ? true : false;

		noUiSlider.create(slider, {
			connect: [false, true],
			start: [min],
			step,
			tooltips: [hasTooltips],
			range: {
				'min': [min],
				'max': [max]
			},
			format: numberFormat
		});

		slider.noUiSlider.on('update', function(values){
			if ($this.hasClass('spectre-calc__block-left-slider--summ')) {
				calc.summ = +values[0];
				$('#spectre-calc-summ').text(formatMoney(calc.summ))
			} else if ($this.hasClass('spectre-calc__block-left-slider--year')) {
				calc.year = +values[0];
				// $('#spectre-calc-year').text(calc.year)

				// if (calc.year == 1) {
				// 	$('#spectre-calc-year-text').text('год')
				// } else if (calc.year > 1 && calc.year < 5) {
				// 	$('#spectre-calc-year-text').text('года')
				// } else {
				// 	$('#spectre-calc-year-text').text('лет')
				// }
			}

			spectreCalc();
		});
	});

	function spectreCalc() {
		var S = calc.summ;
		var n = calc.year;
		var p = calc.summ < 3000000 ? 3 : 4.7;

		if (
			typeof S != "number" ||
			typeof p != "number" ||
			typeof n != "number"
		) return false;

		p = p / 1200;
		n = n * 12;

		$('#spectre-permonth').text(formatMoney(S * p / (1 - Math.pow(1 + p, -n))));
	}
	// CALC END


	// SLIDER SOLO START
	let $slider = $('.spectre-slider1__slider'),
	$items = $slider.find('.spectre-slider1__item'),
	itemsLength = $items.length;

	if ( itemsLength > 1 ) {
		$slider.on('init', function(slick){
			$slider.append(`<div class="spectre-slider1__pager"><span class="spectre-slider1__current">1</span> / <span class="spectre-slider1__total">${itemsLength}</span></div>`);
		});
		$slider.slick({
			dots: false,
			autoplay: true,
			autoplaySpeed: 15000,
			arrows: true,
			infinite: true,
			fade: true,
			pauseOnHover: false,
			rows: 0,
		});
		$slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
			$slider.find('.spectre-slider1__current').text(currentSlide+1);
		});
	}
	// SLIDER SOLO END


	// VIDEO POPUP START
	$(document).on('click', '.spectre-video__button', function(){
		let $this = $(this),
			url = $this.data('url'),
			$popup = $this.parent().find('.spectre-video__popup');
		
		$popup.html(url).addClass('active');
	});
	$(document).on('click', function (event) {
		if ($(event.target).closest('.spectre-video__popup iframe').length || $(event.target).closest('.spectre-video__button').length) return;
		
		hideVideoPopup();
		event.stopPropagation();
	});
	$(document).on('keydown', function (event) {
		if (event.which == 27 ) {
			hideVideoPopup();
		}
	});

	function hideVideoPopup() {
		$('.spectre-video__popup').html('').removeClass('active');
	}
	// VIDEO POPUP END



	// MASK START
	$('input[name=phone]').inputmask("8(999) 999-9999");
	// MASK END


	// POPUP FORM START
	$(".spectre-popup").on("click", function (event) {
		showForm();

		event.preventDefault();
	});
	$(".spectre-popup-form__close").on("click", function (event) {
		hideForm();
		event.preventDefault();
	});
	$(document).keydown(function (event) {
		if (event.which == 27) {
			hideForm();
		}
	});
	$(document).click(function (event) {
		if ($(event.target).closest(".spectre-popup-form__wrap").length || $(event.target).closest(".spectre-popup").length || $(event.target).closest(".spectre-popup-form1__wrap").length || $(event.target).closest(".spectre-tabs__blocks-item").length) return;
		hideForm();
		event.stopPropagation();
	});

	$(".spectre-tabs__blocks-item").on("click", function (event) {
		showForm1($(this));

		event.preventDefault();
	});
	$(".spectre-popup-form1__close").on("click", function (event) {
		hideForm1();
		event.preventDefault();
	});
	$(document).keydown(function (event) {
		if (event.which == 27) {
			hideForm1();
		}
	});
	$(document).click(function (event) {
		if ($(event.target).closest(".spectre-popup-form1__wrap").length || $(event.target).closest(".spectre-tabs__blocks-item").length || $(event.target).closest(".spectre-popup-form__wrap").length || $(event.target).closest(".spectre-popup").length) return;
		hideForm1();
		event.stopPropagation();
	});

	function hideForm() {
		$("body").removeClass("spectre-overflowhidden");
		$(".spectre-popup-form").removeClass("active");
	}
	function showForm() {
		$("body").addClass("spectre-overflowhidden");
		$(".spectre-popup-form").addClass("active");
	}

	function hideForm1() {
		$("body").removeClass("spectre-overflowhidden");
		$(".spectre-popup-form1").removeClass("active");
	}
	function showForm1($item) {
		const $image = $item.find('.spectre-tabs__blocks-image').html() || '';
		const $name = $item.data('size') || '';
		const $square = $item.find('.spectre-tabs__blocks-square').text() || '';
		const $type = $item.data('type') || '';
		const $material = $item.data('material') || '';

		$("body").addClass("spectre-overflowhidden");

		$('.spectre-popup-form1__left').html($image);
		$('.spectre-popup-form1__name').html($name);
		$('.spectre-popup-form1__option--square .spectre-popup-form1__option-value').html($square);
		$('.spectre-popup-form1__option--type .spectre-popup-form1__option-value').html($type);
		$('.spectre-popup-form1__option--material .spectre-popup-form1__option-value').html($material);

		$(".spectre-popup-form1").addClass("active");
	}
	// POPUP FORM END



	// FORM SEND START
	$('.spectre-popup-form__form, .spectre-popup-form1__form, .spectre-form1-block__form, .spectre-prices__right-form').on('submit', function(){
		let $this = $(this),
			$success_block = $this.next(),
			url = $this.attr('action'),
			formData = $this.serialize();

		formAjax(url, formData, $this, $success_block)

		return false;
	});
	$('.spectre-form-block__right-form').on('submit', function(){
		let $this = $(this),
			$success_block = $this.closest('.spectre-form-block').find('.spectre-form-block__left-title--success'),
			$hide_block = $this.closest('.spectre-form-block').find('>*'),
			url = $this.attr('action'),
			formData = $this.serialize();

		formAjax(url, formData, $this, $success_block, $hide_block)

		return false;
	});
	$('.spectre-calc__block-form').on('submit', function(){
		let $this = $(this),
			$success_block = $('.spectre-calc__block-form-title--success, .spectre-calc__block-form'),
			$hide_block = $('.spectre-calc__block-form > *'),
			url = $this.data('action'),
			formData = $this.serialize();

		formAjax(url, formData, $this, $success_block, $hide_block)

		return false;
	});

	function formAjax(url, formData, $form, $success_block, $hide_block) {
		ym(86694763,'reachGoal','zayavka')

		$.ajax({
			type: 'post',
			url,
			data: formData,
			success: function(data) {
				$form.hide();

				if ($hide_block) {
					$hide_block.hide();
				}

				$success_block.show();
			},
			error: function(data) {
				console.error(data)
			}
		});
	}
	// FORM SEND END



	// LINKTOP START
	$(window).scroll(function(){
		if ($(this).scrollTop() >= 200 ) {
			$('.spectre-footer__linktop').addClass('active');
		} else {
			$('.spectre-footer__linktop').removeClass('active');
		}
	});
	// LINKTOP END


	// ANCHOR MENU START
	$(".spectre-header__popup-menu a, .spectre-main-block__downbutton, .spectre-info__buttonwrap-button, .spectre-footer__linktop").on(
		"click",
		function (event) {
			let position = $(this.hash).offset().top;

			if ($("body").width() < 1200) {
				position = position - 60;
			} else {
				if (this.hash == '#main') {
					position -= 50;
				} else if (this.hash == '#ipoteka' || this.hash == '#properties' || this.hash == '#products') {
					position -= 20;
				}
			}

			$("html, body").animate({ scrollTop: position }, 800);

			$(".spectre-header__popup").removeClass("active");
			$("body").removeClass("spectre-overflowhidden");

			event.preventDefault();
		}
	);
	// ANCHOR MENU END



	// TABS START
	$(document).on('click', '.spectre-tabs__nav-item:not(.active)', function(){
		let $this = $(this),
			index = $this.index(),
			$body = $this.closest('.spectre-tabs').find('.spectre-tabs__blocks-block').eq(index);
		
		$this.addClass('active');
		$this.siblings().removeClass('active');

		$body.addClass('active');
		$body.siblings().removeClass('active');
	});
	$(document).on('click', '.spectre-tabs__blocks-button', function(){
		var $this = $(this),
			$button = $this,
			$allItems = $this.closest('.spectre-tabs__blocks-block').find('.spectre-tabs__blocks-item'),
			$items = $this.closest('.spectre-tabs__blocks-block').find('.spectre-tabs__blocks-item:not(:visible)');
		
		if($button.hasClass('active')) {
			$button.text('Показать еще');
			$button.removeClass('active');
			$allItems.removeAttr('style');
		} else {

			if ($items.length) {
				$items.each(function(index){
					var $this = $(this);

					if (index < 9) {
						$(this).css('display', 'flex');
					}

					$items = $this.closest('.spectre-tabs__blocks-block').find('.spectre-tabs__blocks-item:not(:visible)')

					if(!$items.length) {
						$button.text('Скрыть');
						$button.addClass('active');
					}
				});
			} else {
				$button.text('Скрыть');
				$allItems.css('display', 'flex');
			}
		}

		// if ($this.hasClass('active')) {
		// 	$this.text('Скрыть');
		// 	$items.css('display', 'flex');
		// } else {
		// 	$this.text('Показать еще');
		// 	$items.removeAttr('style');
		// }
	});
	/*$('.spectre-tabs__blocks-image').each(function(){
		 lightGallery($(this).get(0), {
			counter: false
		});
	});*/
	// TABS END



	// MAP START
	function init2Gis() {
		let map;

		DG.then(function () {
			const zoom = $('body').width() > 960 ? 14 : 13;
			map = DG.map('map', {
				center: [54.933891, 83.204766],
				zoom,
				dragging : true,
				touchZoom: false,
				scrollWheelZoom: false,
				doubleClickZoom: false,
				boxZoom: false,
				geoclicker: false,
				zoomControl: false,
				fullscreenControl: false
			});

			const mainMarker = setMarkers(
				map,
				[[83.204766, 54.933891]],
				'images/dist/logo_m.svg', true
			)
			const type1 = setMarkers(
				map,
				[[83.193248, 54.937238], [83.179217, 54.943088], [83.180829, 54.938492], [83.192167, 54.937654], [83.177916, 54.938096], [83.179511, 54.939221], [83.184513, 54.942459], [83.185413, 54.940543], [83.191527, 54.944000]],
				'images/dist/comp1.svg'
			)
			const type2 = setMarkers(
				map,
				[[83.188485, 54.935766], [83.192112, 54.938528], [54.945932, 83.206547], [54.945601, 83.189801]],
				'images/dist/comp2.svg'
			)
			const type3 = setMarkers(
				map,
				[[83.190377, 54.937737], [83.189960, 54.939897], [83.189636, 54.941630], [83.195156, 54.944096], [83.185110, 54.942125], [83.187903, 54.940673]],
				'images/dist/comp3.svg'
			)
			const type4 = setMarkers(
				map,
				[[83.191541, 54.934630], [54.937306, 83.192168], [54.940072, 83.185070], [54.941547, 83.189524], [54.944800, 83.199850]],
				'images/dist/comp4.svg'
			)
			const type5 = setMarkers(
				map,
				[[83.197201, 54.938433], [83.190221, 54.937057], [54.938367, 83.197247], [54.940720, 83.174577]],
				'images/dist/comp5.svg'
			)
			const type6 = setMarkers(
				map,
				[[83.202654, 54.934222], [54.935853, 83.193466], [54.937847, 83.198905], [54.940003, 83.180329], [54.940003, 83.180329], [54.937869, 83.199016], [54.941439, 83.186656]],
				'images/dist/comp6.svg'
			)
			const type7 = setMarkers(
				map,
				[[54.937769, 83.192174] ],
				'images/dist/comp7.svg'
			)
			const type8 = setMarkers(
				map,
				[[83.191037, 54.936409], [54.941439, 83.186656], [54.939101, 83.188335], [54.939101, 83.188335], [54.941401, 83.190082], [54.943232, 83.190270], [54.942352, 83.184342]],
				'images/dist/comp8.svg'
			)
			const type9 = setMarkers(
				map,
				[[83.189865, 54.935236], [83.190510, 54.936281], [83.191115, 54.937813], [54.940571, 83.201450], [54.943191, 83.179195], [54.945523, 83.206432], [54.945192, 83.198332], [54.942449, 83.184714], [54.939560, 83.189982]],
				'images/dist/comp9.svg'
			)
			// const type10 = setMarkers(
			// 	map,
			// 	[[54.938194, 83.193311], [54.938957, 83.194467], [54.938508, 83.190686], [54.940288, 83.187093], [54.940989, 83.186332], [54.938333, 83.186690], [54.942361, 83.179343], [54.939803, 83.178904], [54.939803, 83.178904], [54.941871, 83.191618], [54.942993, 83.180027], [54.941884, 83.222453]],
			// 	'images/dist/comp10.svg'
			// )
			const type11 = setMarkers(
				map,
				[[83.192274, 54.934596], [54.937970, 83.181101], [54.945036, 83.190365], [54.940161, 83.185081]],
				'images/dist/comp11.svg'
			)
			const type12 = setMarkers(
				map,
				[[83.204844, 54.934277], [83.202920, 54.934689], [54.937309, 83.183821], [54.933692, 83.185303], [54.944492, 83.198898]],
				'images/dist/comp12.svg'
			)
			const type13 = setMarkers(
				map,
				[[83.167767, 54.929303], [83.190574, 54.937137], [54.941890, 83.190735]],
				'images/dist/comp13.svg'
			)
			const type14 = setMarkers(
				map,
				[[83.190933, 54.936937], [83.187923, 54.940724], [54.934715, 83.189491], [54.936731, 83.190698], [54.937481, 83.197699], [54.939497, 83.194705], [54.939510, 83.189636], [54.940636, 83.187898], [54.941081, 83.185097]],
				'images/dist/comp14.svg'
			)

			function removeAllMarkers() {
				// const groups = [
				// 	type1, type2, type3, type4, type5, type6, type7, type8, type9, type10, type11, type12, type13, type14
				// ]
				const groups = [
					type1, type2, type3, type4, type5, type6, type7, type8, type9, type11, type12, type13, type14
				]

				groups.forEach(group => group.removeFrom(map))
			}

			$('.spectre-map__nav-item').click(function() {
				if ( $(this).hasClass('spectre-map__nav-item--all') ) {
					$('.spectre-map__nav-item').removeClass('active');
				} else {
					$(this).siblings().removeClass('active');
					$(this).addClass('active');
				}
			})
			$('.spectre-map__nav-item--type1').click(function () {
				removeAllMarkers()
				type1.addTo(map);
			})
			$('.spectre-map__nav-item--type2').click(function () {
				removeAllMarkers()
				type2.addTo(map);
			})
			$('.spectre-map__nav-item--type3').click(function () {
				removeAllMarkers()
				type3.addTo(map);
			})
			$('.spectre-map__nav-item--type4').click(function () {
				removeAllMarkers()
				type4.addTo(map);
			})
			$('.spectre-map__nav-item--type5').click(function () {
				removeAllMarkers()
				type5.addTo(map);
			})
			$('.spectre-map__nav-item--type6').click(function () {
				removeAllMarkers()
				type6.addTo(map);
			})
			$('.spectre-map__nav-item--type7').click(function () {
				removeAllMarkers()
				type7.addTo(map);
			})
			$('.spectre-map__nav-item--type8').click(function () {
				removeAllMarkers()
				type8.addTo(map);
			})
			$('.spectre-map__nav-item--type9').click(function () {
				removeAllMarkers()
				type9.addTo(map);
			})
			// $('.spectre-map__nav-item--type10').click(function () {
			// 	removeAllMarkers()
			// 	type10.addTo(map);
			// })
			$('.spectre-map__nav-item--type11').click(function () {
				removeAllMarkers()
				type11.addTo(map);
			})
			$('.spectre-map__nav-item--type12').click(function () {
				removeAllMarkers()
				type12.addTo(map);
			})
			$('.spectre-map__nav-item--type13').click(function () {
				removeAllMarkers()
				type13.addTo(map);
			})
			$('.spectre-map__nav-item--type14').click(function () {
				removeAllMarkers()
				type14.addTo(map);
			})
			$('.spectre-map__nav-item--all').click(function () {
				removeAllMarkers()
				mainMarker.addTo(map);
				type1.addTo(map);
				type2.addTo(map);
				type3.addTo(map);
				type4.addTo(map);
				type5.addTo(map);
				type6.addTo(map);
				type7.addTo(map);
				type8.addTo(map);
				type9.addTo(map);
				// type10.addTo(map);
				type11.addTo(map);
				type12.addTo(map);
				type13.addTo(map);
				type14.addTo(map);
			})
		});
	}

	function setMarkers(map, coords, iconUrl, main = false) {
		var iconSize = [28, 28];
		if (main) {
			iconSize = [62, 62];
		}
		coords.forEach( function(item){
			if (item[0] < 60 ) {
				item.reverse();
			}
		});
		const markers = DG.featureGroup()
		coords.forEach(c => DG.marker([c[1], c[0]], {icon: DG.icon({iconUrl: iconUrl, iconSize: iconSize})}).addTo(markers))
		markers.addTo(map);

		return markers
	}
	
	init2Gis()
	// MAP END



	// ACTIVE MENU START
	let scrollingBlocks = document.querySelectorAll('.spectre-section');

	let leftMenu = document.querySelector('.anchor-menu'),
		menuItems = leftMenu.querySelectorAll('a');

	window.addEventListener('scroll', function () {
		let windowTop = window.scrollY;

		scrollingBlocks.forEach(function (item) {
			let topPosition = item.offsetTop - 20,
				bottomPosition = topPosition + item.clientHeight;

			if (windowTop >= topPosition && windowTop <= bottomPosition && !item.classList.contains('active')) {
				let id = $(item).attr('id');
				let scrollingBlocksSiblings = document.querySelectorAll('.spectre-section:not(#'+id+')');

				item.classList.add('active')
				$(scrollingBlocksSiblings).removeClass('active');

				let linkHref = item.id;
				$('.spectre-header__popup-menu a').removeClass('active');
				$('.spectre-header__popup-menu a[href="#'+linkHref+'"]').addClass('active');
			}
		});
	});
	// ACTIVE MENU END



	function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = " ") {
		try {
			decimalCount = Math.abs(decimalCount);
			decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
	
			const negativeSign = amount < 0 ? "-" : "";
	
			let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
			let j = (i.length > 3) ? i.length % 3 : 0;
	
			return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
		} catch (e) {
			console.log(e)
		}
	};
});
