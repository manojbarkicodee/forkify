import { Veiw } from "./view";
import icons from "../../img/icons.svg";
class Paginationview extends Veiw {
  _parentel = document.querySelector(".pagination");

  display_recipe_markup() {
    let totalpage = Math.ceil(this._data.data.length / this._data.limit);
    let currentpage = this._data.page;
    if (currentpage === 1 && totalpage > 1) {
      return `
    <button data-goto=${
      currentpage + 1
    } class="btn--inline pagination__btn--next">
    <span>Page ${currentpage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button> 
    `;
    }
    if (currentpage === totalpage && totalpage > 1) {
      return `
<button data-goto=${currentpage - 1} class="btn--inline pagination__btn--prev">
<svg class="search__icon">
  <use href="${icons}#icon-arrow-left"></use>
</svg>
<span>Page ${currentpage - 1}</span>
</button>
`;
    }
    if (currentpage > 1 && currentpage < totalpage) {
      return `
    <button data-goto=${
      currentpage - 1
    } class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentpage - 1}</span>
  </button>
  <button data-goto=${
    currentpage + 1
  } class="btn--inline pagination__btn--next">
    <span>Page ${currentpage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button> 
    `;
    }

    return "";
  }

  paginationhandler(handler) {
    this._parentel.addEventListener("click", function (e) {
      let button = e.target.closest(".btn--inline");
      if (!button) return;
      let goto = +button.dataset.goto;
      handler(goto);
    });
  }
}

export default new Paginationview();
