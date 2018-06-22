var demo = new Vue({
    el: '#main',
    data: {
        searchString: "",

        // The data model. These items would normally be requested via AJAX,
        // but are hardcoded here for simplicity.

        articles: [
	{
		"term": "apple",
		"definition": "a hard round fruit that is white inside and has a smooth green, yellow, or red skin, which is called peel when it has been removed.",
		"data_community": "UBC IT",
		"data_steward": "Alice Kim",
		"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
		"status": "active",
		"sensitivity": "true",
		"example": "Apples are red.",
		"acronym": "-",
		"synonym": "-",
		"highlighted": "",
		"image": "dog.jpg"
	},
	{
		"term": "dictionary",
		"definition": "a book or electronic resource that lists the words of a language (typically in alphabetical order) and gives their meaning, or gives the equivalent words in a different language, often also providing information about pronunciation, origin, and usage.",
		"data_community": "UBC IT",
		"data_steward": "Alice Kim",
		"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
		"status": "active",
		"sensitivity": "true",
		"example": "Apples are red.",
		"acronym": "-",
		"synonym": "-",
		"highlighted": "",
		"image": "dog.jpg"
	},
	{
		"term": "bliss",
		"definition": "perfect happiness; great joy.",
		"data_community": "UBC IT",
		"data_steward": "Alice Kim",
		"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
		"status": "active",
		"sensitivity": "true",
		"example": "Apples are red.",
		"acronym": "-",
		"synonym": "-",
		"highlighted": "",
		"image": "dog.jpg"
	},
	{
		"term": "gratitude",
		"definition": "the quality of being thankful; readiness to show appreciation for and to return kindness.",
		"data_community": "UBC IT",
		"data_steward": "Alice Kim",
		"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
		"status": "active",
		"sensitivity": "true",
		"example": "Apples are red.",
		"acronym": "-",
		"synonym": "-",
		"highlighted": "",
		"image": "dog.jpg"
	},
	{
		"term": "pie",
		"definition": "a baked dish of fruit, or meat and vegetables, typically with a top and base of pastry.",
		"data_community": "UBC IT",
		"data_steward": "Alice Kim",
		"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
		"status": "active",
		"sensitivity": "true",
		"example": "Apples are red.",
		"acronym": "-",
		"synonym": "-",
		"highlighted": "",	
		"image": "dog.jpg"
	},
	{
		"term": "flower",
		"definition": "the seed-bearing part of a plant, consisting of reproductive organs (stamens and carpels) that are typically surrounded by a brightly colored corolla (petals) and a green calyx (sepals).",
		"data_community": "UBC IT",
		"data_steward": "Alice Kim",
		"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
		"status": "active",
		"sensitivity": "true",
		"example": "Apples are red.",
		"acronym": "-",
		"synonym": "-",
		"highlighted": "",
		"image": "dog.jpg"
	},
	{
		"term": "generosity",
		"definition": "the quality of being kind and generous.",
		"data_community": "UBC IT",
		"data_steward": "Alice Kim",
		"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
		"status": "active",
		"sensitivity": "true",
		"example": "Apples are red.",
		"acronym": "-",
		"synonym": "-",
		"highlighted": "",
		"image": "dog.jpg"
	}]

    },
//     created () {
// 				fetch('https://api.myjson.com/bins/1crl2y')
// 				.then(response => response.json())
// 				.then(json => {
// 						this.articles = json.articles
// 				})
//     },
    computed: {
        // A computed property that holds only those articles that match the searchString.
        filteredArticles: function () {
            var articles_array = this.articles.sort(function(a, b) {
								return a.term - b.term;
						}),
                searchString = this.searchString;

            if(!searchString){
                return [];
            }

            searchString = searchString.trim().toLowerCase();

            articles_array = articles_array.filter(function(item){
            		var termToLowercase = item.term.toLowerCase();
            		var defnToLowercase = item.definition.toLowerCase();
								var indexOfTerm = item.term.toLowerCase().indexOf(searchString);
            		var indexOfDefn = item.definition.toLowerCase().indexOf(searchString);
            		
                if(indexOfTerm === 0) {
                		//item.term = '<span>' + item.term.substr(indexOfTerm, searchString.length) + '</span>' + item.term.substr(searchString.length, termToLowercase.length - searchString.length);
                		item.highlighted = item.definition;
                    return item;
                } else if (indexOfDefn !== -1 && searchString.indexOf(' ') === -1) {
                		console.log(searchString + ' at ' + indexOfDefn);
                		var w = item.definition.split(' ');
                		var i = w.findIndex(function(word) {
                				return word.indexOf(searchString) !== -1;
                		});
                		
                		var start = i < 3 ? 0 : i - 3;
                		var end   = w.length - i < 3 ? w.length : i + 3;
                		var trailingStart = start === 0 ? '' : '...';
                		var trailingEnd   = end   === w.length - 1 ? '' : '...';
                		
                		item.highlighted = trailingStart + w.slice(start,i).join(' ') + ' ' + w[i].substr(0, w[i].indexOf(searchString)) + '<span>' + w[i].substr(w[i].indexOf(searchString), searchString.length) + '</span>' + w[i].substr(w[i].indexOf(searchString) + searchString.length, w[i].length) + ' ' + w.slice(i + 1,end).join(' ') + trailingEnd;
                		return item;
                } else if (indexOfDefn !== -1) {
                		var w = item.definition.split(' ');
                		var startWord = w.findIndex(function(word, index) {
                				return w.slice(0, index + 1).join(' ').length - 1 >= indexOfDefn;
                		});
                		var endWord = w.findIndex(function(word, index) {
                				return w.slice(0, index + 1).join(' ').length - 1 >= indexOfDefn + searchString.length;
                		});
                		
                		console.log(startWord)
                		console.log(endWord)
                		
                		var start = startWord < 3 ? 0 : startWord - 3;
                		var end   = w.length - endWord < 3 ? w.length : endWord + 3;
                		var trailingStart = start === 0 ? '' : '...';
                		var trailingEnd   = end   === w.length - 1 ? '' : '...';

                		var prePhrase = w[startWord].substr(0, w[startWord].indexOf(searchString.split(' ')[0]));
                		var phrase = searchString;
                		console.log(">> " + w[endWord].indexOf(searchString.split(' ')[searchString.split(' ').length - 1]));

                		var indexOfPostPhrase = w[endWord].indexOf(searchString.split(' ')[searchString.split(' ').length - 1]);
                		
                		var postPhrase = indexOfPostPhrase === -1 ? ' ' + w[endWord] : w[endWord].substr(indexOfPostPhrase + searchString.split(' ')[searchString.split(' ').length - 1].length, w[endWord].length);
                		
                		console.log(prePhrase)
                		console.log(phrase)
                		console.log(postPhrase)
                		                		
                		item.highlighted = trailingStart + w.slice(start, startWord).join(' ') + ' ' + prePhrase + '<span>' + phrase + '</span>' + postPhrase + ' ' + w.slice(endWord + 1, end).join(' ') + trailingEnd;
                		return item;
                }
            })
            // Return an array with the filtered data.
            return articles_array;
        }
    }
});