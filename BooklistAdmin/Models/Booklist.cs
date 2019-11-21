using System;
using System.Collections.Generic;

namespace BooklistAdmin.Models
{
    public partial class Booklist
    {
        public Booklist()
        {
            BooklistBook = new HashSet<BooklistBook>();
            Display = new HashSet<Display>();
        }

        public int BooklistId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Bibliocommonslisturl { get; set; }
        public bool? Isuserlist { get; set; }
        public int? Type { get; set; }
        public string Owner { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<BooklistBook> BooklistBook { get; set; }
        public virtual ICollection<Display> Display { get; set; }
    }
}
