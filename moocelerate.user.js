// ==UserScript==
// @name		 MOOCelerate!
// @namespace	https://github.com/SkyFuInMC/moocelerate
// @version	  0.4.2
// @description  MOOC acceleration. Must be used with other scripts.
// @author	   SkyFuInMC
// @match		https://mooc1-1.chaoxing.com/*
// @match		https://zhibo.chaoxing.com/*
// @grant		https://*/*
// ==/UserScript==

'use strict';
console.info("[MOOCelerate!] 注入成功");
self.finishAnswer = function () {
	document.querySelector(".Btn_blue_1")?.click() || 0;
	setTimeout(function () {
		document.querySelector(".bluebtn")?.click() || getTheNextQuestion(1);
	}, 500);
};
self.monitored = false;
self.skipped = false;
self.okay = [0, 0, 0];
self.questions = {
	radio: [],
	judge: [],
	choice: []
};
String.prototype.contain = function (...args) {
	var sum = 0;
	args.forEach((e)=>{sum += +!!(this.indexOf(e) + 1);});
	return sum;
};
var discoveryT = setInterval(function () {
if (document.querySelector("video")) {
	console.log("[MOOCelerate!] 取消监视接口发现");
	clearInterval(discoveryT);
};
Array.from(document.querySelectorAll("div[style]")).forEach((e) => {
	if (e.className.length + e.id.length == 0) {
		if (e.innerText.contain("共有", "已完成", "搜索", "完善") > 0) {
			monitored = e;
			clearInterval(discoveryT);
			console.log("[MOOCelerate!] 发现监视接口");
		};
	};
});}, 500);
setInterval(function () {
	if (self,monitored) {
		if (self.monitored.innerText.contain("答题", "已完成") > 1 && !skipped) {
			console.log("[MOOCelerate!] 已自动完成答题");
			finishAnswer();
		} else if (self.monitored.innerText.contain("跳过", "重试") > 1) {
			monitored.querySelector("button").click();
			skipped = true;
			console.log("[MOOCelerate!] 跳过一道死题");
		} else if (self.monitored.innerText.contain("共有", "完善") > 1 || self.monitored.innerText.contain("超时", "重试") || skipped) {
			if (questions.judge.length + questions.radio.length + questions.choice.length < 1) {
				// Judge
				Array.from(document.querySelectorAll("ul.clearfix")).forEach((e) => {
					questions.judge.push(e);
				});
				// Choice
				Array.from(document.querySelectorAll("ul.Zy_ulTop")).forEach((e) => {
					if (+e.children[0].onclick == 0) {
						questions.radio.push(e);
					} else {
						questions.choice.push(e);
					};
				});
			} else {
				okay[0] = 0;
				questions.judge.forEach((e) => {
					Array.from(e.querySelectorAll("input")).forEach((e) => {
						if (e.checked) {
							okay[0] ++;
						};
					});
				});
				okay[1] = 0;
				questions.radio.forEach((e) => {
					Array.from(e.querySelectorAll("input")).forEach((e) => {
						if (e.checked) {
							okay[1] ++;
						};
					});
				});
				okay[2] = 0;
				questions.choice.forEach((e) => {
					var count = 0;
					Array.from(e.querySelectorAll("input")).forEach((e) => {
						if (e.checked) {
							count ++;
						};
					});
					if (count != 0) {
						okay[2] ++;
					};
				});
			};
			if ((questions.judge.length + questions.radio.length + questions.choice.length) <= (okay[0]+okay[1]+okay[2])) {
				console.log("[MOOCelerate!] 题目已手动完成");
				finishAnswer();
			} else {
				console.log("[MOOCelerate!] 等待手动完成中… " + "J:" + okay[0] + " R:" + okay[1] + " C:" + okay[2]);
			};
		} else if (self.monitored.innerText.contain("默认", "即将")) {
			Array.from(monitored.parentElement.querySelectorAll("button")).forEach((e) => {if (e.innerText.contain("停止", "本次") > 1) {e.click()};});
			console.log("[MOOCelerate!] 暂停跳过未做完题目");
			skipped = true;
		} else {
			console.log("[MOOCelerate!] 答题脚本尚未完成答题");
		};
	};
	Array.from(document.querySelectorAll("video")).forEach((e)=>{
		BroadcastChannel.prototype.postMessage = function () {
			console.warn("Captured failed message attempt: ");
			console.warn(...arguments);
		};
		e.muted = true;
		e.preservePitch = false;
		e.playbackRate = 16;
		if (e.paused) {
			e.play().then(function () {
				console.log("视频恢复播放");
			});
		};
	});

}, 500);
