const form = document.getElementById("cadastroForm")

const nome = document.getElementById("nome")
const email = document.getElementById("email")
const senha = document.getElementById("senha")
const confirmarSenha = document.getElementById("confirmarSenha")

const strengthBar = document.getElementById("strength-bar")

const btn = document.getElementById("btnEnviar")
const spinner = document.getElementById("spinner")
const btnText = document.getElementById("btn-text")

const mensagemSucesso = document.getElementById("mensagem-sucesso")

nome.addEventListener("blur",()=>validarCampo(nome,validarNome))
email.addEventListener("blur",()=>validarCampo(email,validarEmail))
senha.addEventListener("input",()=>validarCampo(senha,validarSenha))
confirmarSenha.addEventListener("blur",()=>validarCampo(confirmarSenha,validarConfirmacao))

function validarCampo(input,funcao){

const erro = document.getElementById(input.id+"-error")

const resultado = funcao(input.value)

if(!resultado.valido){

input.classList.add("error")
input.classList.remove("success")

erro.textContent = resultado.mensagem

}else{

input.classList.remove("error")
input.classList.add("success")

erro.textContent=""

}

}

function validarNome(valor){

if(!valor.trim()) return {valido:false,mensagem:"Nome obrigatório"}

if(valor.length<3) return {valido:false,mensagem:"Mínimo 3 caracteres"}

return {valido:true}

}

function validarEmail(valor){

const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!valor) return {valido:false,mensagem:"Email obrigatório"}

if(!regex.test(valor)) return {valido:false,mensagem:"Email inválido"}

return {valido:true}

}

function validarSenha(valor){

let nivel=0

if(valor.length>=8) nivel++
if(/[A-Z]/.test(valor)) nivel++
if(/[0-9]/.test(valor)) nivel++
if(/[!@#$%&*]/.test(valor)) nivel++

strengthBar.style.width=(nivel*25)+"%"

if(nivel==1) strengthBar.style.background="red"
if(nivel==2) strengthBar.style.background="orange"
if(nivel==3) strengthBar.style.background="yellow"
if(nivel==4) strengthBar.style.background="green"

if(valor.length<8) return {valido:false,mensagem:"Min 8 caracteres"}

return {valido:true}

}

function validarConfirmacao(){

if(confirmarSenha.value!==senha.value){

return {valido:false,mensagem:"Senhas diferentes"}

}

return {valido:true}

}

form.addEventListener("submit",function(e){

e.preventDefault()

btn.disabled=true
spinner.style.display="block"
btnText.textContent="Enviando..."

setTimeout(()=>{

spinner.style.display="none"
btnText.textContent="Criar Conta"

mensagemSucesso.textContent="Cadastro realizado com sucesso!"

form.reset()

strengthBar.style.width="0%"

btn.disabled=false

},2000)

})