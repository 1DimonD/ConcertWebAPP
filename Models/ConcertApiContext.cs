using Microsoft.EntityFrameworkCore;

namespace ConcerWebAPP.Models
{
    public partial class ConcertApiContext: DbContext
    {
        public ConcertApiContext()
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public ConcertApiContext(DbContextOptions<ConcertApiContext> options)
            : base(options) => Database.EnsureCreated();

        public virtual DbSet<Song> Songs { get; set; }
        public virtual DbSet<TourSong> TourSongs { get; set; }
        public virtual DbSet<Tour> Tours { get; set; }

        public virtual DbSet<Concert> Concerts { get; set; }
        public virtual DbSet<Section> Sections { get; set; }

        public virtual DbSet<Artist> Artists { get; set; }
        public virtual DbSet<Ticket> Ticket { get; set; }
        public virtual DbSet<Client> Clients { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=WIN-SRNUHU0NJ5F; Database=DBConcert; Trusted_Connection=True; MultipleActiveResultSets=true");
            }
        }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TourSong>().HasKey(ts => new { ts.tour_id, ts.song_id });

            modelBuilder.Entity<TourSong>()
                .HasOne<Tour>(ts => ts.Tour)
                .WithMany(t => t.TourSongs)
                .HasForeignKey(ts => ts.song_id);

            modelBuilder.Entity<TourSong>()
                .HasOne<Song>(ts => ts.Song)
                .WithMany(t => t.TourSongs)
                .HasForeignKey(ts => ts.tour_id);              
        }
    }
}
