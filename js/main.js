var employees = [];
init();
document.getElementById("btnAdd").addEventListener("click", resetForm);

function init() {
  employees = JSON.parse(localStorage.getItem("employee")) || [];

  for (let i = 0; i < employees.length; i++) {
    var employee = employees[i];
    employees[i] = new Employee(
      employee.account,
      employee.name,
      employee.email,
      employee.password,
      employee.dateWork,
      employee.baseSalary,
      employee.position,
      employee.workTime,
      employee.totalSalary,
      employee.typeOfEmployee
    );
  }
  display(employees);
}

// Add employee
function addEmployee() {
  var account = document.getElementById("account").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateWork = document.getElementById("dateWork").value;
  var baseSalary = +document.getElementById("baseSalary").value;
  var position = document.getElementById("position").value;
  var workTime = +document.getElementById("workTime").value;

  var employee = new Employee(
    account,
    name,
    email,
    password,
    dateWork,
    baseSalary,
    position,
    workTime
  );
  //   Validation Account
  validationAdd(employees);
  if (validationAdd(employees)) {
    employees.push(employee);
    localStorage.setItem("employee", JSON.stringify(employees));

    display(employees);
    resetForm();
    $("#myModal").modal("hide");
  }
}

document.getElementById("modal-footer").addEventListener("click", handleClick);

function handleClick(event) {
  var btnType = event.target.getAttribute("btn-type");
  switch (btnType) {
    case "add":
      addEmployee();
      break;
    case "update":
      updateEmployee();
  }
}

function display(employees) {
  var html = "";
  var tbodyEl = document.getElementById("tableDanhSach");
  for (i = 0; i < employees.length; i++) {
    var employee = employees[i];
    html += `
    <tr>
      <td>${employee.account}</td>
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.dateWork}</td>
      <td>${employee.position}</td>
      <td>${employee.totalSalary}</td>
      <td>${employee.typeOfEmployee}</td>
      <td><button class="btn btn-primary" data-toggle="modal" data-target="#myModal" data-type="update" id="update-btn" onclick="selectEmployee('${employee.account}')">Cập nhật</button>
      <button class="btn btn-danger" btn-type="delete" onclick="deleteEmployee('${employee.account}')">Xoá</button></td>
    </tr>
    `;
  }
  tbodyEl.innerHTML = html;
}

function findEmployee(accountEm) {
  var index = -1;
  for (let i = 0; i < employees.length; i++) {
    if ((employees[i].account = accountEm)) {
      index = i;
      break;
    }
  }
  return index;
}

function deleteEmployee(empoyeeId) {
  var index = findEmployee(empoyeeId);

  if (index !== -1) {
    employees.splice(index, 1);
  }
  localStorage.setItem("employee", JSON.stringify(employees));
  display(employees);
}

function selectEmployee(employeeId) {
  document.getElementById("btnUpdateEmployee").disabled = false;

  var index = findEmployee(employeeId);

  var employee = employees[index];
  document.getElementById("account").value = employee.account;
  document.getElementById("name").value = employee.name;
  document.getElementById("email").value = employee.email;
  document.getElementById("password").value = employee.password;
  document.getElementById("dateWork").value = employee.dateWork;
  document.getElementById("baseSalary").value = employee.baseSalary;
  document.getElementById("position").value = employee.position;
  document.getElementById("workTime").value = employee.workTime;
  document.getElementById("btnAddEmployee").disabled = true;
  document.getElementById("account").disabled = true;
}

function resetForm() {
  document.getElementById("account").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dateWork").value = "";
  document.getElementById("baseSalary").value = "";
  document.getElementById("position").value = "Chọn chức vụ";
  document.getElementById("workTime").value = "";
  document.getElementById("btnAddEmployee").disabled = false;
}

function updateEmployee() {
  var account = document.getElementById("account").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateWork = document.getElementById("dateWork").value;
  var baseSalary = +document.getElementById("baseSalary").value;
  var position = document.getElementById("position").value;
  var workTime = +document.getElementById("workTime").value;

  var employee = new Employee(
    account,
    name,
    email,
    password,
    dateWork,
    baseSalary,
    position,
    workTime
  );
  if (validationUpdate(employees) != false) {
    var index = findEmployee(employee.account);
    employees[index] = employee;
    localStorage.setItem("employee", JSON.stringify(employees));
    display(employees);
    resetForm();
    $("#myModal").modal("hide");
  }
}
function disableUpdate() {
  document.getElementById("btnUpdateEmployee").disabled = true;
}

