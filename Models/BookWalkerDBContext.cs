using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BookWalker_React.Models
{
    public partial class BookWalkerDBContext : DbContext
    {
        public BookWalkerDBContext()
        {
        }

        public BookWalkerDBContext(DbContextOptions<BookWalkerDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Books> Books { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=localhost;Database=BookWalkerDB;Username=BookMaster;Persist Security Info=True;Password=WWDBTSES13");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Books>(entity =>
            {
                entity.HasKey(e => e.Isbn)
                    .HasName("books_pkey");

                entity.ToTable("books");

                entity.Property(e => e.Isbn)
                    .HasColumnName("isbn")
                    .HasMaxLength(13);

                entity.Property(e => e.Author)
                    .HasColumnName("author")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.ImageUrlL)
                    .HasColumnName("image_url_l")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.ImageUrlM)
                    .HasColumnName("image_url_m")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.ImageUrlS)
                    .HasColumnName("image_url_s")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.Publisher)
                    .HasColumnName("publisher")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasMaxLength(255)
                    .HasDefaultValueSql("NULL::character varying");

                entity.Property(e => e.YearOfPublication).HasColumnName("year_of_publication");

                entity.Property(e => e.BookQuantity).HasColumnName("bookQuantity");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
