var App = React.createClass({
		getInitialState: function(){
    	return {searchResults:[]};
    },
    showResults: function(response){
    	this.setState({searchResults: response.results});
      console.log(response);
    },
    search: function(URL){
    	$.ajax({
      	type: 'GET',
        dataType: 'jsonp',
        url: URL,
        success: function(response){
        	this.showResults(response);
        }.bind(this)
      });
    },
    componentDidMount: function(){
    	this.search('https://itunes.apple.com/search?term=fun');
    },
    render: function(){
        return (
            <div>
                <SearchBox search={this.search} />
                <Results searchResults={this.state.searchResults}/>
            </div>
        );
    }
});

var SearchBox = React.createClass({
		createAjax: function(){
    	var query= React.findDOMNode(this.refs.query).value;
      var category = React.findDOMNode(this.refs.category).value;
      var URL = 'https://itunes.apple.com/search?term=' + query + '&country=us&entity=' + category;
      this.props.search(URL);
    },
    render: function(){
        return (
            <div>
                <input type="text" ref="query" />
                <select ref="category">
                    <option value="software">Apps</option>
                    <option value="movie">Films</option>
                </select>
                <input type="submit" onClick={this.createAjax} />
            </div>
        );
    }
});

var Results = React.createClass({
    render: function(){
    		var resultItems = this.props.searchResults.map(function(result){
        	return <ResultItem key={result.keyId} trackName={result.trackName} />
        });
        return(
            <ul>
            		{resultItems}
            </ul>           
        );
    }
});

var ResultItem = React.createClass({
    render: function(){
        return <li>{this.props.trackName}</li>;
    }
});

ReactDOM.render(<App />,  document.getElementById("container"))
