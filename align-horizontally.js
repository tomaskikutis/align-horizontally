var getItemsCountInOneRow = function(itemWidth, container, items){
	return Math.floor(container.width() / itemWidth);
}

var getRowsCount = function(items,itemsPerRow){
	return Math.ceil(items.length/itemsPerRow);
};

module.exports = function(options) {
	// options.container - jQuery Object
	// options.items - jQuery Object Array
	// options.width - int
	// options.expandToEmptySpace - bool

	var proccessAllCellsInRow = function(rowNumber){
		var sliceBegin = rowNumber * itemsPerRow - itemsPerRow;
		var sliceEnd = sliceBegin + itemsPerRow;

		var cells = options.items.slice(sliceBegin, sliceEnd);
		cells.width(options.expandToEmptySpace === true ? 100/itemsPerRow+"%" : options.width);

		var maxHeight = 0;

		cells.each(function(iterator, item){
			var itemHeight = $(item).height();
			if(itemHeight > maxHeight){
				maxHeight = itemHeight;
			}
		});

		cells.each(function(iterator, item){
			$(item).height(maxHeight);
		});
	}

	var itemsPerRow = getItemsCountInOneRow(options.width, options.container, options.items);
	var rowsCount = getRowsCount(options.items, itemsPerRow);

	// reset every cell width and height
	options.items.each(function(i, item){
		$(item).css({
			height: "auto",
			width: "auto"
		});
	});

	for(var i = 0; i<rowsCount; i++){
		proccessAllCellsInRow(i+1);
	}
};
