import React, { Component } from 'react';
import '../styles/moviedata.css'

class MovieDataForm extends Component {

   constructor(props){

        super(props);
        this.state={search:""}
    
  }
  handleChange=(e)=>{

    this.setState({[e.target.name]:e.target.value});
    if(e.target.name==="search" && e.target.value===""){
     this.props.emptyResultData();
    }

  }
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.search!== ""){
        this.props.apiCall(this.state.search);
    }
  }
  render() {
    const errorDisplay=()=>{
      if(this.props.error!== ""){
          return (<div className="errormessage">{this.props.error}</div>)
      }
      return null;
  }
    return (
        <div > 
        <h1>Movie Data</h1>
        <form  onSubmit={this.handleSubmit}>
           <div  className="formdiv">
               
                <input className="searchbar" type="text" name="search" onChange={this.handleChange} value={this.state.search} />
                
                <label>{this.state.searchErrorMessage}</label>

                <input className="buttonstyle" type="submit" name="Search"/>
                <span className="spanplot">{errorDisplay()}</span>
            </div>    
        </form>
        </div>
    );
  }
}

export default MovieDataForm;