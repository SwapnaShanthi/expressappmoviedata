const express = require( 'express');
const app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
const axios = require( 'axios');

app.use(express.static("./../react-app/build/")); 

const tasks=[];
const repodata=[];

app.get("/moviedata/",(request, response)=>{
    console.log(request.query.id);
    axios.get(`http://www.omdbapi.com/?t=${request.query.id}&apikey=1075f858&`)
         .then(movieApiResponse => {
                const resultdata = movieApiResponse.data;
                if(movieApiResponse.data.Response!=="False"){
                    const moviedetails={Title:"",
                                        Year:"",
                                        Plot:"" 
                                    }
                                    console.log(movieApiResponse.data.Response);
                    moviedetails.Title=movieApiResponse.data.Title;
                    moviedetails.Year=movieApiResponse.data.Year;
                    moviedetails.Plot=movieApiResponse.data.Plot;

                    axios.post(`http://5c99215a423656001439321e.mockapi.io/api/v1/moviedata`,{moviedetails})
                        .then(mockApiResponse => {
                            console.log("posted to mockapi",mockApiResponse);
                            return response.json({ status: true,moviedetails:moviedetails })
                        })
                        .catch(error => {
                                console.log("back from mockapi",error);
                        });
                }else{
                    return response.json({ status: false})
                }
        })
        .catch(error => {return response.json({
                status: false
              })
        });
    
  

})
app.delete("/deletesearch/", (request, response) => {
    axios.delete(`http://5c99215a423656001439321e.mockapi.io/api/v1/moviedata/${request.query.id}`)
        .then(mockApiResponse => {
            return response.json({ status: true })
        })
        .catch(error => {
            console.log("back from mockapi",error);
        });
    
})
app.get("/searchhistory/",(request, response)=>{

   axios.get(`http://5c99215a423656001439321e.mockapi.io/api/v1/moviedata`)

        .then(function (mockApiGetResponse) {
                return response.json({
                        data: mockApiGetResponse.data,
                        status:true
                    })
            
        })
        .catch(error => {
                console.log("test3"+error);
        });
    

})

app.listen(5000 ,()=>{

});