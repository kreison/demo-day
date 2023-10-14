bindPostData(form, function(formData){
    const obj = {};
    formData.forEach((input, i) => {
        obj[i] = input
    })
    const dataToBackend = JSON.stringify(obj);
    if (password.value.length < 8) {
        toast('должно быть минимум 8 символов в пароли')
        return {status: 0, data: dataToBackend}
    }
    if(password.value !== passwordRepeat.value) {
        toast('Пароли несовпали')
        return {status: 0, data: dataToBackend}
    }
    return {status: 1, data: dataToBackend}

})

const postData = async(dataToBackend) => {
    const url = 'https://fa91-109-201-175-115.ngrok-free.app/api/v1/users/register/';
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: dataToBackend
    });
    checksResponseBackend(response);
    return response.json();
}

