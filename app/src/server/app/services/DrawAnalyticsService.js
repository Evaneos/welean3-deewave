/*
	Service responsible for extracting drawing characteristics from a list of points.
*/

function distance (p1, p2) {
	if (!p1 || !p2) {
		return 0;
	}
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.x - p2.x, 2));
}

function getDistance (points) {
	return points.reduce(function (acc, point) {
		acc.distance = acc.distance + distance(acc.lastPoint, point);
		acc.lastPoint = point;
		return acc;
	}, {distance: 0}).distance;
}

function getDuration (points) {
	return points[points.length - 1].time - points[0].time;
}

function getAvgSpeed (points) {
	return 1000 * getDistance(points) / getDuration(points);
}

function getSpeeds (points) {
	var speeds = [];
	for (var i = 1; i < points.length; i++) {
		speeds.push(distance(points[i], points[i-1]) / (points[i].time - points[i-1].time));
	}
	return speeds;
}

function getSpread(points) {
	var xs = points.map((point) => point.x);
	var ys = points.map((point) => point.y);
	var minX = Math.min.apply(Math, xs);
	var minY = Math.min.apply(Math, ys);
	var maxX = Math.max.apply(Math, xs);
	var maxY = Math.max.apply(Math, ys);
	return (maxX - minX) + (maxY - minY) / 2;
}


module.exports = function analyseDrawing(points) {
	return {
		duration: getDuration(points),
		distance: getDistance(points),
		avgSpeed: getAvgSpeed(points),
		spread: getSpread(points),
	};
};
