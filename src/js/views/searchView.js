import Resultrecipeview from "./reciperesultiew";
class search_view {
  #parentel = document.querySelector(".search");

  getquery() {
    let query = this.#parentel.querySelector(".search__field").value;
    this.clearquery();
    return query;
  }

  clearquery() {
    this.#parentel.querySelector(".search__field").value = "";
  }

  addhandlersearch(handler) {
    this.#parentel.addEventListener("submit", function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new search_view();