//Validation
function validationAdd() {
  var account = document.getElementById("account").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateWork = document.getElementById("dateWork").value;
  var baseSalary = +document.getElementById("baseSalary").value;
  var position = document.getElementById("position").value;
  var workTime = +document.getElementById("workTime").value;
  var isValid = true;

  //Kiểm tra tài khoản nhập vào có hợp lệ hay không
  var idPattern = new RegExp("^[1-9]+$");
  var accountNotiEl = document.getElementById("accountNoti");
  if (!isRequired(account)) {
    isValid = false;
    accountNotiEl.innerHTML = "Tài khoản không được để trống";
    accountNotiEl.style = "display:block";
  } else if (!minLength(account, 4)) {
    isValid = false;
    accountNotiEl.innerHTML = "Tài khoản phải có ít nhất 4 ký số";
    accountNotiEl.style = "display:block";
  } else if (!maxLength(account, 6)) {
    isValid = false;
    accountNotiEl.innerHTML = "Tài khoản có tối đa 6 ký số";
    accountNotiEl.style = "display:block";
  } else if (!idPattern.test(account)) {
    isValid = false;
    accountNotiEl.innerHTML = "Tài khoản chỉ bao gồm số";
    accountNotiEl.style = "display:block";
  } else if (!duplicateTest(account)) {
    isValid = false;
    accountNotiEl.innerHTML = "Tài khoản đã tồn tại";
    accountNotiEl.style = "display:block";
  } else {
    accountNotiEl.innerHTML = "";
    accountNotiEl.style = "display:none";
  }
  //Name Validation
  var namePattern = new RegExp(
    "^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$"
  );
  var nameNotiEl = document.getElementById("nameNoti");
  if (!isRequired(name)) {
    isValid = false;
    nameNotiEl.innerHTML = "Tên nhân viên không được để trống";
    nameNotiEl.style = "display:block";
  } else if (!namePattern.test(name)) {
    isValid = false;
    nameNotiEl.innerHTML = "Tên nhân viên chứa kí tự không hợp lệ";
    nameNotiEl.style = "display:block";
  } else {
    nameNotiEl.innerHTML = "";
    nameNotiEl.style = "display:none";
  }

  //Email Validation
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  var emailNotiEl = document.getElementById("emailNoti");
  if (!isRequired(email)) {
    isValid = false;
    emailNotiEl.innerHTML = "Email không được để trống";
    emailNotiEl.style = "display:block";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    emailNotiEl.innerHTML = "Email không đúng định dạng";
    emailNotiEl.style = "display:block";
  } else {
    emailNotiEl.innerHTML = "";
    emailNotiEl.style = "display:none";
  }
  //Password Validation
  var pswPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
  var passwordNotiEl = document.getElementById("passwordNoti");
  if (!isRequired(password)) {
    isValid = false;
    passwordNotiEl.innerHTML = "Password không được để trống";
    passwordNotiEl.style = "display:block";
  } else if (!minLength(password, 6)) {
    isValid = false;
    passwordNotiEl.innerHTML = "Password phải có ít nhất 6 ký tự";
    passwordNotiEl.style = "display:block";
  } else if (!maxLength(password, 10)) {
    isValid = false;
    passwordNotiEl.innerHTML = "Password có tối đa 10 ký tự";
    passwordNotiEl.style = "display:block";
  } else if (!pswPattern.test(password)) {
    isValid = false;
    passwordNotiEl.innerHTML =
      "Password phải chứa ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    passwordNotiEl.style = "display:block";
  } else {
    passwordNotiEl.innerHTML = "";
    passwordNotiEl.style = "display:none";
  }

  //Date Validation
  var dateWorkNotiEl = document.getElementById("dateWorkNoti");
  if (!isRequired(dateWork)) {
    isValid = false;
    document.getElementById("dateWorkNoti").innerHTML =
      "Ngày làm không được để trống";
    document.getElementById("dateWorkNoti").style = "display:block";
  } else {
    document.getElementById("dateWorkNoti").innerHTML = "";
    document.getElementById("dateWorkNoti").style = "display:none";
  }

  //Base Salary Validation
  var baseSalaryNotiEl = document.getElementById("baseSalaryNoti");
  if (!isRequired(`'${baseSalary}'`)) {
    isValid = false;
    baseSalaryNotiEl.innerHTML = "Tiền lương không được để trống";
    baseSalaryNotiEl.style = "display:block";
  } else if (baseSalary < 1e6 || baseSalary > 20e6) {
    isValid = false;
    baseSalaryNotiEl.innerHTML = "Tiền lương phải từ 1 000 000 - 20 000 000 ";
    baseSalaryNotiEl.style = "display:block";
  } else {
    baseSalaryNotiEl.innerHTML = "";
    baseSalaryNotiEl.style = "display:none";
  }
  //Position Validation
  var positionNotiEl = document.getElementById("positionNoti");
  if (position === "Chọn chức vụ") {
    isValid = false;
    positionNotiEl.innerHTML =
      "Chọn chức vụ hợp lệ (Sếp, Trưởng phòng, Nhân viên";
    positionNotiEl.style = "display:block";
  } else {
    positionNotiEl.innerHTML = "";
    positionNotiEl.style = "display:none";
  }
  //Work Time Validation
  var workTimeNotiEl = document.getElementById("workTimeNoti");
  if (!isRequired(workTime)) {
    isValid = false;
    workTimeNotiEl.innerHTML = "Số giờ làm không được để trống";
    workTimeNotiEl.style = "display:block";
  } else if (workTime < 80 || workTime > 200) {
    isValid = false;
    workTimeNotiEl.innerHTML = "Số giờ làm trong tháng phải từ 80 - 200 giờ";
    workTimeNotiEl.style = "display:block";
  } else {
    workTimeNotiEl.innerHTML = "";
    workTimeNotiEl.style = "display:none";
  }
  return isValid;
}
function validationUpdate() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var dateWork = document.getElementById("dateWork").value;
  var baseSalary = +document.getElementById("baseSalary").value;
  var position = document.getElementById("position").value;
  var workTime = +document.getElementById("workTime").value;
  var isValid = true;

  //   Name Valid
  var namePattern = new RegExp(
    "^[a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$"
  );
  var nameNotiEl = document.getElementById("nameNoti");
  if (!isRequired(name)) {
    isValid = false;
    nameNotiEl.innerHTML = "Tên nhân viên không được để trống";
    nameNotiEl.style = "display:block";
  } else if (!namePattern.test(name)) {
    isValid = false;
    nameNotiEl.innerHTML = "Tên nhân viên chứa kí tự không hợp lệ";
    nameNotiEl.style = "display:block";
  } else {
    nameNotiEl.innerHTML = "";
    nameNotiEl.style = "display:none";
  }

  //Email isValid
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  var emailNotiEl = document.getElementById("emailNoti");
  if (!isRequired(email)) {
    isValid = false;
    emailNotiEl.innerHTML = "Email không được để trống";
    emailNotiEl.style = "display:block";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    emailNotiEl.innerHTML = "Email không đúng định dạng";
    emailNotiEl.style = "display:block";
  } else {
    emailNotiEl.innerHTML = "";
    emailNotiEl.style = "display:none";
  }

  //Password isValid
  var pswPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
  var passwordNotiEl = document.getElementById("passwordNoti");
  if (!isRequired(password)) {
    isValid = false;
    passwordNotiEl.innerHTML = "Password không được để trống";
    passwordNotiEl.style = "display:block";
  } else if (!minLength(password, 6)) {
    isValid = false;
    passwordNotiEl.innerHTML = "Password phải có ít nhất 6 ký tự";
    passwordNotiEl.style = "display:block";
  } else if (!maxLength(password, 10)) {
    isValid = false;
    passwordNotiEl.innerHTML = "Password có tối đa 10 ký tự";
    passwordNotiEl.style = "display:block";
  } else if (!pswPattern.test(password)) {
    isValid = false;
    passwordNotiEl.innerHTML =
      "Password phải chứa ít nhất 1 số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    passwordNotiEl.style = "display:block";
  } else {
    passwordNotiEl.innerHTML = "";
    passwordNotiEl.style = "display:none";
  }

  //Date Valid
  var dateWorkNotiEl = document.getElementById("dateWorkNoti");
  if (!isRequired(dateWork)) {
    isValid = false;
    dateWorkNotiEl.innerHTML = "Ngày làm không được để trống";
    dateWorkNotiEl.style = "display:block";
  } else {
    dateWorkNotiEl.innerHTML = "";
    dateWorkNotiEl.style = "display:none";
  }

  //BaseSalary isValid
  var baseSalaryNotiEl = document.getElementById("baseSalaryNoti");
  if (!isRequired(baseSalary)) {
    isValid = false;
    baseSalaryNotiEl.innerHTML = "Tiền lương không được để trống";
    baseSalaryNotiEl.style = "display:block";
  } else if (baseSalary < 1e6 || baseSalary > 20e6) {
    isValid = false;
    baseSalaryNotiEl.innerHTML = "Tiền lương phải từ 1 000 000 - 20 000 000 ";
    baseSalaryNotiEl.style = "display:block";
  } else {
    baseSalaryNotiEl.innerHTML = "";
    baseSalaryNotiEl.style = "display:none";
  }
  //Position isValid
  var positionNotiEl = document.getElementById("positionNoti");
  if (position === "Chọn chức vụ") {
    isValid = false;
    positionNotiEl.innerHTML =
      "Chọn chức vụ hợp lệ (Sếp, Trưởng phòng, Nhân viên";
    positionNotiEl.style = "display:block";
  } else {
    positionNotiEl.innerHTML = "";
    positionNotiEl.style = "display:none";
  }
  //Kiểm tra số giờ làm có hợp lệ không
  var workTimeNotiEl = document.getElementById("workTimeNoti");
  if (!isRequired(workTime)) {
    isValid = false;
    workTimeNotiEl.innerHTML = "Số giờ làm không được để trống";
    workTimeNotiEl.style = "display:block";
  } else if (workTime < 80 || workTime > 200) {
    isValid = false;
    workTimeNotiEl.innerHTML = "Số giờ làm trong tháng phải từ 80 - 200 giờ";
    workTimeNotiEl.style = "display:block";
  } else {
    workTimeNotiEl.innerHTML = "";
    workTimeNotiEl.style = "display:none";
  }

  return isValid;
}

