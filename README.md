## aframe-shake2show-component

_Tap_ the side of the smart device (qick shake trigger) to display a UI Modal for [A-Frame](https://aframe.io) VR.

--- 

Integrated _Shake.js_ - JavaScript plugin for mobile web browsers using device accelerometer.

Author: Alex Gibson

https://github.com/alexgibson/shake.js

Modified _aframe-ui-modal-component_

Author: IdeaSpace

https://github.https://github.com/IdeaSpaceVR/aframe-ui-modal-component

---

## Properties

| Property       | Description                                            | Default Value |
| --------       | ------------------------------------------------------ | ------------- |
| trigger        | Event to make dialog or menu visible.                  | 'shake'       |
| zpos           | Position the dialog or menu on the z-axis. In meters.  | -0.85         |
| threshold      | Default quick shake strength threshold                 | 5             |


### Usage

[Demo on JSBin](http://output.jsbin.com/fubuku/1)

#### Browser Installation

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://rawgit.com/rdub80/aframe-shake2show-component/master/master/dist/aframe-shake2show-component.min.js"></script>
</head>

<body>
  <a-scene>
  	<a-entity shake2show visible="false"></a-entity>
  	<a-entity camera look-controls></a-entity>
  </a-scene>
</body>
```

#### NPM Installation

Install via NPM:

```bash
npm install aframe-shake2show-component
```

Then register and use.

```js
require('aframe');
require('aframe-shake2show-component');
```

#### In browser testing

For console testing on desktop trigger shake event

```js
<script>
var triggerShake = document.createEvent("HTMLEvents");
triggerShake.initEvent("shake", true, true);

function shakeMe(){
  document.dispatchEvent(triggerShake);
}
</script> 
```

### Dependencies

You need a [camera](https://aframe.io/docs/0.3.0/components/camera.html) component in your scene. 

Your web browser must support the `devicemotion` event for this plugin to work. Shake.js uses built-in feature detection to determine if it can run in your web browser. It will terminate silently on non-supporting browsers.

http://w3c.github.io/deviceorientation/spec-source-orientation.html


### Supported web browsers/devices

- iOS Safari 4.2.1 (and above)
- Android 4.0.3 (default browser)
- Chrome 41+ for Android
- Opera Mobile (Android)
- BlackBerry PlayBook 2.0
- Firefox for Android
- FirefoxOS Devices
