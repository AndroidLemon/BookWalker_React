using System;
using System.Collections.Generic;

namespace BookWalker_React.Models
{
    public partial class Books : IComparable
    {
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int? YearOfPublication { get; set; }
        public string Publisher { get; set; }
        public string ImageUrlS { get; set; }
        public string ImageUrlM { get; set; }
        public string ImageUrlL { get; set; }
        public int BookQuantity { get; set; }

        public int CompareTo(object obj)
        {
            if (obj == null) return 1;

            Books book = obj as Books;
            if (book != null)
                return this.Title.CompareTo(book.Title);
            else
                throw new ArgumentException("Not a book!");
        }
    }

}
