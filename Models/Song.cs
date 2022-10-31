using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConcerWebAPP.Models
{
    [Table("Song")]
    public class Song
    {
        public Song() => TourSongs = new List<TourSong>();

        [Key]
        [Column("song_id", TypeName = "int")]
        public int song_id { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Пісня")]
        [MaxLength(50, ErrorMessage = "Назва пісні має складатись з 50 знаків або менше"), MinLength(1)]
        [Column("name_song", TypeName = "nvarchar(50)")]
        public string name_song { get; set; }

        public virtual ICollection<TourSong> TourSongs { get; set; }
    }
}
