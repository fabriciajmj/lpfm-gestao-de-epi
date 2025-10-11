using Microsoft.EntityFrameworkCore;
using GestaoEpiApi.Models;

namespace GestaoEpiApi.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options) { }

        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Epi> Epis { get; set; }
        public DbSet<Movimentacao> Movimentacoes { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurações adicionais para o modelo, se necessário
            // Exemplo: Índices únicos, chaves compostas, etc.
            modelBuilder.Entity<Funcionario>()
                .HasIndex(f => f.Matricula)
                .IsUnique();

            modelBuilder.Entity<Epi>()
                .HasIndex(e => e.CA)
                .IsUnique();

            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
