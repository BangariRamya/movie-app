import React from 'react';
import logo from './logo.svg';
import './App.css';
import Movie from './components/Movie';
import {Container,Row,Col, ModalTitle, PopoverTitle} from 'react-bootstrap';
import Navigation from './components/Navigation';
import SingleMoviePage from './components/SingleMoviePage';
import Search from './components/Search';
//import MovieList from './components/MovieList';
//import MovieListHeading from './components/MovieListHeading';
//import SearchBox from './components/SearchBox';
import App2 from './App2';

class App extends React.Component {


  constructor(){
    super();

    this.state = {
      title:"batman",
      movies: [],
      isLoaded: false,
      error:null,
      pageName:"",
      title:"batman"
    }
  }

  componentDidMount(){
 
     this.searchForMovie();
     
  }

  searchForMovie = ()=>{

     fetch("http://www.omdbapi.com/?apikey=60227e40&s="+this.state.title+"&page=2")
     .then(res => res.json())
     .then(
       (result) => {
           console.log(result)
            this.setState({
              movies: result.Search,
              isLoaded: true
            });
       },
       (error) => {
           this.setState({
             isLoaded: true,
             error:error
           });
       }
     )


  }

  getMovie = (movie,index)=>{

      return(
          <Col key={index}>
              <Movie details={movie} changePage={this.changePage} ></Movie>
          </Col>
      );

  }

  changePage = (pageName,title="batman",search=false)=>{
     
    this.setState({
      pageName:pageName,
      title:title
    },()=>
      search? this.searchForMovie():null
    )

  }

  /*const App = () => {
    const [movies, setMovies] = useState([]);
   // const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
  
    const getMovieRequest = async (searchValue) => {
      const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=60227e40`;
  
      const response = await fetch(url);
      const responseJson = await response.json();
  
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    };
  
    useEffect(() => {
      getMovieRequest(searchValue);
    }, [searchValue]);  */

  render(){

      if(this.state.pageName === "singleMoviePage"){
        //single movie page
          return (
            <SingleMoviePage changePage={this.changePage} title={this.state.title}></SingleMoviePage>
          )

      }else if(this.state.pageName === "search"){

          return (
            <Search changePage={this.changePage}></Search>
          );


      }else{
            //Home page
                        const {error, isLoaded, movies} = this.state;

                        if(error){
                            
                            return(
                              <Container>
                                    <div>Error: {error.message}</div>
                              </Container>
                            
                            )

                        }else if (!isLoaded){

                              return(
                                <Container>
                                  <div>Loading...</div>
                                </Container>
                              );
                        }else{
                              return (
                                <div className="App">
                                  <div>
                                   <span> 
                                  <Navigation changePage={this.changePage}></Navigation>
                                  
                                  <App2 />  </span>
                                   </div>
                                  <header className="App-header">
                                    
                                    <Container className="mt-3">
                                      <Row>
                                          {this.state.movies.map(this.getMovie)}
                                      </Row>
                                    </Container>
                                  

                                  </header>
                                 
                                   {/* <div>
                                     <App2 />
                                   </div> */}
                                </div>
                              );

                        }
            }   
         
    }
}

export default App;
