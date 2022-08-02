// Modal Menu Toggle
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNavigation = document.querySelector(".primary-navigation");
const primaryHeader = document.querySelector(".navigation");
let dataVisible = false; //Bool if the modal menu is visible
let navToggleBool = false; //Bool for if the navToggle was clicked

//Test for if the navToggle was clicked and set to true
navToggle.addEventListener("click", function () {
  navToggleBool = true;
});

//Show/Hide the modal menu
document.addEventListener("click", function () {
  //If the navToggle was clicked show/hide the menu appropriately
  if (navToggleBool) {
    primaryNavigation.hasAttribute("data-visible")
      ? navToggle.setAttribute("aria-expanded", false)
      : navToggle.setAttribute("aria-expanded", true);
    primaryNavigation.toggleAttribute("data-visible");
    primaryHeader.toggleAttribute("data-overlay");
    toggleVisible();
    navToggleBool = false;
    //If the navToggle was not clicked test if the modal is displayed, if it is not then hide the modal menu
  } else if (dataVisible) {
    primaryNavigation.toggleAttribute("data-visible");
    toggleVisible();
  }
});

toggleVisible = function () {
  dataVisible = dataVisible ? false : true;
};
// End of Modal Menu Toggle
// Start of Darkmode
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
// End of Darkmode
