import { Veiw } from "./view";
import icons from "../../img/icons.svg";
class Preview extends Veiw {
  display_recipe_markup() {
    let id = window.location.hash.slice(1);
    let el = this._data;
    return `  <li class="preview">
    <a class="preview__link ${
      id === el.id ? "preview__link--active" : ""
    }" href="#${el.id}">
      <figure class="preview__fig">
        <img src=${el.image_url} alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${el.title}</h4>
        <p class="preview__publisher ">${el.publisher}</p>
        <div class="preview__user-generated ${this._data.key ? "" : "hidden"}">
        <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
      </div>
      </div>
    </a>
  </li>`;
  }
}

export default new Preview();
