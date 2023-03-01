import { Veiw } from "./view";
import icons from "../../img/icons.svg";
class Addrecipeview extends Veiw {
  _openbtn = document.querySelector(".nav__btn--add-recipe");
  _overlay = document.querySelector(".overlay");
  _model = document.querySelector(".add-recipe-window");
  _closebtn = document.querySelector(".btn--close-modal");
  _parentel = document.querySelector(".upload");
  _message = "Recipe was successfully uploaded :)";
  constructor() {
    super();
    this.addhandlertoggle();
    this.addhandleclose();
  }

  togglemodel() {
    this._overlay.classList.toggle("hidden");
    this._model.classList.toggle("hidden");
  }

  addhandlertoggle() {
    this._openbtn.addEventListener("click", this.togglemodel.bind(this));
  }
  addhandleclose() {
    this._closebtn.addEventListener("click", this.togglemodel.bind(this));
    this._overlay.addEventListener("click", this.togglemodel.bind(this));
  }

  adduploadhandler(handler) {
    this._parentel.addEventListener("submit", function (e) {
      e.preventDefault();

      let dataArr = [...new FormData(this)];
      let data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new Addrecipeview();
