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

}