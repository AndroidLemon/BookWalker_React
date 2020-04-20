﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookWalker_React.Models
{

    public class BooksAccessLayer
    {
        BookWalkerDBContext booksDB = new BookWalkerDBContext();

        public IEnumerable<Books> GetAllBooks()
        {

            return booksDB.Books.ToList();
        }

        public Books GetSpecificBook(string isbn)
        {

            var book = (from b in booksDB.Books where b.Isbn == isbn select b).FirstOrDefault();

            if (book == null ) 
            {
                book = new Books();
                book.Isbn = "Not Available";
                book.Title = "Not Available";
                book.Author = "Not Available";
                book.Publisher = "Not Available";
                book.YearOfPublication = 0;
                book.ImageUrlS = "Not Available";
                book.ImageUrlM = "Not Available";
                book.ImageUrlL = "Not Available";
                return book;
            }
            
            return book;
        }

        public int AddBook(Books book)
        {

            try
            {
                booksDB.Books.Add(book);
                booksDB.SaveChanges();
                return 1; //Success!
            }

            catch (Npgsql.PostgresException e)
            {
                throw new Exception("Exception thrown from PSQL: " + e.Message + ". Please correct this and try again.");
            }
            catch (Npgsql.NpgsqlException e)
            {
                throw new Exception("There's an issue with accessing the server. Message: " + e.Message);
            }
            catch (Exception e)
            {

                throw new Exception("Unknown exception occured: " + e.Message);
            }
        }

        public int DeleteBook(string isbn)
        {
            try
            {
                var book = booksDB.Books.Find(isbn);
                booksDB.Books.Remove(book);
                booksDB.SaveChanges();
                return 1;
            }
            catch (Npgsql.PostgresException e)
            {
                throw new Exception("Exception thrown from PSQL: " + e.Message + ". Please correct this and try again.");
            }
            catch (Npgsql.NpgsqlException e)
            {
                throw new Exception("There's an issue with accessing the server. Message: " + e.Message);
            }
            catch (Exception e)
            {

                throw new Exception("Unknown exception occured: " + e.Message);
            }
        }


    }

}
