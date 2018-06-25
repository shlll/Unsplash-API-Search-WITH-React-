import React, { Component } from 'react';
import './App.css';



class App extends Component {
  state = {
    images : [],
    textContent : "",
    topic:"",
    pages:"",
    typesOfPicture:"",
  }
  textOfInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  conponentDidMount = () => {
    this.addPictures();
  }
  
  addPictures = () => {
    const myAPIKeyHere = "8338ac00f3fe8771eadc5eb64e67021842617a363f82ae304f7719c9264e4ac5";
    const title = {
      headers: {
        Authorization: `Client-ID ${myAPIKeyHere}`
      }
    }
    if(this.state.typesOfPicture === "all"){
      fetch(`https://api.unsplash.com/search/photos?query=${this.state.topic}&per_page=${this.state.pages}`, title).then((response) => response.json())
      .then((data) => {
      this.setState({images:data.results})
      })
      .catch((error)=>{
        console.log("Error",error)
    })
    }
    else{
      fetch(`https://api.unsplash.com/search/photos?orientation=${this.state.typesOfPicture}&query=${this.state.topic}&per_page=${this.state.pages}`,title).then((response) => response.json())
      .then((data) => {
        this.setState({images:data.results})
       })
      .catch((error)=>{
          console.log("Error",error)
      })
  }
  
}
  
render() {
    return ( 
      <div className = "App">
      <h1> Picture Search </h1> 
      <input type = "text" name = "textContent" placeholder = "Search Picture" onChange = {this.textOfInput} value = {this.state.textContent}/> 
      <button onClick={this.conponentDidMount}>Search!</button>
      <div>
      <select name="pages" onChange={this.textOfInput} value={this.state.pages}>
     <option value = "5"> 5 </option> 
     <option value = "10"> 10 </option>
     <option value = "15"> 15 </option> 
      </select> 
      <select name="typesOfPicture" onChange={this.textOfInput} value={this.state.typesOfPicture}>
      <option value = "all"> all </option> 
      <option value = "landscape"> landscape </option> 
      <option value = "portrait"> portrait </option> 
      <option value = "squarish"> squarish </option> 
      </select>
      {this.state.images.map((image) => {
        return(
            <div>
            <img src={image.urls.small}/>
            </div>
        )
      })}
      </div>
      </div>
    );
  }
}



export default App;