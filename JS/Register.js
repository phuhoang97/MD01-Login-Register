const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const form = document.querySelector("form");

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
}

function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}

function checkEmptyError(listInput) {
  let isEmptyError = false;

  for (let i = 0; i < listInput.length; i++) {
    let input = listInput[i];
    input.value = input.value.trim();
    if (!input.value) {
      isEmptyError = true;
      showError(input, "Không được để trống");
    } else {
      showSuccess(input);
    }
  }

  return isEmptyError;
}

function checkEmailError(input) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let isEmailError = !regexEmail.test(input.value);
  input.value = input.value.trim();
  if (regexEmail.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email invalid");
  }
  return isEmailError;
}

function checkLengthError(input, name, min, max) {
  input.value = input.value.trim();

  if (input.value.length < min) {
    showError(input, `${name} has at least ${min} characters`);
    return true;
  }

  if (input.value.length > max) {
    showError(input, `${name} must not exceed ${max} characters`);
    return true;
  }

  showSuccess(input);
  return false;
}

function checkMatchPassword(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, "Password do not match");
    return true;
  }
  return false;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isEmptyError = checkEmptyError([
    username,
    email,
    password,
    confirmPassword,
  ]);

  let isEmailError = checkEmailError(email);
  let isUserNameLengthError = checkLengthError(username, "Username", 3, 10);
  let isPasswordLengthError = checkLengthError(password, "Password", 8, 25);
  let isCfPasswordError = checkMatchPassword(password, confirmPassword);

  if (
    !isEmptyError &&
    !isEmailError &&
    !isUserNameLengthError &&
    !isPasswordLengthError &&
    !isCfPasswordError
  ) {
    // Thêm dữ liệu vào LocalStorage ở đây
    const userData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    // Chuyển đối tượng userData thành chuỗi JSON
    const userDataJSON = JSON.stringify(userData);
    // Lưu vào LocalStorage với một khóa tùy chọn (ví dụ: "userData")
    localStorage.setItem("userData", userDataJSON);

    // Hiển thị thông báo SweetAlert2 thành công
    Swal.fire({
      icon: "success",
      title: "Đăng ký thành công!",
      text: "Bạn có thể đăng nhập ngay bây giờ.",
      showConfirmButton: false,
      timer: 2000, // Tự động đóng thông báo sau 2 giây
    }).then(() => {
      // Sau khi đóng thông báo, chuyển hướng đến trang login.html
      window.location.href = "login.html";
    });
  } else {
    // Hiển thị thông báo lỗi nếu có lỗi
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Vui lòng kiểm tra thông tin đăng ký của bạn.",
    });
  }
});
