import React, { Component } from 'react';
import axios from 'axios'; 
import './App.css';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
    
    // Initialise state 
    constructor() {
        // Super let us use `this` within the context of the App class rather than
        // the parent component class we are extending from React      
        super();
        this.state = {
            gifs: [],
            loading: true 
        }; 
    } 

    /* // Fetch API uses Promises to handle results, the promises let you chain methods 
    // in a sequential order - something happens after something else is done       
    componentDidMount () {
        // Fetch returns a response object containing a response   
        fetch ('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
            // A callback that returns the result in JSON format  
            .then (response => response.json ())
            // A callback that updates the gif state 
            .then (responseData => {
                this.setState ({ gifs: responseData.data });
            })
            .catch (error => {
                console.log ('Error fetching and parsing data', error);
            });
    }; */
    
    componentDidMount () {
        this.performSearch ();
    };

    performSearch = (query = 'cats') => { // provide a default value for the query parameter
        // Axios automatically returns the response in JSON format   
        axios.get (`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`) 
            // A callback function that updates the gif state 
            .then (response => {
                // Axios returns the response from server as `data` (see response schema in doc)
                this.setState ({ 
                    gifs: response.data.data,
                    loading: false
                });
            })
            .catch (error => {
                console.log ('Error fetching and parsing data', error)
            });
    };

    render() { 
        console.log (this.state.gifs); 
        return (
            <div>
                <div className="main-header">
                    <div className="inner">
                        <h1 className="main-title">GifSearch</h1>
                        <SearchForm onSearch={this.performSearch} />      
                    </div>   
                </div>    
                <div className="main-content">
                    {
                       (this.state.loading) ?  
                       <p>Loading... </p> :
                       <GifList data={this.state.gifs} />
                    }
                </div>
            </div>
        );
    }
}
