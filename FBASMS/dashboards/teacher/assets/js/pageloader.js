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

const gradeStudents = () => {
    fetch('pages/grades.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        loadSessions('#gradeSessions');
        loadSubjects('#gradeSubjects');
    })
    .catch(err => console.log(err))
}

const viewStudents = () => {
    fetch('pages/myStudents.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        loadSessions('#showSessions');
        loadSubjects('#showSubjects');
    })
    .catch(err => console.log(err))
}

const TeacherSubject = () => {
    fetch('pages/teacherSubject.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        teachSub();
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
    let teacher = getCookie('teacher');
    if(!jwt || !teacher){
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

const showProfile = () => {
    let jwt = getCookie('jwt');
    let teacher = getCookie('teacher');
    if(!jwt || !teacher){
        window.location.replace("../../index.html");
    }
    fetch('../../api/teacherController/getAllTeachers.php', {
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
            if(dat.id == teacher){
                document.querySelector('#tfname').innerHTML = dat.firstname;
                document.querySelector('#tlname').innerHTML = dat.lastname;
                document.querySelector('#tsex').innerHTML = dat.sex;
                document.querySelector('#tdob').innerHTML = dat.dob;
                document.querySelector('#tphone').innerHTML = dat.phone;
                document.querySelector('#temail').innerHTML = dat.email;
                document.querySelector('#taddress').innerHTML = dat.address;
            }
        })
    })
    .catch(err => console.log(err));
}

const teachSub = () => {
    let jwt = getCookie('jwt');
    let teacher = getCookie('teacher');
    if(!jwt || !teacher){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/teacherController/singleTeachSub.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            teacher : teacher,
            jwt : jwt
        })       
    })
    .then(res => res.json())
    .then(data => { 
        document.querySelector('#myModal').style.display = 'none';
        document.querySelector('#teachSubTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            if(dat.id == teacher){
                id++;
                document.querySelector('#teachSubTable').innerHTML +=
                `<tr>
                    <td>${id}</td>
                    <td>${dat.firstname}</td>
                    <td>${dat.lastname}</td>
                    <td>${dat.subject}</td>
                    <td>${dat.class}</td>
                    </td>
                </tr>`;
            }
        })
    })
    .catch(err => console.log(err))
}

const loadSessions = (val) => {
    let jwt = getCookie('jwt');
    let teacher = getCookie('teacher');
    if(!jwt || !teacher){
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
            document.querySelector(`${val}`).innerHTML += 
            `<option value="${dat.id}">${dat.session}</option>`;
        }) 
    })
    .catch(err => console.log(err))
}

const loadSubjects = (val) => {
    let jwt = getCookie('jwt');
    let teacher = getCookie('teacher');
    if(!jwt || !teacher){
        window.location.replace("../../index.html");
    }
    fetch('../../api/teacherController/singleTeachSub.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            teacher : teacher,
            jwt : jwt
        })       
    })
    .then(res => res.json())
    .then(data => {
        data.data.forEach(dat => {
            if(dat.id == teacher){
                document.querySelector(`${val}`).innerHTML += 
                `<option value="${dat.subject}.${dat.class}">${dat.subject} / ${dat.class}</option>`;
            }
        }) 
    })
    .catch(err => console.log(err))
}

const show = () => {
    let jwt = getCookie('jwt');
    let teacher = getCookie('teacher');
    if(!jwt || !teacher){
        window.location.replace("../../index.html");
    }
    let str = document.querySelector('#showSubjects').value.split(".");
    let sub = str[0];
    let cl = str[1];
    fetch('../../api/studentController/getStudents.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            session : document.querySelector('#showSessions').value,
            subject : sub,
            class : cl,
            jwt : jwt
        })       
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#showTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#showTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.firstname}</td>
                <td>${dat.lastname}</td>
                <td>${dat.middlename}</td>
                <td>${dat.class}</td>
                <td>${dat.sex}</td>
            </tr>`;
        })
    })
    .catch(err => console.log(err))
}

const grade = () => {
    let jwt = getCookie('jwt');
    let teacher = getCookie('teacher');
    if(!jwt || !teacher){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    let str = document.querySelector('#gradeSubjects').value.split(".");
    let sub = str[0];
    let cl = str[1];
    fetch('../../api/studentController/getGrades.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            session : document.querySelector('#gradeSessions').value,
            subject : sub,
            class : cl,
            jwt : jwt
        })       
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'none';
        document.querySelector('#gradeTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#gradeTable').innerHTML +=
            `<tr id='tr${id}'>
                <td>${id}</td>
                <td id='id${id}' style="display:none;">${dat.id}</td>
                <td id='student${id}'>${dat.student.toUpperCase()}</td>
                <td id='class${id}'>${dat.class}</td>
                <td><input style='width: 50px; padding: 5px 10px; border-radius: 5px; border: none;' value='${dat.firstCA}' id='firstCA${id}'></td>
                <td><input style='width: 50px; padding: 5px 10px; border-radius: 5px; border: none;' value='${dat.firstEX}' id='firstEX${id}'></td>
                <td><input style='width: 50px; padding: 5px 10px; border-radius: 5px; border: none;' value='${dat.secondCA}' id='secondCA${id}'></td>
                <td><input style='width: 50px; padding: 5px 10px; border-radius: 5px; border: none;' value='${dat.secondEX}' id='secondEX${id}'></td>
                <td><input style='width: 50px; padding: 5px 10px; border-radius: 5px; border: none;' value='${dat.thirdCA}' id='thirdCA${id}'></td>
                <td><input style='width: 50px; padding: 5px 10px; border-radius: 5px; border: none;' value='${dat.thirdEX}' id='thirdEX${id}'></td>
            </tr>`;
        })
    })
    .catch(err => console.log(err))
}

const uploadScores = () => {
    let jwt = getCookie('jwt');
    let teacher = getCookie('teacher');
    if(!jwt || !teacher){
        window.location.replace("../../index.html");
    }
    document.querySelector('#inner').innerHTML = `All Scores Uploaded Except : `;
    let tr = document.getElementsByTagName(`tr`).length - 1;
    for(let i = 0; i < tr; i++){
        fetch('../../api/studentController/addGrades.php', {
            method: 'POST',
            headers: {
                'Accept':'application/json, text/plain/ */*',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                id : document.querySelector(`#id${i+1}`).innerHTML,
                sess : document.querySelector('#gradeSessions').value,
                firstCA : document.querySelector(`#firstCA${i+1}`).value,
                firstEX : document.querySelector(`#firstEX${i+1}`).value,
                secondCA : document.querySelector(`#secondCA${i+1}`).value,
                secondEX : document.querySelector(`#secondEX${i+1}`).value,
                thirdCA : document.querySelector(`#thirdCA${i+1}`).value,
                thirdEX : document.querySelector(`#thirdEX${i+1}`).value,
                jwt : jwt
            })       
        })
        .then(res => res.json())
        .then(data => {
            let id = 0;
            if(data.status == '0'){
                id++;
                document.querySelector('#inner').innerHTML += `
                <div>${id}. ${document.querySelector(`#student${id}`).innerHTML}</div>`;
            }
        })
        .catch(err => console.log(err));
    }
    document.querySelector('#myModal').style.display = 'flex';
    setTimeout(() => {
        grade();
    },2000);
}



const logout = () => {
    setCookie("jwt", '', 1);
    setCookie("teacher", '', 1);
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
