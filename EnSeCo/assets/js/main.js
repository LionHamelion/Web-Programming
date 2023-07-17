(function() {
  "use strict"; // Start of use strict

/*** selector helper*/
const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
/*** on scroll event listener*/
const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

const changeNav = (entries, observer) => {
	entries.forEach((entry) => {
		//console.log(entry);
		// чекаем, то элемент пересекает наблюдаемую область более, чем на 55%
		if(entry.isIntersecting && entry.intersectionRatio >= 0.55) {
			// удаляем активный класс у элемента меню
			document.querySelector('.active').classList.remove('active');
			// получаем ID секции, которая текущая
			let id = entry.target.getAttribute('id');
			// обращаемся к ссылке меню, у которой href равен ID секции
			let newLink = document.querySelector(`[href="#${id}"]`).classList.add('active');
			//console.log(id);
		}
	});
}


const options = {
	threshold: 0.55
}

const observer = new IntersectionObserver(changeNav, options);


const sections = document.querySelectorAll('section');
sections.forEach((section) => {
	observer.observe(section);
	//console.log(section);
});


var navlnks = document.querySelectorAll(".nav a");
        Array.prototype.map.call(navlnks, function(item) {

            item.addEventListener("click", function(e) {

                var navlnks = document.querySelectorAll(".nav a"); 

                Array.prototype.map.call(navlnks, function(item) {

                    if (item.parentNode.className == "active" || item.parentNode.className == "active open" ) {

                        item.parentNode.className = "";

                    } 

                }); 

                e.currentTarget.parentNode.className = "active";
            });
        });

		
		/*** Back to top button*/
		let backtotop = select('.back-to-top')
		if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
			backtotop.classList.add('active')
			} else {
			backtotop.classList.remove('active')
			}
		}
		window.addEventListener('load', toggleBacktotop)
		onscroll(document, toggleBacktotop)
		}




}
)(); // End of use strict