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
const allInputs = document.querySelectorAll("input"); // (rno) Store form ...
const modal = document.querySelector("#modal-body");

// ---------------
// MODAL BEHAVIOR
// ---------------

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
function checkName(name) {
  const regex = new RegExp("^[a-zA-Z]+(?:[' -][a-zA-Z]+)*$");
  return name.length >= 2 && regex.test(name);
}
// Check email format
function checkEmail(email) {
  const emailRegEx = new RegExp(
    "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
  );
  return emailRegEx.test(email);
}
// Check date format
function checkDate(date) {
  const dateRegEx = new RegExp("^\\d{4}-\\d{2}-\\d{2}$");
  return dateRegEx.test(date);
}
// Check Quantity
function checkQuantity(quantity) {
  if (!!quantity && quantity >= 0 && quantity <= 99) {
    return true;
  }
  return false;
}
// Check that one radio button is checked
function checkLocation(radioButtons) {
  for (let i = 0; i < radioButtons.length; i++) {
    const radioButton = radioButtons[i];
    if (radioButton.checked) {
      return true;
    }
  }
  return false;
}
// Check Terms checkbox
function checkTerms(checkbox) {
  if (checkbox.checked) {
    return true;
  }
  return false;
}

// ---------------
// FIELD VALIDATION FONCTION
// ---------------

function checkAndValidateField(validationData) {
  const { isValidField, inputElement, alertMessage, type } = validationData;
  // Certaines fonctions de validation ont besoin du value de l'élément, d'autres de l'élément lui-même
  const isValid = isValidField(
    type === "radios" || type === "checkbox" ? inputElement : inputElement.value
  );

  // Pour les radios on doit récupérer un élément du tableau pour avoir accès à parentNode
  const formDataElement =
    type === "radios" ? inputElement[0].parentNode : inputElement.parentNode;

  if (!isValid) {
    formDataElement.setAttribute("data-error", alertMessage);
    formDataElement.setAttribute("data-error-visible", "true");
  } else {
    formDataElement.removeAttribute("data-error");
    formDataElement.removeAttribute("data-error-visible");
  }
  return isValid
}

// ---------------
// FORM CHECK AND MODAL BEHAVIOR ON CLICK TO SUBMIT BUTTON
// ---------------

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let firstIsValid = checkAndValidateField(fieldParams.first);
  let lastIsValid = checkAndValidateField(fieldParams.last);
  let emailIsValid = checkAndValidateField(fieldParams.email);
  let birthdateIsValid = checkAndValidateField(fieldParams.birthdate);
  let quantityIsValid = checkAndValidateField(fieldParams.quantity);
  let locationIsValid = checkAndValidateField(fieldParams.location);
  let checkbox1IsValid = checkAndValidateField(fieldParams.checkbox1);

  if (firstIsValid && lastIsValid && emailIsValid && birthdateIsValid && quantityIsValid && locationIsValid && checkbox1IsValid){
    successModal();
  }
});

// ---------------
// FIELD CHECK ON CHANGE
// ---------------

allInputs.forEach((input) => {
  input.addEventListener("change", () => {
    // Selon l'ID de l'input, on récupère les paramètres de validation correspondant
    checkAndValidateField(
      fieldParams[input.id.startsWith("location") ? "location" : input.id]
    );
  });
});

// ---------------
// MODAL MODIFICATION TO DISPLAY SUCCESSFULLY SUBMITTED FORM
// ---------------

function successModal(){
  modal.innerHTML = '<p>Merci ! Votre réservation a été reçue.</p>';
}

// ---------------
// FIELDS PARAMETERS
// ---------------

const fieldParams = {
  first: {
    isValidField: checkName,
    inputElement: firstName,
    alertMessage:
      "Veuillez entrer 2 caractères ou plus pour le champ du Prénom.",
  },
  last: {
    isValidField: checkName,
    inputElement: lastName,
    alertMessage: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  },
  email: {
    isValidField: checkEmail,
    inputElement: email,
    alertMessage: "Veuillez entrer une adresse email valide.",
  },
  birthdate: {
    isValidField: checkDate,
    inputElement: date,
    alertMessage: "Veuillez entrer un format de date valide.",
  },
  quantity: {
    isValidField: checkQuantity,
    inputElement: quantity,
    alertMessage: "Veuillez entrer un nombre entre 0 et 99",
  },
  location: {
    isValidField: checkLocation,
    inputElement: radioButtons,
    type: "radios",
    alertMessage: "Choisissez un lieu",
  },
  checkbox1: {
    isValidField: checkTerms,
    inputElement: checkboxTerms,
    type: "checkbox",
    alertMessage: "Vous devez accepter les conditions",
  },
};
