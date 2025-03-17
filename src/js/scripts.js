// Menus
const dropdownIds = ["filter-more-menu", "user-menu", "currency-menu", "locale-switcher", "filter-menu", "burger-menu", "search-menu", "locale-switcher-2", "currency-menu-2"];

$(document).ready(function () {
  const mobileBreakpoint = 1024; // Tailwind's 'lg' breakpoint (adjust if needed)

  function isMobile() {
    return window.innerWidth < mobileBreakpoint;
  }

  dropdownIds.forEach((menuId) => {
    const $dropdown = $(`#${menuId}`).closest(".dropdown");
    const $menu = $(`#${menuId}`);

    // HOVER CODE. COMMENTED BECAUSE IT'S NOT WORKING WELL
    // if (!isMobile()) {
    //   // Desktop: Hover behavior
    //   $dropdown.off(); // Clear previous events
    //   $menu.off();
    //
    //   $dropdown
    //     .on("mouseenter", function () {
    //       $(".dropdown-menu").not($menu).addClass("hidden"); // Close other menus
    //       $menu.removeClass("hidden");
    //     })
    //     .on("mouseleave", function () {
    //       if ($menu.is(":hover")) {
    //         return;
    //       }
    //
    //       setTimeout(() => {
    //         $menu.addClass("hidden");
    //       }, 500);
    //     });
    // } else {
    // Mobile: Click behavior
    // $dropdown.off(); // Clear previous events
    // $menu.off();

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
    // }
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
// End Menus

// ###################################
// TOGGLE THEME START
// ###################################
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
// ###################################
// TOGGLE THEME END
// ###################################

// ###################################
// ACCORDION START
// ###################################
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
// ###################################
// ACCORDION END
// ###################################

// ###################################
// Video START
// ###################################
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

// if item with id toggle-mute or watch-video-btn let it open a modal with the video with controls

["toggle-mute", "watch-video-btn"].forEach((id) => {
  const button = document.getElementById(id);
  if (button) {
    button.addEventListener("click", function () {
      // open modal with the id video-modal
      const modal = document.getElementById("video-modal");
      const video = document.getElementById("myVideo");
      const closeModal = document.getElementById("close-modal");
      modal.classList.remove("hidden");

      // make page non scrollable
      document.body.style.overflow = "hidden";

      // close modal when clicking close-modal
      closeModal.addEventListener("click", function () {
        const video = document.getElementById("modal-video");
        video.pause();
        modal.classList.add("hidden");
      });

      // make click outside the modal close the modal
      modal.addEventListener("click", function (e) {
        if (e.target !== modal) {
          const video = document.getElementById("modal-video");
          video.pause();
          modal.classList.add("hidden");
          document.body.style.overflow = "auto";
        }
      });

      // on click esc while modal is open close the modal and stop video
      document.addEventListener("keydown", function (e) {
        // make page scrollable again
        document.body.style.overflow = "auto";

        if (e.key === "Escape") {
          const video = document.getElementById("modal-video");
          video.pause();
          modal.classList.add("hidden");
        }
      });
    });
  }
});

// ###################################
// Smart Menu START
// ###################################
const container = document.getElementById("button-container");
const moreContainer = document.getElementById("more-container");
const moreButton = document.getElementById("more-button");
const moreMenu = document.getElementById("more-menu");

// Exclude 'more' button from the buttons array
let buttons = Array.from(container.querySelectorAll(".nav-button")).filter((btn) => btn !== moreButton);

function updateMenu() {
  // Reset: move all buttons back into container (except moreContainer)
  buttons.forEach((btn) => {
    container.insertBefore(btn, moreContainer);
    btn.style.display = "flex"; // Ensure all buttons are visible initially
  });

  const containerWidth = container.clientWidth;
  const moreButtonWidth = moreContainer.offsetWidth;
  let availableWidth = containerWidth - moreButtonWidth - 16; // 16px margin

  let totalWidth = 0;
  let movedToMore = [];

  buttons.forEach((btn) => {
    const btnWidth = btn.offsetWidth;
    if (totalWidth + btnWidth <= availableWidth) {
      totalWidth += btnWidth;
    } else {
      movedToMore.push(btn);
      btn.style.display = "none";
    }
  });

  // Clear previous dropdown items
  moreMenu.innerHTML = "";

  if (movedToMore.length > 0) {
    movedToMore.forEach((btn) => {
      const clone = btn.cloneNode(true);
      clone.style.display = "flex";
      moreMenu.appendChild(clone);
    });
    moreContainer.style.display = "flex";
  } else {
    moreContainer.style.display = "none";
  }
}

// Debounce utility
function debounce(func, wait = 100) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const debouncedUpdateMenu = debounce(updateMenu, 150); // 150ms delay feels smooth

// Toggle dropdown on click
moreButton.addEventListener("click", () => {
  moreMenu.classList.toggle("hidden");
});

// Handle clicks outside to close menu
document.addEventListener("click", (e) => {
  if (!moreContainer.contains(e.target)) {
    moreMenu.classList.add("hidden");
  }
});

// Resize observer using debounced version
const resizeObserver = new ResizeObserver(debouncedUpdateMenu);
resizeObserver.observe(container);

// Initial load and resize handling
window.addEventListener("load", updateMenu);
window.addEventListener("resize", updateMenu);
// ###################################
// Smart Menu END
// ###################################

// ###################################
// TABS
// ###################################

function openTab(evt, tabId) {
  const contents = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");

  contents.forEach((content) => content.classList.add("hidden"));
  buttons.forEach((button) => button.classList.remove("active-tab", "bg-primary-title"));

  document.getElementById(tabId).classList.remove("hidden");
  evt.currentTarget.classList.add("active-tab", "bg-primary-title");
}
