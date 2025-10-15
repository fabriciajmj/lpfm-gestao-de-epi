using System.ComponentModel.DataAnnotations;



namespace GestaoEpiMvc.Models
{
    public class EpiViewModel
    {
        public int Id { get; set; }

        [Display(Name = "Nome do EPI")]
        public string Nome { get; set; }

        [Display(Name = "CA")]
        public string CA { get; set; }

        public string? Fabricante { get; set; }

        [Display(Name = "Validade CA")]
        [DataType(DataType.Date)]
        public DateTime ValidadeCA { get; set; }

        [Display(Name = "Tempo de Uso (dias)")]
        public int TempoUsoDias { get; set; }

        [Display(Name = "Estoque Mínimo")]
        public int EstoqueMinimo { get; set; }

        [Display(Name = "Estoque Atual")]
        public int EstoqueAtual { get; set; }

        [Display(Name = "Data de Cadastro")]
        [DataType(DataType.DateTime)]
        public DateTime DataCadastro { get; set; }
    }
}
