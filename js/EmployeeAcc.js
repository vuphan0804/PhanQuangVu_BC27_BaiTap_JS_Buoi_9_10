function Employee(
  account,
  name,
  email,
  password,
  dateWork,
  baseSalary,
  position,
  workTime
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.dateWork = dateWork;
  this.baseSalary = baseSalary;
  this.position = position;
  this.workTime = workTime;
  this.totalSalary = this.calcSalary(this.position).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  this.typeOfEmployee = this.ranking(this.workTime);
}

Employee.prototype.calcSalary = function () {
  this.totalSalary = 0;
  if (this.position === "Sếp") {
    this.totalSalary += this.baseSalary * 3;
  }
  if (this.position === "Trưởng phòng") {
    this.totalSalary += this.baseSalary * 2;
  }
  if (this.position === "Nhân viên") {
    this.totalSalary += this.baseSalary * 1;
  }

  return this.totalSalary;
};
Employee.prototype.ranking = function () {
  this.typeOfEmployee = "";
  if (this.workTime >= 192) {
    this.typeOfEmployee = "Nhân viên xuất sắc";
  } else if (this.workTime >= 176) {
    this.typeOfEmployee = "Nhân viên giỏi";
  } else if (this.workTime >= 160) {
    this.typeOfEmployee = "Nhân viên khá";
  } else {
    this.typeOfEmployee = "Nhân viên trung bình";
  }

  return this.typeOfEmployee;
};
