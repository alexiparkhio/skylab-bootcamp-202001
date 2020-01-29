var users = [];

createSearch('.search', function (query) {
    googl(query, function (results) {
        createResults('.results', results);
    });
});

createSearch('.search2', function (query) {
    yahoo(query, function (results) {
        createResults('.results2', results);
    });
});

createSearch('.search3', function (query) {
    bing(query, function (results) {
        createResults('.results3', results);
    });
});

createSearch('.search4', function (query) {
    ecosia(query, function (results) {
        createResults('.results4', results);
    });
});

var login = createLogin('.login', function(username, password) { 
    if (users.length > 0) {
        for ( var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.username.includes(username) && password === user.password) {
                document.querySelector('.search').classList.remove('search--hide');
                document.querySelector('.search2').classList.remove('search--hide');
                document.querySelector('.search3').classList.remove('search--hide');
                document.querySelector('.search4').classList.remove('search--hide');
                login.classList.toggle('login--hide');
                return;
            } else {
                alert("incorrect username/pass");
            }
        }
    } else {
        alert('please register first');
    }
});

var buttonContent = document.querySelector('div.buttonContent');
var buttonLogin = document.querySelector('.buttonContent__login');
var buttonSignin = document.querySelector('.buttonContent__signin');
var registerTemplate = document.querySelector('.registerTemplate');

buttonLogin.addEventListener('click', function (event) {
    event.preventDefault();
    buttonContent.classList.toggle('buttonContent--hide');
    document.getElementsByClassName("login")[0].classList.remove('login--hide');
});

buttonSignin.addEventListener('click', function (event) {
    event.preventDefault();
    buttonContent.classList.toggle('buttonContent--hide');
    document.getElementsByClassName("registerTemplate")[0].classList.remove('registerTemplate--hide');
});

var finishRegister = registerUser('.registerTemplate', function(user) {
    if (user.name && user.surname && user.username && user.password) {
        document.querySelector('.registerTemplate').classList.toggle('registerTemplate--hide');
        document.querySelector('.buttonContent').classList.remove('buttonContent--hide');
    } else {
        alert("You have to fill all shields");
    }
});

var home = document.querySelector('h1');

home.addEventListener('click', function () {
    window.location.href = 'index.html'
});