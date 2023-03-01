import {
  state,
  loadRecipe,
  getpagination,
  updateservings,
  addbookmark,
  deltebookmark,
  uploadrecipedata,
} from "./model";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
import recipeView from "./views/recipeView";
import { searchRecipe } from "./model";
import search_view from "./views/searchView";
import Resultrecipeview from "./views/reciperesultiew";
import Paginationview from "./views/paginationview";
import Bookmarkrecipeview from "./views/Bookmarkview";
import Bookmarkview from "./views/Bookmarkview";
import Addrecipeview from "./views/Addrecipeview";

// https://forkify-api.herokuapp.com/v2

// 5d0523e5-c507-4aee-a978-63d5e9a1b4e5

///////////////////////////////////////

async function show_recipe() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.render_spinner();

    Resultrecipeview.update(getpagination());
    await loadRecipe(id);
    let { recipe } = state;
    if (recipe === {}) return;

    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
}

async function controlsearchresults() {
  try {
    let query = search_view.getquery();
    Resultrecipeview.render_spinner();

    if (query === "") {
      Resultrecipeview.renderError();
      return;
    }
    await searchRecipe(query);
    Resultrecipeview.render(getpagination(1));
    Paginationview.render(state.search);
  } catch (err) {
    console.log(err);
  }
}

function controlpageresults(goto) {
  Resultrecipeview.render(getpagination(+goto));
  Paginationview.render(state.search);
}

function controlupdates(update) {
  updateservings(update);
  recipeView.update(state.recipe);
}

function controlhandlerbookmark() {
  Bookmarkrecipeview.render(state.bookmarks);
}

function controlbookmarkes() {
  state.recipe.bookmarked
    ? deltebookmark(state.recipe.id)
    : addbookmark(state.recipe);

  recipeView.update(state.recipe);
  Bookmarkrecipeview.render(state.bookmarks);
}

async function controluploaddata(data) {
  try {
    Addrecipeview.render_spinner();

    await uploadrecipedata(data);

    window.history.pushState(null, "", `#${state.recipe.id}`);

    recipeView.render(state.recipe);

    Addrecipeview.renderMessage();
    setTimeout(() => {
      Addrecipeview.togglemodel();
    }, 1000);
  } catch (err) {
    console.error("💥", err);
    Addrecipeview.renderError(err.message);
  }
}

function init() {
  search_view.addhandlersearch(controlsearchresults);
  recipeView.addhandlerrender(show_recipe);
  Paginationview.paginationhandler(controlpageresults);
  recipeView.addupdateserving(controlupdates);
  recipeView.addbookmarkhandler(controlbookmarkes);
  Bookmarkview.addhandlerrender(controlhandlerbookmark);
  Addrecipeview.adduploadhandler(controluploaddata);
}
init();
