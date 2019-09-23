function searchStudents() {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
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
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data.data;
        // console.log(dat);
        // Loop through all the visitors, and show the ones that match
        const val = dat.filter(std => ((std.firstname.toUpperCase().indexOf(filter) > -1) || (std.lastname.toUpperCase().indexOf(filter) > -1) || (std.middlename.toUpperCase().indexOf(filter) > -1) || (std.sex.toUpperCase().indexOf(filter) > -1) || (std.class.toUpperCase().indexOf(filter) > -1) || (std.dob.toUpperCase().indexOf(filter) > -1) || (std.pob.toUpperCase().indexOf(filter) > -1) || (std.nationality.toUpperCase().indexOf(filter) > -1) || (std.state.toUpperCase().indexOf(filter) > -1) || (std.lga.toUpperCase().indexOf(filter) > -1) || (std.religion.toUpperCase().indexOf(filter) > -1) || (std.parent.toUpperCase().indexOf(filter) > -1) || (std.phone.toUpperCase().indexOf(filter) > -1) || (std.address1.toUpperCase().indexOf(filter) > -1) || (std.address2.toUpperCase().indexOf(filter) > -1)));

        document.querySelector('#studentsTable').innerHTML = '';
        let id = 0;
        val.forEach(dat => {
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

function searchTeachers() {
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
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data.data;
        // console.log(dat);
        // Loop through all the visitors, and show the ones that match
        const val = dat.filter(std => ((std.firstname.toUpperCase().indexOf(filter) > -1) || (std.lastname.toUpperCase().indexOf(filter) > -1) || (std.email.toUpperCase().indexOf(filter) > -1) || (std.sex.toUpperCase().indexOf(filter) > -1) || (std.phone.toUpperCase().indexOf(filter) > -1) || (std.dob.toUpperCase().indexOf(filter) > -1) || (std.address.toUpperCase().indexOf(filter) > -1)));

        document.querySelector('#teachersTable').innerHTML = '';
        let id = 0;
        val.forEach(dat => {
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

function assignSearch() {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
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
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data.data;
        // console.log(dat);
        // Loop through all the visitors, and show the ones that match
        const val = dat.filter(std => ((std.firstname.toUpperCase().indexOf(filter) > -1) || (std.lastname.toUpperCase().indexOf(filter) > -1) || (std.subject.toUpperCase().indexOf(filter) > -1) || (std.class.toUpperCase().indexOf(filter) > -1)));

        document.querySelector('#teachSubTable').innerHTML = '';
        let id = 0;
        val.forEach(dat => {
            id++;
            document.querySelector('#teachSubTable').innerHTML +=
            `<tr>
                <td>${id}</td>
                <td>${dat.firstname}</td>
                <td>${dat.lastname}</td>
                <td>${dat.subject}</td>
                <td>${dat.class}</td>
            </tr>`;
        })
    })
    .catch(err => console.log(err))
}

function searchPayments() {
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
        // Declare variables
        let input = document.getElementById('search');
        let filter = input.value.toUpperCase();
        const dat = data.data;
        // console.log(dat);
        // Loop through all the visitors, and show the ones that match
        const val = dat.filter(std => ((std.student.toUpperCase().indexOf(filter) > -1) || (std.term.toUpperCase().indexOf(filter) > -1) || (std.session.toUpperCase().indexOf(filter) > -1) || (std.amount.toUpperCase().indexOf(filter) > -1) || (std.created_at.toUpperCase().indexOf(filter) > -1)));

        document.querySelector('#paymentTable').innerHTML = '';
        let id = 0;
        val.forEach(dat => {
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