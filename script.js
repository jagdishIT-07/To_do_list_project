const username = document.getElementById('username');
const userBtn = document.getElementById('userBtn');
const userRemoveBtn = document.getElementById('userRemoveBtn');
const records = document.getElementById('records');
const userBtntext = userBtn.innerText;
let userArray = [];
let edit_id = '';

const obj = localStorage.getItem('name');
if(obj != null)
{
    userArray = JSON.parse(obj);
}
DisplayData();
userBtn.onclick = ()=>{
    let name = username.value;
    if(edit_id != null)
    {
        //edit
        userArray.splice(edit_id,1,{'name' : name});
        userBtn.innerText = userBtntext;
        edit_id = null;
    }
    else{
        //insert
        userArray.push({'name' : name});
    }
    SaveData(userArray);
    username.value = '';
}

function SaveData(userArray){
    var str = JSON.stringify(userArray);
    localStorage.setItem('name',str);
    DisplayData();
}

function DisplayData(){
    let Statement = '';
    userArray.forEach((user,i) => {
        Statement += `<tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
        <td><i class='btn text-white fa fa-edit btn-info mx-3' onclick="EditData(${i})"></i>
            <i class="btn text-white fa fa-trash-o btn-danger" onclick="RemoveData(${i})"></i>
        </td>
    </tr>`
    });
    records.innerHTML = Statement;
}

function EditData(id){
    edit_id = id;
    username.value = userArray[id].name;
    userBtn.innerText = "Save Changes";
}

function RemoveData(id){
    var result = confirm("Are you sure want to delete "+userArray[id].name+" ?");
    if(result == true)
    {
        userArray.splice(id,1);
    }
    SaveData(userArray);
}