jQuery.fn.center = function () {
    this.css("position","fixed");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

var beginEdit = false;
var steps = 20;
var value = [];

$(function()
{
	$('#focus').center();
	

	$('#blanket').mousemove(function(event)
	{
		var x = event.pageX;
		var y = event.pageY;

		if(inCenter(x,y) && !beginEdit)
		{
			startX = x;
			startY = y;
			$('#focus').hide();
			beginEdit = true;

			showHints();
		}

		if(beginEdit && !inCenter(x,y))
		{
			var cord = {};
			cord.x = x;
			cord.y = y;
			//updateValue(cord);
			beginEdit = false
			console.log('bar');
			var interval = window.setInterval(logTimer,2000);
			console.log(interval);
		}
		//console.log(y);
	});

	$('ul li').mousedown(function(){
		var title = $(this)
					    .clone()    //clone the element
					    .children() //select all the children
					    .remove()   //remove all the children
					    .end()  //again go back to selected element
					    .text();

		$('#blanket .title').text(title);
		$('#blanket .value').text($(this).children(':first').text());
		value = $('#blanket .value').text().substring(1).split('.');

		//console.log($(this).children(':first').text());
		showBlanket();
	});

	$('#blanket').mouseup(function(){
		hideBlanket();
	});

});

function showBlanket()
{
	$('#dataScan').show();
	$('#focus').show();
	positionUI();
	hideHints();
	beginEdit = false;
}

function hideHints()
{
	$('#decreaseLarge').hide();
	$('#increaseLarge').hide();
	$('#decreaseSmall').hide();
	$('#increaseSmall').hide();
}

function showHints()
{
	$('#decreaseLarge').show();
	$('#increaseLarge').show();
	$('#decreaseSmall').show();
	$('#increaseSmall').show();
	positionUI();
}

function hideBlanket()
{
	$('#dataScan').hide();
}

function scrollCenter() {
	var y = Math.max(0, ($(window).height() / 2) + $(window).scrollTop());
	var x = Math.max(0, ($(window).width()  / 2) + $(window).scrollLeft());

	var cord = {};
	cord.x = x;
	cord.y = y;
	return cord;
}

function windowCenter(){
	var y = Math.max(0, ($(window).height() / 2));
	var x = Math.max(0, ($(window).width()  / 2));

	var cord = {};
	cord.x = x;
	cord.y = y;
	return cord;	
}

function inCenter(x,y) {
	var center = scrollCenter();
	var yScroll = $(window).scrollTop();
	var inX = false;
	var inY = false;

	if(x < center.x + 25 && x > center.x-25)
	{
		inX =true;
	}
	
	if(y < center.y + 25 && y > center.y - 25){
		inY= true;
	}

	return inX && inY;
}

function positionUI()
{
	var center = windowCenter();
	var yOffset = $('#increaseLarge').outerHeight() /2;
	var xOffset = $(window).width() / 4;

	$('#increaseLarge').css("top", center.y - yOffset + 'px');
	$('#increaseLarge').css("left", center.x + xOffset + 'px');
	
	yOffset = $('#decreaseLarge').outerHeight() /2;
	var width = $('#decreaseLarge').outerHeight() /4;
	$('#decreaseLarge').css("top",center.y - yOffset + 'px');
	$('#decreaseLarge').css("left", center.x - xOffset  - width+ 'px');

	yOffset = $(window).width() / 4;
	xOffset = $('#increaseSmall').outerWidth() / 2;

	$('#increaseSmall').css("top", center.y - yOffset + 'px');
	$('#increaseSmall').css("left", center.x - xOffset + 'px');

	xOffset = $('#decreaseSmall').outerWidth() / 2;
	var height = $('#decreaseSmall').outerHeight();
	$('#decreaseSmall').css("top", center.y + yOffset - height + 'px');
	$('#decreaseSmall').css("left", center.x - xOffset + 'px');
}

var scale = 5;

function logTimer()
{
	console.log('now');
}

function updateValue(cord)
{
	if(inCenter(cord.x, cord.y))
		return;

	console.log('foo');
	value[0] = parseInt(value[0]) + 1;
	$('#blanket .value').text('$' + value[0] + '.' + value[1]);

}