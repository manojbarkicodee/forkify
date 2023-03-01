import { API_URL } from "./config";
import { getjson, sendjson } from "./helpers";
const state = {
  recipe: {},
  search: {
    query: "",
    data: [],
    page: 1,
    limit: 10,
  },
  bookmarks: [],
};

const loadRecipe = async function (id) {
  try {
    let data = await getjson(`${API_URL}/${id}`);
    state.recipe = data.data.recipe;
    
    if (state.bookmarks.some((el) => el.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const searchRecipe = async function (query) {
  try {
    let data = await getjson(
      `${API_URL}?search=${query || state.search.query}`
    );
    state.search.data = data.data.recipes;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getpagination = function (page = state.search.page) {
  state.search.page = page;
  let start = (page - 1) * state.search.limit;
  let end = page * state.search.limit;

  return state.search.data.slice(start, end);
};

const updateservings = function (update) {
  +update;
  state.recipe.ingredients.forEach((el) => {
    el.quantity = (el.quantity * update) / state.recipe.servings;
  });
  state.recipe.servings = update;
};
const persistbookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
const addbookmark = function (recipe) {
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  state.bookmarks = [...state.bookmarks, recipe];
  persistbookmarks();
};

const deltebookmark = function (id) {
  let index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);
  if ((id = state.recipe.id)) {
    state.recipe.bookmarked = false;
  }
  persistbookmarks();
};

let init = function () {
  state.bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
};
init();

let uploadrecipedata = async function (newrecipe) {
  try {
    let ingredients = Object.entries(newrecipe)
      .filter((el) => el[0].includes("ingredient") && el[1] !== "")
      .map((el) => {
        [quantity, unit, description] = el[1].trim().split(",");
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    let recipe = {
      title: newrecipe.title,
      source_url: newrecipe.sourceUrl,
      cooking_time: newrecipe.cookingTime,
      image_url: newrecipe.image,
      publisher: newrecipe.publisher,
      servings: newrecipe.servings,
      ingredients,
    };
    let data = await sendjson(
      `${API_URL}?key=a149e5b1-2630-4f52-8e22-58782d31b89f`,
      recipe
    );
    state.recipe = data;
    addbookmark(data);
  } catch (err) {
    throw err;
  }
};
export {
  state,
  loadRecipe,
  searchRecipe,
  getpagination,
  updateservings,
  addbookmark,
  deltebookmark,
  uploadrecipedata,
};
