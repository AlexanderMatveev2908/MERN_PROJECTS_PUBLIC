export const applySearchFilter = (search, visibleSearchBar, products) => {
  if (!search || !visibleSearchBar) {
    return products;
  } else {
    return products.filter((product) => {
      const productTags = product.name.toLowerCase().split(" ");
      const searchWords = search.toLowerCase().split(" ");

      return (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        searchWords.every(
          (el) =>
            productTags.includes(el) ||
            productTags.some((tag) => tag.startsWith(el))
        )
      );
    });
  }
};

export const filterByMain = (mainCategories, products) => {
  return mainCategories?.length
    ? products.filter((product) => mainCategories.includes(product.category))
    : products;
};

export const filterBySub = (subCategories, products) => {
  return subCategories?.length
    ? products.filter((product) => subCategories.includes(product.subCategory))
    : products;
};

export const applySorter = (sorter, products) => {
  products = products.sort((a, b) => {
    switch (sorter) {
      case "relevant":
        return 0;

      case "low-high":
        return a.price - b.price;

      case "high-low":
        return b.price - a.price;

      default:
        throw new Error("Invalid sorter value");
    }
  });

  return products;
};
