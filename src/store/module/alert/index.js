import {
    SUCCESS_ALERT,
    INFO_ALERT,
    ERROR_ALERT,
    WARNING_ALERT,
    ENCRYPT_DATA,
    DECRYPT_DATA
} from '@/store/storeAlertConstants.js'
/* import Swal from 'sweetalert2' */
import {
    alertController
} from "@ionic/vue";
export default {
    name: 'alert',
    namespaced: true,
    actions: {
        async [SUCCESS_ALERT](context, data) {
            // Use sweetalert2
            const alert = await alertController.create({
                header: header,
                subHeader: "System Message",
                message: data.message,
                buttons: ["OK"],
            });

            await alert.present();
            /*   Swal.fire({
                  icon: 'success',
                  title: '',
                  text: data.message,
                  confirmButtonText: 'OK'
              }) */
        },
        async [INFO_ALERT](context, data) {
            // Use sweetalert2
           /*  Swal.fire({
                icon: 'info',
                title: 'Info!',
                text: data.message,
                confirmButtonText: 'OK'
            }) */
            const alert = await alertController.create({
                header: header,
                subHeader: "Info Message",
                message: data.message,
                buttons: ["OK"],
            });
        },
        [WARNING_ALERT](context, data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'Warning',
                title: 'Warning Message!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        },
        [ERROR_ALERT](context, data) {
            // Use sweetalert2
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: data.message,
                confirmButtonText: 'OK'
            })
        },
        [ENCRYPT_DATA](data) {
            return btoa(data)
        },
        [DECRYPT_DATA](data) {
            console.log(data)
            /* return atob(data) */
        }
    }
}