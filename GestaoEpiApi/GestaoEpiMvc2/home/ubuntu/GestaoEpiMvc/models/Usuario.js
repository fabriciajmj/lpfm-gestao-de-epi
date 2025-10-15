// Model: Usuario
class UsuarioModel {
    constructor() {
        this.endpoint = API_CONFIG.endpoints.usuarios;
    }

    async getAll() {
        return await apiRequest(this.endpoint);
    }

    async getById(id) {
        return await apiRequest(`${this.endpoint}/${id}`);
    }

    async create(usuario) {
        return await apiRequest(this.endpoint, 'POST', usuario);
    }

    async update(id, usuario) {
        return await apiRequest(`${this.endpoint}/${id}`, 'PUT', usuario);
    }

    async delete(id) {
        return await apiRequest(`${this.endpoint}/${id}`, 'DELETE');
    }

    validate(usuario) {
        const errors = [];
        
        if (!usuario.username || usuario.username.trim() === '') {
            errors.push('Username é obrigatório');
        }
        
        if (!usuario.email || usuario.email.trim() === '') {
            errors.push('E-mail é obrigatório');
        } else if (!this.isValidEmail(usuario.email)) {
            errors.push('E-mail inválido');
        }
        
        if (!usuario.passwordHash || usuario.passwordHash.trim() === '') {
            errors.push('Senha é obrigatória');
        }
        
        if (!usuario.role || usuario.role.trim() === '') {
            errors.push('Role é obrigatória');
        }
        
        return errors;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    getRoleLabel(role) {
        const roles = {
            'TecnicoSeguranca': 'Técnico de Segurança',
            'Administrador': 'Administrador'
        };
        return roles[role] || role;
    }
}

