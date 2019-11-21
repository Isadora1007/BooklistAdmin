using System;
using System.Collections.Generic;

namespace BooklistAdmin.Models
{
    public partial class BooklistBook
    {
        public int BooklistId { get; set; }
        public int BookId { get; set; }

        public virtual Book Book { get; set; }
        public virtual Booklist Booklist { get; set; }
    }
}
