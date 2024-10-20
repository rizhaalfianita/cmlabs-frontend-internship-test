var categoryRes = [];
var $categoryGrid = $("#category-grid");

axios
  .get("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then((res) => {
    categoryRes = res.data.categories;

    var categoryItems = categoryRes.map(function (category) {
      var $categoryItem = $("<a></a>")
        .attr(
          "href",
          `category_detail.html?category=${encodeURIComponent(
            category.strCategory
          )}`
        )
        .addClass(
          "rounded-3xl bg-dark bg-opacity-40 h-32 bg-cover bg-blend-overlay hover:bg-opacity-60"
        )
        .css("background-image", `url('${category.strCategoryThumb}')`);

      var $categoryName = $("<span></span>")
        .addClass(
          "h-full text-white text-lg font-medium flex items-center justify-center"
        )
        .text(category.strCategory);

      $("#loading").text("");
      $categoryItem.append($categoryName);

      return $categoryItem;
    });

    $categoryGrid.append(categoryItems);
  })
  .catch((err) => {
    console.log("Error while fetching data: ", err);
  });
