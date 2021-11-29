// ==UserScript==
// @name        MOOCelerate
// @version     0.5.1
// @description 超星尔雅给爷死
// @author      SkyFuInMC
// @match       https://mooc1.chaoxing.com/ananas/*
// @match       https://*.ananas.chaoxing.com/*
// @match       https://zhibo.chaoxing.com/*
// @grant       none
// ==/UserScript==

"use strict";
let video;

setInterval(function () {
	video = video || Array.from(EventListener.list.ratechange)[1] || document.querySelector("video");
	self.eventFilter = self.eventFilter || ["pause", "mouseout", "blur", "mousedown", "mouseup", "keydown", "keyup", "play", "playing"];
	EventListener.removeEvent("mouseout");
	EventListener.removeEvent("blur");
	EventListener.removeEvent("ratechange");
	EventListener.removeEvent("mouseover");
	EventListener.removeEvent("mousemove");
	EventListener.removeEvent("seeked");
	EventListener.removeEvent("seekend");
	EventListener.removeEvent("seeking");
	if (location.host.indexOf("zhibo") != 0) {
		EventListener.removeEvent("timeupdate");
		EventListener.removeEvent("play");
		EventListener.removeEvent("playing");
		if (video) {
			video.removeEvent("ratechange");
			video.play();
			video.playbackRate = 16;
			if (video.readyState > 3 && !video.paused) {
				video.currentTime += 4;
			};
		};
	} else {
		localStorage.clear();
		if (video) {
			video.removeEvent("ratechange");
			video.playbackRate = 2;
		};
	};
}, 250)
