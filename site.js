document.querySelectorAll("[data-current-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const path = window.location.pathname;

document.querySelectorAll(".marketingNavLink, .footerLink").forEach((link) => {
  const href = link.getAttribute("href");
  if (href && href === path) {
    link.setAttribute("aria-current", "page");
  }
});

if (path === "/") {
  const brand = document.querySelector(".marketingBrandRow");
  if (brand) {
    brand.setAttribute("href", "#top");
    brand.setAttribute("aria-current", "page");
  }
  const cta = document.querySelector(".marketingNavCta");
  if (cta) {
    cta.setAttribute("href", "#one-last-thing");
  }
}
