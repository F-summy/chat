const inputIoginId = new Verification("txtLoginId", async function (value) {
  if (!value) {
    return "请输入账号！";
  }
  const account = await API.check(value);
  if (account.data) {
    return "该账号已被占用，请重新输入！";
  }
});

const txtNickname = new Verification("txtNickname", function (value) {
  if (!value) {
    return "请输入昵称！";
  }
});
const txtLoginPwd = new Verification("txtLoginPwd", function (value) {
  if (!value) {
    return "请输入密码！";
  }
});
const passwordAgin = new Verification("txtLoginPwdConfirm", function (value) {
  if (!value) {
    return "请确认密码！";
  }
  if (value !== txtLoginPwd.dom.value) {
    return "密码不一致！";
  }
});

//全部验证
const form = document.querySelector(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault(); //阻止默认提交
  const result = Verification.verificationAll([
    inputIoginId,
    txtNickname,
    txtLoginPwd,
    passwordAgin,
  ]);
  if (!result) return;
  const obj = {
    loginId: inputIoginId.dom.value,
    nickname: txtNickname.dom.value,
    loginPwd: txtLoginPwd.dom.value,
  };

  const login = await API.reg(obj);
  if (login.code === 0) {
    alert("注册完成！");
    location.href = "./login.html";
  }
};
