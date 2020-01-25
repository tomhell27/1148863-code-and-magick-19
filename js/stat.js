'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var WIDTH_BETWEEN = 50;
var MAX_HEIGHT = 150;
var barWidth = 40;

var randomColor = function (ctx, min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var drawRect = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color || '#000000';
  ctx.fillRect(x, y, width, height);
};

var drawText = function (ctx, text, x, y, color, font) {
  ctx.fillStyle = color || '#000';
  ctx.font = font || '16px PT Mono';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  drawRect(ctx, CLOUD_X + CLOUD_Y, CLOUD_Y * 2, CLOUD_WIDTH, CLOUD_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  drawRect(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, '#fff');

  var maxTime = getMaxElement(times);
  var scalefactor = MAX_HEIGHT / maxTime;
  var hurrayX = CLOUD_X + CLOUD_Y * 3;

  drawText(ctx, 'Ура вы победили!', hurrayX, GAP * 3);
  drawText(ctx, 'Список результатов:', hurrayX, GAP * 5);

  for (var i = 0; i < players.length; i++) {

    var barHeight = scalefactor * Math.floor(times[i]);
    var x = CLOUD_X + GAP + WIDTH_BETWEEN + (barWidth + WIDTH_BETWEEN) * i;
    var y = CLOUD_X + MAX_HEIGHT - GAP - barHeight;

    drawRect(ctx, x, y, barWidth, barHeight, players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240,' + randomColor(ctx, 10, 100) + '%, 50%)');
    drawText(ctx, players[i], x, CLOUD_HEIGHT - GAP);
    drawText(ctx, Math.floor(times[i]), x, y - barWidth + GAP * 2);
  }
};
