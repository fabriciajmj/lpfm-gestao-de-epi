using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoEpiApi.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; } // Armazenar hash da senha

        [Required]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(50)]
        public string Role { get; set; } = "TecnicoSeguranca"; // Ex: 'TecnicoSeguranca', 'Administrador'

        public int? FuncionarioId { get; set; } // Opcional: vincular usuário a um funcionário existente
        [ForeignKey("FuncionarioId")]
        public Funcionario? Funcionario { get; set; } // Propriedade de navegação

        public bool Ativo { get; set; } = true;

        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;
    }
}
