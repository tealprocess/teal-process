
$(document).ready(function(){

	// some set up
	setSoundControls();
	createThoughtScroller();

	// sideways scroller for found artifacts
	centerSideScroller('ak');
	window.addEventListener('resize', throttle(function(ev) {
		centerSideScroller('ak');
	}, 10));


  $(document).mousemove(function(e) {
      let mx = e.pageX;
      let my = e.pageY;

			updateThoughtDots(mx, my);
			updateAnimalKingdom(mx, my);
  });

	// change hover effect when we encounter a new emotion
	$('.animal__page').mouseenter(function(e){
		let elId = $(this).attr('id');
		let emotion = elId.split('ak-emotion-')[1];

		// resets whole class so we need to maintain the base classes 
		let newClass = 'scroll-sideways animal animal-emotion--is-' + emotion;
		$('#ak-scroll-container').attr('class', newClass);
	});

	// need to get offset of scroll and update mouse position with that
	//
	// $(document).scroll(function(e){
	// 	console.log(e);
	// 	let mx = e.pageX;
	// 	let my = e.pageY;
	// 	updateAnimalKingdom(mx, my);
	// });
});

// for Animal kingdom
function updateAnimalKingdom(mx, my){
	// run through all journal pages
	let akPages = $('.animal__page').toArray();
	for (let i = 0; i < akPages.length; i++) {
		let pageContainer = $(akPages[i]);
		let x = mx - pageContainer.offset().left;
		let y = my - pageContainer.offset().top;
		pageContainer.attr('style', `--clip-x: ${x}px; --clip-y: ${y}px`);
	}
}


// for Milky way
function updateThoughtDots(mx, my){
	let radius = 255;

	let color1 = "rgb(255, 255, 255)";
	let color2 = "rgb(16, 16, 16)";
	let steps = 8;

	for(let i = 1; i <= steps; i++) {
		distance = calculateDistance($('#thought-dot-' + i), mx, my);
		if(distance < radius) {
			let ratio = (distance / radius);
			let color = interpolateColor(color1, color2, ratio);
			let colorString = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
			$('#thought-dot-' + i).css('background-color', colorString);
		}
	}
}

// helper functions for Milky way that Norm found on stackoverflow
function calculateDistance(elem, mouseX, mouseY) {
		return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
}

function interpolateColor(color1, color2, factor) {
	if (arguments.length < 3) {
			factor = 0.5;
	}

	color1 = color1.match(/\d+/g).map(Number);
	color2 = color2.match(/\d+/g).map(Number);
	var result = color1.slice();
	for (var i = 0; i < 3; i++) {
			result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
	}
	return result;
};


// used to display time while sounds are playing
class soundTimer {
	constructor(id){
		this.elId = id;
		this.started = false;
		this.offset = 0;
	}

	get hasStarted(){
		return this.started;
	}

	get isPlaying(){
		return this.playing;
	}

	pauseTimer(){
		this.playing = false;
		this.offset = this.diff;
		clearInterval(this.timerId);
	}

	continueTimer(){
		this.playing = true;
		this.start = Date.now();
		this.timerId = setInterval((function(){ this.update() }).bind(this), 1000);
	}

	startTimer(){
		$(this.elId).text("00:00:00");
		this.playing = true;
		this.started = true;
		this.start = Date.now();

		this.update();
		this.timerId = setInterval((function(){ this.update() }).bind(this), 1000);
	}

	resetTimer(){
		this.playing = false;
		this.offset = 0;
	}

