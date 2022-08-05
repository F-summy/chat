const deIoginId = new Verification("txtLoginId", function (value) {
  if (!value) {
    return "请输入账号！";
  }
});
const detxtNickname = new Verification("txtLoginPwd", function (value) {
  if (!value) {
    return "请输入密码！";
  }
});

//全部验证
const form = document.querySelector(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault(); //阻止默认提交
  const result = Verification.verificationAll([deIoginId, detxtNickname]);
  if (!result) return;
  const obj = {
    loginId: deIoginId.dom.value,
    loginPwd: detxtNickname.dom.value,
  };

  const login = await API.login(obj);
  if (login.code === 0) {
    alert("账号登录成功！");
    location.href = "./index.html";
  } else if (deIoginId.dom.value) {
    deIoginId.p.innerText = "账号或密码错误";
    detxtNickname.dom.value = "";
  }
};
