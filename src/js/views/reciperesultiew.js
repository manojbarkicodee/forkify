import { Veiw } from "./view";
import icons from "../../img/icons.svg";
import Preview from "./Preview";
class Resultrecipeview extends Veiw {
  // super()
  _parentel = document.querySelector(".results");
  _data;
  _errorMessage = "No recipes found for your query! Please try again ;)";
  _message = "";

  display_recipe_markup() {
    return this._data.map((result) => Preview.render(result, false)).join("");
  }
}

export default new Resultrecipeview();
