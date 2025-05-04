// User class to store user data
function User(name, email, number, aadharnumber, type) {
  this.name = name;
  this.email = email;
  this.number = number;
  this.aadharnumber = aadharnumber;
  this.type = type;
}

// Display class to handle UI operations
function Display() {}

Display.prototype.validate = function (user) {
  if (
    user.name.length < 2 ||
    user.email.length < 5 ||
    user.number.length < 10 ||
    user.aadharnumber.length < 12 ||
    !user.type
  ) {
    return false;
  }
  return true;
};

Display.prototype.clear = function () {
  let userform = document.getElementById("formregistration");
  userform.reset();
};

Display.prototype.add = function (user) {
  let tablebody = document.getElementById("tablebody");
  let row = document.createElement("tr");
  row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.number}</td>
        <td>${user.aadharnumber}</td>
        <td>${user.type}</td>
    `;
  tablebody.appendChild(row);
};

Display.prototype.show = function (type, displaymessage) {
  let message = document.getElementById("showmessage");
  message.innerHTML = `<div class="alert alert-${type}" role="alert">${displaymessage}</div>`;
  setTimeout(function () {
    message.innerHTML = "";
  }, 3000);
};

// Handle form submission
function userformsumbit(e) {
  e.preventDefault();




  // to get an value //
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let number = document.getElementById("number").value.trim();
  let aadharnumber = document.getElementById("aadharnumber").value.trim();

  // to get an male and female value //
  let male = document.getElementById("male");
  let female = document.getElementById("female");
  let gender = male.checked ? male.value : female.checked ? female.value : "";

  let data = new User(name, email, number, aadharnumber, gender);
  let display = new Display();

  if (display.validate(data)) {
    display.add(data);
    display.show("success", "Registration successful!");
  } else {
    display.show("danger", "Please fill all fields correctly");
  }
  display.clear();
}

// Add form submit event listener
let userform = document.getElementById("formregistration");
userform.addEventListener("submit", userformsumbit);
