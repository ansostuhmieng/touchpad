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

			$('#decrease').show();
			$('#increase').show();
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
	$('#decrease').hide();
	$('#increase').hide();
	beginEdit = false;
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
	var yOffset = $('#increase').outerHeight() /2;
	var xOffset = $(window).width() / 4;

	$('#increase').css("top", center.y - yOffset + 'px');
	$('#increase').css("left", center.x + xOffset + 'px');

	$('#decrease').css("top",center.y - yOffset + 'px');
	$('#decrease').css("left", center.x - xOffset + 'px');
}
