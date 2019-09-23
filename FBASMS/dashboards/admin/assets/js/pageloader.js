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

const numberAnalysis = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
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

const RegisterStudents = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('pages/regStudents.html')
    .then(res => res.text())
    .then(data => {
        document.querySelector('#myModal').style.display = 'none';
        container.innerHTML = data;
        fetch('../../api/academicsController/getAllClasses.php', {
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
                document.querySelector('#sclass').innerHTML += 
                `<option value="${dat.id}">${dat.classname}</option>`;
            })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

const regStudentsSubjects = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('pages/regStdSub.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
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
            document.querySelector('#myModal').style.display = 'none';
            data.data.forEach(dat => {
                document.querySelector('#regSession').innerHTML += 
                `<option value="${dat.id}">${dat.session}</option>`;
            })
        })
        .catch(err => console.log(err));

        fetch('../../api/academicsController/getAllClasses.php', {
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
                document.querySelector('#regClass').innerHTML += 
                `<option value="${dat.id}">${dat.classname}</option>`;
            })
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

const ManageAdmins = () => {
    fetch('pages/admin.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        adminData();
    })
    .catch(err => console.log(err))
}

const ManageAcademics = () => {
    fetch('pages/academics.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        sessionData();
        termData();
        classData();
        subjectData();
    })
    .catch(err => console.log(err))
}

const ManagePayments = () => {
    fetch('pages/payment.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        paymentData();
    })
    .catch(err => console.log(err))
}

const ManageStudents = () => {
    fetch('pages/students.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        studentsData();
    })
    .catch(err => console.log(err))
}

const ManageTeachers = () => {
    fetch('pages/teachers.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        teachersData();
    })
    .catch(err => console.log(err))
}

const TeacherSubject = () => {
    fetch('pages/teacherSubject.html')
    .then(res => res.text())
    .then(data => {
        container.innerHTML = data;
        teachSub();
        loadTeachers();
        loadSubjects();
        loadClasses();
    })
    .catch(err => console.log(err))
}

const teachSub = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/teacherController/getTeachersSubjects.php', {
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
        document.querySelector('#teachSubTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#teachSubTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.firstname}</td>
                <td>${dat.lastname}</td>
                <td>${dat.subject}</td>
                <td>${dat.class}</td>
                <td><button onclick="areYouSure(${dat.id})" class="btn btn-primary btn-sm">unasign</button></td>
            </tr>`;
        })
    })
    .catch(err => console.log(err))
}

const areYouSure = id => {
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#myModal').style.position = 'fixed';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <h2>Are you sure you want to unasign teacher?</h2>
    </div><br>
    <div>
<button type="button" onclick="unasign(${id})" class="btn btn-primary">Yes</button>
<button type="button" onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger" data-dismiss="modal">Close</button>
</div>`;
}

const unasign = id => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/teacherController/unasign.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : id,
            jwt : jwt
        })       
    })
    .then(res => res.json())
    .then(data => { 
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;

        setTimeout(() => {
            teachSub();
        }, 2000);
    })
    .catch(err => console.log(err))
}

const regTeachSub = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/teacherController/assignSubject.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            teacher : document.querySelector('#ateacher').value,
            subject : document.querySelector('#asubject').value,
            class : document.querySelector('#aclass').value,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
        document.querySelector('#ateacher').value = '';
        document.querySelector('#asubject').value = '';
        document.querySelector('#aclass').value = '';
        setTimeout(() => {
            teachSub();
        } ,2000);
    })
    .catch(err => console.log(err))
}

const loadTeachers = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
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
        document.querySelector('#myModal').style.display = 'none';
        data.data.forEach(dat => {
            document.querySelector('#ateacher').innerHTML += 
            `<option value="${dat.id}">${dat.firstname} ${dat.lastname}</option>`;
        }) 
    })
    .catch(err => console.log(err))
}

const loadSubjects = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/academicsController/getAllSubjects.php', {
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
            document.querySelector('#asubject').innerHTML += 
            `<option value="${dat.id}">${dat.subject}</option>`;
        }) 
    })
    .catch(err => console.log(err))
}

const loadClasses = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/academicsController/getAllClasses.php', {
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
            document.querySelector('#aclass').innerHTML += 
            `<option value="${dat.id}">${dat.classname}</option>`;
        }) 
    })
    .catch(err => console.log(err))
}

