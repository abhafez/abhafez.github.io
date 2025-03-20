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
function toggleTheme(color) {
  const html = document.getElementsByTagName("html")[0];
  const currentTheme = html.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle("dark");
  let icon = document.getElementById("theme-toggle");
  const themeDirectory = themeUrl();
  console.log(icon);

  if (currentTheme === "light") {
    icon.src = `${themeDirectory}/assets/images/header/sun.svg`;
  } else {
    icon.src = `${themeDirectory}/assets/images/header/moon${color ? `-white` : ""}.svg`;
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
// ###################################
// Slider
// ###################################

$(document).ready(init);

var slideDuration = 3000;
var transitionDuration = 500; // faster transition for smoother feel

var id_slider = "#slider";
var class_sliderContainer = ".js-slider__container";
var class_slide = ".js-slider__item";
var class_slideLastChild = ".js-slider__item:last-child";
var class_slideFirstChild = ".js-slider__item:first-child";
var class_dots = ".slider__dot";

var class_controlNext = ".js-control--next";
var class_controlPrev = ".js-control--prev";

var slideCount = $(class_slide).length;
var sliderWidth;
var slideWidth;
var sliderUlWidth;
var autoplay;

var currentIndex = 0;
var isAnimating = false;

function init() {
  itemWidth();
  eventClickPrev();
  eventClickNext();
  autoplayer();
  prependToSlide();
  assignSizeSliderContainer();
  windowResize();
  eventClickDot(); // Optional for clickable dots
}

function windowResize() {
  $(window).on("resize", function () {
    itemWidth();
    assignSizeSliderContainer();
  });
}

function itemWidth() {
  sliderWidth = $(id_slider).width();
  $(class_slide).css("width", sliderWidth + "px");
  slideWidth = $(class_slide).width();
  sliderUlWidth = slideCount * slideWidth;
}

function autoplayer() {
  autoplay = setInterval(moveRight, slideDuration);
}

function prependToSlide() {
  $(class_slideLastChild).prependTo(class_sliderContainer);
}

function assignSizeSliderContainer() {
  $(class_sliderContainer).css({
    width: sliderUlWidth,
    marginLeft: "0", // Not needed with translate, but keeping it clean
    display: "flex", // Important for translateX to work properly
    transform: "translateX(0)",
  });
}

function moveLeft() {
  if (isAnimating) return;
  isAnimating = true;

  const container = $(class_sliderContainer);

  // Shift container right by 1 slide
  container.css({
    transition: `${transitionDuration}ms`,
    transform: `translateX(${slideWidth}px)`,
  });

  setTimeout(() => {
    // Instantly reset position and move last slide to the beginning
    container.css({
      transition: "none",
      transform: "translateX(0)",
    });

    $(class_slideLastChild).prependTo(container);

    isAnimating = false;
    updateDotIndex(-1);
  }, transitionDuration);
}

function moveRight() {
  if (isAnimating) return;
  isAnimating = true;

  const container = $(class_sliderContainer);

  // Shift container left by 1 slide
  container.css({
    transition: `${transitionDuration}ms`,
    transform: `translateX(-${slideWidth}px)`,
  });

  setTimeout(() => {
    // Instantly reset position and move first slide to the end
    container.css({
      transition: "none",
      transform: "translateX(0)",
    });

    $(class_slideFirstChild).appendTo(container);

    isAnimating = false;
    updateDotIndex(1);
  }, transitionDuration);
}

function updateDotIndex(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = slideCount - 1;
  } else if (currentIndex >= slideCount) {
    currentIndex = 0;
  }

  $(class_dots).removeClass("active");
  $(class_dots + `[data-index="${currentIndex}"]`).addClass("active");
}

function eventClickPrev() {
  $(class_controlPrev).click(function () {
    clearInterval(autoplay);
    moveLeft();
    autoplay = setInterval(moveRight, slideDuration);
  });
}

function eventClickNext() {
  $(class_controlNext).click(function () {
    clearInterval(autoplay);
    moveRight();
    autoplay = setInterval(moveRight, slideDuration);
  });
}

function eventClickDot() {
  $(class_dots).click(function () {
    clearInterval(autoplay);

    var targetIndex = $(this).data("index");

    if (targetIndex === currentIndex) {
      autoplay = setInterval(moveRight, slideDuration);
      return;
    }

    var diff = targetIndex - currentIndex;

    if (diff > 0) {
      for (var i = 0; i < diff; i++) {
        moveRight();
      }
    } else {
      for (var i = 0; i < Math.abs(diff); i++) {
        moveLeft();
      }
    }

    autoplay = setInterval(moveRight, slideDuration);
  });
}
