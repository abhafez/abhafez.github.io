const dropdownIds = ["user-menu", "currency-menu", "locale-switcher", "filter-menu"]; // Add your dropdown menu IDs here

$(document).ready(function () {
  const mobileBreakpoint = 1024; // Tailwind's 'lg' breakpoint (adjust if needed)

  function isMobile() {
    return window.innerWidth < mobileBreakpoint;
  }

  dropdownIds.forEach((menuId) => {
    const $dropdown = $(`#${menuId}`).closest(".dropdown");
    const $menu = $(`#${menuId}`);

    if (!isMobile()) {
      // Desktop: Hover behavior
      $dropdown.off(); // Clear previous events
      $menu.off();

      $dropdown
        .on("mouseenter", function () {
          $(".dropdown-menu").not($menu).addClass("hidden"); // Close other menus
          $menu.removeClass("hidden");
        })
        .on("mouseleave", function () {
          $menu.addClass("hidden");
        });
    } else {
      // Mobile: Click behavior
      $dropdown.off(); // Clear previous events
      $menu.off();

      // Toggle menu on click
      $dropdown.on("click", function (event) {
        event.stopPropagation();
        $(".dropdown-menu").not($menu).addClass("hidden");
        $menu.toggleClass("hidden");
      });

      // Close when clicking outside
      $(document).on("click.mobile", function () {
        $menu.addClass("hidden");
      });

      // Prevent menu from closing when clicking inside
      $menu.on("click", function (event) {
        event.stopPropagation();
      });
    }
  });

  // Handle resize: re-apply handlers if screen size changes
  $(window).on("resize", function () {
    dropdownIds.forEach((menuId) => {
      const $dropdown = $(`#${menuId}`).closest(".dropdown");
      const $menu = $(`#${menuId}`);

      $dropdown.off();
      $menu.off();
      $(document).off("click.mobile");

      if (!isMobile()) {
        $dropdown
          .on("mouseenter", function () {
            $(".dropdown-menu").not($menu).addClass("hidden");
            $menu.removeClass("hidden");
          })
          .on("mouseleave", function () {
            $menu.addClass("hidden");
          });
      } else {
        $dropdown.on("click", function (event) {
          event.stopPropagation();
          $(".dropdown-menu").not($menu).addClass("hidden");
          $menu.toggleClass("hidden");
        });

        $(document).on("click.mobile", function () {
          $menu.addClass("hidden");
        });

        $menu.on("click", function (event) {
          event.stopPropagation();
        });
      }
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

function toggleTheme() {
  const html = document.getElementsByTagName("html")[0];
  const currentTheme = html.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle("dark");
  let icon = document.getElementById("theme-toggle");
  const themeDirectory = themeUrl();
  console.log(icon);
  if (currentTheme === "light") {
    icon.src = themeDirectory + "/assets/images/header/sun.svg";
  } else {
    icon.src = themeDirectory + "/assets/images/header/moon.svg";
  }
  localStorage.setItem("theme", newTheme);
}

function themeUrl() {
  return document.body.getAttribute("data-theme-url");
}
