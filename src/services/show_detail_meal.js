$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var mealId = urlParams.get("meal");
  var mealsRes = {};

  if (mealId) {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => {
        mealsRes = res.data.meals[0];
        console.log(mealsRes);

        var videoUrl = mealsRes.strYoutube; // Adjust according to your API structure

        var videoId = videoUrl.split("v=")[1]; // Get the part after 'v='
        if (videoId) {
          var ampersandPosition = videoId.indexOf("&"); // Find the position of '&' if present
          if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition); // Remove any additional parameters
          }
        }

        var embedUrl = `https://www.youtube.com/embed/${videoId}`;

        var i = 1;
        while (true) {
          var ingredient = mealsRes[`strIngredient${i}`];
          var measure = mealsRes[`strMeasure${i}`];

          if (!ingredient) {
            break;
          }

          var listItem = $("<li></li>").text(`${ingredient} ${measure}`);
          $("#meal-ingredient-list").append(listItem);

          i++;
        }

        $("#bc-lvl-3").text(mealsRes.strCategory);
        $("#bc-lvl-3").attr(
          "href",
          `category_detail.html?category=${encodeURIComponent(
            mealsRes.strCategory
          )}`
        );
        $("#bc-lvl-4").text(mealsRes.strMeal);
        $("#meal-name").text(mealsRes.strMeal);
        $("#meal-area").text(`${mealsRes.strArea} Culinary`);
        $("#meal-thumb").attr("src", mealsRes.strMealThumb);
        $("#meal-instruction").text(mealsRes.strInstructions);
        $("#meal-tutorial").attr("src", embedUrl);
      })
      .catch((err) => console.log("Errow while fetching meal details: ", err));
  }
});
