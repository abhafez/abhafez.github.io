document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "i") {
        event.preventDefault();
        document.documentElement.classList.toggle("dark");
    }
});

