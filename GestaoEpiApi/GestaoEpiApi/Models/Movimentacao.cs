using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoEpiApi.Models
{
    public class Movimentacao
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int FuncionarioId { get; set; }
        [ForeignKey("FuncionarioId")]
        public Funcionario? Funcionario { get; set; } // Propriedade de navegação

        [Required]
        public int EpiId { get; set; }
        [ForeignKey("EpiId")]
        public Epi? Epi { get; set; } // Propriedade de navegação

        [Required]
        public DateTime DataEntrega { get; set; }

        public DateTime? DataDevolucao { get; set; } // Preenchido quando o EPI é devolvido

        [StringLength(255)]
        public string? MotivoTroca { get; set; } // Ex: 'Vencimento', 'Defeito', 'Desgaste'

        [Required]
        public DateTime DataVencimentoUso { get; set; } // Calculado: data_entrega + tempo_uso_dias

        public string? Observacoes { get; set; }
    }
}
