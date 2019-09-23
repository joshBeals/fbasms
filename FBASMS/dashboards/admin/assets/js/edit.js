const editTeachers = (id,firstname,lastname,sex,dob,phone,address,email) => {
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#myModal').style.position = 'absolute';
    document.querySelector('#inner').innerHTML = 
    `<div style="display: flex;">
        <h2>Edit Teachers Data</h2>
    </div>
    <br>
    <div id="sub"><div>
    <form>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group form-group-default">
                    <label>Firstname</label>
                    <input id="Efname" value='${firstname}' type="text" class="form-control" placeholder="Enter Firstname">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group form-group-default">
                    <label>Lastname</label>
                    <input id="Elname" value='${lastname}' type="text" class="form-control" placeholder="Enter Lastname">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group form-group-default">
                    <label>Sex</label>
                    <input id="Esex" value='${sex}' type="text" class="form-control">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group form-group-default">
                    <label>Date</label>
                    <input id="Edob" value='${dob}' type="date" class="form-control">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group form-group-default">
                    <label>Phone Number</label>
                    <input id="Ephone" value='${phone}' type="number" class="form-control" placeholder="Enter Phone Number">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group form-group-default">
                    <label>Email</label>
                    <input id="Eemail" value='${email}' type="email" class="form-control" placeholder="Enter Email">
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group form-group-default">
                    <label>Address</label>
                    <input id="Eaddress" value='${address}' type="text" class="form-control" placeholder="Enter Address">
                </div>
            </div>
        </div>
    </form>
</div>
<div>
    <button type="button" onclick="editTeach(${id})" class="btn btn-primary">Edit</button>
    <button type="button" class="btn btn-danger" onclick="document.querySelector('#myModal').style.display = 'none';">Close</button>
</div></div>`;
}

const loadClass = () => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
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
        document.querySelector('#ESclass').innerHTML = '';
        data.data.forEach(dat => {
            document.querySelector('#ESclass').innerHTML += 
            `<option value="${dat.id}">${dat.classname}</option>`;
        }) 
    })
    .catch(err => console.log(err))
}

const editTeach = (id) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/teacherController/editTeacher.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : id,
            firstname : document.querySelector('#Efname').value,
            lastname : document.querySelector('#Elname').value,
            sex : document.querySelector('#Esex').value,
            dob : document.querySelector('#Edob').value,
            phone : document.querySelector('#Ephone').value,
            email : document.querySelector('#Eemail').value,
            address : document.querySelector('#Eaddress').value,
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
        teachersData();
    })
    .catch(err => console.log(err))
}

const editStudents = (id,firstname,lastname,middlename,cl,sex,dob,pob,nationality,state,lga,religion,parent,phone,address1,address2) => {
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#myModal').style.position = 'absolute';
    document.querySelector('#inner').innerHTML = 
    `<div class="card">
    <div class="card-header">
        <div class="card-title">Edit Students Information</div>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="sfname">Firstname</label>
                        <input type="text" class="form-control" value="${firstname}" id="ESfname" placeholder="Enter Firstname">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="slname">Lastname</label>
                        <input type="text" class="form-control" value="${lastname}" id="ESlname" placeholder="Enter Lastname">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="smname">Middlename</label>
                        <input type="text" class="form-control" value="${middlename}" id="ESmname" placeholder="Enter Middlename">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="srel">Religion</label>
                        <input type="text" class="form-control" value="${religion}" id="ESrel" placeholder="Enter Religion">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-4">
                        <label for="ssex">Sex</label>
                        <input type="text" class="form-control" value="${sex}" id="ESsex" placeholder="Enter Sex">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="sdob">Date of birth</label>
                        <input type="date" value="${dob}" class="form-control" id="ESdob">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="sclass">Class</label>
                        <select class="form-control" id="ESclass"></select>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="spob">Place of birth</label>
                        <input type="text" class="form-control" value="${pob}" id="ESpob" placeholder="Enter Place of birth">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="slga">L.G.A</label>
                        <input type="text" class="form-control" value="${lga}" id="ESlga" placeholder="Enter L.G.A">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="snat">Nationality</label>
                        <input type="text" class="form-control" value="${nationality}" id="ESnat" placeholder="Enter Nationality">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="sstate">State</label>
                        <input type="text" class="form-control" value="${state}" id="ESstate" placeholder="Enter State">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="spname">Parent/Guardian Name</label>
                        <input type="text" class="form-control" value="${parent}" id="ESpname" placeholder="Enter Parent Name">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="spnum">Parent/Guardian Phone Number</label>
                        <input type="number" class="form-control" value="${phone}" id="ESpnum" placeholder="Enter Parent Phone Number">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="saddress1">Home Address</label>
                        <input type="text" class="form-control" value="${address1}" id="ESaddress1" placeholder="Enter Address">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="saddress2">Address2</label>
                        <input type="text" class="form-control" value="${address2}" id="ESaddress2" placeholder="Enter Address2">
                    </div>
                </div>
                <div class="card-action">
                    <button class="btn btn-primary" onclick="editStd(${id})">Edit</button>
                    <button class="btn btn-danger" onclick="document.querySelector('#myModal').style.display = 'none';">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>`;
loadClass();
}

