(function () {
  "use strict";

  var CONFIG = {
    phoneDisplay: "(00) 00000-0000",
    phoneTel: "+5500000000000",
    phoneWa: "5500000000000",
  };

  function formatWhatsAppLink(digits) {
    return "https://wa.me/" + digits.replace(/\D/g, "");
  }

  function applyContact() {
    var wa = document.getElementById("whatsapp-link");
    var phoneLink = document.getElementById("phone-link");
    var phoneDisplayEl = document.getElementById("phone-display");
    var footerPhone = document.getElementById("footer-phone");

    if (wa) {
      wa.href = formatWhatsAppLink(CONFIG.phoneWa);
    }
    if (phoneLink) {
      phoneLink.href = "tel:" + CONFIG.phoneTel.replace(/\s/g, "");
    }
    if (phoneDisplayEl) {
      phoneDisplayEl.textContent = CONFIG.phoneDisplay;
    }
    if (footerPhone) {
      footerPhone.textContent = CONFIG.phoneDisplay;
      footerPhone.href = "tel:" + CONFIG.phoneTel.replace(/\s/g, "");
    }
  }

  function initNav() {
    var header = document.querySelector(".header");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      });
    });

    document.addEventListener("click", function (e) {
      if (!header || header.contains(e.target)) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  function setYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initImageFallback() {
    document.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function onErr() {
        img.removeEventListener("error", onErr);
        if (img.src.indexOf("placehold.co") !== -1) return;
        var w = img.getAttribute("width") || "560";
        var h = img.getAttribute("height") || "560";
        img.src =
          "https://placehold.co/" + w + "x" + h + "/f0e8e2/6d4234?text=Foto";
      });
    });
  }

  applyContact();
  initNav();
  initReveal();
  setYear();
  initImageFallback();
})();
