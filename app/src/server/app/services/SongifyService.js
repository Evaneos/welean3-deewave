/*
	Service responsible for transforming a drawing info into song informations
*/
const rangeInterval = 0.05;

function getTempoRange (drawing) {
	var tempo = drawing.avgSpeed - config.songify.drawingSpeed.min ;
	tempo = tempo / (config.songify.drawingSpeed.max - config.songify.drawingSpeed.min);
	tempo = Math.min(tempo, 1 - rangeInterval);
	tempo = Math.max(tempo, rangeInterval);
	return [tempo - rangeInterval, tempo + rangeInterval].map(function (tempo) {
		return tempo * 300;
	});
}

module.exports = function (drawing) {
	return {
		tempoRange: getTempoRange(drawing)
	};
};