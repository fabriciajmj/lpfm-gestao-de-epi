using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoEpiApi.Models
{
    public class Funcionario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int EmpresaId { get; set; }
        [ForeignKey("EmpresaId")]
        public Empresa? Empresa { get; set; } // Propriedade de navegação

        [Required]
        [StringLength(50)]
        public string Matricula { get; set; }

        [Required]
        [StringLength(255)]
        public string NomeCompleto { get; set; }

        [StringLength(100)]
        public string? Funcao { get; set; }

        [StringLength(100)]
        public string? Setor { get; set; }

        public bool Ativo { get; set; } = true;

        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;

        // Propriedade de navegação para Movimentações
        public ICollection<Movimentacao>? Movimentacoes { get; set; }
    }
}
