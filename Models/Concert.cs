using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConcerWebAPP.Models
{
    [Table("Concert")]
    public class Concert
    {
        public Concert()
        {            
            Sections = new List<Section>();
            Tickets = new List<Ticket>();
            Tours = new List<Tour>();
        }

        [Key]
        [Column("concert_id", TypeName ="int")]
        public int concert_id { get; set; }
             
        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Концерт")]
        [MaxLength(30, ErrorMessage = "Назва концерту має складатись з 30 знаків або менше"), MinLength(1)]
        [Column("name_concert", TypeName = "nvarchar(30)")]
        public string name_concert { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Жанр")]
        [MaxLength(30, ErrorMessage = "Назва жанру має складатись з 30 знаків або менше"), MinLength(1)]
        [Column("name_genre", TypeName = "nvarchar(30)")]
        public string name_genre { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Дата")]
        [Column("date", TypeName ="date")]
        [DataType(DataType.Date)]
        public DateTime date { get; set; }

        public ICollection<Section> Sections { get; set; }

        public ICollection<Ticket> Tickets { get; set; }

        public ICollection<Tour> Tours { get; set; }

        [Display(Name = "Виконавець")]
        public virtual Artist Artist { get; set; }
    }
}