const editStd = (std) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/studentController/editStudent.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : std,
            firstname : document.querySelector('#ESfname').value,
            lastname : document.querySelector('#ESlname').value,
            middlename : document.querySelector('#ESmname').value,
            class : document.querySelector('#ESclass').value,
            sex : document.querySelector('#ESsex').value,
            dob : document.querySelector('#ESdob').value,
            pob : document.querySelector('#ESpob').value,
            parent : document.querySelector('#ESpname').value,
            religion : document.querySelector('#ESrel').value,
            nationality : document.querySelector('#ESnat').value,
            state : document.querySelector('#ESstate').value,
            lga : document.querySelector('#ESlga').value,
            phone : document.querySelector('#ESpnum').value,
            address1 : document.querySelector('#ESaddress1').value,
            address2 : document.querySelector('#ESaddress2').value,
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
            studentsData();
        },2000);
    })
    .catch(err => console.log(err))
}

const editPayment = (id,std,term,sess,amount) => {
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#myModal').style.position = 'absolute';
    document.querySelector('#inner').innerHTML = 
    `<div><h1>Edit Payment Record</h1></div><br><form>
    <div class="row">
        <div class="col-md-6">
            <div class="form-group form-group-default">
                <label>Fullname</label>
                <input id="EPname" value="${std}" type="text" class="form-control" placeholder="Enter Fullname">
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group form-group-default">
                <label>Term</label>
                <input id="EPterm" value="${term}" type="text" class="form-control" placeholder="Enter Term">
            </div>
        </div>
        <div class="col-md-6 pr-0">
            <div class="form-group form-group-default">
                <label>classname</label>
                <input id="EPsession" value="${sess}" type="text" class="form-control" placeholder="Enter Session">
            </div>
        </div>
        <div class="col-md-6 pr-0">
            <div class="form-group form-group-default">
                <label>Amount</label>
                <input id="EPamount" value="${amount}" type="text" class="form-control" placeholder="Enter Amount">
            </div>
        </div>
    </div>
</form><br><div>
<button type="button" onclick="editPay(${id})" class="btn btn-primary">Edit</button>
<button type="button" onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger" data-dismiss="modal">Close</button>
</div>`;
}

const editPay = (id) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/studentController/editPayment.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : id,
            fullname : document.querySelector('#EPname').value,
            term : document.querySelector('#EPterm').value,
            session : document.querySelector('#EPsession').value,
            amount : document.querySelector('#EPamount').value,
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
        // setTimeout(() => {
        //     document.querySelector('#myModal').style.display = 'none';
        // },1000);
    })
    .catch(err => console.log(err))
}

const editSession = (id,session) => {
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#myModal').style.position = 'fixed';
    document.querySelector('#inner').innerHTML = 
    `<div><h1>Edit Session Data</h1></div><br><form>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group form-group-default">
                <label>Session</label>
                <input id="session" value="${session}" type="text" class="form-control" placeholder="Enter Data">
            </div>
        </div>
    </div>
</form><br><div>
<button type="button" onclick="editSess(${id})" class="btn btn-primary">Edit</button>
<button type="button" onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger" data-dismiss="modal">Close</button>
</div>`;
}

const editTerm = (id,term) => {
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#inner').innerHTML = 
    `<div><h1>Edit Term Data</h1></div><br><form>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group form-group-default">
                <label>Term</label>
                <input id="term" value="${term}" type="text" class="form-control" placeholder="Enter Data">
            </div>
        </div>
    </div>
</form><br><div>
<button type="button" onclick="editTm(${id})" class="btn btn-primary">Edit</button>
<button type="button" onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger" data-dismiss="modal">Close</button>
</div>`;
}

const editClass = (id,classname) => {
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#myModal').style.position = 'fixed';
    document.querySelector('#inner').innerHTML = 
    `<div><h1>Edit Class Data</h1></div><br><form>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group form-group-default">
                <label>Class</label>
                <input id="classname" value="${classname}" type="text" class="form-control" placeholder="Enter Data">
            </div>
        </div>
    </div>
</form><br><div>
<button type="button" onclick="editCl(${id})" class="btn btn-primary">Edit</button>
<button type="button" onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger" data-dismiss="modal">Close</button>
</div>`;
}

const editSubject = (id,subject) => {
    document.querySelector('#myModal').style.display = 'flex';
    document.querySelector('#myModal').style.position = 'fixed';
    document.querySelector('#inner').innerHTML = 
    `<div><h1>Edit Subject Data</h1></div><br><form>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group form-group-default">
                <label>Subject</label>
                <input id="subject" value="${subject}" type="text" class="form-control" placeholder="Enter Data">
            </div>
        </div>
    </div>
</form><br><div>
<button type="button" onclick="editSub(${id})" class="btn btn-primary">Edit</button>
<button type="button" onclick="document.querySelector('#myModal').style.display = 'none';" class="btn btn-danger" data-dismiss="modal">Close</button>
</div>`;
}

const editSess = (id) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/academicsController/editSession.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : id,
            session : document.querySelector('#session').value,
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
        sessionData();
    })
    .catch(err => console.log(err))
}

const editTm = (id) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/academicsController/editTerm.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : id,
            term : document.querySelector('#term').value,
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
        termData();
    })
    .catch(err => console.log(err))
}

const editCl = (id) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/academicsController/editClass.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : id,
            classname : document.querySelector('#classname').value,
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
        classData();
    })
    .catch(err => console.log(err))
}

const editSub = (id) => {
    let jwt = getCookie('jwt');
    let admin = getCookie('admin');
    if(!jwt || !admin){
        window.location.replace("../../index.html");
    }
    fetch('../../api/academicsController/editSubject.php', {
        method: 'POST',
        headers: {
            'Accept':'application/json, text/plain/ */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id : id,
            subject : document.querySelector('#subject').value,
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
        subjectData();
    })
    .catch(err => console.log(err))
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