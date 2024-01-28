let user = JSON.parse(localStorage.getItem('user'));

if (user != null) {
	let accediLi = document.querySelector('.login-list li:nth-child(1)');
	let registratiLi = document.querySelector('.login-list li:nth-child(2)');
	let utenteLi = document.querySelector('.login-list li.hidden');

	accediLi.classList.add('hidden');
	registratiLi.classList.add('hidden');

	utenteLi.classList.remove('hidden');
}