document
  .getElementById("searchName")
  .addEventListener("keypress", searchEmployee);

document
  .getElementById("btnSearchEmployee")
  .addEventListener("click", searchEmployee);

function subSearchEmployee() {
  var employeeSearch = document.getElementById("searchName").value;
  employeeSearch = employeeSearch.toLowerCase();

  var newEmployees = [];
  for (var i = 0; i < employees.length; i++) {
    var employee = employees[i];
    employeeRank = employee.typeOfEmployee.toLowerCase();
    if (employeeRank.indexOf(employeeSearch) !== -1) {
      newEmployees.push(employee);
    }
  }
  display(newEmployees);
}
function searchEmployee(event) {
  if (event.type === "keypress") {
    if (event.key !== "Enter") {
      return;
    } else {
      subSearchEmployee();
    }
  }
  if (event.type === "click") {
    var employeeSearch = document.getElementById("searchName").value;
    employeeSearch = employeeSearch.toLowerCase();

    var newEmployees = [];
    for (var i = 0; i < employees.length; i++) {
      var employee = employees[i];
      employeeRank = employee.typeOfEmployee.toLowerCase();
      if (employeeRank.indexOf(employeeSearch) !== -1) {
        newEmployees.push(employee);
      }
    }
    display(newEmployees);
  } else if (event.type === "click") {
    subSearchEmployee();
  }
}

document
  .getElementById("searchName")
  .addEventListener("keyup", resetSearchEmployee);

function resetSearchEmployee() {
  var employeeSearch = document.getElementById("searchName").value;
  employeeSearch = employeeSearch.toLowerCase();
  if (employeeSearch === "") {
    display(employees);
  }
}

function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}

function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }

  return true;
}

function maxLength(value, limit) {
  if (value.length > limit) {
    return false;
  }

  return true;
}

function duplicateTest(value) {
  for (i = 0; i < employees.length; i++) {
    if (value === employees[i].account) {
      return false;
    }
  }

  return true;
}
