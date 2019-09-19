const container = document.querySelector('#container');

const LoadMainPage = () => {
    fetch('pages/dashboard.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        numberAnalysis();
    })
    .catch(err => console.log(err))
}

const viewResult = () => {
    fetch('pages/result.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        getSessions();
        getTerms();
    })
    .catch(err => console.log(err))
}

const profile = () => {
    fetch('pages/profile.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        showProfile();
    })
    .catch(err => console.log(err))
}

const numberAnalysis = () => {
    let jwt = getCookie('jwt');
    let student = getCookie('student');
    if(!jwt || !student){
        window.location.replace("../../index.html");
    }
    fetch('../../api/adminController/numberAnalysis.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#allStudents').innerHTML = data.data.students;
        document.querySelector('#allTeachers').innerHTML = data.data.teachers;
        document.querySelector('#allAdmins').innerHTML = data.data.admins;
    })
    .catch(err => console.log(err));
}

const getSessions = () => {
    let jwt = getCookie('jwt');
    let student = getCookie('student');
    if(!jwt || !student){
        window.location.replace("../../index.html");
    }
    fetch('../../api/academicsController/getAllSessions.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        data.data.forEach(dat => {
            document.querySelector('#resultSessions').innerHTML += 
            `<option value="${dat.id}">${dat.session}</option>`;
        }) 
    })
    .catch(err => console.log(err))
}

const getTerms = () => {
    let jwt = getCookie('jwt');
    let student = getCookie('student');
    if(!jwt || !student){
        window.location.replace("../../index.html");
    }
    fetch('../../api/academicsController/getAllTerms.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        data.data.forEach(dat => {
            document.querySelector('#resultTerm').innerHTML += 
            `<option value="${dat.id}">${dat.term}</option>`;
        }) 
    })
    .catch(err => console.log(err))
}

const result = () => {
    let jwt = getCookie('jwt');
    let student = getCookie('student');
    if(!jwt || !student){
        window.location.replace("../../index.html");
    }
    fetch('../../api/studentController/getResult.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            session : document.querySelector('#resultSessions').value,
            student : student,
            jwt : jwt
        })       
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#resultTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            if(document.querySelector('#resultTerm').value == 1){
                let total = Number(dat.firstCA) + Number(dat.firstEX);
                document.querySelector('#resultTable').innerHTML +=
                `<tr>
                    <td>${id}</td>
                    <td>${dat.subject}</td>
                    <td>${dat.firstCA}</td>
                    <td>${dat.firstEX}</td>
                    <td>${total}</td>
                    <td>${grade(total)}</td>
                </tr>`;
            }else if(document.querySelector('#resultTerm').value == 2){
                let total = Number(dat.secondCA) + Number(dat.secondEX);
                document.querySelector('#resultTable').innerHTML +=
                `<tr>
                    <td>${id}</td>
                    <td>${dat.subject}</td>
                    <td>${dat.secondCA}</td>
                    <td>${dat.secondEX}</td>
                    <td>${total}</td>
                    <td>${grade(total)}</td>
                </tr>`;
            }else if(document.querySelector('#resultTerm').value == 3){
                let total = Number(dat.thirdCA) + Number(dat.thirdEX);
                document.querySelector('#resultTable').innerHTML +=
                `<tr>
                    <td>${id}</td>
                    <td>${dat.subject}</td>
                    <td>${dat.thirdCA}</td>
                    <td>${dat.thirdEX}</td>
                    <td>${total}</td>
                    <td>${grade(total)}</td>
                </tr>`;
            }
        })
    })
    .catch(err => console.log(err))
}

const grade = num => {
    if(num < 0 || num > 100){
        return 'Invalid';
    }else if(num >= 70 && num <= 100){
        return 'A';
    }else if(num >= 65 && num <= 69){
        return 'B';
    }else if(num >= 60 && num <= 64){
        return 'C';
    }else if(num >= 55 && num <= 59){
        return 'D';
    }else if(num >= 50 && num <= 54){
        return 'E';
    }else if(num >= 0 && num <= 49){
        return 'F';
    }
}

const showProfile = () => {
    let jwt = getCookie('jwt');
    let student = getCookie('student');
    if(!jwt || !student){
        window.location.replace("../../index.html");
    }
    fetch('../../api/studentController/getAllStudents.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        data.data.forEach(dat => {
            if(dat.id == student){
                document.querySelector('#sfname').value = dat.firstname;
                document.querySelector('#slname').value = dat.lastname;
                document.querySelector('#smname').value = dat.middlename;
                document.querySelector('#sclass').value = dat.class;
                document.querySelector('#ssex').value = dat.sex;
                document.querySelector('#sdob').value = dat.dob;
                document.querySelector('#spob').value = dat.pob;
                document.querySelector('#spname').value = dat.parent;
                document.querySelector('#srel').value = dat.religion;
                document.querySelector('#snat').value = dat.nationality;
                document.querySelector('#sstate').value = dat.state;
                document.querySelector('#slga').value = dat.lga;
                document.querySelector('#spnum').value = dat.phone;
                document.querySelector('#saddress1').value = dat.address1;
                document.querySelector('#saddress2').value = dat.address2;
            }
        })
    })
    .catch(err => console.log(err));
}

const logout = () => {
    setCookie("jwt", '', 1);
    setCookie("student", '', 1);
    window.location.replace("../../index.html");
}

// function to set cookie
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// get or read cookie
function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c = c.substring(1);
        }
 
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
