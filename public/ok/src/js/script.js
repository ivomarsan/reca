var cont = 10
  , elem = document.getElementById("timer");

function temporizador(t) {
	elem.innerHTML='Redirecionado em '+cont+' segundos';
	if(cont == 0)
		location = "/projects/IFveiculos/";
	else
		setTimeout("temporizador(--cont)", 1000);
}

(function(){
	//temporizador(cont);
})();