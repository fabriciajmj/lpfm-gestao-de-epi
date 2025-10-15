using System;
using System.ComponentModel.DataAnnotations;

namespace GestaoEpiMvc.Models
{
    public class MovimentacaoViewModel
    {
        public int Id { get; set; }

        [Display(Name = "Funcionário")]
        public FuncionarioViewModel Funcionario { get; set; }

        [Display(Name = "EPI")]
        public EpiViewModel Epi { get; set; }

        [Display(Name = "Data de Entrega")]
        [DataType(DataType.DateTime)]
        public DateTime DataEntrega { get; set; }

        [Display(Name = "Data de Devolução")]
        [DataType(DataType.DateTime)]
        public DateTime? DataDevolucao { get; set; }

        [Display(Name = "Motivo da Troca")]
        public string? MotivoTroca { get; set; }

        [Display(Name = "Data de Vencimento do Uso")]
        [DataType(DataType.DateTime)]
        public DateTime DataVencimentoUso { get; set; }

        [Display(Name = "Observações")]
        public string? Observacoes { get; set; }
    }
}
