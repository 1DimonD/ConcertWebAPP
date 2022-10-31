using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConcerWebAPP.Models
{
    [Table("Artist")]
    public class Artist
    {
        [Key]
        [Column("artist_id", TypeName ="int")]
        public int artist_id { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Артист")]
        [MaxLength(50, ErrorMessage = "Ім'я виконавця має складатись з 50 знаків або менше"), MinLength(1)]
        [Column("name_artist", TypeName = "nvarchar(50)")]
        public string name_artist { get; set; }
    }
}
