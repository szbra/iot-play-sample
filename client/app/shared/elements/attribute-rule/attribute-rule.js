/*jshint newcap: false */

'use strict';

Polymer({
	is: 'attribute-rule',
	properties: {
		updateAttributeLimit: {
			type: Number,
			value: 10
		},
		attribute: {
			type: String,
			value: "vibration"
		},
		payloadAttribute: {
			type: Number,
			value: 0,
			observer: '_observeVibration'
		},
		attributeLimit: {
			type: Number,
			value: 10,
		},
		payload: {
			type: Object,
			value: function() {
				return {};
			},
			observer: '_observePayload'
		},
		metadata: {
			type: Array,
			value: function() {
				return [];
			}
		},
		triggerWarning: {
			type: Boolean,
			value: false,
			notify: true
		}
	},
	_observePayload: function(newValue) {
		if (newValue && this.metadata) {
			this.payloadAttribute = newValue[this.metadata[0].field];
		}
	},
	_observeVibration: function(newValue) {
		if (newValue) {
			this.triggerWarning = this.payloadAttribute > this.attributeLimit;
		}
	},
	updateRule: function(){
		console.log(this.updateAttributeLimit);
		this.attributeLimit = this.updateAttributeLimit;
	},
	_handleTapMinus: function() {
		this.updateAttributeLimit-=1;
	},
	_handleTapSum: function() {
		this.updateAttributeLimit+=1;
	}
});
