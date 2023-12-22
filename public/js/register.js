const name=document.getElementById("name");
const email=document.getElementById("email");
const spass=document.getElementById("set_password");
const cpass=document.getElementById("confirm_password");
const s1=document.getElementById("successicon1");
const s2=document.getElementById("successicon2");
const s3=document.getElementById("successicon3");
const s4=document.getElementById("successicon4");
const e1=document.getElementById("erroricon1");
const e2=document.getElementById("erroricon2");
const e3=document.getElementById("erroricon3");
const e4=document.getElementById("erroricon4");

function nameerror(){
  const name1=name.value;
  if(name1==""){
    error1.style.color="red";
    error1.style.visibility="visible";
    error1.innerHTML="This Field should'nt be empty";
    name.style.border="2px solid red";
    e1.style.visibility="visible";
  }
  else if(name1.length>=15){
    name.style.border="red";
    error1.style.color="red";
    error1.style.visibility="visible";
    error1.innerHTML="Username should not exceed more than 15 characters"; 
    e1.style.visibility="visible";            
  }
  else{
    error1.style.color="green";
    error1.style.visibility="visible";
    error1.innerHTML="";
    name.style.border="2px solid green";
    s1.style.visibility="visible";
    e1.style.visibility="hidden";
  }
}


function emailerror(){
    const email1=email.value;
    const regExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(email1==''){
      error2.style.color="red";
      error2.innerHTML="This Field should'nt be empty";
      error2.style.visibility="visible";
      email.style.border="2px solid red";
      e2.style.visibility="visible";
    }
    else if(!(regExp.test(email1))){
      error2.style.color="red";
      email.style.border="2px solid red";
      error2.style.visibility="visible";
      error2.innerHTML="Invalid! Please provide proper Email";
      e2.style.visibility="visible";
  }
  else{
    error2.style.color="green";
    error2.style.visibility="visible";
    error2.innerHTML="";
    email.style.border="2px solid green";
    s2.style.visibility="visible";
    e2.style.visibility="hidden";
  }
}

function spasserror(){
  const spass1=spass.value;
  const strpass=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})$/;
  const medpass=/^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})$/;
  if(spass1==""){
    error3.style.color="red";
    spass.style.border="2px solid red";
    error3.innerHTML="This Field shouldn't be empty";
    e3.style.visibility="visible";
  }
  else if(!(strpass.test(spass1))){

  }
  else if(!(medpass.test(spass1))){

  }
}
