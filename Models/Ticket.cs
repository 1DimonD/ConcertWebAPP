using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConcerWebAPP.Models
{
    [Table("Ticket")]
    public class Ticket
    {
        [Key]
        [Column("ticket_id", TypeName ="int")]
        public int ticket_id { get; set; }

        [Column("section_id", TypeName = "int")]
        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Секція")]
        public int section_id { get; set; }

        [Column("number", TypeName = "int")]
        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Кількість квитків")]
        public int number { get; set; }

        [Column("concert_id", TypeName = "int")]
        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Концерт")]
        public virtual Concert Concert { get; set; }

        [Display(Name = "Клієнт")]
        public virtual Client Client { get; set; }
    }
}
