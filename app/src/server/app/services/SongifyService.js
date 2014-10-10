/*
	Service responsible for transforming a drawing info into song informations
*/

function getTempoRange (drawing) {
	var tempo = drawing.avgSpeed - config.songify.drawingSpeed.min ;
	console.log(tempo)
	tempo = tempo / (config.songify.drawingSpeed.max - config.songify.drawingSpeed.min);
	tempo = Math.max(tempo, 0.99);
	tempo = Math.min(tempo, 0.01);
	return [tempo - 0.01, tempo + 0.01].map(function (tempo) {
		return tempo * 500;
	});
}

module.exports = function (drawing) {
	return {
		tempoRange: getTempoRange(drawing)
	};
};