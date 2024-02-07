function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ---------------
// DOM Elements
// ---------------
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close"); // (rno) Store close buttons
const submitBtn = document.querySelector(".btn-submit"); // (rno) Store submit button
const firstName = document.querySelector("#first"); // (rno) Store form first name input element
const lastName = document.querySelector("#last"); // (rno) Store form ...
const email = document.querySelector("#email"); // (rno) Store form ...
const date = document.querySelector("#birthdate"); // (rno) Store form ...
const quantity = document.querySelector("#quantity"); // (rno) Store form ...

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal)); // (rno) Add Listener to close buttons
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form (rno)
function closeModal() {
  modalbg.style.display = "none";
}

// ---------------
// REGEXs
// ---------------

// Check names format
function isNameValid(name) {
  const regex = new RegExp("^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$");
  return name.length >= 2 && regex.test(name);
}
// Check email format
function isEmailValid(email) {
  const emailRegEx = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");
  return emailRegEx.test(email);
}
// Check date format
function isDateValid(date) {
  console.log(date);
  const dateRegEx = new RegExp("(?:\d{4})-(?:\d{2})-(?:\d{2})");
  return dateRegEx.test(date);
}

// ---------------
// FORM VALIDATION FONCTIONS
// ---------------

function validateFirstNameField() {
  const isFirstNameValid = isNameValid(firstName.value);
  const firstNameFormData = firstName.parentNode;
  if (!isFirstNameValid) {
    firstNameFormData.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du Prénom."
    );
    firstNameFormData.setAttribute("data-error-visible", "true");
  } else {
    firstNameFormData.removeAttribute("data-error");
    firstNameFormData.removeAttribute("data-error-visible");
  }
}

function validateLastNameField() {
  const isLastNameValid = isNameValid(lastName.value);
  const lastNameFormData = lastName.parentNode;
  if (!isLastNameValid) {
    lastNameFormData.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom."
    );
    lastNameFormData.setAttribute("data-error-visible", "true");
  } else {
    lastNameFormData.removeAttribute("date-error");
    lastNameFormData.removeAttribute("data-error-visible");
  }
}

function validateEmailField() {
  const isEmailAddressValid = isEmailValid(email.value);
  const emailFormData = email.parentNode;
  if (!isEmailAddressValid) {
    emailFormData.setAttribute(
      "data-error",
      "Veuillez entrer une adresse email valide."
    );
    emailFormData.setAttribute("data-error-visible", "true");
  } else {
    emailFormData.removeAttribute("data-error");
    emailFormData.removeAttribute("data-error-visible");
  }
}

function validateBirthdateField() {
  const isBirthdateValid = isDateValid(date.value);
  const dateFormData = date.parentNode;
  if(!isBirthdateValid){
    dateFormData.setAttribute("data-error","Veuillez entrer un format de date valide.");
    dateFormData.setAttribute("data-error-visible", "true");
  }else{
    dateFormData.removeAttribute("data-error");
    dateFormData.removeAttribute("data-error-visible");
  }
}

function validateQuantityField() { }

function validateLocationRadioButton() { }

function validateTermsCheckbox() { }

const formFields = {
  firstName: validateFirstNameField,
  lastName: validateLastNameField,
  email: validateEmailField,
  birthdate: validateBirthdateField,
  quantity: validateQuantityField,
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validateFirstNameField();
  validateLastNameField();
  validateEmailField();
  validateBirthdateField();
  validateQuantityField();
  validateLocationRadioButton();
  validateTermsCheckbox();
});

firstName.addEventListener("blur", () => {
  validateFirstNameField();
});
lastName.addEventListener("blur", () => {
  validateLastNameField();
});
email.addEventListener("blur", () => {
  validateEmailField();
});
birthdate.addEventListener("blur", () => {
  validateBirthdateField();
});
quantity.addEventListener("blur", () => {
  validateQuantityField();
});

// Object.entries(formFields).forEach(entry => {
//   const [field, validateField] = entry;
//   field.addEventListener("blur", () => {
//     validateField();
//   });
// });
