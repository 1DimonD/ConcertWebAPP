using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConcerWebAPP.Models
{
    [Table("Tour")]
    public class Tour
    {
        public Tour()
        {
            TourSongs = new List<TourSong>();
        }

        [Key]
        [Column("tour_id", TypeName = "int")]
        public int tour_id { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Тур")]
        [Column("name_tour", TypeName = "nvarchar(50)")]
        public string name_tour { get; set; }

        public virtual ICollection<TourSong> TourSongs { get; set; }

        [Column("concert_id", TypeName = "int")]
        [Display(Name = "Концерт")]
        public virtual Concert Concert { get; set; }
    }
}
