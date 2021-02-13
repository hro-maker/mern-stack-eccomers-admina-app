import { categoryConstans } from "../actions/constans";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};
const buildNewCategories = (parentId, categories, category) => {
  let newcategories = [];
  if (parentId == undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type:category.type,
        children: [],
      },
    ];
  }

  for (let cat of categories) {
    if (cat._id == parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type:category.type,
        parentId: category.parentId,
        children: [],
      };
      newcategories.push({
        ...cat,
        children:
          cat.children.length > 0
            ? [...cat.children, newCategory]
            : [newCategory],
      });
    } else {
      newcategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }
  return newcategories;
};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstans.GETT_ALL_CATEGORIES_REQUEST:
      return (state = {
        ...state,
        loading:true
      });
    case categoryConstans.GETT_ALL_CATEGORIES_SUCCES:
      return (state = {
        ...state,
        categories: action.payload.categories,
        loading:false
      });
      case categoryConstans.GETT_ALL_CATEGORIES_FAILURE:
      return (state = {
        ...state,
        loading:false,
        error:action.payload.error
      });
    case categoryConstans.ADD_NEW_CATEGORY_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case categoryConstans.ADD_NEW_CATEGORY_SUCCES:
      const category = action.payload.category;
      const updatedcategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );
      console.log(updatedcategories);
      return (state = {
        ...state,
        categories: updatedcategories,
        loading: false,
      });
    case categoryConstans.ADD_NEW_CATEGORY_FAILURE:
      return (state = {
        ...initialState,
        error:action.payload.error
      });
    case categoryConstans.UPDATE_CATEGORIES_SUCCES:
      return (state = {
            ...state,
            loading:false
      });
    case categoryConstans.UPDATE_CATEGORIES_REQUEST:
      return (state = {
        ...state,
        loading:true
      });
    case categoryConstans.UPDATE_CATEGORIES_FAILURE:
      return (state = {
          ...state,
          loading:false,
          error:action.payload.error

      });
      case categoryConstans.DELETE_CATEGORIES_SUCCES:
      return (state = {
            ...state,
            loading:false
      });
    case categoryConstans.DELETE_CATEGORIES_REQUEST:
      return (state = {
        ...state,
        loading:true
      });
    case categoryConstans.DELETE_CATEGORIES_FAILURE:
      return (state = {
          ...state,
          error:action.payload.error,
          loading:false

      });
    default:
      return state;
  }
};
export default categoryReducer;
