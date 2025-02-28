//alert("hello")
const userNameTextField = document.getElementById('username')
const addUserBtn = document.getElementById('addUser')
const recordsDisplay = document.getElementById('records')

let userData = []
let edit_id = null
const btnText = addUserBtn.innerText

//data get fron localstorage
let objstr = localStorage.getItem('user')
//console.log(objstr)
if (objstr != null) {
    userData = JSON.parse(objstr)
    // console.log(userData)
}

displayData()


addUserBtn.onclick = () => {
    const name = userNameTextField.value
    //alert(name)
    if (edit_id != null) {
        userData.splice(edit_id, 1, { 'name': name })
        edit_id = null
    }
    else {
        userData.push({ 'name': name })// key --value
        //console.log(userData)
    }
    saveData(userData)
    userNameTextField.value = ''
    addUserBtn.innerText = btnText
}


function saveData(userData) {
    //console.log(userData)
    let str = JSON.stringify(userData) //object to string
    //console.log(str)
    localStorage.setItem('user', str)
    displayData()
}

function displayData() {

    let data = '';
    userData.forEach((a, i) => {
        //console.log(i)
        data += `<tr>
        <th>${i + 1}</th>
        <td>${a.name}</td>
        <td>  
            <i class = "btn text-white fa fa-edit btn-info mx-2"
            onclick ='EditInfo(${i})'></i>
            <i class = "btn btn-danger text-white fa fa-trash"
            onclick = 'DeleteInfo(${i})'></i>
        </td>
    </tr>`;  

        console.log(data)
    })

    recordsDisplay.innerHTML = data;
}

function DeleteInfo(id) {
    alert(id)
    userData.splice(id, 1);
    saveData(userData);

}

function EditInfo(id) {
    //alert(id)
    edit_id = id
    userNameTextField.value = userData[id].name;
    addUserBtn.innerText = 'Update User';
    
}