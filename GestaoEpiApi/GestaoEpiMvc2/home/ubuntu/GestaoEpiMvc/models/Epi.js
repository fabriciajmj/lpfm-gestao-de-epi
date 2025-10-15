// Model: Epi
class EpiModel {
    constructor() {
        this.endpoint = API_CONFIG.endpoints.epis;
    }

    async getAll() {
        return await apiRequest(this.endpoint);
    }

    async getById(id) {
        return await apiRequest(`${this.endpoint}/${id}`);
    }

    async create(epi) {
        return await apiRequest(this.endpoint, 'POST', epi);
    }

    async update(id, epi) {
        return await apiRequest(`${this.endpoint}/${id}`, 'PUT', epi);
    }

    async delete(id) {
        return await apiRequest(`${this.endpoint}/${id}`, 'DELETE');
    }

    validate(epi) {
        const errors = [];
        
        if (!epi.nome || epi.nome.trim() === '') {
            errors.push('Nome é obrigatório');
        }
        
        if (!epi.ca || epi.ca.trim() === '') {
            errors.push('CA (Certificado de Aprovação) é obrigatório');
        }
        
        if (!epi.validadeCA) {
            errors.push('Validade do CA é obrigatória');
        }
        
        if (!epi.tempoUsoDias || epi.tempoUsoDias <= 0) {
            errors.push('Tempo de uso em dias deve ser maior que zero');
        }
        
        return errors;
    }

    isCAVencido(validadeCA) {
        const hoje = new Date();
        const validade = new Date(validadeCA);
        return validade < hoje;
    }

    getEstoqueStatus(estoqueAtual, estoqueMinimo) {
        if (estoqueAtual === 0) return 'critico';
        if (estoqueAtual <= estoqueMinimo) return 'baixo';
        return 'normal';
    }
}

