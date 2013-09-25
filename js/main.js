jQuery.fn.center = function () {
    this.css("position","fixed");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

var startX = 0;
var startY = 0;
var beginEdit = false;
var steps = 20;

$(function()
{
	$('#focus').center();
	

	$('#blanket').mousemove(function(event)
	{
		var x = event.pageX;
		var y = event.pageY;

		if(inCenter(x,y))
		{
			startX = x;
			startY = y;
			$('#focus').hide();
			beginEdit = true;

			showHints();
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

function screenCenter() {
	var y = Math.max(0, ($(window).height() / 2) + $(window).scrollTop());
	var x = Math.max(0, ($(window).width()  / 2) + $(window).scrollLeft());

	var cord = {};
	cord.x = x;
	cord.y = y;
	return cord;
}

function inCenter(x,y) {
	var center = screenCenter();
	var yScroll = $(window).scrollTop();
	var inX = false;
	var inY = false;

	if(x < center.x + 25 && x > center.x-25)
	{
		inX =true;
		//console.log('in center x');
	}
	
	if(y < center.y + 25 && y > center.y - 25){
		inY= true;
		//console.log('in center y');
	}

	return inX && inY;
}

function positionUI()
{
	var center = screenCenter();
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
