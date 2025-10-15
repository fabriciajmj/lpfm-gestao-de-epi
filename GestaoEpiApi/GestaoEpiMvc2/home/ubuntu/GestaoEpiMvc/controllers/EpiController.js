// Extensão do AppController para gerenciar EPIs
AppController.prototype.loadEpis = async function(container) {
    container.innerHTML = '<div class="loading">Carregando EPIs...</div>';
    
    try {
        const epis = await this.models.epi.getAll();
        
        container.innerHTML = `
            <div class="view-header">
                <h1>EPIs (Equipamentos de Proteção Individual)</h1>
                <button class="btn btn-primary" onclick="appController.showEpiForm()">
                    + Novo EPI
                </button>
            </div>
            
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>CA</th>
                            <th>Fabricante</th>
                            <th>Validade CA</th>
                            <th>Tempo Uso (dias)</th>
                            <th>Estoque</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${epis.map(epi => {
                            const estoqueStatus = this.models.epi.getEstoqueStatus(epi.estoqueAtual, epi.estoqueMinimo);
                            const caVencido = this.models.epi.isCAVencido(epi.validadeCA);
                            
                            return `
                                <tr>
                                    <td>${epi.id}</td>
                                    <td>${epi.nome}</td>
                                    <td>${epi.ca}</td>
                                    <td>${epi.fabricante || '-'}</td>
                                    <td class="${caVencido ? 'text-danger' : ''}">
                                        ${new Date(epi.validadeCA).toLocaleDateString('pt-BR')}
                                        ${caVencido ? '⚠️' : ''}
                                    </td>
                                    <td>${epi.tempoUsoDias}</td>
                                    <td>
                                        <span class="badge badge-${estoqueStatus}">
                                            ${epi.estoqueAtual} / ${epi.estoqueMinimo}
                                        </span>
                                    </td>
                                    <td>
                                        ${caVencido ? '<span class="badge badge-danger">CA Vencido</span>' : 
                                          estoqueStatus === 'critico' ? '<span class="badge badge-danger">Sem Estoque</span>' :
                                          estoqueStatus === 'baixo' ? '<span class="badge badge-warning">Estoque Baixo</span>' :
                                          '<span class="badge badge-success">Normal</span>'}
                                    </td>
                                    <td class="actions">
                                        <button class="btn btn-sm btn-edit" onclick="appController.editEpi(${epi.id})">
                                            Editar
                                        </button>
                                        <button class="btn btn-sm btn-delete" onclick="appController.deleteEpi(${epi.id})">
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
                <h2>Erro ao carregar EPIs</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
};

AppController.prototype.showEpiForm = function(epiId = null) {
    const modal = document.getElementById('modal-container');
    
    if (epiId) {
        this.models.epi.getById(epiId).then(epi => {
            this.renderEpiForm(modal, epi);
        });
    } else {
        this.renderEpiForm(modal, null);
    }
};

AppController.prototype.renderEpiForm = function(container, epi) {
    const isEdit = epi !== null;
    
    container.innerHTML = `
        <div class="modal" id="epi-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${isEdit ? 'Editar EPI' : 'Novo EPI'}</h2>
                    <button class="close-btn" onclick="appController.closeModal()">&times;</button>
                </div>
                
                <form id="epi-form" onsubmit="appController.saveEpi(event, ${isEdit ? epi.id : null})">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome">Nome *</label>
                            <input type="text" id="nome" name="nome" 
                                   value="${epi?.nome || ''}" required maxlength="255">
                        </div>
                        
                        <div class="form-group">
                            <label for="ca">CA (Certificado de Aprovação) *</label>
                            <input type="text" id="ca" name="ca" 
                                   value="${epi?.ca || ''}" required maxlength="50">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fabricante">Fabricante</label>
                            <input type="text" id="fabricante" name="fabricante" 
                                   value="${epi?.fabricante || ''}" maxlength="150">
                        </div>
                        
                        <div class="form-group">
                            <label for="validadeCA">Validade do CA *</label>
                            <input type="date" id="validadeCA" name="validadeCA" 
                                   value="${epi ? epi.validadeCA.split('T')[0] : ''}" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="tempoUsoDias">Tempo de Uso (dias) *</label>
                            <input type="number" id="tempoUsoDias" name="tempoUsoDias" 
                                   value="${epi?.tempoUsoDias || ''}" required min="1">
                        </div>
                        
                        <div class="form-group">
                            <label for="estoqueMinimo">Estoque Mínimo</label>
                            <input type="number" id="estoqueMinimo" name="estoqueMinimo" 
                                   value="${epi?.estoqueMinimo || 0}" min="0">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="estoqueAtual">Estoque Atual</label>
                        <input type="number" id="estoqueAtual" name="estoqueAtual" 
                               value="${epi?.estoqueAtual || 0}" min="0">
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
    
    document.getElementById('epi-modal').style.display = 'flex';
};

AppController.prototype.saveEpi = async function(event, epiId) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const epi = {
        nome: formData.get('nome'),
        ca: formData.get('ca'),
        fabricante: formData.get('fabricante'),
        validadeCA: formData.get('validadeCA'),
        tempoUsoDias: parseInt(formData.get('tempoUsoDias')),
        estoqueMinimo: parseInt(formData.get('estoqueMinimo')),
        estoqueAtual: parseInt(formData.get('estoqueAtual')),
        dataCadastro: new Date().toISOString()
    };
    
    const errors = this.models.epi.validate(epi);
    
    if (errors.length > 0) {
        alert('Erros de validação:\n' + errors.join('\n'));
        return;
    }
    
    try {
        if (epiId) {
            await this.models.epi.update(epiId, epi);
        } else {
            await this.models.epi.create(epi);
        }
        
        this.closeModal();
        this.loadView('epis');
    } catch (error) {
        alert('Erro ao salvar EPI: ' + error.message);
    }
};

AppController.prototype.editEpi = async function(id) {
    this.showEpiForm(id);
};

AppController.prototype.deleteEpi = async function(id) {
    if (confirm('Tem certeza que deseja excluir este EPI?')) {
        try {
            await this.models.epi.delete(id);
            this.loadView('epis');
        } catch (error) {
            alert('Erro ao excluir EPI: ' + error.message);
        }
    }
};

