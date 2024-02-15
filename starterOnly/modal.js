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
const radioButtons = document.querySelectorAll(".checkbox-input[type='radio']"); // (rno) Store form ...
const checkboxTerms = document.querySelector("#checkbox1"); // (rno) Store form ...

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
  const dateRegEx = new RegExp("^\\d{4}-\\d{2}-\\d{2}$");
  return dateRegEx.test(date);
}
// Check Quantity
function isQuantityValid(quantity) {
  if (!!quantity && quantity >= 0 && quantity <= 99){
    return true;
  }
  return false;
}
// Check radio buttons for location
function isLocationChecked(radioButtons){
  for (let i = 0; i < radioButtons.length; i++) {
    const radioButton = radioButtons[i];
    if (radioButton.checked) {
      return true;
    }
  }
  return false;
}
// Check Terms checkbox
function isAcceptedTerms(checkbox){
  if(checkbox.checked){
    return true;
  }
  return false;
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

function validateQuantityField() {
  const quantityValid = isQuantityValid(quantity.value)
  const quantityFormData = quantity.parentNode;
  if (!quantityValid) {
    quantityFormData.setAttribute("data-error", "Veuillez entrer un nombre entre 0 et 99");
    quantityFormData.setAttribute("data-error-visible", "true");
  } else {
    quantityFormData.removeAttribute("data-error");
    quantityFormData.removeAttribute("data-error-visible");
  }
 }

function validateLocationRadioButton() {
  const isLocationOk = isLocationChecked(radioButtons)
  const locationFormData = radioButtons[0].parentNode;
  if (!isLocationOk) {
    locationFormData.setAttribute("data-error", "Choisissez un lieu");
    locationFormData.setAttribute("data-error-visible", "true");
  } else {
    locationFormData.removeAttribute("data-error");
    locationFormData.removeAttribute("data-error-visible");
  }
}

function validateTermsCheckbox() {
  const isTermChecked = isAcceptedTerms(checkboxTerms);
  const termsFormData = checkboxTerms.parentNode;
  if (!isTermChecked) {
    termsFormData.setAttribute("data-error", "Vous devez accepter les conditions");
    termsFormData.setAttribute("data-error-visible", "true");
  } else {
    termsFormData.removeAttribute("data-error");
    termsFormData.removeAttribute("data-error-visible");
  }
}


function checkAndValidateField(rule, ruleParam, DOMElement, alertMessage){
  console.log("ruleParam: " + ruleParam)
  const checkRule = rule(ruleParam);
  const elementFormData = DOMElement.parentNode;
  if (!checkRule) {
    elementFormData.setAttribute("data-error", alertMessage);
    elementFormData.setAttribute("data-error-visible", "true");
  } else {
    elementFormData.removeAttribute("data-error");
    elementFormData.removeAttribute("data-error-visible");
  }
}

const fieldParams = {
  firstName: [isNameValid, firstName.value, firstName, "message test"],
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  // validateFirstNameField();
  checkAndValidateField(...fieldParams.firstName);

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



// const formFields = {
//   //Each field take an array of parameters : [<validate_function>,<string:error_message>,<bool:hasBlurListenerr> ]
//   firstName: [isNameValid, "firstName.value", "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.", true],
//   lastName: [isNameValid, "lastName.value", "Veuillez entrer 2 caractères ou plus pour le champ du nom.", true],
//   email: [isEmailValid, "email.value", "Veuillez entrer une adresse email valide.", true],
//   birthdate: [isDateValid, "date.value", "Veuillez entrer un format de date valide.", true],
//   quantity: [isQuantityValid, "quantity.value", "Veuillez entrer un nombre entre 0 et 99", true],
//   radioButtons: [isLocationChecked, "radioButtons", "Choisissez un lieu", false],
//   checkboxTerms: [isAcceptedTerms, "checkboxTerms", "Vous devez accepter les conditions", false],
// };
