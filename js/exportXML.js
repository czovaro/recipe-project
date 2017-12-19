$(document).ready(function() {
	$('a#exportLink').click(exportXML);

})

function exportXML() {

	$('a#exportLink').hide();
	var $root = $('<XMLDocument />');

	$root.append(
		$('<recipe />').append(
			$('<title />').text($('span[itemprop="name"]').text())
		).append(
			$('<recipeinfo />').append(
				$('<blurb />').text($('span[itemprop="description"]').text())
			).append(
				$('<author />').text($('span[itemprop="author"]').text())
			).append(
				$('<recipeCategory />').text($('span[itemprop="recipeCategory"]').text())
			).append(
				$('<yield />').text($('span[itemprop="recipeYield"]').text())
			).append(
				$('<preptime />').text($('span[itemprop="preptime"]').text())
			)
		).append(
			$('<ingredientlist />')
		).append(
			$('<preparation />').text($('span[itemprop="recipeInstructions"]').text())
		)
	);

	$('span[itemprop="ingredients"]').each(function() {
		$root.find('ingredientlist').append(
			$('<ingredient />').append(
				$('<quantity />').text($(this).children('span[name="quantity"]').text())
			).append(
				$('<unit />').text($(this).children('span[name="unit"]').text())
			).append(
				$('<fooditem />').text($(this).children('span[name="fooditem"]').text())
			)
		)
	});

	var xmlString = (new XMLSerializer()).serializeToString($root[0]);
	$('#xmlOutput').html(xmlString).slideDown();
}