const addAdmin = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/adminController/admin_create.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            firstname : document.querySelector('#addFname').value,
            lastname : document.querySelector('#addLname').value,
            email : document.querySelector('#addEmail').value,
            password : document.querySelector('#addPassword').value,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
        adminData();
    })
    .catch(err => console.log(err))
}

const adminData = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/adminController/getAllAdmins.php', {
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
        document.querySelector('#adminTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#adminTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.firstname} ${dat.lastname}</td>
                <td>${dat.email}</td>
                <td>
                    <div class="form-button-action">
                        <button onclick="alert('${dat.lastname}')" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }) 
    })
    .catch(err => console.log(err))
}

const sessionData = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
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
        document.querySelector('#myModal').style.display = 'none';
        document.querySelector('#sessionTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#sessionTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.session}</td>
                <td>
                    <div class="form-button-action">
                        <button onclick="editSession(${dat.id},'${dat.session}')" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }) 
    })
    .catch(err => console.log(err))
}

const termData = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
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
        document.querySelector('#myModal').style.display = 'none';
        document.querySelector('#termTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#termTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.term}</td>
                <td>
                    <div class="form-button-action">
                        <button onclick="editTerm(${dat.id},'${dat.term}')" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }) 
    })
    .catch(err => console.log(err))
}

const classData = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/academicsController/getAllClasses.php', {
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
        document.querySelector('#classTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#classTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.classname}</td>
                <td>
                    <div class="form-button-action">
                        <button onclick="editClass(${dat.id},'${dat.classname}')" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }) 
    })
    .catch(err => console.log(err))
}

const subjectData = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/academicsController/getAllSubjects.php', {
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
        document.querySelector('#subjectTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#subjectTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.subject}</td>
                <td>
                    <div class="form-button-action">
                        <button onclick="editSubject(${dat.id},'${dat.subject}')" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }) 
    })
    .catch(err => console.log(err))
}

const paymentData = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/studentController/getAllPayments.php', {
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
        document.querySelector('#paymentTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#paymentTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.student}</td>
                <td>${dat.term}</td>
                <td>${dat.session}</td>
                <td>${dat.amount}</td>
                <td>${dat.created_at}</td>
                <td>
                    <div class="form-button-action">
                        <button onclick="editPayment(${dat.id},'${dat.student}','${dat.term}','${dat.session}','${dat.amount}')" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }) 
    })
    .catch(err => console.log(err))
}

const reg = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
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
        document.querySelector('#regTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            if(dat.classID == document.querySelector('#regClass').value){
                id++;
                document.querySelector('#regTable').innerHTML +=
                `<tr>
                    <td>${id}</td>
                    <td>${dat.firstname}</td>
                    <td>${dat.lastname}</td>
                    <td>${dat.middlename}</td>
                    <td>${dat.class}</td>
                    <td>${dat.sex}</td>
                    <td>
                        <div class="form-button-action">
                            <button onclick="showSubjects(${dat.id})" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                                <i class="fa fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
            }
        })
    })
    .catch(err => console.log(err))
}

const showSubjects = (std) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <h2 class="mr-3">Register Students Subjects</h2>
        <div class="btn btn-danger" onclick="document.querySelector('#myModal').style.display = 'none';">close</div>
    </div>
    <br>
    <div id="sub"></div>`;
    fetch('../../api/academicsController/getAllSubjects.php', {
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
        document.querySelector('#sub').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#sub').innerHTML +=
            `<div class="list">
                <h3>${id}</h3>
                <h4>${dat.subject}</h4>
                <div>
                    <div onclick="regSubject(${std},${dat.id},${document.querySelector('#regSession').value})" class="btn btn-primary btn-sm mr-3">Register</div>
                </div>
            </div>`;
            
        }) 
    })
    .catch(err => console.log(err))
}

const regSubject = (std,sub,session) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/studentController/registerSubjects.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            student : std,
            subject : sub,
            session : session,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => { 
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
    })
    .catch(err => console.log(err))
}

