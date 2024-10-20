$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var categoryName = urlParams.get("category");
  var $categoryMealsGrid = $("#category-meals-grid");

  if (categoryName) {
    var mealsRes = [];
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
      )
      .then((res) => {
        mealsRes = res.data.meals;
        console.log(mealsRes);

        var mealItems = mealsRes.map(function (meal) {
          var $mealItem = $("<a></a>")
            .attr(
              "href",
              `meals_detail.html?meal=${encodeURIComponent(meal.idMeal)}`
            )
            .addClass(
              "rounded-3xl bg-dark bg-opacity-50 h-56 bg-cover bg-blend-overlay hover:bg-opacity-60"
            )
            .css("background-image", `url('${meal.strMealThumb}')`);

          var $mealName = $("<span></span>")
            .addClass(
              "h-full text-white text-lg font-medium flex items-center justify-center text-center"
            )
            .text(meal.strMeal);

          $mealItem.append($mealName);
          return $mealItem;
        });

        $categoryMealsGrid.append(mealItems);
      })
      .catch((err) => {
        console.log("Error while fetching category details: ", err);
      });

    $("#category-name").text(`${categoryName} Meals`);
    $("#bc-lvl-3").text(categoryName);
  }
});
