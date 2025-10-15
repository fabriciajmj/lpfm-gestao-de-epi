// Extensão do AppController para gerenciar Funcionários
AppController.prototype.loadFuncionarios = async function(container) {
    container.innerHTML = '<div class="loading">Carregando funcionários...</div>';
    
    try {
        const [funcionarios, empresas] = await Promise.all([
            this.models.funcionario.getAll(),
            this.models.empresa.getAll()
        ]);
        
        // Armazena empresas para uso no formulário
        this.empresasCache = empresas;
        
        container.innerHTML = `
            <div class="view-header">
                <h1>Funcionários</h1>
                <button class="btn btn-primary" onclick="appController.showFuncionarioForm()">
                    + Novo Funcionário
                </button>
            </div>
            
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Matrícula</th>
                            <th>Nome Completo</th>
                            <th>Função</th>
                            <th>Setor</th>
                            <th>Empresa</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${funcionarios.map(func => {
                            const empresa = empresas.find(e => e.id === func.empresaId);
                            return `
                                <tr>
                                    <td>${func.id}</td>
                                    <td>${func.matricula}</td>
                                    <td>${func.nomeCompleto}</td>
                                    <td>${func.funcao || '-'}</td>
                                    <td>${func.setor || '-'}</td>
                                    <td>${empresa?.razaoSocial || 'N/A'}</td>
                                    <td>
                                        <span class="badge badge-${func.ativo ? 'success' : 'secondary'}">
                                            ${this.models.funcionario.getStatusLabel(func.ativo)}
                                        </span>
                                    </td>
                                    <td class="actions">
                                        <button class="btn btn-sm btn-edit" onclick="appController.editFuncionario(${func.id})">
                                            Editar
                                        </button>
                                        <button class="btn btn-sm btn-delete" onclick="appController.deleteFuncionario(${func.id})">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            
            <div id="modal-container"></div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Erro ao carregar funcionários</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
};

AppController.prototype.showFuncionarioForm = function(funcionarioId = null) {
    const modal = document.getElementById('modal-container');
    
    if (funcionarioId) {
        this.models.funcionario.getById(funcionarioId).then(funcionario => {
            this.renderFuncionarioForm(modal, funcionario);
        });
    } else {
        this.renderFuncionarioForm(modal, null);
    }
};

AppController.prototype.renderFuncionarioForm = function(container, funcionario) {
    const isEdit = funcionario !== null;
    const empresas = this.empresasCache || [];
    
    container.innerHTML = `
        <div class="modal" id="funcionario-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${isEdit ? 'Editar Funcionário' : 'Novo Funcionário'}</h2>
                    <button class="close-btn" onclick="appController.closeModal()">&times;</button>
                </div>
                
                <form id="funcionario-form" onsubmit="appController.saveFuncionario(event, ${isEdit ? funcionario.id : null})">
                    <div class="form-group">
                        <label for="empresaId">Empresa *</label>
                        <select id="empresaId" name="empresaId" required>
                            <option value="">Selecione uma empresa</option>
                            ${empresas.map(empresa => `
                                <option value="${empresa.id}" ${funcionario?.empresaId === empresa.id ? 'selected' : ''}>
                                    ${empresa.razaoSocial}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="matricula">Matrícula *</label>
                            <input type="text" id="matricula" name="matricula" 
                                   value="${funcionario?.matricula || ''}" required maxlength="50">
                        </div>
                        
                        <div class="form-group">
                            <label for="nomeCompleto">Nome Completo *</label>
                            <input type="text" id="nomeCompleto" name="nomeCompleto" 
                                   value="${funcionario?.nomeCompleto || ''}" required maxlength="255">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="funcao">Função</label>
                            <input type="text" id="funcao" name="funcao" 
                                   value="${funcionario?.funcao || ''}" maxlength="100">
                        </div>
                        
                        <div class="form-group">
                            <label for="setor">Setor</label>
                            <input type="text" id="setor" name="setor" 
                                   value="${funcionario?.setor || ''}" maxlength="100">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="ativo" name="ativo" 
                                   ${funcionario?.ativo !== false ? 'checked' : ''}>
                            Funcionário Ativo
                        </label>
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
    
    document.getElementById('funcionario-modal').style.display = 'flex';
};

AppController.prototype.saveFuncionario = async function(event, funcionarioId) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const funcionario = {
        empresaId: parseInt(formData.get('empresaId')),
        matricula: formData.get('matricula'),
        nomeCompleto: formData.get('nomeCompleto'),
        funcao: formData.get('funcao'),
        setor: formData.get('setor'),
        ativo: formData.get('ativo') === 'on',
        dataCadastro: new Date().toISOString()
    };
    
    const errors = this.models.funcionario.validate(funcionario);
    
    if (errors.length > 0) {
        alert('Erros de validação:\n' + errors.join('\n'));
        return;
    }
    
    try {
        if (funcionarioId) {
            await this.models.funcionario.update(funcionarioId, funcionario);
        } else {
            await this.models.funcionario.create(funcionario);
        }
        
        this.closeModal();
        this.loadView('funcionarios');
    } catch (error) {
        alert('Erro ao salvar funcionário: ' + error.message);
    }
};

