import Vertice from './Vertice.class';
import Edge from './Edge.class';

export default class Graph{
	constructor(){
		this.vertices = [];
		this.edges = [];
		this.ready = false;
		this.route = [];
		this.croute = [];
	}

	show(){
	}

	addNode(address, extra, isTheLastNode, callback){
		var $this = this;
		
		var nd = new Vertice(address);
		nd.extra = extra;
		var i=0;

		if(_.isEmpty($this.vertices)){
			$this.vertices.push(nd);
		} else {
			$this._loop(nd, i, isTheLastNode, callback);
		}
	}

	_loop(nd, i, isTheLastNode, callback){
		var $this = this;

		setTimeout(function () {    //  call a 1s setTimeout when the loop is called
	      	var v = $this.vertices[i];
	      	v.visited = false;
	      	var e = new Edge(v, nd);
	      	$this.edges.push(e);
	      	console.log(e.toString);
	      	i++;
	      
	      	if (i < $this.vertices.length) {            //  if the counter < 10, call the loop function
	        	$this._loop(nd, i, isTheLastNode, callback);             //  ..  again which will trigger another 
	      	} else {
	      		$this.vertices.push(nd);

	      		setTimeout(function(){
	      			$this.route = [];
	      			$this.generateTheRoute(callback);
	      		}, 1000);
	      	}
	   }, 1000)
	}

	generateTheRoute(callback, ec){
		var $this = this;
		if(ec){
			$this.route = [];
			$this.vertices = _.map($this.vertices, function(o){
				o.visited = false;
				return o;
			});
		}

		var cv = _.first($this.vertices);
		// console.log($this.vertices);
		// return;

		if($this.vertices.length <= 2){
			$this.route = $this.vertices;
		} else {
			$this._loop2(cv);
		}

		$this.croute = $this.route;
		if($this.croute.length > 1){
			for(var i=1; i<$this.croute.length; i++){
				var prev = $this.croute[i-1];
				var c = $this.croute[i];
				var e = _.find($this.edges, function(item){
					return item.id == "e-" + prev.name + c.name || item.id == "e-" + c.name + prev.name;
				});
				c.weight = e.weight.text;

				c.dir = "https://www.google.com/maps/dir/" + prev.address.replace(/\s/g, '+') + '/' + c.address.replace(/\s/g, '+');
			}
		}

		localStorage.setItem('graph', JSON.stringify($this));
		if(callback){
			callback();
		}
	}

	_loop2(cv){
		var $this = this;
		cv.visited = true;
		$this.route.push(_.cloneDeep(cv));
		var r = _.filter($this.vertices, function(o){
			return !o.visited;
		});
		console.log(r);

		if(_.isEmpty(r)){
			return;
		}

		var min = Infinity;
		var pnode = null;
		for(var i=0; i<r.length;i++){
			var o = r[i];
			if(cv.name && o.name){
				var e = _.find($this.edges, function(item){
					return item.id == "e-" + cv.name + o.name || item.id == "e-" + o.name + cv.name;
				});
				console.log(e.toString);

				o.weight = Infinity;
				for(var j=0; j<$this.edges.length; j++){
					var ee = $this.edges[j];
					if(_.find(ee.vertices, function(vv){
						return vv.id == o.id;
					}) && !_.find(ee.vertices, function(cvv){
						return cvv.id == cv.id;
					})){
						var w = e.weight.value + ee.weight.value;
						if(w < o.weight){
							o.weight = w;
						}
					}
				};

				if(o.weight < min){
					pnode = o;
					min = o.weight;
				}
			}
		};

		// if(r.length > 1){
			$this._loop2(pnode);
		// }
	}
}