using System;
using System.Collections.Generic;

namespace BooklistAdmin.Models
{
    public partial class Display
    {
        public int DisplayId { get; set; }
        public int LayoutId { get; set; }
        public int BooklistId { get; set; }
        public string Name { get; set; }
        public string Branch { get; set; }

        public virtual Booklist Booklist { get; set; }
        public virtual Layout Layout { get; set; }
    }
}
