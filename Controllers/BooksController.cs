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

        //public string Get(int flag) {

          //  return JsonConvert.SerializeObject(bookdao.GetAllBooks());
       // }

        // GET: api/Books/5
        [HttpGet("{id}", Name = "Get")]
        public Books Get(string isbn)
        {
            return bookdao.GetSpecificBook(isbn);
        }

        // POST: api/Books
        [HttpPost]
        public void Post([FromBody] Books b)
        {
            bookdao.AddBook(b);
        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string isbn)
        {
            try
            {
                bookdao.DeleteBook(isbn);
            }
            catch (Exception e)
            {

                throw (e);
            }
        }

    }
}
