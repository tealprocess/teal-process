
$(document).ready(function(){

	// some set up
	setCassetteAnimation();
});


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


function setCassetteAnimation(){
    let anim; // not used
    let timer = new soundTimer('#time');

    $('.control').click(function(){

    	if(timer.isPlaying){
    		pauseSounds(anim, timer);
    	} else {
    		playSounds(anim, timer);
    	}
    });
}

function playSounds(anim, timer){
	document.getElementById('gu-untitled').play();
	// anim.play();

	$('.control').addClass('control-playing');

	$('#play').addClass('hide');
	$('#pause').removeClass('hide');

	if(timer.hasStarted){
		timer.continueTimer();
	} else {
		timer.startTimer();

		$('#gu-untitled').on('ended', function(){
			pauseSounds(anim, timer);
			document.getElementById('gu-untitled').currentTime = 0;
			timer.resetTimer();
		});
	}
}

function pauseSounds(anim, timer){
	document.getElementById('gu-untitled').pause();
	// anim.pause();

	$('.control').removeClass('control-playing');

    $('#play').removeClass('hide');
	$('#pause').addClass('hide');

	timer.pauseTimer();
}