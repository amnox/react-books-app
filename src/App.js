import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import { Link,Route } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    
    this.updateBookShelf= this.updateBookShelf.bind(this);

   }
  state = {
    books:[]
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(()=>({
          books
        }))
      })
  }

  updateBookShelf = (book, newShelf) => {
    var newS = this.state.books.map((boo)=>{
      if (boo.id===book.id){
        boo.shelf=newShelf;
      	return boo;
      }
      return boo;
    })
    
    BooksAPI.update(book,newShelf).then(this.setState({newS}))
      //.then(
    /*BooksAPI.getAll()
      .then((books) => {
        this.setState({books})
        console.log(this.state);
      }))*/
      
  }

  render() {
    return (
      <div className="app">
          <Route exact path='/' render = {()=>(
            <BookList 
              books = {this.state.books}
              onUpdateBookShelf = {this.updateBookShelf}/>
            
          )}>
          </Route>
          <Route exact path='/search' render = {()=>(
            <SearchBooks savedBooks = {this.state.books}
						 onUpdateBookShelf = {this.updateBookShelf}/>
          )}>
          </Route>

      </div>
    )
  }
}

export default BooksApp
