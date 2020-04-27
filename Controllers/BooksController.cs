using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookWalker_React.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BookWalker_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        BooksAccessLayer bookdao = new BooksAccessLayer();
        // GET: api/Books
        [HttpGet]
        public IEnumerable<Books> Get()
        {
            return bookdao.GetAllBooks();
        }

        // GET: api/Books/{isbn}
        [HttpGet("{isbn}", Name = "Get")]
        //[Route("api/[controller]/search")]
        public Books Get(string isbn)
        {
            return bookdao.GetSpecificBook(isbn);
        }

        // POST: api/Books/
        [HttpPost]
        public string Post([FromBody] Books b)
        {

            //Post requests to the body take the form of a JSON format, like the below example (take note that BookQuanity and YearOfPublication are ints):

            /*   {
                   "Isbn" : "030700164",
                   "Title" : "101 Dalamatians",
                   "Author" : "Justine Korman",
                   "YearOfPublication" : 1996,
                   "Publisher" : "Golden Books Publishing Company",
                   "ImageUrlS" : "http://images.amazon.com/images/P/0307001164.01.THUMBZZZ.jpg",
                   "ImageUrlM" : "http://images.amazon.com/images/P/0307001164.01.MZZZZZZZ.jpg",
                   "ImageUrlL" : "http://images.amazon.com/images/P/0307001164.01.LZZZZZZZ",
                   "bookQuantity" : 1 
   }*/

            try
            {
                bookdao.AddBook(b);
                return "Book successfully added!";
            }

            catch (Exception e) {

                return "Error has occurred: " + e.Message;
            }
        }

        // PUT: api/books?isbn={...}&value={...}
        [HttpPut]
        public string Put(string isbn, int value) //Takes an isbn and value as args. Adds value to whatever current num books is.
        {
            try
            {
                bookdao.UpdateBook(isbn, value);
                return isbn + " successfully updated.";
            }

            catch (Exception e) {

                return "An error has occured: " + e.Message;
            }
        }

        // DELETE: api/books?isbn={...}
        [HttpDelete]
        public string Delete(string isbn)
        {
            try
            {
                bookdao.DeleteBook(isbn);
                return isbn + " successfully deleted.";
                  
            }
            catch (Exception e)
            {
                
                return ("An Error has occured: " + e.Message);
            }
        }
    }
}
