//完成初始化
async function init() {
  //验证登录状态
  const login = await API.loginData();
  const state = login.data;
  //   console.log(state);
  if (!state) {
    alert("该账号未登录或登录过期，请重新登录！");
    location.href = "./login.html";
    return;
  }

  //同步登录信息
  const doms = {
    nickname: document.querySelector("#nickname"),
    loginId: document.querySelector("#loginId"),
    container: document.querySelector(".chat-container"),
    close: document.querySelector(".close"),
    input: document.querySelector("#txtMsg"),
    button: document.querySelector("button"),
    form: document.querySelector(".msg-container"),
  };

  function userdata() {
    doms.nickname.innerText = state.nickname;
    doms.loginId.innerText = state.loginId;
  }
  userdata();

  //获取聊天记录

  //时间格式

  function format(time) {
    const orgTime = new Date(time);
    const year = orgTime.getFullYear();
    const month = (orgTime.getMonth() + 1).toString().padStart(2, 0);
    const day = orgTime.getDay().toString().padStart(2, 0);
    const hour = orgTime.getHours().toString().padStart(2, 0);
    const minute = orgTime.getMinutes().toString().padStart(2, 0);
    const second = orgTime.getSeconds().toString().padStart(2, 0);

    return `${year}-${month}-${day}  ${hour} : ${minute} : ${second}`;
  }

  //自己发的消息
  function chatRecordMe(contentMe, time) {
    const date = format(time);
    const content = document.createElement("div");
    content.className = "chat-item me";
    content.innerHTML = `<img class="chat-avatar" src="./asset/avatar.png" />
    <div class="chat-content">${contentMe}</div>
    <div class="chat-date">${date}</div>`;
    doms.container.appendChild(content);
  }

  //机器人发的消息
  function chatRecordRo(contentRo, time) {
    const date = format(time);
    const content = document.createElement("div");
    content.className = "chat-item";
    content.innerHTML = `<img class="chat-avatar" src="./asset/robot-avatar.jpg" />
    <div class="chat-content">${contentRo}</div>
    <div class="chat-date">${date}</div>`;
    doms.container.appendChild(content);
  }

  //得到聊天数据
  async function getChatRecord() {
    const chat = await API.history();
    for (const key of chat.data) {
      if (key.from) {
        chatRecordMe(key.content, key.createdAt);
      } else if (key.to) {
        chatRecordRo(key.content, key.createdAt);
      }
    }
    scrollBottom();
  }
  getChatRecord();

  //关闭窗口注销账号

  function closeChat() {
    doms.close.onclick = function () {
      close();
      location.href = "./login.html";
    };
  }
  closeChat();

  //实现功能

  async function fromChat() {
    const content = doms.input.value.toString().trim();
    const date = new Date();
    //发送消息
    chatRecordMe(content, date);
    if (!content) return;
    doms.input.value = "";
    scrollBottom();

    //回复程序
    const respones = await API.chat(content);
    chatRecordRo(respones.data.content, respones.data.createdAt);
    scrollBottom();
  }
  //阻止表单刷新页面
  doms.form.onsubmit = function (e) {
    e.preventDefault();
    fromChat();
  };
  //新消息置底
  function scrollBottom() {
    doms.container.scrollTop = doms.container.scrollHeight;
  }
}
init();
