/*
	Service responsible for extracting drawing characteristics from a list of points.
*/
function normalize(value, attr) {
	value = value - config.songify[attr].min ;

	// value between 0 and 1
	value = value / (config.songify[attr].max - config.songify[attr].min);
	if (isNaN(value)) {
		value = 0;
	}
	value = Math.min(1, value);
	value = Math.max(0, value);
	return value;
}

function distance (p1, p2) {
	if (!p1 || !p2) {
		return 0;
	}
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.x - p2.x, 2));
}

function getDistance (points) {
	var totalDistance = points.reduce(function (acc, point) {
		acc.totalDistance = acc.totalDistance + distance(acc.lastPoint, point);
		acc.lastPoint = point;
		return acc;
	}, {totalDistance: 0}).totalDistance;
	return normalize(totalDistance, 'drawingDistance');
}

function getDuration (points) {
	return points[points.length - 1].time - points[0].time;
}

function getAvgSpeed (points) {
	return normalize(1000 * getDistance(points) / getDuration(points), 'drawingSpeed');
}

// function getSpeeds (points) {
// 	var speeds = [];
// 	for (var i = 1; i < points.length; i++) {
// 		speeds.push(distance(points[i], points[i-1]) / (points[i].time - points[i-1].time));
// 	}
// 	return speeds;
// }

function getSpread(points) {
	var xs = points.map((point) => point.x);
	var ys = points.map((point) => point.y);
	var minX = Math.min.apply(Math, xs);
	var minY = Math.min.apply(Math, ys);
	var maxX = Math.max.apply(Math, xs);
	var maxY = Math.max.apply(Math, ys);
	return normalize(((maxX - minX) + (maxY - minY)) / 2, 'drawingSpread');
}



module.exports = function analyseDrawing(points) {
	return {
		duration: getDuration(points),
		distance: getDistance(points),
		avgSpeed: getAvgSpeed(points),
		spread: getSpread(points),
	};
};
