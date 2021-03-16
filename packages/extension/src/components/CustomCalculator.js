// // CustomElementRegistry

// class CustomCalculator extends HTMLElement {
//   constructor() {
//     super(); //always need to call super() first in a constructor

//     const shadow = this.attachShadow({
//       mode: "open",
//     });

//     const wrapper = document.createElement("span");
//     wrapper.setAttribute("class", "wrapper");

//     const icon = document.createElement("span");
//     icon.setAttribute("class", "icon");
//     icon.setAttribute("tabindex", 0);

//     const info = document.createElement("span");
//     info.setAttribute("class", "info");

//     const text = this.getAttribute("text");
//     info.textContent = text; // Take attribute content and put it inside the info span

//     const imgUrl;
//     if(this.hasAttribute('img')) {
//       imgUrl = this.getAttribute('img');
//     } else {
//       imgUrl = 'img/default.png';
//     }
//     const img = document.createElement('img');
//     img.src = imgUrl;
//     icon.appendChild(img);

//     var style = document.createElement('style');

//     // attach the created elements to the shadow dom

//     shadow.appendChild(style);
//     shadow.appendChild(wrapper);
//     wrapper.appendChild(icon);
//     wrapper.appendChild(info);
//   }
// }

// customElements.define('custom-calculator', CustomCalculator);

// Create a class for the element
class CustomCalculator extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create spans
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");
    const icon = document.createElement("span");
    icon.setAttribute("class", "icon");
    icon.setAttribute("tabindex", 0);
    const info = document.createElement("span");
    info.setAttribute("class", "info");

    // Take attribute content and put it inside the info span
    const text = this.getAttribute("text");
    info.textContent = text;

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

    const elements = ["1MRWxlb"];
    const styles = ["W29iamV", "jdCBIVE"];
    // Create some CSS to apply to the shadow dom
    // Array.from({ length: styles.length }, (x, i) => {
    Array.from(elements, (selector, index) => {
      let markup = document.getElementById(selector).cloneNode(true);
      wrapper.appendChild(markup);
    });

    Array.from(styles, (selector, index) => {
      let el = document.createElement("style");
      el.textContent = document.getElementById(selector).innerText;
      wrapper.appendChild(el);
    });

    // attach the created elements to the shadow dom

    wrapper.appendChild(icon);

    wrapper.appendChild(info);

    // shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}

// Define the new element
customElements.define("custom-calculator", CustomCalculator);
