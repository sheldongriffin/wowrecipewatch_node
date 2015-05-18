var tradeskills = {
	//'Blacksmithing' : 164,
	//'Leatherworking': 165,
	//'Alchemy': 171,
	//'Herbalism': 182,
	//'Mining': 186,
	//'Tailoring': 197,
	//'Engineering': 202,
	'Enchanting': 333,
	//'Skinning': 393,
	'Jewelcrafting': 755,
	//'Inscription': 773
};

var fs = require('fs');

Object.keys(tradeskills).forEach(function (key) {
	var recipes = [];
	var tradeskillId = tradeskills[key];

	fs.readFile("C:/AckisRecipeList_" + key + "/Recipes.lua", { 'encoding' : 'utf8' }, function (err, text) {
		if (!err) {
			var recipeRe = /(\d+), V.(\w+), Q.(\w+)/;
			var recipeNameRe = /-- ([^--]+) --/;
			var delimRe = /--\s+\w+[^--]*\s+--\s+\d+[^--]+/gm;
			var skillLevelRe = /SetSkillLevels\((\d+)/;
			var craftedItemRe = /SetCraftedItem\((\d+)/;
			var recipeItemRe = /SetRecipeItem\((\d+)/;

			var matches = text.match(delimRe);

			text.match(delimRe).forEach(function (recipeText) {
				var recipe = {
					tradeskillId: tradeskillId,
					tradeskill: key
				};

				var m = recipeText.match(recipeNameRe);
				recipe.name = m[1];

				m = recipeText.match(recipeRe);
				recipe._id = parseInt(m[1]);
				recipe.release = m[2];
				recipe.quality = m[3];

				m = recipeText.match(skillLevelRe);
				recipe.skillLevel = parseInt(m[1]);

				m = recipeText.match(craftedItemRe);
				if (m) {
					recipe.craftedItemId = parseInt(m[1]);
				}

				m = recipeText.match(recipeItemRe);
				if (m) {
					recipe.recipeItemId = parseInt(m[1]);
				}

				recipes.push(recipe);

			});

			fs.writeFile("C:/AckisRecipeList_" + key + "/Recipes.json", JSON.stringify(recipes, null, 4), function (err) {});
		} else {
			console.log(err);
		}
	});
});