AppController.prototype.editFuncionario = async function(id) {
    this.showFuncionarioForm(id);
};

AppController.prototype.deleteFuncionario = async function(id) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
        try {
            await this.models.funcionario.delete(id);
            this.loadView('funcionarios');
        } catch (error) {
            alert('Erro ao excluir funcionário: ' + error.message);
        }
    }
};

// Extensão do AppController para gerenciar Movimentações
AppController.prototype.loadMovimentacoes = async function(container) {
    container.innerHTML = '<div class="loading">Carregando movimentações...</div>';
    
    try {
        const [movimentacoes, funcionarios, epis] = await Promise.all([
            this.models.movimentacao.getAll(),
            this.models.funcionario.getAll(),
            this.models.epi.getAll()
        ]);
        
        // Armazena para uso no formulário
        this.funcionariosCache = funcionarios;
        this.episCache = epis;
        
        container.innerHTML = `
            <div class="view-header">
                <h1>Movimentações de EPIs</h1>
                <button class="btn btn-primary" onclick="appController.showMovimentacaoForm()">
                    + Nova Movimentação
                </button>
            </div>
            
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Funcionário</th>
                            <th>EPI</th>
                            <th>Data Entrega</th>
                            <th>Data Vencimento</th>
                            <th>Data Devolução</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${movimentacoes.map(mov => {
                            const funcionario = funcionarios.find(f => f.id === mov.funcionarioId);
                            const epi = epis.find(e => e.id === mov.epiId);
                            const statusVenc = this.models.movimentacao.getStatusVencimento(mov.dataVencimentoUso);
                            
                            return `
                                <tr>
                                    <td>${mov.id}</td>
                                    <td>${funcionario?.nomeCompleto || 'N/A'}</td>
                                    <td>${epi?.nome || 'N/A'}</td>
                                    <td>${new Date(mov.dataEntrega).toLocaleDateString('pt-BR')}</td>
                                    <td class="${statusVenc.classe}">
                                        ${new Date(mov.dataVencimentoUso).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td>${mov.dataDevolucao ? new Date(mov.dataDevolucao).toLocaleDateString('pt-BR') : '-'}</td>
                                    <td>
                                        ${mov.dataDevolucao ? 
                                            '<span class="badge badge-secondary">Devolvido</span>' : 
                                            `<span class="badge badge-${statusVenc.classe === 'status-vencido' ? 'danger' : 
                                                                        statusVenc.classe === 'status-alerta' ? 'warning' : 'success'}">
                                                ${statusVenc.status === 'vencido' ? 'Vencido' : 
                                                  statusVenc.status === 'proximo-vencimento' ? 'Próx. Vencimento' : 
                                                  statusVenc.status === 'atencao' ? 'Atenção' : 'Em Uso'}
                                            </span>`
                                        }
                                    </td>
                                    <td class="actions">
                                        <button class="btn btn-sm btn-edit" onclick="appController.editMovimentacao(${mov.id})">
                                            Editar
                                        </button>
                                        <button class="btn btn-sm btn-delete" onclick="appController.deleteMovimentacao(${mov.id})">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            
            <div id="modal-container"></div>
        `;
    } catch (error) {
        container.innerHTML = `
            <div class="error-message">
                <h2>Erro ao carregar movimentações</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
};

AppController.prototype.showMovimentacaoForm = function(movimentacaoId = null) {
    const modal = document.getElementById('modal-container');
    
    if (movimentacaoId) {
        this.models.movimentacao.getById(movimentacaoId).then(movimentacao => {
            this.renderMovimentacaoForm(modal, movimentacao);
        });
    } else {
        this.renderMovimentacaoForm(modal, null);
    }
};

AppController.prototype.renderMovimentacaoForm = function(container, movimentacao) {
    const isEdit = movimentacao !== null;
    const funcionarios = this.funcionariosCache || [];
    const epis = this.episCache || [];
    
    container.innerHTML = `
        <div class="modal" id="movimentacao-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${isEdit ? 'Editar Movimentação' : 'Nova Movimentação'}</h2>
                    <button class="close-btn" onclick="appController.closeModal()">&times;</button>
                </div>
                
                <form id="movimentacao-form" onsubmit="appController.saveMovimentacao(event, ${isEdit ? movimentacao.id : null})">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="funcionarioId">Funcionário *</label>
                            <select id="funcionarioId" name="funcionarioId" required>
                                <option value="">Selecione um funcionário</option>
                                ${funcionarios.filter(f => f.ativo).map(func => `
                                    <option value="${func.id}" ${movimentacao?.funcionarioId === func.id ? 'selected' : ''}>
                                        ${func.nomeCompleto} (${func.matricula})
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="epiId">EPI *</label>
                            <select id="epiId" name="epiId" required onchange="appController.onEpiSelected(this)">
                                <option value="">Selecione um EPI</option>
                                ${epis.map(epi => `
                                    <option value="${epi.id}" data-tempo-uso="${epi.tempoUsoDias}" 
                                            ${movimentacao?.epiId === epi.id ? 'selected' : ''}>
                                        ${epi.nome} (CA: ${epi.ca})
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dataEntrega">Data de Entrega *</label>
                            <input type="date" id="dataEntrega" name="dataEntrega" 
                                   value="${movimentacao ? movimentacao.dataEntrega.split('T')[0] : ''}" 
                                   required onchange="appController.calcularVencimento()">
                        </div>
                        
                        <div class="form-group">
                            <label for="dataVencimentoUso">Data de Vencimento *</label>
                            <input type="date" id="dataVencimentoUso" name="dataVencimentoUso" 
                                   value="${movimentacao ? movimentacao.dataVencimentoUso.split('T')[0] : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="dataDevolucao">Data de Devolução</label>
                            <input type="date" id="dataDevolucao" name="dataDevolucao" 
                                   value="${movimentacao?.dataDevolucao ? movimentacao.dataDevolucao.split('T')[0] : ''}">
                        </div>
                        
                        <div class="form-group">
                            <label for="motivoTroca">Motivo da Troca</label>
                            <input type="text" id="motivoTroca" name="motivoTroca" 
                                   value="${movimentacao?.motivoTroca || ''}" maxlength="255"
                                   placeholder="Ex: Vencimento, Defeito, Desgaste">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacoes">Observações</label>
                        <textarea id="observacoes" name="observacoes" rows="3">${movimentacao?.observacoes || ''}</textarea>
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
    
    document.getElementById('movimentacao-modal').style.display = 'flex';
};

AppController.prototype.onEpiSelected = function(selectElement) {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const tempoUsoDias = selectedOption.getAttribute('data-tempo-uso');
    
    if (tempoUsoDias) {
        this.tempoUsoDiasAtual = parseInt(tempoUsoDias);
        this.calcularVencimento();
    }
};

AppController.prototype.calcularVencimento = function() {
    const dataEntregaInput = document.getElementById('dataEntrega');
    const dataVencimentoInput = document.getElementById('dataVencimentoUso');
    
    if (dataEntregaInput.value && this.tempoUsoDiasAtual) {
        const vencimento = this.models.movimentacao.calcularDataVencimento(
            dataEntregaInput.value, 
            this.tempoUsoDiasAtual
        );
        dataVencimentoInput.value = vencimento;
    }
};

AppController.prototype.saveMovimentacao = async function(event, movimentacaoId) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const movimentacao = {
        funcionarioId: parseInt(formData.get('funcionarioId')),
        epiId: parseInt(formData.get('epiId')),
        dataEntrega: formData.get('dataEntrega'),
        dataVencimentoUso: formData.get('dataVencimentoUso'),
        dataDevolucao: formData.get('dataDevolucao') || null,
        motivoTroca: formData.get('motivoTroca'),
        observacoes: formData.get('observacoes')
    };
    
    const errors = this.models.movimentacao.validate(movimentacao);
    
    if (errors.length > 0) {
        alert('Erros de validação:\n' + errors.join('\n'));
        return;
    }
    
    try {
        if (movimentacaoId) {
            await this.models.movimentacao.update(movimentacaoId, movimentacao);
        } else {
            await this.models.movimentacao.create(movimentacao);
        }
        
        this.closeModal();
        this.loadView('movimentacoes');
    } catch (error) {
        alert('Erro ao salvar movimentação: ' + error.message);
    }
};

AppController.prototype.editMovimentacao = async function(id) {
    this.showMovimentacaoForm(id);
};

AppController.prototype.deleteMovimentacao = async function(id) {
    if (confirm('Tem certeza que deseja excluir esta movimentação?')) {
        try {
            await this.models.movimentacao.delete(id);
            this.loadView('movimentacoes');
        } catch (error) {
            alert('Erro ao excluir movimentação: ' + error.message);
        }
    }
};

