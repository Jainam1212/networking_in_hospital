document.addEventListener("DOMContentLoaded", function() {
  var targetElement = document.getElementById("target");
  var dropdown = targetElement.querySelector(".dropdown");

  targetElement.addEventListener("mouseover", function() {
    dropdown.style.display = "block";
  });

  targetElement.addEventListener("mouseout", function() {
    dropdown.style.display = "none";
  });
});
