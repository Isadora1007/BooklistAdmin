using System;
using System.Collections.Generic;

namespace BooklistAdmin.Models
{
    public partial class Layout
    {
        public Layout()
        {
            Display = new HashSet<Display>();
        }

        public int LayoutId { get; set; }
        public string Name { get; set; }
        public int? CollectionTypeId { get; set; }
        public string Description { get; set; }
        public bool? ShowHolds { get; set; }
        public int? BooksPerPage { get; set; }
        public int? BooksPerRow { get; set; }
        public bool? ShowGuide { get; set; }
        public int? StyleId { get; set; }
        public int? AutoSlideTimeout { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
        public bool? ShowHeader { get; set; }
        public bool Active { get; set; }

        public virtual CollectionType CollectionType { get; set; }
        public virtual ICollection<Display> Display { get; set; }
    }
}
