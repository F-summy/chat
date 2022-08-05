class Verification {
  constructor(element, fn) {
    this.dom = document.querySelector("#" + element);
    this.p = this.dom.nextElementSibling;
    this.fn = fn;
    //绑定事件
    this.dom.onblur = () => {
      this.validate();
    };
  }

  async validate() {
    const err = await this.fn(this.dom.value);
    if (err) {
      this.p.innerHTML = err;
      return false;
    } else {
      this.p.innerHTML = "";
      return true;
    }
  }

  static verificationAll(events) {
    const bool = events.map((e) => e.validate()); //重新验证
    return bool.every((r) => r);
  }
}
