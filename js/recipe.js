function recipe(author, name, description, cookingTime,instructions, portions,nutritionalValue, bakingMethod){
	this.author = author;
	this.name = name;
	this.description = description;
	//Path para as imagens
	this.images = [];
	//Lista de categorias
	this.categories = [];
	//Lista de ingredientes
	this.ingredients = [];
	this.cookingTime = cookingTime;
	this.instructions = instructions;
	this.portions = portions;
	this.nutritionalValue = nutritionalValue;
	this.bakingMethod = bakingMethod;

	this.getImages = function(){
        return this.images;
    };
   
    this.setImages = function(val){
        this.images.push(val);
    };
	
    this.getCategories = function(){
        return this.categories;
    };
   
    this.setCategories = function(val){
        this.categories.push(val);
    };

    this.getIngredients = function(){
        return this.ingredients;
    };
   
    this.setIngredients = function(val){
        this.ingredients.push(val);
    };
}

function category(name){
	this.name = name;
}

function ingredient(name, qtd, unid){
	this.name = name;
	this.qtd = qtd;
	this.unid = unid;
}

