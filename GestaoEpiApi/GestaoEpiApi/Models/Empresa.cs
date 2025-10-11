using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoEpiApi.Models
{
    public class Empresa
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string? RazaoSocial { get; set; }

        [Required]
        [StringLength(18)] // Ex: XX.XXX.XXX/XXXX-XX
        public string? Cnpj { get; set; }

        [StringLength(255)]
        public string? Endereco { get; set; }

        [StringLength(20)]
        public string? Telefone { get; set; }

        [StringLength(100)]
        public string? Email { get; set; }

        // Propriedade de navegação para Funcionários
        public ICollection<Funcionario>? Funcionarios { get; set; }
    }
}
