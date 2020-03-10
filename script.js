const url = window.location.toString();
let getUserName = function(url) {  //получаем имя пользователя из url, который далее будем использовать в функции
    let arrFromUrl = url.split('='); //разбиваем строку на массив строк путем разделения строки символом '=', получается 2 элемента в массиве (0-первая часть url, 1- вторая часть url)
    let userName = arrFromUrl[1]; // имя пользователя становится вторым элементом массива
    if (userName  == undefined) { // это типа по умолчанию страница, для того, чтобы из файла index.html открылась страница с пользователем, и не надо было userName вручную вбивать
        userName = 'galigalinochka';
    }
    return userName;
}

let name = getUserName(url);

fetch(`https://api.github.com/users/${name}`)
    .then(response => {
        if (response.status != 200) {
            alert('Информация о пользователе не доступна');
        } else {
            return response.json();
        }
    })
    .then(json => {
        let getImage = () => {
            let photo = document.querySelector('.photo');
            photo.src = json.avatar_url;
        }
        let getName = () => {
            let user = document.querySelector('.name');
            let link = document.querySelector('.link');
            user.innerHTML = json.name;
            link.href = json.html_url;
        }
        let getInfo = () => {
            let info = document.querySelector('.info');
            info.innerHTML = json.bio;
        }


        getImage();
        getName();
        getInfo();
    })

