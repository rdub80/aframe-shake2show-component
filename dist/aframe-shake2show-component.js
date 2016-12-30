/****** Integrated shake.js plugin:
/******
/****** Author: Alex Gibson
/****** https://github.com/alexgibson/shake.js
/****** License: MIT license
/******/

/******/ (function(global, factory) {
/******/     if (typeof define === 'function' && define.amd) {
/******/         define(function() {
/******/             return factory(global, global.document);
/******/         });
/******/     } else if (typeof module !== 'undefined' && module.exports) {
/******/         module.exports = factory(global, global.document);
/******/     } else {
/******/         global.Shake = factory(global, global.document);
/******/     }
/******/ } (typeof window !== 'undefined' ? window : this, function (window, document) {

/******/     'use strict';

/******/     function Shake(options) {
/******/         //feature detect
/******/         this.hasDeviceMotion = 'ondevicemotion' in window;

/******/         this.options = {
/******/             threshold: 15, //default velocity threshold for shake to register
/******/             timeout: 1000 //default interval between events
/******/         };

/******/         if (typeof options === 'object') {
/******/             for (var i in options) {
/******/                 if (options.hasOwnProperty(i)) {
/******/                     this.options[i] = options[i];
/******/                 }
/******/             }
/******/         }

/******/         //use date to prevent multiple shakes firing
/******/         this.lastTime = new Date();

/******/         //accelerometer values
/******/         this.lastX = null;
/******/         this.lastY = null;
/******/         this.lastZ = null;

/******/         //create custom event
/******/         if (typeof document.CustomEvent === 'function') {
/******/             this.event = new document.CustomEvent('shake', {
/******/                 bubbles: true,
/******/                 cancelable: true
/******/             });
/******/         } else if (typeof document.createEvent === 'function') {
/******/             this.event = document.createEvent('Event');
/******/             this.event.initEvent('shake', true, true);
/******/         } else {
/******/             return false;
/******/         }
/******/     }

/******/     //reset timer values
/******/     Shake.prototype.reset = function () {
/******/         this.lastTime = new Date();
/******/         this.lastX = null;
/******/         this.lastY = null;
/******/         this.lastZ = null;
/******/     };

/******/     //start listening for devicemotion
/******/     Shake.prototype.start = function () {
/******/         this.reset();
/******/         if (this.hasDeviceMotion) {
/******/             window.addEventListener('devicemotion', this, false);
/******/         }
/******/     };

/******/     //stop listening for devicemotion
/******/     Shake.prototype.stop = function () {
/******/         if (this.hasDeviceMotion) {
/******/             window.removeEventListener('devicemotion', this, false);
/******/         }
/******/         this.reset();
/******/     };

/******/     //calculates if shake did occur
/******/     Shake.prototype.devicemotion = function (e) {
/******/         var current = e.accelerationIncludingGravity;
/******/         var currentTime;
/******/         var timeDifference;
/******/         var deltaX = 0;
/******/         var deltaY = 0;
/******/         var deltaZ = 0;

/******/         if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
/******/             this.lastX = current.x;
/******/             this.lastY = current.y;
/******/             this.lastZ = current.z;
/******/             return;
/******/         }

/******/         deltaX = Math.abs(this.lastX - current.x);
/******/         deltaY = Math.abs(this.lastY - current.y);
/******/         deltaZ = Math.abs(this.lastZ - current.z);

/******/         if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
/******/             //calculate time in milliseconds since last shake registered
/******/             currentTime = new Date();
/******/             timeDifference = currentTime.getTime() - this.lastTime.getTime();

/******/             if (timeDifference > this.options.timeout) {
/******/                 window.dispatchEvent(this.event);
/******/                 this.lastTime = new Date();
/******/             }
/******/         }

/******/         this.lastX = current.x;
/******/         this.lastY = current.y;
/******/         this.lastZ = current.z;

/******/     };

/******/     //event handler
/******/     Shake.prototype.handleEvent = function (e) {
/******/         if (typeof (this[e.type]) === 'function') {
/******/             return this[e.type](e);
/******/         }
/******/     };

/******/     return Shake;
/******/ }));

/************************************************************************/

/****** modified component from https://github.com/IdeaSpaceVR/aframe-ui-modal-component

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * UI modal component for A-Frame.
	 */

	if (typeof AFRAME === 'undefined') {
	  throw new Error('Component attempted to register before AFRAME was available.');
	}

	AFRAME.registerComponent('shake2show', {

	    schema: {
	        trigger: {
	            default: 'shake'
	        },
	        threshold: {
	        	default: 5
            },
            timeout: {
            	default: 500
	        },
	        zpos: {
	            default: -0.85
	        },
	        xoffset: {
	            default: 0
	        },
	        yoffset: {
	            default: 0
	        }
	    },

	    init: function() { 

		    //create a new instance of shake.js.
		    var myShakeEvent = new Shake({

		        threshold: this.data.threshold,
		        timeout: this.data.timeout
		    
		    });

		    // start listening to device motion
		    myShakeEvent.start();	        

	        if ( this.data.trigger === "shake" ){

    			window.addEventListener(this.data.trigger, this.eventHandler.bind(this));
    		
    		} else if( this.data.trigger === "click" ){
    		
    			document.querySelector('a-scene').addEventListener(this.data.trigger, this.eventHandler.bind(this));
    		
    		} else {
	      		console.log("Trigger not supported. choose either 'shake' or 'click'!");    			
    		}

	        this.cameraEl = document.querySelector('a-entity[camera]');

	        if(this.cameraEl){

		        this.initHeight =  Math.round(this.cameraEl.object3D.getWorldPosition().y * 100) / 100;

		        this.yaxis = new THREE.Vector3(0, 1, 0);
		        this.zaxis = new THREE.Vector3(0, 0, 1);

		        this.pivot = new THREE.Object3D();
		        this.el.object3D.position.set(this.data.xoffset, this.initHeight + this.data.yoffset, this.data.zpos);

		        this.el.sceneEl.object3D.add(this.pivot);
		        this.pivot.add(this.el.object3D);
	      	
	      	}else{
	      		console.log("Please add a camera to your scene.");
	      	}

	    },

	    eventHandler: function(evt) {

	        if (this.el.getAttribute('visible') === false) {

		        var direction = this.zaxis.clone();
	            direction.applyQuaternion(this.cameraEl.object3D.quaternion);
	            var ycomponent = this.yaxis.clone().multiplyScalar(direction.dot(this.yaxis));
	            direction.sub(ycomponent);
	            direction.normalize();

	            this.pivot.quaternion.setFromUnitVectors(this.zaxis, direction);

	            var xposition = this.cameraEl.object3D.getWorldPosition().x;
	            var yposition = (Math.round(this.cameraEl.object3D.getWorldPosition().y * 100) / 100);
	            var zposition = this.cameraEl.object3D.getWorldPosition().z;

	            if(this.initHeight === yposition && this.initHeight !== 0){
					yposition = 0
		        }else{
		        	yposition = yposition - this.initHeight;
		        }

		        this.pivot.position.set(xposition, yposition, zposition);
	            
	            this.el.setAttribute('scale', '1 1 1');
	            this.el.setAttribute('visible', true);

	        } else if (this.el.getAttribute('visible') === true) {
	        
	            this.el.setAttribute('scale', '0.00001 0.00001 0.00001');
	            this.el.setAttribute('visible', false);
	        
	        }

	    },

	    update: function (oldData) {},

	    remove: function() {}

	});




/***/ }
/******/ ]);