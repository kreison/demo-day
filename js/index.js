const form = document.querySelector('form')
const okay = document.querySelector('.okay')
const button = document.querySelector('#btn')
const password = document.querySelector('#pass')
const passwordRepeat = document.querySelector('#passRep')
const name = document.querySelector('#name')
const passes = document.querySelectorAll('.password')

passes.forEach(input => {
    const control = input.querySelector('.password-control')
    const password = input.querySelector('input')
    
    control.onclick = (event) => {
        if (password.getAttribute('type') === 'password') {
            event.target.classList.add('view')
            password.setAttribute('type', 'text');
        } else {
            event.target.classList.remove('view')
            password.setAttribute('type', 'password');
        }
    }
})


var bindPostData = (form, callback) => {
  button.onclick = async (event) => {
      event.preventDefault()
      const formData = await new FormData(form)
      const json = callback(formData);
      if (json.status === 1){
        checksFields(name, password, json.data)
      }
  }
}

const regexp = /^[a-zA-Z0-9_-]+$/
function checksFields(name, password, json){
  if (!regexp.test(name.value) ){
    return toast('Допустимые символы имени: буквы латинского алфавита, цифры, символы подчеркивания и дефисы')
  }
  if (!regexp.test(password.value)){
    return toast('Допустимые символы пароля: буквы латинского алфавита, цифры, символы подчеркивания и дефисы')
  }
  if (name.value.length < 3){
    return toast('Минимальная длина имени 3 символа')
  }
  if (name.value.length > 20){
    return toast('Максимальная длина имени 20 символа')
  }
  if (name.value === '') {
    return toast('Введиет ваше имя!')
  }
  if (password.value.length > 20){
    return toast('Максимальная длина пароля 20 символа')
  }
  if (password.value === '') {
      return toast('Вы не придумали пароль!')
  }
  if (password.value === passwordRepeat.value) {
    return postData(json)
  }
  if (passwordRepeat.value === '') {
      return toast('Вы не повторили пароль!')
  }
  
  
  
}

function checksResponseBackend (response){
  if (response.status === 404) {
    return toast('ОШИБКА 404')
  }
  if (response.status === 400) {
      return toast('Такой пользователь уже существует!')
  }
  form.style.display = 'none'
  okay.style.display = 'block'
}
function toast(value){
    Toastify({
        text: value,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}