	update(){

		// get the number of seconds that have elapsed since
        // startTimer() was called

        this.diff = ((Date.now() - this.start) / 1000) | 0;
        this.diff += this.offset;

        // does the same job as parseInt truncates the float
        let minutes = (this.diff / 60) | 0;
        let seconds = (this.diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $(this.elId).text("00:" + minutes + ":" + seconds);

        // if (this.diff <= 0) {
        //     // add one second so that the count down starts at the full duration
        //     // example 05:00 not 04:59
        //     this.start = Date.now() + 1000;
        // }
	}
}


function setSoundControls(){
	let timerLunar = new soundTimer('#time-lunar');
	let timerMilkyWay = new soundTimer('#time-milky-way');
	let lunarId = 'lunar';
	let milkyWayId = 'milky-way';

    $('#control-lunar').click(function(){
    	if(timerLunar.isPlaying){
    		pauseSounds(timerLunar, lunarId);
    	} else {
				if(timerMilkyWay.isPlaying){
					pauseSounds(timerMilkyWay, milkyWayId)
				}
    		playSounds(timerLunar, lunarId);
    	}
    });

		$('#control-milky-way').click(function(){
    	if(timerMilkyWay.isPlaying){
    		pauseSounds(timerMilkyWay, milkyWayId);
    	} else {
				if(timerLunar.isPlaying){
					pauseSounds(timerLunar, lunarId)
				}
    		playSounds(timerMilkyWay, milkyWayId);
    	}
    });
}

function playSounds(timer, id){
	document.getElementById('audio-' + id).play();

	$('#play-' + id).addClass('hide');
	$('#pause-' + id).removeClass('hide');

	if(timer.hasStarted){
		timer.continueTimer();
	} else {
		timer.startTimer();

		$('#audio-' + id).on('ended', function(){
			pauseSounds(timer, id);
			document.getElementById('audio-' + id).currentTime = 0;
			timer.resetTimer();
		});
	}
}

function pauseSounds(timer, id){
	document.getElementById('audio-' + id).pause();

  $('#play-' + id).removeClass('hide');
	$('#pause-' + id).addClass('hide');

	timer.pauseTimer();
}




function createThoughtScroller(){
	let controller = new ScrollMagic.Controller();

	// let thoughtTweenSettings = {
	// 	backgroundColor: '#FFFFFF',
	//   ease: Linear.easeInOut
	// };
	//
	//
	// var thoughtTween1 = TweenMax.to('#thought-dot-1', 1, thoughtTweenSettings);
	// var thoughtTween2 = TweenMax.to('#thought-dot-2', 1, thoughtTweenSettings);
	// var thoughtTween3 = TweenMax.to('#thought-dot-3', 1, thoughtTweenSettings);
	// var thoughtTween4 = TweenMax.to('#thought-dot-4', 1, thoughtTweenSettings);
	// var thoughtTween5 = TweenMax.to('#thought-dot-5', 1, thoughtTweenSettings);
	// var thoughtTween6 = TweenMax.to('#thought-dot-6', 1, thoughtTweenSettings);
	// var thoughtTween7 = TweenMax.to('#thought-dot-7', 1, thoughtTweenSettings);
	// var thoughtTween8 = TweenMax.to('#thought-dot-8', 1, thoughtTweenSettings);
	//
	// var thoughtTimeline = new TimelineMax();
	// thoughtTimeline.add(thoughtTween1).add(thoughtTween2).add(thoughtTween3).add(thoughtTween4)
	// 	.add(thoughtTween5).add(thoughtTween6).add(thoughtTween7).add(thoughtTween8)

	// new ScrollMagic.Scene({triggerElement: "#thought-scroll-start"})
	// 	.setTween(thoughtTimeline)
	// 	.addIndicators()
	// 	.addTo(controller);

	var tween = TweenMax.staggerFromTo(".thought-dot", 1, {backgroundColor: '#101010'}, {backgroundColor: '#FFFFFF', ease: Linear.easeInOut}, 0.15);
	new ScrollMagic.Scene({triggerElement: "#thought-scroll-start", duration: 400})
		.setTween(tween)
		.addTo(controller);
}

// centering the sidways scroller by changing width of spacers
function centerSideScroller(prefix){
	let containerClass = '#' + prefix + '-container';
	let negativeBuffer = 0; // used to be 18
	let centeringMargin = $(containerClass).offset().left - negativeBuffer;

	let elIds = [prefix + '-scroll-front', prefix + '-scroll-back'];
	for(let i = 0; i < elIds.length; i++){
		$('#' + elIds[i]).css('width', centeringMargin + 'px');
	}
}

// found online somewhere, used for resize listener
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
