
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const id = document.querySelector('#role');


const login = () => {
    if(id.value == '0'){
        topic.innerHTML = 'pick a role!!!';
        main.classList.remove('hide');
        main.classList.remove('alert-danger');
        main.classList.add('alert-info');
    }else{
        if(email.value == '' || password.value == ''){
            topic.innerHTML = 'fields cannot be left empty!!!';
            main.classList.remove('hide');
            main.classList.remove('alert-danger');
            main.classList.add('alert-info');
        }else{
            topic.innerHTML = 'Loading...';
            body.innerHTML = 'Please Wait';
            main.classList.remove('hide');
            main.classList.remove('alert-danger');
            main.classList.add('alert-warning');
            if(id.value == 1){
                fetch('./api/adminController/admin_login.php', {
                    method: 'POST',
                    headers: {
                        'Accept':'application/json, text/plain/ */*',
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({
                        email : email.value,
                        password : password.value
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.status == '1'){
                        topic.innerHTML = 'Login Successful!';
                        body.innerHTML = data.message;
                        main.classList.remove('hide');
                        main.classList.remove('alert-warning');
                        main.classList.add('alert-success');

                        setCookie("jwt", data.jwt, 1);
                        window.location.replace("./dashboards/admin");
                    }else{
                        topic.innerHTML = 'Login Error!';
                        body.innerHTML = data.message;
                        main.classList.remove('hide');
                        main.classList.remove('alert-warning');
                        main.classList.add('alert-danger');
                    }
                })
                .catch(err => console.log(err))
            }else if(id.value == 2){
                fetch('./api/teacherController/teacher_login.php', {
                    method: 'POST',
                    headers: {
                        'Accept':'application/json, text/plain/ */*',
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({
                        email : email.value,
                        password : password.value
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if(data.status == '1'){
                        topic.innerHTML = 'Login Successful!';
                        body.innerHTML = data.message;
                        main.classList.remove('hide');
                        main.classList.remove('alert-warning');
                        main.classList.add('alert-success');

                        setCookie("jwt", data.jwt, 1);
                        setCookie("teacher", data.teacher, 1);
                        window.location.replace("./dashboards/teacher");
                    }else{
                        topic.innerHTML = 'Login Error!';
                        body.innerHTML = data.message;
                        main.classList.remove('hide');
                        main.classList.remove('alert-warning');
                        main.classList.add('alert-danger');
                    }
                })
                .catch(err => console.log(err))
            }
        }
            
    }
}

// function to set cookie
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
