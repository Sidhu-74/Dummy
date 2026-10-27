(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
  }

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.matchMedia("(min-width: 761px)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  // Header border once the page scrolls
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  if (header) {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Reveal elements as they enter the viewport
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Contact form: validate, then hand off to the visitor's mail client.
  // Swap this for a form service (Formspree, Netlify Forms…) when one is set up.
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var rules = {
      name: function (v) { return v ? "" : "Please enter your name."; },
      email: function (v) {
        if (!v) return "Please enter your email.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "That email doesn't look right.";
      },
      message: function (v) {
        return v.length >= 10 ? "" : "Tell me a little more — at least a sentence.";
      }
    };

    function validate(input) {
      var check = rules[input.name];
      if (!check) return true;
      var msg = check(input.value.trim());
      var field = input.closest(".field");
      field.classList.toggle("has-error", !!msg);
      field.querySelector(".field-error").textContent = msg;
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      return !msg;
    }

    form.addEventListener("blur", function (e) {
      if (e.target.name in rules && e.target.value) validate(e.target);
    }, true);

    form.addEventListener("input", function (e) {
      if (e.target.closest(".has-error")) validate(e.target);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;
      Object.keys(rules).forEach(function (name) {
        var input = form.elements[name];
        if (!validate(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var data = new FormData(form);
      var subject = "Project enquiry" + (data.get("type") ? " — " + data.get("type") : "");
      var body = data.get("message") + "\n\n— " + data.get("name") + " (" + data.get("email") + ")";
      window.location.href = "mailto:" + form.dataset.to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      status.hidden = false;
      status.textContent = "Thanks, " + data.get("name") + "! Your email app should open with the message ready to send.";
      form.reset();
    });
  }
})();
