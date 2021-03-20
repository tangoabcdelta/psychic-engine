// Create a class for the element
class CustomCalculator extends HTMLElement {
  #shadow;
  #wrapper;
  #result;
  constructor() {
    // Always call super first in constructor
    super();
    this.attachHTML();
  }

  attachHTML() {
    // Create a shadow root
    this.shadow = this.attachShadow({ mode: "open" });
    // Create spans
    this.wrapper = document.createElement("span");
    this.wrapper.setAttribute("class", "wrapper");
    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");

    // Take attribute content and put it inside the info span
    // const text = this.getAttribute("text");
    // info.textContent = text;

    // Insert icon
    let imgUrl;
    if (this.hasAttribute("img")) {
      imgUrl = this.getAttribute("img");
    } else {
      imgUrl = "img/default.png";
    }
    const img = document.createElement("img");
    img.src = imgUrl;
    icon.appendChild(img);

    const elements = ["jdCBIVE"];
    const styles = ["1MRWxlb"];
    // Create some CSS to apply to the shadow dom
    // Array.from({ length: styles.length }, (x, i) => {
    Array.from(elements, (selector) => {
      let el = document.getElementById(selector).cloneNode(true);
      el.setAttribute("tabindex", 0);
      this.wrapper.appendChild(el);
    });

    Array.from(styles, (selector) => {
      let st = document.createElement("style");
      st.textContent = document.getElementById(selector).innerText;
      this.wrapper.appendChild(st);
    });

    // attach the created elements to the shadow dom
    window.requestAnimationFrame(() => {
      this.shadow.appendChild(this.wrapper);
      this.onMount();
    });
  }

  onMount() {
    const res =
      this.wrapper.querySelector("#Result1") ||
      document.querySelector(".cal_total");
    const formula = this.wrapper.querySelector(".cal_formula");
    const del = () => {
      res.value = "0";
    };

    const num = (n, calc) => {
      console.log(n);
      (calc && (res.value = eval(formula.value))) || (formula.value += n);
    };

    const clickListener = (event) => {
      num(
        event?.target?.innerText,
        event?.target?.className?.indexOf("equal") > -1
      ); // event?.target[0]?.innerText
    };

    const mainButton = this.wrapper.querySelectorAll(".main button");
    Array.from(mainButton, (button) => {
      button.addEventListener("click", clickListener, false);
    });

    // document.querySelector("").addEventListener("click", calc, false);
  }

  onUnmount() {
    mainButton.map((button) => {
      button.removeEventListener("click", clickListener);
    });
  }
}

// Define the new element
customElements.define("custom-calculator", CustomCalculator);
