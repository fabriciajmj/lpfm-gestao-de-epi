// Model: Empresa
class EmpresaModel {
    constructor() {
        this.endpoint = API_CONFIG.endpoints.empresas;
    }

    async getAll() {
        return await apiRequest(this.endpoint);
    }

    async getById(id) {
        return await apiRequest(`${this.endpoint}/${id}`);
    }

    async create(empresa) {
        return await apiRequest(this.endpoint, 'POST', empresa);
    }

    async update(id, empresa) {
        return await apiRequest(`${this.endpoint}/${id}`, 'PUT', empresa);
    }

    async delete(id) {
        return await apiRequest(`${this.endpoint}/${id}`, 'DELETE');
    }

    validate(empresa) {
        const errors = [];
        
        if (!empresa.razaoSocial || empresa.razaoSocial.trim() === '') {
            errors.push('Razão Social é obrigatória');
        }
        
        if (!empresa.cnpj || empresa.cnpj.trim() === '') {
            errors.push('CNPJ é obrigatório');
        }
        
        if (empresa.email && !this.isValidEmail(empresa.email)) {
            errors.push('E-mail inválido');
        }
        
        return errors;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    formatCNPJ(cnpj) {
        // Remove caracteres não numéricos
        cnpj = cnpj.replace(/\D/g, '');
        
        // Formata: XX.XXX.XXX/XXXX-XX
        if (cnpj.length === 14) {
            return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
        }
        
        return cnpj;
    }
}

