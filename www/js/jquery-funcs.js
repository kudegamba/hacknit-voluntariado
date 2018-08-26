$(document).ready(function(){
	$('h2.accordion').click(function(){
		$(this).parent().find('div.accordion').slideToggle("slow");
	});
});