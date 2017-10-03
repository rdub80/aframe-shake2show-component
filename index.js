var Shake = require('shake.js');

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