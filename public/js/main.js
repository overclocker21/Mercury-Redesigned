(function ($) {
	"use strict"

	// Smooth scroll for "What we offer"
	$(".home-content a[href='#service'] > .white-btn").on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $("#service").offset().top
		}, 600);
	});

	// Smooth scroll for "Contact"
	$(".home-content a[href='#contact'] > .main-btn").on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $("#contact").offset().top
		}, 600);
	});

	// Universal smooth scroll for nav bar links
	$("#nav .main-nav a[href^='#']").on('click', function (e) {
		e.preventDefault();
		var hash = this.hash;
		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 600);
	});

	$('#back-to-top').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	// Btn nav collapse
	$('#nav .nav-collapse').on('click', function () {
		$('#nav').toggleClass('open');
	});

	// Mobile dropdown
	$('.has-dropdown a').on('click', function () {
		$(this).parent().toggleClass('open-drop');
	});

	$(document).on('click', '.focus-select', function () {
		$(this).select();
	});

	// On Scroll
	$(window).on('scroll', function () {
		var wScroll = $(this).scrollTop();

		// Fixed nav
		wScroll > 1 ? $('#nav').addClass('fixed-nav') : $('#nav').removeClass('fixed-nav');

		// Back To Top Appear
		wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut();
	});

	$('#back-to-top').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	$(document).ready(function () {
		$('.alerts').css("display", "none");
	});

	$(document.body).on("submit", ".contact-form", function (e) {

		e.preventDefault();

		let name = $('input[placeholder="Name"]').val();
		let email = $('input[placeholder="Email"]').val().trim();
		let subject = $('input[placeholder="Subject"]').val();
		let message = $('textarea[placeholder="Message"]').val();

		return fetch('/email', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
		}).then(function (response) {
			console.log(response);

			if (response.status === 200) {
				$('#alert-success').css("display", "block");

				setTimeout(function () {
					$('#alert-success').fadeOut();
				}, 3000);

			} else {
				$('#alert-danger').css("display", "block");

				setTimeout(function () {
					$('#alert-danger').fadeOut();
				}, 3000);
			}
		});
	});

})(jQuery);