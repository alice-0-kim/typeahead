var demo = new Vue({
    el: '#main',
    data: {
        searchString: "",
        isActive: false,

        // The data model. These items would normally be requested via AJAX,
        // but are hardcoded here for simplicity.

        articles: [
				{
					"term": "abstraction",
					"definition": "A simplified representation of something more complex.",
					"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
					"example": "Apples are red.",
					"highlighted": "",
					"isFirst": false,
					"image": "dog.jpg"
				},
				{
					"term": "binary",
					"definition": "A way of representing information using only two options.",
					"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
					"example": "Apples are red.",
					"highlighted": "",
					"isFirst": false,
					"image": "dog.jpg"
				},
				{
					"term": "byte",
					"definition": "The most common fundamental unit of digital data eg. Kilobyte, Megabyte, etc. A single byte is 8 bits-worth of data.",
					"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
					"example": "Apples are red.",
					"highlighted": "",
					"isFirst": false,
					"image": "dog.jpg"
				},
				{
					"term": "domain name service",
					"definition": "DNS; The service that translates URLs to IP addresses.",
					"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
					"example": "Apples are red.",
					"highlighted": "",
					"isFirst": false,
					"image": "dog.jpg"
				},
				{
					"term": "internet",
					"definition": "A group of computers and servers that are connected to each other.",
					"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
					"example": "Apples are red.",
					"highlighted": "",
					"isFirst": false,
					"image": "dog.jpg"
				},
				{
					"term": "pixel",
					"definition": "Short for \"picture element\", the fundamental unit of a digital image, typically a tiny square or dot that contains a single point of color of a larger image.",
					"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
					"example": "Apples are red.",
					"highlighted": "",
					"isFirst": false,
					"image": "dog.jpg"
				},
				{
					"term": "variable",
					"definition": "A placeholder for a piece of information that can change.",
					"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
					"example": "Apples are red.",
					"highlighted": "",
					"isFirst": false,
					"image": "dog.jpg"
				},
				{
					"term": "website",
					"definition": "A collection of interlinked web pages on the World Wide Web.",
					"definition_source": "https://www.google.ca/search?q=apple&oq=apple&aqs=chrome..69i57j69i60l3j69i65l2.1158j1j7&sourceid=chrome&ie=UTF-8",
					"example": "Apples are red.",
					"highlighted": "",
					"isFirst": false,
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
        		// Sort the array alphabetically.
            var articles_array = this.articles.sort(function(a, b) {
								if(a.term < b.term) return -1;
								if(a.term > b.term) return 1;
								return 0;
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
										// Case 1: a term starts with the search string.
                		item.highlighted = item.definition;
                    return item;
                } else if (indexOfDefn !== -1 && searchString.indexOf(' ') === -1) {
										// Case 2: a definition of a term includes the search string, and search string DOES NOT CONTAIN white spaces.
                		console.log(searchString + ' at ' + indexOfDefn);
                		var w = item.definition.split(' ');
                		var i = w.findIndex(function(word) {
                				return word.toLowerCase().indexOf(searchString) !== -1;
                		});
                		
                		var start = i < 3 ? 0 : i - 3;
                		var end   = w.length - i < 3 ? w.length : i + 3;
                		var trailingStart = start === 0 ? '' : '...';
                		var trailingEnd   = end   === w.length ? '' : '...';

                		item.highlighted = trailingStart + w.slice(start,i).join(' ') + ' ' + w[i].substr(0, w[i].toLowerCase().indexOf(searchString)) + '<span>' + w[i].substr(w[i].toLowerCase().indexOf(searchString), searchString.length) + '</span>' + w[i].substr(w[i].toLowerCase().indexOf(searchString) + searchString.length, w[i].length) + ' ' + w.slice(i + 1,end).join(' ') + trailingEnd;
                		return item;
                } else if (indexOfDefn !== -1) {
										// Case 3: a definition of a term includes the search string, and search string CONTAINS white spaces.
                		var w = item.definition.split(' ');
                		console.log(w.toString())
                		var startWord = w.findIndex(function(word, index) {
												return w.slice(0, index + 1).join(' ').length >= indexOfDefn;
                		});
                		var endWord = w.findIndex(function(word, index) {
                				return w.slice(0, index + 1).join(' ').length >= indexOfDefn + searchString.length;
                		});
                		
                		console.log(endWord)
                		var start = startWord < 3 ? 0 : startWord - 3;
                		var end   = w.length - endWord < 3 ? w.length : endWord + 3;
                		var trailingStart = start === 0 ? '' : '...';
                		var trailingEnd   = end   === w.length ? '' : '...';
                		
                		var indexOfPrePhrase = w[startWord].toLowerCase().indexOf(searchString.split(' ')[0]);
                		var indexOfPostPhrase = w[endWord].toLowerCase().indexOf(searchString.split(' ')[searchString.split(' ').length - 1]);
                		
                		var prePhrase = w[startWord].substr(0, indexOfPrePhrase);
                		var phrase = item.definition.substr(indexOfDefn, searchString.length);
                		var postPhrase = indexOfPostPhrase === -1 ? ' ' + w[endWord] : w[endWord].substr(indexOfPostPhrase + searchString.split(' ')[searchString.split(' ').length - 1].length, w[endWord].length);
                		                		
                		item.highlighted = trailingStart + w.slice(start, startWord).join(' ') + ' ' + prePhrase + '<span>' + phrase + '</span>' + postPhrase + ' ' + w.slice(endWord + 1, end).join(' ') + trailingEnd;
                		return item;
                }
            })
            if (articles_array.length > 0){
            		isActive = true;
            }
            var firstLetter = '';
            for (var article of articles_array) {
            		var currentLetter = article.term.toLowerCase().substring(0,1);
            		if (currentLetter !== firstLetter) {
            				article.isFirst = true;
            				firstLetter = currentLetter;
            		} else {
            				article.isFirst = false;
            		}
            }
            // Return an array with the filtered data.
            return articles_array;
        }
    }
});