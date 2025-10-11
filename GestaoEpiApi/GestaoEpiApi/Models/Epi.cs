using System.ComponentModel.DataAnnotations;

namespace GestaoEpiApi.Models
{
    public class Epi
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Nome { get; set; }

        [Required]
        [StringLength(50)]
        public string CA { get; set; } // Certificado de Aprovação

        [StringLength(150)]
        public string? Fabricante { get; set; }

        [Required]
        public DateTime ValidadeCA { get; set; } // Validade do Certificado

        [Required]
        public int TempoUsoDias { get; set; } // Vida útil do EPI em dias após entrega

        public int EstoqueMinimo { get; set; } = 0;

        public int EstoqueAtual { get; set; } = 0;

        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;

        // Propriedade de navegação para Movimentações
        public ICollection<Movimentacao>? Movimentacoes { get; set; }
    }
}
