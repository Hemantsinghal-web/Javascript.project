// function buttonn()
// {
//     let btn = document.querySelector('.button')
//     btn.style.display="block"
//     // alert("Fas")
// }
var n = 0

function addnum()
{
    // let number = document.querySelector('#number')
    let qty = document.querySelector('#number')
    let amount = document.querySelector('#amount').value
     number.innerHTML =n++;
    amount.innerHTML = qty*amount;
    // alert("sfsf")
}


function sub()
{
    if(n>0){
        let number = document.querySelector('#number')
        number.innerHTML =n--;
    }
    
    // alert("sfsf")
}


const datasubmit = () => {
    let userdata = {
        name : document.querySelector("#uname").value,
        
        psw : document.querySelector("#upsw").value,
        email : document.querySelector("#email").value
    }

    localStorage.setItem("userdata",JSON.stringify(userdata))
}



function check()
{
  
    let logindata = {
     name : document.querySelector("#uname").value,
     psw : document.querySelector("#upsw").value
    }


    
   let data = JSON.parse(localStorage.getItem('userdata'))
   
   if(data.name != logindata.name || data.psw != logindata.psw)
   {
    alert("user not found")
    return false
   }
  
}



function form()
{
    let fname = document.querySelector('#fname').value
    let lname = document.querySelector('#lname').value
    let contact = document.querySelector('#contact').value
    let email = document.querySelector('#email').value


    if(fname == '')
    {
        alert("Plese enter Name")
        document.querySelector('#fname').focus()
        return false
    }
    else if(lname == '')
    {
        alert("Please Enter name")
        document.querySelector('#lname').focus()
        return false
    }

    
    else if(contact == '')
    {
    alert("Plese enter contact")
    document.querySelector('#contact').focus()
    return false
    }



        else if(contact.length>10 || contact.length<10)
        {
        alert("Enter a valid number")
        document.querySelector('#contact').focus()
        return false
        }
        
        else if(email == '')
            {
                alert("Plese enter Email")
                document.querySelector('#email').focus()
                return false
            }
    
            else if(!(email.includes('@')))
            {
                alert("Enter a valid email")
                document.querySelector('#email').focus()
                return false
            }
}


async function table_data()
{

    // let fname = document.querySelector('#fname').value
    // let lname = document.querySelector('#lname').value
    // let contact = document.querySelector('#contact').value
    // let email = document.querySelector('#email').value
    // let address = document.querySelector('#address').value
    
    
  
    
        let data = await fetch("http://localhost:3000/Perfume")
        let fdata = await data.json()
        let tdata = fdata.map((e)=>`
        <tr style="border-bottom:2px solid black">
        <td> ${e.id} </td>
        <td> ${e.name} </td>
        <td> ${e.contact} </td>
        <td> ${e.email} </td>
        <td> ${e.address} </td>
        <td> <button onclick = "mydelete('${e.id}')"> Drop Order</button> </td>
         <td> <button onclick = "myedit('${e.id}')"> Edit Your Order </button> </td>
        </tr>
        `).join("")
        document.querySelector('#tbody').innerHTML = tdata
    
    
    
   
    

    
}

table_data()



function savedata()
{
    let formdata = {
        name : document.querySelector('#fname').value,
        contact : document.querySelector('#contact').value,
        email : document.querySelector('#email').value,
        address : document.querySelector('#address').value
    }


    fetch('http://localhost:3000/Perfume',{
        method : "POST",
        header : {'contact-type' : 'application/json'},
        body : JSON.stringify(formdata)
    })
    .then(r=>alert("Order Placed Successfully \n Check Your Order In MY ORDER Section "))
}



function mydelete(id)
{
   

        fetch(`http://localhost:3000/Perfume/${id}`,{method : "DELETE"}).then(res=>alert("deleted!!!!!"))
    
}



async function myedit(id) {

    let data = await fetch(`http://localhost:3000/Perfume/${id}`)
    let resdata = await data.json()
    let form = `
    <br><br><br><br>
    <h1>Update Your Order</h1>
    <input type="text" value="${resdata.id}" id="id1" readonly> <br><br>
    <input type="text" value="${resdata.name}" id="name1" > <br><br>
    <input type="text" value="${resdata.contact}" id="contact1" > <br><br>
    <input type="text" value="${resdata.email}" id="email1" > <br><br>
    
    <input type="text" value="${resdata.address}" id="address1" > <br><br>
    <input type="submit" value="Update"  onclick = "finaldata('${resdata.id}')">`

    document.querySelector('#editform').innerHTML = form
    
}

function finaldata(id)
{
    let formdata = {
        id : document.querySelector('#id1').value,
        name : document.querySelector('#name1').value,
        contact : document.querySelector('#contact1').value,
        email : document.querySelector('#email1').value,
        address : document.querySelector('#address1').value
    }

    fetch(`http://localhost:3000/Perfume/${id}`,{
        method : "PUT",
        header : {'content-type' : 'application/json'},
        body : JSON.stringify(formdata)
    } )
    .then(r=>alert("update successfully"))
}