const viewStudSub = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('pages/viewStdSub.html')
    .then(res => res.text())
    .then(data => {
        document.querySelector('#myModal').style.display = 'none';
        container.innerHTML = data;
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
                document.querySelector('#showSession').innerHTML += 
                `<option value="${dat.id}">${dat.session}</option>`;
            })
        })
        .catch(err => console.log(err));

        fetch('../../api/academicsController/getAllClasses.php', {
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
                document.querySelector('#showClass').innerHTML += 
                `<option value="${dat.id}">${dat.classname}</option>`;
            })
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
}

const show = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
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
        document.querySelector('#showTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            if(dat.classID == document.querySelector('#showClass').value){
                id++;
                document.querySelector('#showTable').innerHTML +=
                `<tr>
                    <td>${id}</td>
                    <td>${dat.firstname}</td>
                    <td>${dat.lastname}</td>
                    <td>${dat.middlename}</td>
                    <td>${dat.class}</td>
                    <td>${dat.sex}</td>
                    <td>
                        <div class="form-button-action">
                            <button onclick="stdSub(${dat.id},${document.querySelector('#showSession').value})" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                                <i class="fa fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
            }
        })
    })
    .catch(err => console.log(err))
}

const stdSub = (std,session) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <h2 class="mr-3">Register Students Subjects</h2>
        <div class="btn btn-danger" onclick="document.querySelector('#myModal').style.display = 'none';">close</div>
    </div>
    <br>
    <div id="sub"></div>`;
    fetch('../../api/studentController/getAllStudSub.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : std,
            session : session,
            jwt : jwt
        })       
    })
    .then(res => res.json())
    .then(data => { 
        document.querySelector('#sub').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#sub').innerHTML +=
            `<div class="list">
                <h3>${id}</h3>
                <h4>${dat.subject}</h4>
                <div>
                    <div onclick="unregister(${std},${session},${dat.id})" class="btn btn-primary btn-sm">Unregister</div>
                </div>
            </div>`;
            
        })
    })
    .catch(err => console.log(err))
}

const unregister = (std,session,subject) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/studentController/unregisterSubject.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : std,
            subject : subject,
            session : session,
            jwt : jwt
        })       
    })
    .then(res => res.json())
    .then(data => { 
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
    })
    .catch(err => console.log(err))
}

const studentsData = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
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
        document.querySelector('#studentsTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#studentsTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.firstname}</td>
                <td>${dat.lastname}</td>
                <td>${dat.middlename}</td>
                <td>${dat.class}</td>
                <td>${dat.sex}</td>
                <td>${dat.dob}</td>
                <td>${dat.pob}</td>
                <td>${dat.nationality}</td>
                <td>${dat.state}</td>
                <td>${dat.lga}</td>
                <td>${dat.religion}</td>
                <td>${dat.parent}</td>
                <td>${dat.phone}</td>
                <td>${dat.address1}</td>
                <td>${dat.address2}</td>
                <td>
                    <div class="form-button-action">
                        <button onclick="editStudents(${dat.id},'${dat.firstname}','${dat.lastname}','${dat.middlename}','${dat.class}','${dat.sex}','${dat.dob}','${dat.pob}','${dat.nationality}','${dat.state}','${dat.lga}','${dat.religion}','${dat.parent}','${dat.phone}','${dat.address1}','${dat.address2}')" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }) 
    })
    .catch(err => console.log(err))
}

const teachersData = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
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
        document.querySelector('#teachersTable').innerHTML = '';
        let id = 0;
        data.data.forEach(dat => {
            id++;
            document.querySelector('#teachersTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.firstname}</td>
                <td>${dat.lastname}</td>
                <td>${dat.sex}</td>
                <td>${dat.dob}</td>
                <td>${dat.phone}</td>
                <td>${dat.address}</td>
                <td>${dat.email}</td>
                <td>
                    <div class="form-button-action">
                        <button onclick="editTeachers(${dat.id},'${dat.firstname}','${dat.lastname}','${dat.sex}','${dat.dob}','${dat.phone}','${dat.address}','${dat.email}')" type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        }) 
    })
    .catch(err => console.log(err))
}

