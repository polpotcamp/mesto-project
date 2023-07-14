 /* валидация формы профиль */
 const toggleButtonState = (inputList, buttonElement,item) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(item.inactiveButtonClass);
      buttonElement.disabled = true
    } else {
      buttonElement.classList.remove(item.inactiveButtonClass);
      buttonElement.disabled = false
    }
  }
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  const showInputError = (formElement, inputElement, errorMessage,item) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(item.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(item.errorClass);
  };
  
  const hideInputError = (formElement, inputElement,item) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(item.inputErrorClass);
    errorElement.classList.remove(item.errorClass);
    errorElement.textContent = '';
  };
  const checkInputValidity = (formElement, inputElement,item) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage,item);
    } else {
      hideInputError(formElement, inputElement,item);
    }
  };
  const setEventListeners = (formElement,item,inputList,buttonElement) => {
    toggleButtonState(inputList, buttonElement,item);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        toggleButtonState(inputList, buttonElement,item);
        checkInputValidity(formElement, inputElement,item);
      });
    });
  };
  const enableValidation = (item) => {
    const formList = Array.from(document.querySelectorAll(item.formSelector));
    formList.forEach((formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(item.inputSelector));
      const buttonElement = formElement.querySelector(item.submitButtonSelector);
        setEventListeners(formElement,item,inputList,buttonElement);
    });
  };
  export {enableValidation}