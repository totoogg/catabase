export { apiSlice } from './api';
export { default as loaderReducer, selectIsLoader } from './loader/loaderSlice';
export {
  default as errorReducer,
  selectErrorDetail,
  selectErrorHome,
} from './error/errorSlice';
export { default as countReducer, selectCount } from './count/countSlice';
export { useLazyGetCatsQuery } from './cats/apiSliceWithCats';
