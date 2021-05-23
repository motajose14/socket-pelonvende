class Usuarios {

    constructor() {
        this.usuarios = [];
    }

    agregarUsuario(id, sala) {

        let usuario = { id, sala };

        this.usuarios.push(usuario);

        return this.usuarios;

    }

    getUsuario(id) {
        let usuario = this.usuarios.filter(usuario => usuario.id === id)[0];

        return usuario;
    }

    setSala(id, sala) {
        this.usuarios = this.usuarios.map(usuario => {
            if (usuario.id === id) {
                usuario.sala = sala;
            }
            return usuario;
        });

        return true;
    }

    getUsuarios() {
        return this.usuarios;
    }

    borrarUsuario(id) {

        let usuarioBorrada = this.getUsuario(id);

        this.usuarios = this.usuarios.filter(usuario => usuario.id != id);

        return usuarioBorrada;

    }


}


module.exports = {
    Usuarios
}