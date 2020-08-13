import sweetAlert from 'sweetalert2';

const alertError = () => {
    sweetAlert.fire({
        title: 'Oops!',
        text: `Unexpected Error 😅, try again`,
        icon: 'error'
    });
}

const alertData = (data) => {
    sweetAlert.fire({
        title: 'Stop!',
        text: `Fields to fill 🧐
      ${data}`,
        icon: 'error'
    });
}

const alertSuccess = (message, text) => {
    return new Promise = (resolve, reject) => {
        sweetAlert.fire({
            title: message,
            text: 'We wait for you here 😊',
            icon: 'success'
        }).then((result) => {
            resolve(result.value);
        }).catch(e => {
            reject(e);
        });
    }
}

export default { alertData, alertError, alertSuccess };