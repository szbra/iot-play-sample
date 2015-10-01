'use strict';

module.exports = function($timeout){

	return {
		restrict: 'E',
		scope: {
			metadata: '=',
			numberOfPoints: '@',
			minValue: '@',
			maxValue: '@',
			renderData: '='
		},
		replace: true,
		link: function(scope, element) {
			
			// Assigning default values to scope variables if they have not been passed to the directive
			if(scope.numberOfPoints === undefined) {
				scope.numberOfPoints = 100;
			}
			if(scope.minValue === undefined) {
				scope.minValue = -100;
			}
			if(scope.maxValue === undefined) {
				scope.maxValue = 100;
			}

			var d3 = require('d3');

			var margin = {
				top: 30, 
				right: 20, 
				bottom: 30, 
				left: 40
			};

			var width = element[0].clientWidth - margin.left - margin.right;
			var height = element[0].clientHeight - margin.top - margin.bottom;
			
			// Set the ranges
			var x = d3.time.scale().range([0, width]);
			var y = d3.scale.linear().range([height, 0]);
			
			// Define the axes
			// var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5).tickFormat("").outerTickSize(0).tickSize(0);
			var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5).tickFormat("");

			// var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5).tickFormat("").tickSize(0);
			var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

			// Define the line
			var line = new d3.svg.line()
				.x(function(d) { return x(d.x); })
				.y(function(d) { return y(d.y); });

			// Array of series data (in d3 format)
			var valuesSet = [];

			// Do the initial padding
			//for (var j in scope.metadata) { Removed to Lint errors
			for	(var a = 0; a < scope.metadata.length; a=a+1){
				 
				var values = [];
				
				// Padding values until the valuesSet array is completelly filled
				for (var i = 0; i < scope.numberOfPoints; i=i+1) { 
					values.push({ x: i, y: 0 }); 
				}

				valuesSet.push(values);
			}

			var timeoutHandle = null;

			var nextDataX = scope.numberOfPoints;

			function render(dataPoint) {

				// Convert the dataPoint (raw data passed to the directive)
				// into a point in the valuesSet (a format that d3 understands)

				if(dataPoint) {
					for (var j=0; j < scope.metadata.length; j=j+1) {
						
						var field = scope.metadata[j].field;

						
						var point = {
							x: nextDataX,
							y: (dataPoint[field] ? dataPoint[field] : 0)
						};
						nextDataX=nextDataX+1;

						// Discard the last point
						valuesSet[j].shift();
						// Add the new point
						valuesSet[j].push(point);
					}

				}

			   	// remove all previous items before render
				angular.element(element[0]).html("");

				// Adds the svg canvas
				var svg = d3.select(element[0])
					.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				// Scale the range of the data
				x.domain(d3.extent(valuesSet[0], function(d) { return d.x; }));
				y.domain([scope.minValue, scope.maxValue]);

				// Add the paths.
				// TODO: add more colors to support more lines
				var colors = ["#1d3649", "#41d6c3", "#5596e6"];
				for (var i = 0; i < valuesSet.length; i=i+1) {
					svg.append("path")
						.attr("stroke", colors[i])
						.attr("stroke-width", 2)
						.attr("fill", "none")
						.attr("d", line(valuesSet[i]));
				}

				// Add the X Axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'})
					.call(xAxis);

				// Add the Y Axis
				svg.append("g")
					.attr("class", "y axis")
					.style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'})
					.call(yAxis);

				// Add a key to the graph
				for (var k = 0 ; k < valuesSet.length; k=k+1) {
					svg.append("svg:rect")
							.attr("x", width - 90)
							.attr("y", 0 + k * 18)
							.attr("stroke", colors[k])
							.attr("height", 2)
							.attr("width", 40);
					svg.append("svg:text")
							.attr("x", width - 40)
							.attr("y", 5 + k * 18)
							.text(scope.metadata[k].name);
				}	

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

			scope.$watch('renderData', function(newData) {
                if (newData) {
					render(newData);
                }
            }, true);

			// Initial rendering
			render();
        },
		template: '<div class="line-chart" ng-class="{\'chart-inactive\': !active}"></div>'
	};
};
