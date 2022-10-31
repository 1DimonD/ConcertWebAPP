using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConcerWebAPP.Models
{
    [Table("TourSong")]
    public class TourSong
    {
        [Column("tour_id", TypeName = "int")]
        public int tour_id { get; set; }

        [Column("song_id", TypeName = "int")]
        public int song_id { get; set; }

        [ForeignKey("tour_id")]
        public virtual Tour Tour { get; set; }

        [ForeignKey("song_id")]
        public virtual Song Song { get; set; }
    }
}
