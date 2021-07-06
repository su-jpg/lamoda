const headerCityButton = document.querySelector(".header__city-button");


headerCityButton.textContent=localStorage.getItem('lomoda-location')||" Ваш город? ";

headerCityButton.addEventListener('click', () =>{
 const city = prompt('Какой у вас город?');
 headerCityButton.textContent = city;
 localStorage.setItem('lomoda-location',city);
 });
