import {convertAddressToMapPoint} from '../app.helper';

export default class Vertice{
	constructor(name){
		this.id = "v-" + name;
		this.name = name;
		this.address = "";
		this.location = null;
		this.visited = false;
		this.weight = Infinity;
		this.extra = null;
		this.dir = "";

		var $this = this;
		convertAddressToMapPoint(name, function(result){
			$this.address = result.formatted_address;
			$this.location = result.geometry.location;
		});
	}
}