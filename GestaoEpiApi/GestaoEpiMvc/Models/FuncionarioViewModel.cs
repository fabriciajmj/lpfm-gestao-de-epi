using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GestaoEpiMvc.Models
{
    public class FuncionarioViewModel
    {
        public int Id { get; set; }

        [Display(Name = "Matrícula")]
        public string Matricula { get; set; }

        [Display(Name = "Nome Completo")]
        public string NomeCompleto { get; set; }

        [Display(Name = "Função")]
        public string? Funcao { get; set; }

        [Display(Name = "Setor")]
        public string? Setor { get; set; }

        [Display(Name = "Ativo")]
        public bool Ativo { get; set; }

        [Display(Name = "Data de Cadastro")]
        [DataType(DataType.DateTime)]
        public DateTime DataCadastro { get; set; }

        // Navegação opcional para movimentações
        public ICollection<MovimentacaoViewModel>? Movimentacoes { get; set; }
    }
}
