import {calculateDistanceBetweenTwoPoint} from '../app.helper';
import Vertice from './Vertice.class';

export default class Edge{
	constructor(v1, v2){
		this.vertices = [v1, v2];
		this.weight = 0;
		this.toString = v1.name + "~>" + v2.name;
		this.id = "e-" + v1.name + v2.name;

		var $this = this;
		calculateDistanceBetweenTwoPoint(v1.name, v2.name, function(distance){
			$this.weight = distance;
		});
	}
}