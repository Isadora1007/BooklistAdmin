using System;
using System.Collections.Generic;

namespace BooklistAdmin.Models
{
    public partial class Book
    {
        public Book()
        {
            BooklistBook = new HashSet<BooklistBook>();
        }

        public int BookId { get; set; }
        public string Isbn { get; set; }
        public string Callnumber { get; set; }
        public string Subtitle { get; set; }
        public string Author { get; set; }
        public string Bookcoverurl { get; set; }
        public int? Type { get; set; }
        public int? Page { get; set; }
        public string Annotation { get; set; }
        public int? Jacketwidth { get; set; }
        public int? Jacketheight { get; set; }
        public string Title { get; set; }

        public virtual ICollection<BooklistBook> BooklistBook { get; set; }
    }
}
