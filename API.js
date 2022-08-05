var API = (function () {
  const BASE_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    const result = fetch(`${BASE_URL}${path}`, { headers });
    return result;
  }

  function post(path, data) {
    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem("token");
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    const result = fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    return result;
  }

  //1.注册
  async function reg(data) {
    const result = await post("/api/user/reg", data);
    const resultData = await result.json();
    return resultData;
  }

  //2.登录
  async function login(data) {
    const result = await post("/api/user/login", data);
    const resultData = await result.json();
    // 保存登录令牌
    if (resultData.code === 0) {
      const token = result.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return resultData;
  }

  //3.验证账号
  async function check(data) {
    const result = await get("/api/user/exists?loginId=" + data);
    return result.json();
  }

  //4.当前登录信息

  async function loginData() {
    const result = await get("/api/user/profile");
    return result.json();
  }

  //5.发送消息

  async function chat(content) {
    const result = await post("/api/chat", { content });
    return result.json();
  }

  //6.查看聊天记录
  // /api/chat/history
  async function history() {
    const result = await get("/api/chat/history");
    return result.json();
  }

  function close() {
    localStorage.removeItem(TOKEN_KEY);
  }
  return {
    reg,
    login,
    check,
    loginData,
    chat,
    history,
    close,
  };
})();
