
$(document).ready(function(){
	// blue, green, orange, red
	let colorList = ['#4990E2', '#9BC8A2', '#FAC990', '#ED7474'];
	let sectionIds = ['#preface', '#getting-ready', '#crew-wave', '#socializing', '#anti-social', '#partys-over', '#film'];
	let hiddenNav = false;
	let navFirstShown = false;


	startMouseAnimation();
	createVideo();


	centerGradient('.gradient');
	window.addEventListener('resize', throttle(function(ev) {
		// callback
		centerGradient('.gradient');
	}, 10));


	window.addEventListener('scroll', throttle(function(ev) {
		let percents = [];
		sectionIds.forEach(function(id){
			let section = document.getElementById(id);
			percents.push(percentOfView(id));
		});

		let index = indexOfMax(percents);
		let id = sectionIds[index];

		$('.nav-container a').addClass('inactive');
		$(id+'-nav').removeClass('inactive');

		// show nav one first scroll
		if(!navFirstShown && id != '#preface') {
			$('.nav-container').addClass('unhide');
			navFirstShown = true;
		}

		// hide and show nav based on preface section scroll point
		let abovePreface = ($(window).scrollTop() < ($('#preface').offset().top - 90));
		if(navFirstShown && !hiddenNav && abovePreface){
			$('.nav-container').removeClass('unhide');
			hiddenNav = true;
		} else if (navFirstShown && hiddenNav && !abovePreface) {
			$('.nav-container').addClass('unhide');
			hiddenNav = false;
		}
		

	}, 12));


	// set navigation scrolling
	$('.nav-container a').each(function(){
		$(this).click(function(e){
			e.preventDefault();
			let href = $(this).attr('href');
			$('html,body').animate({scrollTop: $(href).offset().top - 80},'slow');
		});
	});


	// run through colors for link underline
	$('.credits a').hover(function(){

		// hover in
		let color = colorList.shift();
		colorList.push(color);
		$(this).css('border-bottom', '2px solid'+color);

	}, function(){
		// hover out 
		$(this).css('border-bottom', '2px solid rgba(0,0,0,0.1)');
	});

});

function percentOfView(tag) {
	
    let height = $(tag).height();
    let scrollTop = $(window).scrollTop();
    let offsetToTop = $(tag).offset().top;
    let windowHeight = $(window).height();

    if(offsetToTop >= scrollTop) {
    	let inView = windowHeight - (offsetToTop - scrollTop);
	    let percentage = (inView / height) * 10;

	    return percentage > 0 ? percentage : 0;

    } else {	// offsetToTop < scrollTop

    	let inView = height - (scrollTop - offsetToTop);
    	let percentage = (inView / height) * 10;

    	return percentage > 0 ? percentage : 0;
    }
}


function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


function startMouseAnimation(){
	var mouseAnimation = {"v":"4.5.9","fr":29.9700012207031,"ip":0,"op":70.0000028511585,"w":400,"h":400,"ddd":0,"assets":[{"id":"image_0","w":34,"h":34,"u":"img/gassed/","p":"img_0.png"},{"id":"image_1","w":200,"h":331,"u":"img/gassed/","p":"img_1.png"}],"layers":[{"ddd":0,"ind":0,"ty":2,"nm":"Ball","refId":"image_0","ks":{"o":{"a":1,"k":[{"i":{"x":[0.569],"y":[0.569]},"o":{"x":[0.198],"y":[0.198]},"n":["0p569_0p569_0p198_0p198"],"t":0,"s":[100],"e":[100]},{"i":{"x":[0.703],"y":[1]},"o":{"x":[0.323],"y":[0.304]},"n":["0p703_1_0p323_0p304"],"t":18,"s":[100],"e":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"n":["0p833_0p833_0p167_0p167"],"t":32,"s":[0],"e":[0]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"n":["0p833_1_0p167_0"],"t":41,"s":[0],"e":[100]},{"t":53.0000021587343}]},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.696,"y":1},"o":{"x":0.167,"y":0.167},"n":"0p696_1_0p167_0p167","t":11,"s":[200.003,111.301,0],"e":[200.003,166.301,0],"to":[0,9.16666698455811,0],"ti":[0,8.47726539632276e-7,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0},"n":"0p833_0p833_0p167_0","t":37,"s":[200.003,166.301,0],"e":[200.003,111.301,0],"to":[0,-0.00000114339196,0],"ti":[0,9.16666793823242,0]},{"t":39.0000015885026}]},"a":{"a":0,"k":[16.902,16.903,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"ip":0,"op":899.000036617021,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":1,"ty":2,"nm":"Mouse","refId":"image_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[200,200.777,0]},"a":{"a":0,"k":[99.934,165.398,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"ip":-12.00000048877,"op":887.000036128251,"st":-12.00000048877,"bm":0,"sr":1}]};
    var params = {
        container: document.getElementById('mouse'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: mouseAnimation
    };

    var anim;
    anim = bodymovin.loadAnimation(params);
}

// using video.js
function createVideo(){
	var $refreshButton = $('#refresh');
	var $results = $('#css_result');

	function refresh(){
		var css = $('style.cp-pen-styles').text();
		$results.html(css);
	}

	refresh();
	$refreshButton.click(refresh);

	// Select all the contents when clicked
	$results.click(function(){
		$(this).select();
	});
}

// centering the graidents
function centerGradient(tag){
	let parentBox = $(tag).parent();
	let left = parentBox.offset().left + 4;
	$(tag).css('margin-left', '-' + left + 'px');
}


function throttle(fn, delay) {
	var allowSample = true;

	return function(e) {
		if (allowSample) {
			allowSample = false;
			setTimeout(function() { allowSample = true; }, delay);
			fn(e);
		}
	};
}












