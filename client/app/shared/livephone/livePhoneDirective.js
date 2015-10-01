'use strict';

module.exports = function($timeout){

	return {
		restrict: 'E',
		scope: {
			renderData: '='
		},
		replace: true,
		link: function(scope, element) {

			var THREE = require('three');
			var cube;
			var renderer;
			var camera;
			var scene;
			var width = element[0].clientWidth;
			// var height = element[0].clientHeight;
			var height = 225;
			var timeoutHandle = null;

			function init() {

				renderer = new THREE.WebGLRenderer({alpha: true});
				renderer.setSize(width, height);
				renderer.setClearColor( 0xffffff, 0);
				element[0].appendChild( renderer.domElement );

				// camera
				camera = new THREE.PerspectiveCamera(65, width / height, 1, 1000);
				camera.position.z = 12;

				// scene
				scene = new THREE.Scene();
				        
				var loader = new THREE.ObjectLoader();
				loader.load('assets/img/phone.json', function ( obj ) {
					
					cube = obj;

					cube.overdraw = true;
					cube.rotation.x = Math.PI * 0.1;
					scene.add(cube);

					// var ambientLight = new THREE.AmbientLight(0xffffff);
					// scene.add(ambientLight);

					// directional lighting
					var directionalLight = new THREE.DirectionalLight(0xffffff);
					directionalLight.position.set(0, 0, 1).normalize();
					scene.add(directionalLight);

					// initial rendering
					render(200, 0, -125);
				});							
			}

			function render(_x, _y, _z) {
				cube.rotation.x = (_x-90) * Math.PI/180; // beta
				cube.rotation.y = _y * Math.PI/180; // gamma
				cube.rotation.z = (_z-90) * Math.PI/180; // alpha 
				renderer.render( scene, camera );

				// clear "inactive detection" timeout
				if(timeoutHandle) {
					$timeout.cancel(timeoutHandle);
					scope.active = true;
				}

				// set "inactive detection" timeout
				timeoutHandle = $timeout(function() {
					scope.active = false;
				}, 2000);
			}

			init();

			scope.$watch('renderData', function(newData) {
                if (newData) {
					render(newData.ob, newData.og, newData.oa);
                }
            }, true);	

        },
		template: '<div class="live-phone" ng-class="{\'chart-inactive\': !active}"></div>'
	};
};
