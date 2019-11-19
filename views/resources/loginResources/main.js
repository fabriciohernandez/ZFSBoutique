const inputs = document.querySelectorAll(".input");
let registrarse = document.querySelector("#registrarse");
let iniciarSesion = document.querySelector("#iniciarSesion");
let containerRegistro = document.querySelector(".containerRegistro");
let containerLogin = document.querySelector(".container");
let backgroundColor = document.querySelector(".background");

containerRegistro.classList.add("hide");
containerLogin.style.gap="7rem";

iniciarSesion.addEventListener("click",function iniciarSesionShow() {
	backgroundColor.style.background= "#FF6347";
	containerRegistro.classList.add("hide");
	containerLogin.classList.remove("hide");
})

registrarse.addEventListener("click",function registrarseShow(){
	containerLogin.classList.add("hide");
	containerRegistro.style.gap="7rem";
	containerRegistro.classList.remove("hide");
	backgroundColor.style.background= "#d9d9d9";

})

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}

inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});
