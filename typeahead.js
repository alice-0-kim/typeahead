var demo = new Vue({
    el: '#main',
    data: {
        searchString: "",

        // The data model. These items would normally be requested via AJAX,
        // but are hardcoded here for simplicity.

        articles: [
	{
		"term": "Apple",
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
		"image": "ubc.jpg"
	},
	{
		"term": "Banana",
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
		"image": "ubc.jpg"
	},
	{
		"term": "Cucumber",
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
		"image": "ubc.jpg"
	},
	{
		"term": "Drupal",
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
		"image": "ubc.jpg"
	},
	{
		"term": "Europe",
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
		"image": "ubc.jpg"
	},
	{
		"term": "Faculty",
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
		"image": "ubc.jpg"
	},
	{
		"term": "Great",
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
		"image": "ubc.jpg"
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
            var articles_array = this.articles,
                searchString = this.searchString;

            if(!searchString){
                return [];
            }

            searchString = searchString.trim().toLowerCase();

            articles_array = articles_array.filter(function(item){
                if(item.term.toLowerCase().indexOf(searchString) === 0){
                		item.highlighted = item.definition;
                    return item;
                } else if (item.definition.toLowerCase().indexOf(searchString) !== -1) {
										var index = item.definition.toLowerCase().indexOf(searchString);
                		item.highlighted = "..." + item.definition.toLowerCase().substr(index, 5 + searchString.length + 5) + "...";
                		return item;
                }
            })

            // Return an array with the filtered data.
            return articles_array;
        }
    }
});