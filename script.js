const url = window.location.toString();
let getUserName = function(url) {
    let userName = url.split('=')[1];
    if (userName  == undefined) {
        userName = 'galigalinochka';
    }
    return userName;
}
const getDate = new Promise((resolve, reject) => {
    setTimeout(() => {
            let date = new Date();
            let time = document.getElementById('time');
            time.innerHTML = date;
            date ? resolve(date) : reject('Время не определено')},
        3000)
})
console.log(getDate);
let name = getUserName(url);
console.log(name);

let getProfileInfo = fetch(`https://api.github.com/users/${name}`)
console.log(getProfileInfo);
Promise.all([getDate, getProfileInfo])
    .then(([date, request]) => {
        let res = request.json();
        console.log(res);
        if (request.status != 200) {
            return null;
        } else {
            return res;
        }
    })
    .then(json => {
        let theName = json.name;
            let getImage = () => {
                let photo = document.querySelector('.photo');
                photo.src = json.avatar_url;
            }

            let getName = () => {
                let user = document.querySelector('.name');
                let link = document.querySelector('.link');

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


