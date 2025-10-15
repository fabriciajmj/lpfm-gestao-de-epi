// Model: Funcionario
class FuncionarioModel {
    constructor() {
        this.endpoint = API_CONFIG.endpoints.funcionarios;
    }

    async getAll() {
        return await apiRequest(this.endpoint);
    }

    async getById(id) {
        return await apiRequest(`${this.endpoint}/${id}`);
    }

    async create(funcionario) {
        return await apiRequest(this.endpoint, 'POST', funcionario);
    }

    async update(id, funcionario) {
        return await apiRequest(`${this.endpoint}/${id}`, 'PUT', funcionario);
    }

    async delete(id) {
        return await apiRequest(`${this.endpoint}/${id}`, 'DELETE');
    }

    validate(funcionario) {
        const errors = [];
        
        if (!funcionario.empresaId || funcionario.empresaId <= 0) {
            errors.push('Empresa é obrigatória');
        }
        
        if (!funcionario.matricula || funcionario.matricula.trim() === '') {
            errors.push('Matrícula é obrigatória');
        }
        
        if (!funcionario.nomeCompleto || funcionario.nomeCompleto.trim() === '') {
            errors.push('Nome Completo é obrigatório');
        }
        
        return errors;
    }

    getStatusLabel(ativo) {
        return ativo ? 'Ativo' : 'Inativo';
    }

    getStatusClass(ativo) {
        return ativo ? 'status-ativo' : 'status-inativo';
    }
}

