import React, { Component } from 'react';
import '../styles/moviedata.css'


class MovieSearchHistory extends Component {
  constructor(props){

    super(props);
  }

  handleChange=(e)=>{
    console.log(e.target.id);
    alert("Do you want to delete this from the search history?");
    this.props.deleteItemsFromsearchHistory(e.target.id);
    

  }
  render() {
     
    const resultDisplay=()=>{
        if(this.props.searchhistory!==""){
        const display=this.props.searchhistory.map((items,index)=>{
            return (<div>
                        <p><span onClick={this.handleChange} id={items.id} className="searchspan">{items.moviedetails.Title}</span></p>
                     </div>
                     )
          }) 
          return display;          
        }
      return null;
    }
   
    return (
        <div><h3>Search History</h3>
        {resultDisplay()}
        </div>
    );
  }
}

export default MovieSearchHistory;