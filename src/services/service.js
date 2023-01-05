import axios from 'axios';
import Global from '../Global';
import Swal from 'sweetalert2';
export default class service {

    generateToken(user, password) {
        var usuario = {
            userName : user,
            password : password
        }
        var url = Global.mainUrl + "Auth/Login";
        return new Promise(function(resolve) {
            axios.post(url, usuario).then(response => {
                resolve(response.data);
            }).catch((error) => {
                // Error
                if (error.response.status === 401) {
                    Swal.fire(
                        'Acceso denegado',
                        'Credenciales incorrectas',
                        'error'
                      )
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    // console.log(error.response.data);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error:', error.message);
                }
            });
        });
    }

    getSalas() {
        var url = Global.mainUrl + "api/salas";
        return new Promise(function(resolve) {
            axios.get(url).then(response => {
                resolve(response.data);
            }).catch((error) => {
                // Something happened in setting up the request that triggered an Error
                console.log('Error:', error.message);
            });
        });
    }

    getSala(idsala) {
        var url = Global.mainUrl + "api/salas/" + idsala;
        return new Promise(function(resolve) {
            axios.get(url).then(response => {
                resolve(response.data);
            }).catch((error) => {
                // Something happened in setting up the request that triggered an Error
                console.log('Error:', error.message);
            });
        });
    }

    getTES() { // get Tiempos Empresas Salas
        var url = Global.mainUrl + "api/TiempoEmpresaSala";
        return new Promise(function(resolve) {
            axios.get(url).then(response => {
                resolve(response.data);
            }).catch((error) => {
                // Something happened in setting up the request that triggered an Error
                console.log('Error:', error.message);
            });
        });
    }

    getEmpresa(idempresa) {
        var url = Global.mainUrl + "api/empresas/" + idempresa;
        return new Promise(function(resolve) {
            axios.get(url).then(response => {
                resolve(response.data);
            }).catch((error) => {
                // Something happened in setting up the request that triggered an Error
                console.log('Error:', error.message);
            });
        });
    }

}