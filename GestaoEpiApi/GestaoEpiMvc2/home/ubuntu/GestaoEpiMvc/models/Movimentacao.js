// Model: Movimentacao
class MovimentacaoModel {
    constructor() {
        this.endpoint = API_CONFIG.endpoints.movimentacoes;
    }

    async getAll() {
        return await apiRequest(this.endpoint);
    }

    async getById(id) {
        return await apiRequest(`${this.endpoint}/${id}`);
    }

    async create(movimentacao) {
        return await apiRequest(this.endpoint, 'POST', movimentacao);
    }

    async update(id, movimentacao) {
        return await apiRequest(`${this.endpoint}/${id}`, 'PUT', movimentacao);
    }

    async delete(id) {
        return await apiRequest(`${this.endpoint}/${id}`, 'DELETE');
    }

    validate(movimentacao) {
        const errors = [];
        
        if (!movimentacao.funcionarioId || movimentacao.funcionarioId <= 0) {
            errors.push('Funcionário é obrigatório');
        }
        
        if (!movimentacao.epiId || movimentacao.epiId <= 0) {
            errors.push('EPI é obrigatório');
        }
        
        if (!movimentacao.dataEntrega) {
            errors.push('Data de Entrega é obrigatória');
        }
        
        if (!movimentacao.dataVencimentoUso) {
            errors.push('Data de Vencimento de Uso é obrigatória');
        }
        
        return errors;
    }

    calcularDataVencimento(dataEntrega, tempoUsoDias) {
        const data = new Date(dataEntrega);
        data.setDate(data.getDate() + tempoUsoDias);
        return data.toISOString().split('T')[0];
    }

    isVencido(dataVencimentoUso) {
        const hoje = new Date();
        const vencimento = new Date(dataVencimentoUso);
        return vencimento < hoje;
    }

    diasParaVencimento(dataVencimentoUso) {
        const hoje = new Date();
        const vencimento = new Date(dataVencimentoUso);
        const diff = vencimento - hoje;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    getStatusVencimento(dataVencimentoUso) {
        const dias = this.diasParaVencimento(dataVencimentoUso);
        
        if (dias < 0) return { status: 'vencido', classe: 'status-vencido' };
        if (dias <= 7) return { status: 'proximo-vencimento', classe: 'status-alerta' };
        if (dias <= 30) return { status: 'atencao', classe: 'status-atencao' };
        return { status: 'normal', classe: 'status-normal' };
    }
}

