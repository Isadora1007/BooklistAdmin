using System;
using System.Collections.Generic;

namespace BooklistAdmin.Models
{
    public partial class CollectionType
    {
        public CollectionType()
        {
            Layout = new HashSet<Layout>();
        }

        public int CollectionTypeId { get; set; }
        public string Name { get; set; }
        public string ContentHtml { get; set; }
        public string BackgroundColor { get; set; }
        public string ImagePath { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<Layout> Layout { get; set; }
    }
}
