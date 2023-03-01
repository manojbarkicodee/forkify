import { Veiw } from "./view";
import icons from "../../img/icons.svg";
import Preview from "./Preview";
class Bookmarkrecipeview extends Veiw {
  // super()
  _parentel = document.querySelector(".bookmarks__list");
  _data;
  _errorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
  _message = "";

  display_recipe_markup() {
    // console.log(this._data)
    return this._data
      .map((bookmark) => Preview.render(bookmark, false))
      .join("");
  }
  addhandlerrender(handler) {
    window.addEventListener("load", handler);
  }
}

export default new Bookmarkrecipeview();
