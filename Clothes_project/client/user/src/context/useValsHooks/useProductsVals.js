import { useCallback } from "react";
import { useMemo } from "react";
import {
  setFilteredProducts,
  setProducts,
  setProductsLoading,
} from "../lib/products/products";
import { setProductItem } from "../lib/products/productItem";
import { handleChangeFilter } from "../lib/products/filters";
import { setProductsError } from "./../lib/products/products";
import { cleanSearch, setVisibleSearch } from "../lib/products/search";
import {
  applySearchFilter,
  applySorter,
  filterByMain,
  filterBySub,
} from "../lib/products/utils/applyFilters";

export const useProductsVals = ({ state, dispatch }) => {
  const { productsState } = state;
  const {
    products,
    filteredProducts,

    mainCategories,
    subCategories,

    sorter,

    search,
    visibleSearchBar,

    ...restVals
  } = productsState;

  const funForFilter = useMemo(
    () => [
      (products) => applySearchFilter(search, visibleSearchBar, products),
      (products) => filterByMain(mainCategories, products),
      (products) => filterBySub(subCategories, products),
      (products) => applySorter(sorter, products),
    ],
    [mainCategories, subCategories, sorter, search, visibleSearchBar]
  );

  const setProductsH = useCallback(() => setProducts(dispatch), [dispatch]);

  const setProductItemH = useCallback(
    (productId) => setProductItem(dispatch, productId),
    [dispatch]
  );

  const setFilteredProductsH = useCallback(
    () => setFilteredProducts(dispatch, funForFilter, products),
    [dispatch, funForFilter, products]
  );

  return {
    products,
    filteredProducts,

    setProductsH,
    setFilteredProductsH,
    setProductItemH,

    mainCategories,
    subCategories,

    sorter,

    search,
    visibleSearchBar,

    setProductsLoading: (field, status) =>
      setProductsLoading(dispatch, field, status),
    setProductsError: (field, err) => setProductsError(dispatch, field, err),

    handleChangeFilter: (e) => handleChangeFilter(dispatch, e),

    cleanSearch: () => cleanSearch(dispatch),

    setVisibleSearch: (status) => setVisibleSearch(dispatch, status),

    ...restVals,
  };
};
