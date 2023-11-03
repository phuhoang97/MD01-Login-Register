const form = document.querySelector("form");

function showError(input, message) {
  const parent = input.parentElement;
  const small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

function showSuccess(input) {
  const parent = input.parentElement;
  const small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}

function validateInput(input, validationFn, errorMessage) {
  input.value = input.value.trim();
  if (validationFn(input.value)) {
    showError(input, errorMessage);
    return true;
  }
  showSuccess(input);
  return false;
}

function checkEmpty(input) {
  return input.value === "";
}

function checkEmail(email) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return !regexEmail.test(email);
}

function checkLength(input, name, min, max) {
  const value = input.value.trim();
  if (value.length < min || value.length > max) {
    showError(input, `${name} must be between ${min} and ${max} characters`);
    return true;
  }
  showSuccess(input);
  return false;
}

function checkPasswordMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
    return true;
  }
  return false;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirm-password");

  const isEmptyError = validateInput(
    username,
    checkEmpty,
    "Không được để trống"
  );
  const isEmailError = validateInput(email, checkEmail, "Email invalid");
  const isUserNameLengthError = validateInput(
    username,
    (value) => checkLength(username, "Username", 3, 10),
    "Invalid username length"
  );
  const isPasswordLengthError = validateInput(
    password,
    (value) => checkLength(password, "Password", 8, 25),
    "Invalid password length"
  );
  const isCfPasswordError = validateInput(
    confirmPassword,
    (value) => checkPasswordMatch(password, confirmPassword),
    "Password do not match"
  );

  if (
    !isEmptyError &&
    !isEmailError &&
    !isUserNameLengthError &&
    !isPasswordLengthError &&
    !isCfPasswordError
  ) {
    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    Swal.fire({
      icon: "success",
      title: "Đăng ký thành công!",
      text: "Bạn có thể đăng nhập ngay bây giờ.",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      window.location.href = "login.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Vui lòng kiểm tra thông tin đăng ký của bạn.",
    });
  }
});
