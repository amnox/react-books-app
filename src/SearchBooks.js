import React from 'react'
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash'
import PropTypes from 'prop-types';

class SearchBooks extends React.Component{
  static propTypes = {
        onUpdateBookShelf: PropTypes.func.isRequired,
        savedBooks: PropTypes.array.isRequired,
      }
  constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleShelfChange = this.handleShelfChange.bind(this);
      this.state = {
        query_books:[],
      }
  }
  handleChange(event) {
    BooksAPI.search(event.target.value,2)
    .then((books)=>{
      	//console.log(books);
        if(typeof books === 'undefined'){
          this.setState({query_books: []})
          console.log('empty');
        }else{
        //this.setState({query_books: books})
          this.setState((prevState) => {
            
            return {query_books: books.map((book)=>{
              var savedBookIdArray = this.props.savedBooks.map((bb)=>{return bb.id});
			  
			  if(savedBookIdArray.includes(book.id)){
                //console.log(book)
                book.shelf=this.props.savedBooks.filter((bo)=>{return bo.id===book.id})[0].shelf;
              }else{
              book.shelf='none';
              }
              return(book)})};
		  });
        }
      }
    ).then(console.log(this.state))
  }

  handleShelfChange(event) {
        var newShelf = event.target.value;
        var book = this.state.query_books.filter((book)=>{
            if (book.id===event.target.id){
                return true
            }
        })[0]
        this.props.onUpdateBookShelf(book,newShelf);
    }
  

  render(){
    return(
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" href='/'>Close</a>
              <div className="search-books-input-wrapper">

                <input value={this.state.query} onChange={this.handleChange} type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
           		{this.state.query_books.map((book)=>(
    				<li key={book.id}>
                    <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
                        <div className="book-shelf-changer">
                        <select onChange={this.handleShelfChange} id = {book.id}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading" selected={book.shelf==='currentlyReading'?true:false}>Currently Reading</option>
                            <option value="wantToRead" selected={book.shelf==='wantToRead'?true:false}>Want to Read</option>
                            <option value="read" selected={book.shelf==='read'?true:false}>Read</option>
                            <option value="none" selected={book.shelf==='none'?true:false}>None</option>
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{_.join(book.authors, ', ')}</div>
                    </div>
                    </li>
    			))}
              </ol>
            </div>
          </div>
    )
  }
}

export default SearchBooks;

