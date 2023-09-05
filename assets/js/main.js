/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if(navToggle) {

    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}

/*===== MENU HIDDEN =====*/
if(navClose) {
    
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/


/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(content => {
            content.classList.remove('qualification__active');
        })

        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        })

        tab.classList.add('qualification__active');
    })
})

/*==================== SERVICES MODAL ====================*/


/*==================== PORTFOLIO SWIPER  ====================*/
let swiper = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    
    if(this.scrollY >= 80) 
        nav.classList.add('scroll-header'); 
    else 
        nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    
    if(this.scrollY >= 560) 
        scrollUp.classList.add('show-scroll'); 
    else 
        scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')


const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'


if (selectedTheme) {
  
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== CONTACT FORM ====================*/ 

const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const contactPhone = document.getElementById("contact-phone");
const contactMessage = document.getElementById("contact-message");
const errorMessage = document.getElementById("error-message");
const fiveSeconds = 5000;


function sendEmail() {

    if( isValidation() ) {

        submitForm();
        clearFields();
    }    
}

function isValidation() {

    if(
        contactName.value === '' || 
        contactEmail.value === '' || 
        contactPhone.value === '' || 
        contactMessage.value === ''
      ) 
    {
        errorMessage.textContent = 'Por favor, informe todos os campos!'
        clearError();

        return false;
    }

    return true;
}

function submitForm() {

    // serviceID - templateID - #form - public key
    emailjs.sendForm(
        'service_lohrtku', 
        'template_uey526o', 
        '#contact-form', 
        'fVpLR0HUM0YELf1Wm'
    ).then(() => {

        errorMessage.textContent = 'Mensagem enviada com sucesso!';        
        clearError();

    }, (error) => {

        errorMessage.textContent = `Oops! Algo deu errado: ${error}`;

        clearError();
    });
}

function clearError() {

    setTimeout(() => {
        errorMessage.textContent = '';
    }, fiveSeconds);
}

function clearFields() {

    contactName.value = '' ;
    contactEmail.value = '' ;
    contactPhone.value = '' ;
    contactMessage.value = '';
}

function clearError() {

    setTimeout(() => {
        errorMessage.textContent = "";
    }, fiveSeconds);
}


/*==================== MASK FORM ====================*/

function mask(e, id, mask){

    var tecla=(window.event)?event.keyCode:e.which;   

    if((tecla>47 && tecla<58)){
        mascara(id, mask);
        return true;
    } 
    else{
        if (tecla==8 || tecla==0){
            mascara(id, mask);
            return true;
        } 
        else  return false;
    }
}
function mascara(id, mask) {

    var i = id.value.length;
    var carac = mask.substring(i, i+1);
    var prox_char = mask.substring(i+1, i+2);

    if(i == 0 && carac != '#'){
        insereCaracter(id, carac);
        if(prox_char != '#')insereCaracter(id, prox_char);
    }
    else if(carac != '#'){
        insereCaracter(id, carac);
        if(prox_char != '#')insereCaracter(id, prox_char);
    }

    function insereCaracter(id, char){
        id.value += char;
    }
}

/*==================== FILTER FORM ====================*/

const inputs = document.querySelectorAll('input, textarea')

inputs.forEach(item => {

    item.addEventListener('input', function() {

        let filteredValue = this.value.replace(/[~`!#$%\^&*+=\\[\]\\';,/{}|\\":<>\?]/gi, '');
    
        this.value = filteredValue;
    });

    item.addEventListener('paste', function(e) {
        e.preventDefault();
    });
})

/*====================  TOGGLE STYLE SWITCHER ====================*/
const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
const styleSwitcher = document.querySelector('.style-switcher');

styleSwitcherToggle.addEventListener('click', () => {

    styleSwitcher.classList.toggle("open");  
})

window.addEventListener('scroll', () => {

    if (styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
    }
})

const alternativeStyles = document.querySelectorAll('.alternate-style');

function setActiveStyle(color) {

    alternativeStyles.forEach((style) => {

        if (color === style.getAttribute("title")) 
        {
            localStorage.setItem('colorTheme', color);
            style.removeAttribute("disabled");
            return;
        }
        
        style.setAttribute("disabled", "true");
    });
}

const color = localStorage.getItem('colorTheme') == null ? 'color-1' : localStorage.getItem('colorTheme');
setActiveStyle(color);