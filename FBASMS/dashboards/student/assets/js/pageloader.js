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
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
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
        document.querySelector('#myModal').style.display = 'none';
        document.querySelector('#resultTable').innerHTML = '';
        document.querySelector('#average').innerHTML = '';
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
                document.querySelector('#average').innerHTML = Number(document.querySelector('#average').innerHTML) + Number(total);
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
                document.querySelector('#average').innerHTML = Number(document.querySelector('#average').innerHTML) + Number(total);
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
                document.querySelector('#average').innerHTML = Number(document.querySelector('#average').innerHTML) + Number(total);
            }
        })
        console.log(id);
        document.querySelector('#average').innerHTML = Number(document.querySelector('#average').innerHTML) / Number(id);
        document.querySelector('#average').innerHTML = `${document.querySelector('#average').innerHTML}%`
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
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
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
        document.querySelector('#myModal').style.display = 'none';
        data.data.forEach(dat => {
            if(dat.id == student){
                document.querySelector('#sfname').innerHTML = dat.firstname;
                document.querySelector('#slname').innerHTML = dat.lastname;
                document.querySelector('#smname').innerHTML = dat.middlename;
                document.querySelector('#sclass').innerHTML = dat.class;
                document.querySelector('#ssex').innerHTML = dat.sex;
                document.querySelector('#sdob').innerHTML = dat.dob;
                document.querySelector('#spob').innerHTML = dat.pob;
                document.querySelector('#spname').innerHTML = dat.parent;
                document.querySelector('#srel').innerHTML = dat.religion;
                document.querySelector('#snat').innerHTML = dat.nationality;
                document.querySelector('#sstate').innerHTML = dat.state;
                document.querySelector('#slga').innerHTML = dat.lga;
                document.querySelector('#spnum').innerHTML = dat.phone;
                document.querySelector('#saddress1').innerHTML = dat.address1;
                document.querySelector('#saddress2').innerHTML = dat.address2;
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
