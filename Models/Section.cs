using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConcerWebAPP.Models
{
    [Table("Section")]
    public class Section
    {
        [Key]
        [Column("section_id", TypeName = "int")]
        public int section_id { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Секція")]
        [MaxLength(20, ErrorMessage = "Назва секції має складатись з 20 знаків або менше"), MinLength(1)]
        [Column("name_section", TypeName = "nvarchar(20)")]
        public string name_section { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Range(0, 10000, ErrorMessage = "Кількість квитків може бути 0 і більше")]
        [Display(Name = "Кількість квитків")]
        [Column("number_tickets", TypeName = "int")]
        public int number_tickets { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Ціна за квиток")]
        [Range(0, 10000, ErrorMessage = "Ціна за квиток може бути 0 і більше")]
        [Column("price", TypeName = "money")]
        public int price { get; set; }
    }
}
