// Controller Principal da Aplicação
class AppController {
    constructor() {
        this.currentView = 'dashboard';
        this.models = {
            empresa: new EmpresaModel(),
            epi: new EpiModel(),
            funcionario: new FuncionarioModel(),
            movimentacao: new MovimentacaoModel(),
            usuario: new UsuarioModel()
        };
    }

    init() {
        this.setupNavigation();
        this.loadView('dashboard');
    }

    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = e.target.getAttribute('data-view');
                this.loadView(view);
            });
        });
    }

    loadView(viewName) {
        this.currentView = viewName;
        
        // Atualiza navegação ativa
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-view') === viewName) {
                link.classList.add('active');
            }
        });

        // Carrega o conteúdo da view
        const contentArea = document.getElementById('content-area');
        
        switch(viewName) {
            case 'dashboard':
                this.loadDashboard(contentArea);
                break;
            case 'empresas':
                this.loadEmpresas(contentArea);
                break;
            case 'epis':
                this.loadEpis(contentArea);
                break;
            case 'funcionarios':
                this.loadFuncionarios(contentArea);
                break;
            case 'movimentacoes':
                this.loadMovimentacoes(contentArea);
                break;
            case 'usuarios':
                this.loadUsuarios(contentArea);
                break;
            default:
                contentArea.innerHTML = '<h2>Página não encontrada</h2>';
        }
    }

    async loadDashboard(container) {
        try {
            const [empresas, epis, funcionarios, movimentacoes] = await Promise.all([
                this.models.empresa.getAll(),
                this.models.epi.getAll(),
                this.models.funcionario.getAll(),
                this.models.movimentacao.getAll()
            ]);

            const episVencidos = epis.filter(epi => this.models.epi.isCAVencido(epi.validadeCA)).length;
            const episEstoqueBaixo = epis.filter(epi => epi.estoqueAtual <= epi.estoqueMinimo).length;
            const funcionariosAtivos = funcionarios.filter(f => f.ativo).length;
            const movimentacoesAbertas = movimentacoes.filter(m => !m.dataDevolucao).length;

            container.innerHTML = `
                <div class="dashboard">
                    <h1>Dashboard - Gestão de EPIs</h1>
                    
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">🏢</div>
                            <div class="stat-info">
                                <h3>${empresas.length}</h3>
                                <p>Empresas</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">🛡️</div>
                            <div class="stat-info">
                                <h3>${epis.length}</h3>
                                <p>EPIs Cadastrados</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">👷</div>
                            <div class="stat-info">
                                <h3>${funcionariosAtivos}</h3>
                                <p>Funcionários Ativos</p>
                            </div>
                        </div>
                        
                        <div class="stat-card">
                            <div class="stat-icon">📦</div>
                            <div class="stat-info">
                                <h3>${movimentacoesAbertas}</h3>
                                <p>Movimentações Abertas</p>
                            </div>
                        </div>
                    </div>

                    <div class="alerts-section">
                        <h2>Alertas</h2>
                        <div class="alert-list">
                            ${episVencidos > 0 ? `
                                <div class="alert alert-danger">
                                    <strong>⚠️ Atenção:</strong> ${episVencidos} EPI(s) com CA vencido
                                </div>
                            ` : ''}
                            
                            ${episEstoqueBaixo > 0 ? `
                                <div class="alert alert-warning">
                                    <strong>⚠️ Atenção:</strong> ${episEstoqueBaixo} EPI(s) com estoque baixo
                                </div>
                            ` : ''}
                            
                            ${episVencidos === 0 && episEstoqueBaixo === 0 ? `
                                <div class="alert alert-success">
                                    <strong>✓ Tudo certo!</strong> Nenhum alerta no momento
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>Erro ao carregar dashboard</h2>
                    <p>${error.message}</p>
                    <p class="error-hint">Verifique se a API está rodando e configurada corretamente em config/api.js</p>
                </div>
            `;
        }
    }

    async loadEmpresas(container) {
        container.innerHTML = '<div class="loading">Carregando empresas...</div>';
        
        try {
            const empresas = await this.models.empresa.getAll();
            
            container.innerHTML = `
                <div class="view-header">
                    <h1>Empresas</h1>
                    <button class="btn btn-primary" onclick="appController.showEmpresaForm()">
                        + Nova Empresa
                    </button>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Razão Social</th>
                                <th>CNPJ</th>
                                <th>Telefone</th>
                                <th>E-mail</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${empresas.map(empresa => `
                                <tr>
                                    <td>${empresa.id}</td>
                                    <td>${empresa.razaoSocial}</td>
                                    <td>${this.models.empresa.formatCNPJ(empresa.cnpj)}</td>
                                    <td>${empresa.telefone || '-'}</td>
                                    <td>${empresa.email || '-'}</td>
                                    <td class="actions">
                                        <button class="btn btn-sm btn-edit" onclick="appController.editEmpresa(${empresa.id})">
                                            Editar
                                        </button>
                                        <button class="btn btn-sm btn-delete" onclick="appController.deleteEmpresa(${empresa.id})">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div id="modal-container"></div>
            `;
        } catch (error) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>Erro ao carregar empresas</h2>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }

    showEmpresaForm(empresaId = null) {
        const modal = document.getElementById('modal-container');
        
        if (empresaId) {
            this.models.empresa.getById(empresaId).then(empresa => {
                this.renderEmpresaForm(modal, empresa);
            });
        } else {
            this.renderEmpresaForm(modal, null);
        }
    }

    renderEmpresaForm(container, empresa) {
        const isEdit = empresa !== null;
        
        container.innerHTML = `
            <div class="modal" id="empresa-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${isEdit ? 'Editar Empresa' : 'Nova Empresa'}</h2>
                        <button class="close-btn" onclick="appController.closeModal()">&times;</button>
                    </div>
                    
                    <form id="empresa-form" onsubmit="appController.saveEmpresa(event, ${isEdit ? empresa.id : null})">
                        <div class="form-group">
                            <label for="razaoSocial">Razão Social *</label>
                            <input type="text" id="razaoSocial" name="razaoSocial" 
                                   value="${empresa?.razaoSocial || ''}" required maxlength="255">
                        </div>
                        
                        <div class="form-group">
                            <label for="cnpj">CNPJ *</label>
                            <input type="text" id="cnpj" name="cnpj" 
                                   value="${empresa?.cnpj || ''}" required maxlength="18"
                                   placeholder="00.000.000/0000-00">
                        </div>
                        
                        <div class="form-group">
                            <label for="endereco">Endereço</label>
                            <input type="text" id="endereco" name="endereco" 
                                   value="${empresa?.endereco || ''}" maxlength="255">
                        </div>
                        
                        <div class="form-group">
                            <label for="telefone">Telefone</label>
                            <input type="text" id="telefone" name="telefone" 
                                   value="${empresa?.telefone || ''}" maxlength="20">
                        </div>
                        
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="email" id="email" name="email" 
                                   value="${empresa?.email || ''}" maxlength="100">
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="appController.closeModal()">
                                Cancelar
                            </button>
                            <button type="submit" class="btn btn-primary">
                                ${isEdit ? 'Atualizar' : 'Salvar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.getElementById('empresa-modal').style.display = 'flex';
    }

    async saveEmpresa(event, empresaId) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        
        const empresa = {
            razaoSocial: formData.get('razaoSocial'),
            cnpj: formData.get('cnpj'),
            endereco: formData.get('endereco'),
            telefone: formData.get('telefone'),
            email: formData.get('email')
        };
        
        const errors = this.models.empresa.validate(empresa);
        
        if (errors.length > 0) {
            alert('Erros de validação:\n' + errors.join('\n'));
            return;
        }
        
        try {
            if (empresaId) {
                await this.models.empresa.update(empresaId, empresa);
            } else {
                await this.models.empresa.create(empresa);
            }
            
            this.closeModal();
            this.loadView('empresas');
        } catch (error) {
            alert('Erro ao salvar empresa: ' + error.message);
        }
    }

    async editEmpresa(id) {
        this.showEmpresaForm(id);
    }

    async deleteEmpresa(id) {
        if (confirm('Tem certeza que deseja excluir esta empresa?')) {
            try {
                await this.models.empresa.delete(id);
                this.loadView('empresas');
            } catch (error) {
                alert('Erro ao excluir empresa: ' + error.message);
            }
        }
    }

    closeModal() {
        const modal = document.getElementById('modal-container');
        if (modal) {
            modal.innerHTML = '';
        }
    }

    // Métodos similares para EPIs, Funcionários, Movimentações e Usuários serão implementados
    // nos controllers específicos para manter o código organizado
}

// Instância global do controller
let appController;

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    appController = new AppController();
    appController.init();
});

