const url = window.location.toString();
let getUserName = function(url) {
    let arrFromUrl = url.split('=');
    let userName = arrFromUrl[1];
    if (userName  == undefined) {
        userName = 'galigalinochka';
    }
    return userName;
}

let name = getUserName(url);

fetch(`https://api.github.com/users/${name}`)
    .then(response => {
        if (response.status != 200) {
            return null;
        } else {
            return response.json();
        }
    })
    .then(json => {
            let getImage = () => {
                let photo = document.querySelector('.photo');
                photo.src = json.avatar_url;
                //photo.innerHTML = photo;
            }

            let getName = () => {
                let user = document.querySelector('.name');
                let link = document.querySelector('.link');
                let theName = json.name;
                user.innerHTML = theName;
                link.href = json.html_url;
                if (theName === null) {
                    user.innerHTML = json.login;
                }
            }

            let getInfo = () => {
                let info = document.querySelector('.info');
                info.innerHTML = json.bio;
            }


            getImage();
            getName();
            getInfo();
    })
    .catch(err => alert('Информация о пользователе не доступна'));


