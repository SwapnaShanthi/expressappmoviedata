import React, { Component } from 'react';

class MovieDataResults extends Component {
  render() {

    const resultDisplay=()=>{
        if(this.props.resultdata!=="" && this.props.error === ""){
            return (<div className="resultdiv">
                        <p><span className="span">Titel: {this.props.resultdata.Title}</span></p>
                        <p><span className="span">Year : {this.props.resultdata.Year}</span></p>
                        <p><span className="spanplot">Plot : {this.props.resultdata.Plot}</span></p>
                     </div>
                     )
        }
      return null;
    }
    return (
        <div>
        {resultDisplay()}
        </div>
    );
  }
}

export default MovieDataResults;