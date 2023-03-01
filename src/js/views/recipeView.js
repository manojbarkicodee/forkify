import icons from "url:../../img/icons.svg";
import { Fraction} from "fractional";
import { Veiw } from "./view";

class recipe_view extends Veiw {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "We could not find that recipe. Please try another one!";
  _message = "";
  display_ingredients_markup(ingredient) {
    return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${new Fraction(
          ingredient.quantity || 0
        ).toString()}</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ingredient.unit || ""}</span>
       ${ingredient.description || ""}
        </div>
      </li>
        `;
  }

  addhandlerrender(handler) {
    ["load", "hashchange"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
    // window.addEventListener("load", handler);
    // window.addEventListener("hashchange", handler);
  }

  display_recipe_markup() {
    return `
<figure class="recipe__fig">
  <img src=${this._data.image_url} alt="Tomato" class="recipe__img" />
  <h1 class="recipe__title">
    <span>${this._data.title}</span>
  </h1>
</figure>

<div class="recipe__details">
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${
      this._data.cooking_time
    }</span>
    <span class="recipe__info-text">minutes</span>
    tubular-druid-5c2d00
  </div>
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${
      this._data.servings
    }</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--increase-servings" data-update=${
        this._data.servings - 1
      }> 
        <svg>
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>
      <button class="btn--tiny btn--increase-servings" data-update=${
        this._data.servings + 1
      }>
        <svg>btn--inline 
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
  <button class="btn--round btn--bookmark">
    <svg class="">
      <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
    </svg>
  </button>
</div>

<div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">

  ${this._data.ingredients.map(this.display_ingredients_markup).join("")}
  </ul>
</div>

<div class="recipe__directions">
  <h2 class="heading--2">How to cook it</h2>
  <p class="recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
    directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
    target="_blank"
  >
    <span>Directions</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </a>
</div>
`;
  }

  addupdateserving(handler) {
    this._parentel.addEventListener("click", function (e) {
      let button = e.target.closest(".btn--increase-servings");
      if (!button) return;
      let update = +button.dataset.update;

      if (update <= 0) return;
      handler(update);
    });
  }

  addbookmarkhandler(handler) {
    this._parentel.addEventListener("click", (e) => {
      let button = e.target.closest(".btn--bookmark");
      if (!button) return;
      handler();
    });
  }
}

export default new recipe_view();
