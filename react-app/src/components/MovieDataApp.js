import React, { Component } from 'react';
import MovieDataForm from './MovieDataForm';
import MovieDataResults from './MovieDataResults';
import MovieSearchHistory from './MovieSearchHistory';
import axios from 'axios';
import '../styles/moviedata.css'

class MovieDataApp extends Component {
  constructor(props){

    super(props);
    this.state={search:"",
                resultdata:{},
                apiCall:false,
                error:"",
                searchhistory:[]
               }

  }
  emptyResultData=()=>{
    let resultdata={}
    this.setState({ resultdata:resultdata});
    this.setState({apiCall:false});
    this.setState({error:""})
  }
  deleteItemsFromsearchHistory=(id)=>{
    axios.delete(`http://localhost:5000/deletesearch/`,{params: { id: id }})
         .then((response) => {
              console.log(`Delete Personal Task`);
              this.searchHistory();
          })
          .catch((error) => {
               console.log(error)
          })


  }

  apiCall=(searchdata) =>{
    axios.get(`http://localhost:5000/moviedata/`, {params: { id: searchdata }})
         .then(response => {
                const resultdata = response.data;
                console.log(response.data);
                if(response.data.status){
                  if(response.data.moviedetails.Tile!== null){
                    this.setState({ resultdata:response.data.moviedetails});
                    this.setState({apiCall:true});
                    this.setState({error:""});
                    this.searchHistory();
                  }else{
                    this.searchHistory();
                    this.setState({error:"Movie not found!"});
                  }
                }else{
                    //this.setState({error:resultdata.Error});
                    this.setState({ resultdata:""});
                    this.setState({apiCall:false});
                    this.setState({error:"Movie not found!"});
                    this.searchHistory();
                }
        })
        .catch(error => {
            this.setState({error:"Error occured during the call please try again"});
            this.setState({apiCall:false});
        });
  }
  searchHistory=()=>{
    axios.get(`http://localhost:5000/searchhistory/`)
         .then(response => {
           const resultdata = response.data;
           console.log(response.data);
           if(response.data.status){
               this.setState({ searchhistory:response.data.data});
               //this.setState({apiCall:true});
               //this.setState({error:""});
               console.log(this.state.searchhistory);
           }else{
               this.setState({error:resultdata.Error});
               
               //this.setState({ resultdata:""});
          
               //this.setState({apiCall:false});
           }
   })
   .catch(error => {
       this.setState({error:"Error occured during the call please try again"});
       this.setState({apiCall:false});
   });


  }
  componentDidMount(){
     this.searchHistory();
  }
  render() {
    const emptyDiv=()=>{
        if(this.state.apiCall || this.state.error!= "" ){
            return (<div> 
                        <MovieDataResults resultdata={this.state.resultdata} error={this.state.error}/>
            
                    </div>)
        }
       return null;
    }
    const displaySearchHistory=()=>{
      if(this.state.searchhistory!= "" ){
          return (<div >
                      <MovieSearchHistory deleteItemsFromsearchHistory={this.deleteItemsFromsearchHistory} searchhistory={this.state.searchhistory} error={this.state.error}/>
                 </div> )
      }
     return null;
    }
    return (
      <div >
        <div className="outerdiv" >
              <div >
                  <MovieDataForm  apiCall={this.apiCall} emptyResultData={this.emptyResultData} error={this.state.error}/>
              </div>  
              {emptyDiv()}
        </div>
        <div className="searchhistorydiv ">
              {displaySearchHistory()}
        </div>
       </div>
    );
  }
}

export default MovieDataApp;