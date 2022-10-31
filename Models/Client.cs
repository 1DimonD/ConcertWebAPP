using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConcerWebAPP.Models
{
    [Table("Client")]
    public class Client
    {
        public Client()
        {
            Tickets = new List<Ticket>();
        }

        [Key]
        [Column("client_id", TypeName ="int")]
        public int client_id { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "ПІБ")]
        [MaxLength(100, ErrorMessage = "ПІБ має складатись з 100 знаків або менше"), MinLength(1)]
        [Column("name_client", TypeName = "nvarchar(100)")]
        public string name_client { get; set; }

        [Required(ErrorMessage = "Поле не повинне бути порожнім")]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        [MaxLength(40, ErrorMessage = "Email має складатись з 100 знаків або менше"), MinLength(1)]
        [Column("email", TypeName = "nvarchar(40)")]
        public string email { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}
