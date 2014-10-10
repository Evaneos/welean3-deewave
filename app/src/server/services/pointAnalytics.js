

function distance (p1, p2) {
	if (!p1 || !p2) {
		return 0;
	} 
	return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.x - p2.x, 2));
}

function getLength (points) {
	return points.reduce(function (acc, point) {
		acc.distance = acc.distance + distance(acc.lastPoint, point);
		acc.lastPoint = point;
	}, {length: 0}).distance;
};

function getDuration (points) {
	return points[points.length - 1].time - points[0].time;
}

function getAvgSpeed (points) {
	return getDistance(points) / getDuration(points);
}

function getSpeeds (points) {
	var speeds = [];
	for (var i = 1; i < points.length; i++) {
		speeds.push(distance(points[i], points[i-1]) / (points[i].time - points[i-1].time));
	}
	return speeds;
}

function getAvgAcceleration (points) {
	return getSpeeds(points) / getDuration(points); 
}


function analyseDrawing(points) {
	return {
		duration: getDuration(),
		length: getLength(),
		avgSpeed: getAvgSpeed(),
		avgAcceleration: getAvgAcceleration()		
		
	};
}