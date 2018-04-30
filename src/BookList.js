import React from 'react'
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash'
import PropTypes from 'prop-types';

class BookList extends React.Component{
    static propTypes = {
        onUpdateBookShelf: PropTypes.func.isRequired,
      }
  
   constructor(props) {
  	 super(props);
     
     this.handleShelfChange= this.handleShelfChange.bind(this);

    }

    handleShelfChange(event) {
        var newShelf = event.target.value;
        var book = this.props.books.filter((book)=>{
            if (book.id===event.target.id){
                return true
            }
        })[0]
        this.props.onUpdateBookShelf(book,newShelf);
    }

    render(){
        const {onUpdateBookShelf, books} = this.props;
        const shelves = [{id:'currentlyReading',name:'Currently Reading'},{id:'wantToRead',name:'Want To Read'},{id:'read',name:'Read'}]
        return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map((s)=>
                        <div className="bookshelf" key={s.id}>
                        <h2 className="bookshelf-title">{s.name}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                            {
                                
                                books.filter((book)=>{if (book.shelf===s.id){return true}}).map((book)=>
                                
                                        (
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
                                                    <option value="none">Remove</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{_.join(book.authors, ', ')}</div>
                                            </div>
                                        </li>)
                                    
                                )
                            }
                            
                            </ol>
                        </div>
                        </div>
                    
                
                )}
                
              </div>
            </div>
            <div className="open-search">
              <a href='/search'>Add a book</a>
            </div>
          </div>

        );
    }
}

export default BookList;