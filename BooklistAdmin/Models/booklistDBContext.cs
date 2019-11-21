using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BooklistAdmin.Models
{
    public partial class booklistDBContext : DbContext
    {
        public booklistDBContext()
        {
        }

        public booklistDBContext(DbContextOptions<booklistDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Book> Book { get; set; }
        public virtual DbSet<Booklist> Booklist { get; set; }
        public virtual DbSet<BooklistBook> BooklistBook { get; set; }
        public virtual DbSet<CollectionType> CollectionType { get; set; }
        public virtual DbSet<Display> Display { get; set; }
        public virtual DbSet<Layout> Layout { get; set; }

        /*
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=CPLDEVSQL\\sqldev01;Database=booklistDB;User ID=booklist;Password=BookAdmin;");
            }
        }
        */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Book>(entity =>
            {
                entity.Property(e => e.BookId).ValueGeneratedNever();

                entity.Property(e => e.Annotation)
                    .HasColumnName("annotation")
                    .HasMaxLength(500);

                entity.Property(e => e.Author)
                    .HasColumnName("author")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Bookcoverurl)
                    .IsRequired()
                    .HasColumnName("bookcoverurl")
                    .HasMaxLength(250);

                entity.Property(e => e.Callnumber)
                    .HasColumnName("callnumber")
                    .HasMaxLength(50);

                entity.Property(e => e.Isbn)
                    .HasColumnName("isbn")
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Jacketheight).HasColumnName("jacketheight");

                entity.Property(e => e.Jacketwidth).HasColumnName("jacketwidth");

                entity.Property(e => e.Page).HasColumnName("page");

                entity.Property(e => e.Subtitle)
                    .IsRequired()
                    .HasColumnName("subtitle")
                    .HasMaxLength(200);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Type).HasColumnName("type");
            });

            modelBuilder.Entity<Booklist>(entity =>
            {
                entity.Property(e => e.Bibliocommonslisturl)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(e => e.Owner)
                    .HasColumnName("owner")
                    .HasMaxLength(50);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<BooklistBook>(entity =>
            {
                entity.HasKey(e => new { e.BooklistId, e.BookId })
                    .HasName("PK_Booklist_Book");

                entity.HasOne(d => d.Book)
                    .WithMany(p => p.BooklistBook)
                    .HasForeignKey(d => d.BookId)
                    .HasConstraintName("FK__BooklistB__BookI__2C3393D0");

                entity.HasOne(d => d.Booklist)
                    .WithMany(p => p.BooklistBook)
                    .HasForeignKey(d => d.BooklistId)
                    .HasConstraintName("FK__BooklistB__Bookl__2B3F6F97");
            });

            modelBuilder.Entity<CollectionType>(entity =>
            {
                entity.Property(e => e.BackgroundColor).HasMaxLength(8);

                entity.Property(e => e.ImagePath).HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(25);
            });

            modelBuilder.Entity<Display>(entity =>
            {
                entity.Property(e => e.Branch).HasMaxLength(20);

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.HasOne(d => d.Booklist)
                    .WithMany(p => p.Display)
                    .HasForeignKey(d => d.BooklistId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Display_Booklist");

                entity.HasOne(d => d.Layout)
                    .WithMany(p => p.Display)
                    .HasForeignKey(d => d.LayoutId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Display_Layout");
            });

            modelBuilder.Entity<Layout>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.HasOne(d => d.CollectionType)
                    .WithMany(p => p.Layout)
                    .HasForeignKey(d => d.CollectionTypeId)
                    .HasConstraintName("FK_Layout_CollectionType");
            });
        }
    }
}
