const $form = $("#form");
const $username = $("#username");
const $email = $("#email");
const $password = $("#password");
const $password2 = $("#password2");

// Show error message
function showError($input, message) {
  const $formControl = $input.parent();
  $formControl.attr("class", "form-control error");
  const $small = $formControl.find("small");
  $small.text(message);
}
// Shoe success message
function showSuccess($input) {
  const $formControl = $input.parent();
  $formControl.attr("class", "form-control success");
}

// Check email is valid
function checkEmail($input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test($input.val())) {
    showSuccess($input);
  } else {
    showError($input, "Email is not valid");
  }
}

// Check required fields
function checkRequired($inputArr) {
  $inputArr.forEach(function ($input) {
    if ($input.val().trim() == "") {
      showError($input, `${getFieldName($input)} is required`);
    } else {
      showSuccess($input);
    }
  });
}

// Check input length
function checkLength($input, min, max) {
  if ($input.val().length < min) {
    showError(
      $input,
      `${getFieldName($input)} must be at least ${min} characters`
    );
  } else if ($input.val().length > max) {
    showError(
      $input,
      `${getFieldName($input)} must be less than ${max} characters`
    );
  } else {
    showSuccess($input);
  }
}

// Check password match
function checkPasswordMatch($password, $password2) {
  if ($password.val() !== $password2.val()) {
    showError($password2, "Passwords do not match");
  }
}

// Get fieldname 提升友善度於錯誤訊息
function getFieldName($input) {
  return $input.attr("id").charAt(0).toUpperCase() + $input.attr("id").slice(1);
}

// Event Listeners
$form.on("submit", function (e) {
  e.preventDefault();
  checkRequired([$username, $email, $password, $password2]);
  checkLength($username, 3, 15);
  checkLength($password, 6, 25);
  checkEmail($email);
  checkPasswordMatch($password, $password2);
});
