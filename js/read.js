
// Get all the "Read More" links
const readMoreLinks = document.querySelectorAll(".read-more-trial");

// Loop through each link and attach a click event
readMoreLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const content = this.previousElementSibling;

    if (content.style.maxHeight) {
      // Content is expanded, so collapse it
      content.style.maxHeight = null;
      content.style.overflow = "hidden";
      this.textContent = "Read More";
    } else {
      // Content is collapsed, so expand it
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.overflow = "visible";
      this.textContent = "Read Less";
    }
  });
});

