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
      if (password.value.length < 8) {
        return toast('должно быть минимум 8 символов в пароли')
      }
      if(password.value !== passwordRepeat.value) {
          return toast('Пароли несовпали')
      }
      checksFields(name, password, json)
  }
}


function checksFields(name, password, json){
  if (name.value === '') {
    return toast('Введиет ваше имя!')
  }
  if (password.value === '') {
      return toast('Вы не придумали пароль!')
  }
  if (password.value === passwordRepeat.value) {
    return postData('https://7fce-109-201-165-30.ngrok-free.app/api/v1/users/register/', json)
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
