app.config(function ($translateProvider) {
	$translateProvider.useStaticFilesLoader({
		prefix: '/languages/',
		suffix: '.json'
	});
	$translateProvider.use('en');
});
app.controller('translateCont', function ($scope, $translate) {
	$scope.changeLanguage = function (key) {
		$translate.use(key);

		var en = document.getElementById("lang-en");
		var ar = document.getElementById("lang-ar");

		if (key === "ar") {

			ar.classList.add("animated");
			ar.classList.add("zoomIn");
			ar.classList.add("hide");
			
			en.classList.remove("hide");
			document.getElementById('theme-stylesheet').href='links/css/style.blue-rtl.css';
			body.classList.remove("fadeIn");
			body.classList.add("fadeInRight");


			
		}
		else if (key === "en") {
			en.classList.add("animated");
			en.classList.add("zoomIn");
			en.classList.add("hide");
			ar.classList.remove("hide");
			document.getElementById('theme-stylesheet').href='links/css/style.blue.css';
			document.getElementById('theme-bs').href='links/vendor/bootstrap/css/bootstrap.min.css';
			body.classList.remove("fadeIn");
			body.classList.add("fadeInRight");
		}

	};
});