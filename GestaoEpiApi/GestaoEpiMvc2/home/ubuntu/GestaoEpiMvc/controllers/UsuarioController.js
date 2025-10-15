// Extensão do AppController para gerenciar Usuários
AppController.prototype.loadUsuarios = async function(container) {
    container.innerHTML = '<div class="loading">Carregando usuários...</div>';
    
    try {
        const usuarios = await this.models.usuario.getAll();
        
        container.innerHTML = `
            <div class="view-header">
                <h1>Usuários do Sistema</h1>
                <button class="btn btn-primary" onclick="appController.showUsuarioForm()">
                    + Novo Usuário
                </button>
            </div>
            
            <div class="table-container">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>E-mail</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Data Cadastro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usuarios.map(usuario => `
                            <tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.username}</td>
                                <td>${usuario.email}</td>
                                <td>
                                    <span class="badge badge-info">
                                        ${this.models.usuario.getRoleLabel(usuario.role)}
                                    </span>
                                </td>
                                <td>
                                    <span class="badge badge-${usuario.ativo ? 'success' : 'secondary'}">
                                        ${usuario.ativo ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td>${new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</td>
                                <td class="actions">
                                    <button class="btn btn-sm btn-edit" onclick="appController.editUsuario(${usuario.id})">
                                        Editar
                                    </button>
                                    <button class="btn btn-sm btn-delete" onclick="appController.deleteUsuario(${usuario.id})">
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
                <h2>Erro ao carregar usuários</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
};

AppController.prototype.showUsuarioForm = function(usuarioId = null) {
    const modal = document.getElementById('modal-container');
    
    if (usuarioId) {
        this.models.usuario.getById(usuarioId).then(usuario => {
            this.renderUsuarioForm(modal, usuario);
        });
    } else {
        this.renderUsuarioForm(modal, null);
    }
};

AppController.prototype.renderUsuarioForm = function(container, usuario) {
    const isEdit = usuario !== null;
    
    container.innerHTML = `
        <div class="modal" id="usuario-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${isEdit ? 'Editar Usuário' : 'Novo Usuário'}</h2>
                    <button class="close-btn" onclick="appController.closeModal()">&times;</button>
                </div>
                
                <form id="usuario-form" onsubmit="appController.saveUsuario(event, ${isEdit ? usuario.id : null})">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="username">Username *</label>
                            <input type="text" id="username" name="username" 
                                   value="${usuario?.username || ''}" required maxlength="50">
                        </div>
                        
                        <div class="form-group">
                            <label for="email">E-mail *</label>
                            <input type="email" id="email" name="email" 
                                   value="${usuario?.email || ''}" required maxlength="100">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="passwordHash">Senha *</label>
                            <input type="password" id="passwordHash" name="passwordHash" 
                                   ${isEdit ? '' : 'required'} maxlength="255"
                                   placeholder="${isEdit ? 'Deixe em branco para manter a senha atual' : ''}">
                            ${isEdit ? '<small class="form-text">Deixe em branco para não alterar a senha</small>' : ''}
                        </div>
                        
                        <div class="form-group">
                            <label for="role">Role *</label>
                            <select id="role" name="role" required>
                                <option value="">Selecione uma role</option>
                                <option value="TecnicoSeguranca" ${usuario?.role === 'TecnicoSeguranca' ? 'selected' : ''}>
                                    Técnico de Segurança
                                </option>
                                <option value="Administrador" ${usuario?.role === 'Administrador' ? 'selected' : ''}>
                                    Administrador
                                </option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="ativo" name="ativo" 
                                   ${usuario?.ativo !== false ? 'checked' : ''}>
                            Usuário Ativo
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
    
    document.getElementById('usuario-modal').style.display = 'flex';
};

AppController.prototype.saveUsuario = async function(event, usuarioId) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const usuario = {
        username: formData.get('username'),
        email: formData.get('email'),
        role: formData.get('role'),
        ativo: formData.get('ativo') === 'on',
        dataCadastro: new Date().toISOString()
    };
    
    // Só adiciona senha se foi preenchida
    const senha = formData.get('passwordHash');
    if (senha) {
        // Em produção, você deve fazer hash da senha no backend
        // Aqui estamos apenas passando como está para demonstração
        usuario.passwordHash = senha;
    } else if (!usuarioId) {
        alert('Senha é obrigatória para novos usuários');
        return;
    }
    
    const errors = this.models.usuario.validate(usuario);
    
    if (errors.length > 0) {
        alert('Erros de validação:\n' + errors.join('\n'));
        return;
    }
    
    try {
        if (usuarioId) {
            // Se não há senha, remove do objeto para não atualizar
            if (!senha) {
                delete usuario.passwordHash;
            }
            await this.models.usuario.update(usuarioId, usuario);
        } else {
            await this.models.usuario.create(usuario);
        }
        
        this.closeModal();
        this.loadView('usuarios');
    } catch (error) {
        alert('Erro ao salvar usuário: ' + error.message);
    }
};

AppController.prototype.editUsuario = async function(id) {
    this.showUsuarioForm(id);
};

AppController.prototype.deleteUsuario = async function(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            await this.models.usuario.delete(id);
            this.loadView('usuarios');
        } catch (error) {
            alert('Erro ao excluir usuário: ' + error.message);
        }
    }
};

