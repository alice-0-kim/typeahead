var main = new Vue({
    el: '#main',
    data: {
        searchString: "",
        searchLetter: "",
        isActive: false,
        itemPerPage: 3,
        pageNums: 1,
        currentPageNum: 1,
        data: [],
        contents: [],
        filter: "All",
        sort: "A - Z",
    },
    created () {
        // Previous JSON feed: https://api.myjson.com/bins/13hb82
        fetch('https://api.myjson.com/bins/v8rm4')
        .then(response => response.json())
        .then(json => {
          this.data = this.contents = json.sort(function(a, b) {
                    if (a.term < b.term) return -1
                    if (a.term > b.term) return 1
                    return 0
                })
                this.updatePageNumbers(this.currentPageNum)
                this.pageNums = this.data.length / this.itemPerPage
        })
    },
    watch: {
        contents: function () {
            this.updatePageNumbers(this.currentPageNum)
        },
        searchLetter: function () {
            this.updatePageNumbers(this.currentPageNum)
        }
    },
    methods: {
        updatePageNumbers: function (num) {
            this.pageNums = Math.ceil(this.contents.length / this.itemPerPage)
            this.currentPageNum = num > this.pageNums ? 1 : num
        },
        updatePrevious: function () {
            if (this.currentPageNum !== 1) {
                this.updatePageNumbers(this.currentPageNum - 1)
            }
        },
        updateNext: function () {
            if (this.currentPageNum !== this.pageNums) {
                this.updatePageNumbers(this.currentPageNum + 1)
            }
        },
        updateSearchLetter: function (event) {
            var target = event.target
            this.searchLetter = target.innerText
        },
        showToggle: function (event) {
            var target = event.target
            target.previousElementSibling.classList.toggle("off")
        },
        filterByTerm: function () {
            var term = this.$refs['term']
            term.classList.remove("hide")
            var letter = this.$refs['letter']
            letter.classList.add("hide")
        },
        filterByLetter: function () {
            var term = this.$refs['term']
            term.classList.add("hide")
            var letter = this.$refs['letter']
            letter.classList.remove("hide")
        },
        resetSearchLetter: function () {
            this.searchLetter = ""
        }
    },
    computed: {
        pageredContents: function () {
            return this.contents.slice((this.currentPageNum - 1) * this.itemPerPage, this.currentPageNum * this.itemPerPage < this.contents.length ? this.currentPageNum * this.itemPerPage : this.contents.length)
        },
        filteredContents: function () {
            var firstLetter = '', contents = this.data

            for (var content of contents) {
                var currentLetter = content.term.toLowerCase().substring(0,1)
                if (currentLetter !== firstLetter) {
                    content.isFirst = true
                    firstLetter = currentLetter
                } else {
                    content.isFirst = false
                }
            }

            switch (this.sort) {
                case "A - Z":
                    contents.sort(function(a, b) {
                        if (a.term < b.term) return -1
                        if (a.term > b.term) return 1
                        return 0
                    })
                    break;
                case "Z - A":
                    contents.sort(function(a, b) {
                        if (a.term > b.term) return -1
                        if (a.term < b.term) return 1
                        return 0
                    })
                    break;
            }

            contents = contents.filter(content => content.class == this.filter || this.filter == "All")
            contents = contents.filter(content => content.term.startsWith(this.searchLetter.toLowerCase()))

            this.contents = contents

            return contents
        },
        autocompleteContents: function () {
            var autocomplete_contents = this.contents, searchString = this.searchString

            var firstLetter = ''
            for (var article of autocomplete_contents) {
                var currentLetter = article.term.toLowerCase().substring(0,1)
                if (currentLetter !== firstLetter) {
                    article.isFirst = true
                    firstLetter = currentLetter
                } else {
                    article.isFirst = false
                }
            }

            if(!searchString){
                return []
            }

            searchString = searchString.trim().toLowerCase()

            autocomplete_contents = autocomplete_contents.filter(function (item){
                var termToLowercase = item.term.toLowerCase()
                var defnToLowercase = item.definition.toLowerCase()
                var indexOfTerm = item.term.toLowerCase().indexOf(searchString)
                var indexOfDefn = item.definition.toLowerCase().indexOf(searchString)

                if(indexOfTerm === 0) {
                    // Case 1: a term starts with the search string.
                    item.highlighted = item.definition
                    return item
                } else if (indexOfDefn !== -1 && searchString.indexOf(' ') === -1) {
                    // Case 2: a definition of a term includes the search string, and search string DOES NOT CONTAIN white spaces.
                    var w = item.definition.split(' ')
                    var i = w.findIndex(function (word) {
                        return word.toLowerCase().indexOf(searchString) !== -1
                    })

                    var start = i < 3 ? 0 : i - 3
                    var end   = w.length - i < 3 ? w.length : i + 3
                    var trailingStart = start === 0 ? '' : '...'
                    var trailingEnd   = end   === w.length ? '' : '...'

                    item.highlighted = trailingStart + w.slice(start,i).join(' ') + ' ' + w[i].substr(0, w[i].toLowerCase().indexOf(searchString)) + '<span>' + w[i].substr(w[i].toLowerCase().indexOf(searchString), searchString.length) + '</span>' + w[i].substr(w[i].toLowerCase().indexOf(searchString) + searchString.length, w[i].length) + ' ' + w.slice(i + 1,end).join(' ') + trailingEnd
                    return item
                } else if (indexOfDefn !== -1) {
                    // Case 3: a definition of a term includes the search string, and search string CONTAINS white spaces.
                    var w = item.definition.split(' ')
                    var startWord = w.findIndex(function (word, index) {
                        return w.slice(0, index + 1).join(' ').length >= indexOfDefn
                    })
                    var endWord = w.findIndex(function (word, index) {
                        return w.slice(0, index + 1).join(' ').length >= indexOfDefn + searchString.length
                    })

                    var start = startWord < 3 ? 0 : startWord - 3
                    var end   = w.length - endWord < 3 ? w.length : endWord + 3
                    var trailingStart = start === 0 ? '' : '...'
                    var trailingEnd   = end   === w.length ? '' : '...'

                    var indexOfPrePhrase = w[startWord].toLowerCase().indexOf(searchString.split(' ')[0])
                    var indexOfPostPhrase = w[endWord].toLowerCase().indexOf(searchString.split(' ')[searchString.split(' ').length - 1])

                    var prePhrase = w[startWord].substr(0, indexOfPrePhrase)
                    var phrase = item.definition.substr(indexOfDefn, searchString.length)
                    var postPhrase = indexOfPostPhrase === -1 ? ' ' + w[endWord] : w[endWord].substr(indexOfPostPhrase + searchString.split(' ')[searchString.split(' ').length - 1].length, w[endWord].length)

                    item.highlighted = trailingStart + w.slice(start, startWord).join(' ') + ' ' + prePhrase + '<span>' + phrase + '</span>' + postPhrase + ' ' + w.slice(endWord + 1, end).join(' ') + trailingEnd
                    return item
                }
            })
            if (autocomplete_contents.length > 0){
                isActive = true
            }
            // Return an array with the filtered data.
            return autocomplete_contents
        }
    },
    filters: {
        time: function (value) {
            var date = new Date(value)
            return date.getFullYear().toString() + "-" + date.getMonth().toString() + "-" + date.getDate().toString()
        },
        firstLetter: function (value) {
            return value.substring(0, 1).toUpperCase()
        }
    }
})
