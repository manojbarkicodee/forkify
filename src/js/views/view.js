import icons from "../../img/icons.svg";
export class Veiw {
  _parentel = document.querySelector(".recipe");
  _data;

  render_spinner() {
    let markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
    `;
    this.clear();
    this._parentel.insertAdjacentHTML("afterbegin", markup);
  }

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    let markup = this.display_recipe_markup();

    if (!render) return markup;
    this.clear();
    this._parentel.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._parentel.innerHTML = "";
  }

  update(data) {
    this._data = data;
    let newmarkup = this.display_recipe_markup();

    let newDom = document.createRange().createContextualFragment(newmarkup);

    let newelements = Array.from(newDom.querySelectorAll("*"));
    let currelements = Array.from(this._parentel.querySelectorAll("*"));
    newelements.forEach((newel, i) => {
      let curel = currelements[i];
      if (
        !newel.isEqualNode(curel) &&
        newel.firstChild?.nodeValue.trim() !== ""
      ) {
        curel.textContent = newel.textContent;
      }

      if (!newel.isEqualNode(curel)) {
        Array.from(newel.attributes).forEach((attribute) => {
          curel.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
  `;
    this.clear();
    this._parentel.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
  `;
    this.clear();
    this._parentel.insertAdjacentHTML("afterbegin", markup);
  }
}
