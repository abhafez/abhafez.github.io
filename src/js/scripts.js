document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key.toLowerCase() === "i") {
    event.preventDefault();
    document.documentElement.classList.toggle("dark");
  }
});

const dropdownIds = ["user-menu", "currency-menu", "locale-switcher", "filter-menu"]; // Add your dropdown menu IDs here

// Meny controller
$(document).ready(function () {
  // control dropdown menus
  dropdownIds.forEach((menuId) => {
    const $dropdown = $(`#${menuId}`).closest(".dropdown"); // Find parent dropdown container
    const $menu = $(`#${menuId}`); // Dropdown menu

    // Toggle menu on button click
    $dropdown.click(function (event) {
      event.stopPropagation(); // Prevent triggering document click
      $(".dropdown-menu").not($menu).addClass("hidden"); // Close other open menus
      $menu.toggleClass("hidden");
    });

    // Hide menu when clicking outside
    $(document).click(function () {
      $menu.addClass("hidden");
    });

    // Prevent menu from closing when clicking inside
    $menu.click(function (event) {
      event.stopPropagation();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector("#search-icon");
  const searchModal = document.getElementById("search-modal");
  const searchInput = document.getElementById("search-input");
  const closeSearch = document.getElementById("close-search");

  searchIcon.addEventListener("click", function () {
    searchModal.classList.remove("opacity-0", "invisible");
    searchModal.classList.add("opacity-100", "visible");
    searchInput.focus();
  });

  closeSearch.addEventListener("click", function () {
    searchModal.classList.add("opacity-0", "invisible");
    searchModal.classList.remove("opacity-100", "visible");
  });

  document.addEventListener("click", function (event) {
    if (!searchModal.contains(event.target) && !searchIcon.contains(event.target)) {
      searchModal.classList.add("opacity-0", "invisible");
      searchModal.classList.remove("opacity-100", "visible");
    }
  });
});
