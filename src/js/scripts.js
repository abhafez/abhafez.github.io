const dropdownIds = ["user-menu", "currency-menu", "locale-switcher", "filter-menu", "burger-menu", "search-menu", "locale-switcher-2", "currency-menu-2"]; // Add your dropdown menu IDs here

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

if ($(".anb-accordion").length) {
  $(".anb-accordion .anb-accordion-title").on("click", function (e) {
    // close siblings
    $(this).parent().siblings(".anb-accordion").removeClass("active");
    $(this).parent().siblings(".anb-accordion").find(".anb-accordion-content").slideUp(300);
    $(this).parent().siblings(".anb-accordion").find(".icon img:first-child").removeClass("hidden");
    $(this).parent().siblings(".anb-accordion").find(".icon img:last-child").addClass("hidden");

    $(this).parent().toggleClass("active");
    $(this).parent().find(".anb-accordion-content").slideToggle(300);
    $(this).parent().find(".icon img").toggleClass("hidden");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("touchstart", playVideo);
  function playVideo() {
    const video = document.getElementById("myVideo");
    if (video.playing) {
    } else {
      video.play();
    }
  }
});
