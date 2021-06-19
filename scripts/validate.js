const showInputError = (formElement, inputElement) => {
  const { inputError, inputErrorActive } = config;
  const error = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputError);
  error.textContent = inputElement.validationMessage;
  console.log(error.textContent);
  error.classList.add(inputErrorActive);
};

const hideInputError = (formElement, inputElement) => {
  const { inputError, inputErrorActive } = config;
  const error = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputError);
  error.classList.remove(inputErrorActive);
  error.textContent = "";
};

const checkValidate = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
};

const transferInvalid = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const controlButton = (buttonElement, inputList) => {
  if (transferInvalid(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, config) => {
  const { inputSelector, submitButtonSelector, ...restConfig } = config;
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidate(formElement, inputElement, restConfig);
      controlButton(buttonElement, inputList, restConfig);
    });
  });
  controlButton(buttonElement, inputList, restConfig);
};

const enableValidation = (config) => {
  const { formSelector, ...restConfig } = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);
  });
};
