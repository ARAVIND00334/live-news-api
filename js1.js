class user{

    construtor (name, email, number, aadharnumber) {
        this.name = name;
        this.email = email;
        this.number = number;
        this.aadharnumber = aadharnumber;
        this.type = type;
      }

}

class Display{
    add(guvi){
        tablebody = document.getElementById("tablebody");
        let uilist =`<tr>;
        <td>${guvi.name}</td>
        <td>${guvi.email}</td>
        <td>${guvi.number}</td>
        <td>${guvi.aadharnumber}</td>
        </tr>`
      
        tablebody.innerhtml += uilist;
      }
      clear(data) {
        let googleform = document.getElementById("formregistration");
        googleform.reset();
      };

      validate(){
        if (
            user.name.length < 2 ||
            user.email.length < 5 ||
            user.number.length < 10 ||
            user.aadharnumber.length < 12
          )
            return false;
          else {
            return true;
          }
      }
      show(type,displaymessage){
        let message = document.getElementById("showmessage");
        message.innerhtml =`<div class="alert alert-${type}" role="alert">
        ${displaymessage}
       "</div>` 
        
       
        setTimeout(function(){
          message.innerHTML=''
        },3000)
      }
    }

    // main function //

function googleformsumbit(e) {
    console.log("form is created");
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let number = document.getElementById("number").value;
    let aadharnumber = document.getElementById("aadharnumber").value;
    let male = document.getElementById("male");
    let female = document.getElementById("female");
  
    console.log(name, email, number, aadharnumber, male, female);
    let(gender)=male.checked?male.value:female.checked?female.value:"";
    
  
    // event listerner for user form//
  
    let googleform = document.getElementById("formregistration");
    googleform.addEventListener("submit", googleformsubmit);
  
    // event listerner for user form//
  
    e.preventdefault();
  
    let data = new data(name, email, number, aadharnumber, type);
    console.log(data);
    let display = new Display();
  
    if (display.validate(data)) {
      display.add(data);
      display.clear();
     
      display.show("success", "your is registration is success");
    } else {
      display.show("error", "your is registration is failed");
      display.clear();
    }
  }
  
  // search selector //

  let searchform=document.querySelector('form[role=search]')
  searchform.addEventListener('submit',function(e){
    e.preventdefault();
    let searchinput=searchform.querySelector('input,[type=search]').value.lowercase();
    let tablerows=document.querySelectorAll('tablebody,tr')
    tablebody.foreach(row=>{
        let rowtext=row.innertext.lowercase();
        if(rowtext.includes('searchinput')){
        row.style.display='';
        }
        else{
            row.style.display='none'
        }
    })


  })
  