const addAcad = () => {
    if(document.querySelector('#dataOpt').value == '1'){
        addSession(document.querySelector('#data').value);
        document.querySelector('#data').value = '';
    }else if(document.querySelector('#dataOpt').value == '2'){
        addTerm(document.querySelector('#data').value);
        document.querySelector('#data').value = '';
    }else if(document.querySelector('#dataOpt').value == '3'){
        addClass(document.querySelector('#data').value);
        document.querySelector('#data').value = '';
    }else if(document.querySelector('#dataOpt').value == '4'){
        addSubject(document.querySelector('#data').value);
        document.querySelector('#data').value = '';
    }
}

const addSession = (session) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/academicsController/addSession.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            session : session,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#myModal').style.position = 'fixed';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
        setTimeout(() => {
            sessionData();
        }, 2000);
    })
    .catch(err => console.log(err))
}

const addTerm = (term) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/academicsController/addTerms.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            term : term,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#myModal').style.position = 'fixed';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
        setTimeout(() => {
            termData();
        }, 2000);
    })
    .catch(err => console.log(err))
}

const addClass = (classs) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#myModal').style.position = 'fixed';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/academicsController/class_create.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            classname : classs,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#myModal').style.position = 'fixed';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
        setTimeout(() => {
            classData();
        }, 2000);
    })
    .catch(err => console.log(err))
}

const addSubject = (subject) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/academicsController/subject_create.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            subject : subject,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#myModal').style.position = 'fixed';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
        setTimeout(() => {
            subjectData();
        }, 2000);
    })
    .catch(err => console.log(err))
}

const addPayment = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/studentController/paymentUpload.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            fullname : document.querySelector('#pname').value,
            term : document.querySelector('#pterm').value,
            session : document.querySelector('#psession').value,
            amount : document.querySelector('#pamount').value,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
        paymentData();
    })
    .catch(err => console.log(err))
}

const addTeacher = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/teacherController/teacher_create.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            firstname : document.querySelector('#tfname').value,
            lastname : document.querySelector('#tlname').value,
            sex : document.querySelector('#tsex').value,
            dob : document.querySelector('#tdob').value,
            phone : document.querySelector('#tphone').value,
            email : document.querySelector('#temail').value,
            address : document.querySelector('#taddress').value,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
        document.querySelector('#tfname').value = '';
        document.querySelector('#tlname').value = '';
        document.querySelector('#tdob').value = '';
        document.querySelector('#tphone').value = '';
        document.querySelector('#temail').value = '';
        document.querySelector('#taddress').value = '';
        teachersData();
    })
    .catch(err => console.log(err))
}

const registerStudents = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <p>Loading... Please Wait!!!</p>
    </div>`;
    fetch('../../api/studentController/student_create.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            firstname : document.querySelector('#sfname').value,
            lastname : document.querySelector('#slname').value,
            middlename : document.querySelector('#smname').value,
            class : document.querySelector('#sclass').value,
            sex : document.querySelector('#ssex').value,
            dob : document.querySelector('#sdob').value,
            pob : document.querySelector('#spob').value,
            parent : document.querySelector('#spname').value,
            religion : document.querySelector('#srel').value,
            nationality : document.querySelector('#snat').value,
            state : document.querySelector('#sstate').value,
            lga : document.querySelector('#slga').value,
            phone : document.querySelector('#spnum').value,
            address1 : document.querySelector('#saddress1').value,
            address2 : document.querySelector('#saddress2').value,
            jwt : jwt
        })
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('#myModal').style.display = 'flex';
        document.querySelector('#inner').innerHTML = 
        `<div style="display: flex; flex-direction: column;">
            <h2>Message</h2>
            <br>
            <p>${data.message}</p>
            <br>
            <button onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger btn-sm">close</button>
        </div>`;
        document.querySelector('#sfname').value = '';
        document.querySelector('#slname').value = '';
        document.querySelector('#smname').value = '';
        document.querySelector('#sdob').value = '';
        document.querySelector('#spob').value = '';
        document.querySelector('#spname').value = '';
        document.querySelector('#snat').value = '';
        document.querySelector('#sstate').value = '';
        document.querySelector('#slga').value = '';
        document.querySelector('#spnum').value = '';
        document.querySelector('#saddress1').value = '';
        document.querySelector('#saddress2').value = '';
    })
    .catch(err => console.log(err))
}

const logout = () => {
    setCookie("jwt", '', 1);
    setCookie("admin", '', 1);
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



