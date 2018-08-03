require('./bootstrap');

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import { Validator } from 'vee-validate';
import {calculateDistanceBetweenTwoPoint, permutation} from './app.helper';
import Vertice from './classes/Vertice.class';
import Edge from './classes/Edge.class';
import Graph from './classes/Graph.class';
import Receiver from './classes/Receiver.class';

new Vue({
	el: '#app',
	data: {
		newReceiver: new Receiver(),
		receivers: [],
		graph: new Graph(),
		loading: true,
		cposition: "Đông Trù Bridge, Cầu Đông Trù, Đông Hội, Long Biên, Hà Nội 125000, Vietnam"
	},
	mounted(){
		this.setupValidationMessages();
		this.getPosition();

		var $this = this;
		if(localStorage.graph){
			var G = JSON.parse(localStorage.graph);

			$this.graph.edges = G.edges;
			$this.graph.vertices = G.vertices;
			$this.graph.route = G.route;
			$this.graph.croute = G.croute;
			$this.cposition = G.vertices[0].address;
		}

		// var addrs = ["144 Xuân Thủy Cầu Giấy", "199 Minh Khai", "170 Phố Vọng"];
		// if(!localStorage.graph){
		// 	_.each(addrs, function(item){
		// 		$this.graph.addNode(item);
		// 	});

		// 	setTimeout(function(){
		// 		localStorage.setItem('graph', JSON.stringify($this.graph));

		// 		$this.graph.generateTheRoute(function(){
		// 			_.each($this.graph.route, function(o){
		// 				console.log(o.address);
		// 			});
		// 		});
		// 	}, 10000);
		// } else {
		// 	var G = JSON.parse(localStorage.graph);
		// 	$this.graph.vertices = G.vertices;
		// 	$this.graph.edges = G.edges;
		// 	console.log($this.graph);

		// 	$this.graph.generateTheRoute();
		// }

		$('.number').keydown(function(e){
			if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode==8 || e.keyCode==9) { 
			    // 0-9 only
			} else {
				e.preventDefault();
			}
		});

		$(document).on('focus', 'input', function(){
			$(this).select();
		});
	},
	methods: {
		setupValidationMessages(){
			const dict = {
			  	custom: {
				    name: {
				    	required: "Vui lòng nhập tên người nhận"
				    },
				    address: {
				    	required: "Vui lòng nhập địa chỉ"
				    },
				    phone: {
				    	required: "Vui lòng nhập số điện thoại"
				    },
				    price: {
				    	required: "Vui lòng nhập tiền hàng"
				    },
				    ship: {
				    	required: "Vui lòng nhập số tiền ship"
				    }
			  	}
			};

			Validator.localize('en', dict);
		},
		getPosition(){
			var $this = this;

			var geocoder = new google.maps.Geocoder;
			navigator.geolocation.getCurrentPosition(
			    function( position ){
			        var latlng = {
			        	lat: position.coords.latitude,
			        	lng: position.coords.longitude
			        };

			        geocoder.geocode({'location': latlng}, function(results, status) {
				        if (status === 'OK') {
				            var cp = _.first(results);
				            if(cp){
				            	$this.cposition = cp.formatted_address.replace("Unnamed Road, ", "");
				            }
				            $this.graph.addNode($this.cposition);
				            $this.loading = false;
				            console.log($this.cposition);

				        } else {
				            window.error('Geocoder failed due to: ' + status);
				            $this.graph.addNode($this.cposition);
				            $this.loading = false;
				        }
			        });
			    },
			    function(){
			    	$this.graph.addNode($this.cposition);
		            $this.loading = false;
		            console.error('Can not get position');
			    }
			);
		},
		saveReceiver(){
			var $this = this;
			this.$validator.validateAll().then((result) => {
		        if (result) {
		        	$this.loading = true;
			        $this.receivers.push(_.cloneDeep($this.newReceiver));
			        $this.graph.addNode($this.newReceiver.address + ' Hà Nội', _.cloneDeep($this.newReceiver), null, function(){
			        	$this.loading = false;
			        });

			        $('input').blur();

		        } else {
		        	setTimeout(function(){
		        		$this.errors.clear();
		        	}, 5000);
		        }
		    });
		},
		limitWords(text){
			var arr = text.split(/\s/);
			if(arr.length <= 12){
				return text;
			}

			var txt = "";
			for(var i=0; i<12; i++){
				txt += arr[i] + " ";
			}

			return txt.trim() + "...";
		},
		resetRoute(){
			this.graph = new Graph();
			this.graph.addNode(this.cposition);
			localStorage.removeItem('graph');
		},
		updateRoute(event){
			this.cposition = event.target.value;
			this.resetRoute();
			$(event.target).blur();
		},
		removeNode(nd){
			this.graph.vertices = _.filter(this.graph.vertices, function(o){
				return o.id != nd.id;
			});

			this.loading = true;
			var $this = this;
			this.graph.generateTheRoute(function(){
				$this.loading = false;
			}, true);
		}
	}
})