bindPostData(form, function(formData){
    const obj = {};
    formData.forEach((input, i) => {
        obj[i] = input
    })
    const dataToBackend = JSON.stringify(obj);
    return dataToBackend
})

const postData = async(url, dataToBackend) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: dataToBackend
    });
    checksResponseBackend(response);
    return response.json();
}

