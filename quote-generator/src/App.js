import logo from './logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            quote: "",
            author: ""
        };
    }

    componentDidMount() {
        fetch("https://api.airtable.com/v0/appF9W9ISFMCxqgsw/Quotes?maxRecords=10&view=Grid%20view", {
            method: "GET",
            headers: { "Authorization": "Bearer {TOKEN HERE}"}
            })
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result.records[0].fields)
                    this.setState({
                        isLoaded: true,
                        items: result.records,
                        quote: result.records[0].fields.Content,
                        author: result.records[0].fields.Author
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items, quote, author } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                    <div className="Wrapper" id="quote-box" style={{ marginTop: "250px" }}>
                        <div id="text"><p>{quote}</p></div>
                        <div id="Author"><p>{author}</p></div>
                        <button id="new-quote" onClick={() => {
                            let randomInt = Math.floor(Math.random() * 9)
                            console.log(randomInt)
                            this.setState({
                                quote: items[randomInt].fields.Content,
                                author: items[randomInt].fields.Author
                            })
                        }}>New Quote</button>
                        <br />
                        {/* <a id="tweet-quote" href="">Tweet Quote</a> */}
                    </div>
                </div>
            );
        }
    }
}

export default App;
