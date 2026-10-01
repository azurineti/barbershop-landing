/* =========================================================
   Gold Blade — поведение страницы
   1.  Утилиты
   2.  Шапка, полоса прогресса, кнопка «наверх» (прокрутка)
   3.  Мобильное меню
   4.  Подсветка активного пункта меню
   5.  Параллакс в hero
   6.  Статус «Открыто / Закрыто» (по времени барбершопа)
   7.  Появление блоков при прокрутке + счётчики
   8.  Услуги: фильтр, выбор и подсчёт «Мой визит»
   9.  Слайдер отзывов
   10. Фото-плейсхолдеры и галерея (лайтбокс)
   11. Мелочи: год, инициалы в отзывах
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. Утилиты ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function t(key) { return window.GB_I18N ? window.GB_I18N.t(key) : key; }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- НАСТРОЙКИ БАРБЕРШОПА (меняй здесь) ---------- */
  var SHOP = {
    timeZone: "Asia/Almaty",  // часовой пояс барбершопа
    openHour: 10,             // открываемся в 10:00
    closeHour: 21             // закрываемся в 21:00
  };

  /* ---------- 2. Прокрутка: шапка, прогресс, «наверх» ---------- */
  var header = $("#header");
  var progress = $("#progress");
  var toTop = $("#to-top");
  var hero = $("#home");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.pageYOffset || 0;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      header.classList.toggle("is-scrolled", y > 10);
      progress.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
      toTop.classList.toggle("is-on", y > 600);
      if (!reduceMotion && y < window.innerHeight * 1.3) hero.style.setProperty("--sy", Math.round(y));
    });
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- 3. Мобильное меню ---------- */
  var burger = $("#burger");
  var nav = $("#nav");

  function setMenu(open) {
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  burger.addEventListener("click", function () {
    setMenu(burger.getAttribute("aria-expanded") !== "true");
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  window.addEventListener("resize", function () { if (window.innerWidth > 900) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- 4. Активный пункт меню ---------- */
  var navLinks = $$('.nav__list a[href^="#"]:not(.btn)');
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navLinks.forEach(function (a) {
      var sec = $(a.getAttribute("href"));
      if (sec) spy.observe(sec);
    });
  }

  /* ---------- 5. Параллакс в hero (мышь на десктопе) ---------- */
  var art = $(".hero__art");
  if (finePointer && !reduceMotion && art) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      art.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      art.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    hero.addEventListener("pointerleave", function () {
      art.style.setProperty("--mx", 0);
      art.style.setProperty("--my", 0);
    });
  }

  /* ---------- 6. Статус «Открыто сейчас» ---------- */
  var statusBox = $("#status");
  var statusText = $("#status-text");

  function shopHour() {
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: SHOP.timeZone, hour: "2-digit", hour12: false
      }).formatToParts(new Date());
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].type === "hour") return parseInt(parts[i].value, 10) % 24;
      }
    } catch (e) { /* старый браузер — берём локальное время */ }
    return new Date().getHours();
  }
  function updateStatus() {
    var h = shopHour();
    var open = h >= SHOP.openHour && h < SHOP.closeHour;
    statusBox.classList.toggle("is-closed", !open);
    var time = (open ? SHOP.closeHour : SHOP.openHour) + ":00";
    statusText.textContent = t(open ? "st.open" : "st.closed").replace("{t}", time);
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- 7. Появление при прокрутке + счётчики ---------- */
  var revealSel = ".sec-head, .stat, .service, .master, .g, .slider, .contacts__info, .contacts__map";
  var revealEls = $$(revealSel);
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  $$(".services, .team, .gallery, .stats__grid").forEach(function (grid) {
    $$(":scope > *", grid).forEach(function (c, i) { c.style.setProperty("--d", (i % 4) * 80 + "ms"); });
  });

  var counters = $$("[data-count]");
  function fmt(v, dec) {
    return dec ? v.toFixed(dec) : Math.round(v).toLocaleString("ru-RU");
  }
  function runCounter(el) {
    var end = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suf = el.getAttribute("data-suffix") || "";
    var dur = 1500, t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(end * eased, dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window && !reduceMotion) {
    counters.forEach(function (el) { el.textContent = "0" + (el.getAttribute("data-suffix") || ""); });
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add("is-in");
        var c = el.hasAttribute("data-count") ? el : $("[data-count]", el);
        if (c && !c.__done) { c.__done = true; runCounter(c); }
        revealIO.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- 8. Услуги: фильтр, выбор, «Мой визит» ---------- */
  var cards = $$(".service");
  var filterBtns = $$(".filter button");
  var picker = $("#picker");
  var pkCount = $("#pk-count");
  var pkTotal = $("#pk-total");
  var pkTime = $("#pk-time");
  var picked = $("#picked");
  var pickedList = $("#picked-list");
  var pickedTotal = $("#picked-total");
  var waLink = $("#wa-link");
  var selected = {};   // id -> карточка

  function money(n) { return n.toLocaleString("ru-RU") + " ₸"; }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      cards.forEach(function (c) {
        var show = f === "all" || c.getAttribute("data-cat").split(" ").indexOf(f) > -1;
        c.classList.toggle("is-hidden", !show);
        if (show) {
          c.classList.add("is-in");
          c.classList.remove("pop");
          void c.offsetWidth;            // перезапуск анимации
          c.classList.add("pop");
        }
      });
    });
  });

  function setPressed(card, on) {
    var btn = $(".service__add", card);
    var label = $("span", btn);
    var key = on ? "pk.added" : "pk.add";
    card.classList.toggle("is-selected", on);
    btn.setAttribute("aria-pressed", String(on));
    label.setAttribute("data-i18n", key);
    label.textContent = t(key);
  }

  function updatePicker() {
    var ids = Object.keys(selected);
    var total = 0, time = 0, names = [];
    ids.forEach(function (id) {
      var c = selected[id];
      total += parseInt(c.getAttribute("data-price"), 10);
      time += parseInt(c.getAttribute("data-time"), 10);
      names.push($("h3", c).textContent);
    });

    pkCount.textContent = ids.length;
    pkTotal.textContent = money(total);
    pkTime.textContent = time + " " + t("unit.min");
    picker.classList.toggle("is-on", ids.length > 0);
    document.body.classList.toggle("has-picker", ids.length > 0);
    document.documentElement.style.setProperty("--picker-h", (ids.length ? picker.offsetHeight : 0) + "px");

    // блок «Ваш выбор» в контактах + готовое сообщение в WhatsApp
    picked.hidden = ids.length === 0;
    pickedList.innerHTML = "";
    names.forEach(function (n) {
      var li = document.createElement("li");
      li.textContent = n;
      pickedList.appendChild(li);
    });
    pickedTotal.textContent = ids.length ? money(total) + " · " + time + " " + t("unit.min") : "";

    var base = waLink.getAttribute("data-base");
    waLink.href = ids.length
      ? base + "?text=" + encodeURIComponent(t("pk.wa") + names.join(", ") + " (" + money(total) + ")")
      : base;
  }

  cards.forEach(function (card) {
    $(".service__add", card).addEventListener("click", function () {
      var id = card.getAttribute("data-id");
      var on = !selected[id];
      if (on) selected[id] = card; else delete selected[id];
      setPressed(card, on);
      updatePicker();
    });
  });
  $("#pk-clear").addEventListener("click", function () {
    Object.keys(selected).forEach(function (id) { setPressed(selected[id], false); });
    selected = {};
    updatePicker();
  });
  window.addEventListener("resize", function () { if (picker.classList.contains("is-on")) updatePicker(); });

  /* ---------- 9. Слайдер отзывов ---------- */
  var track = $("#slider-track");
  var slides = $$(".slide", track);
  var dotsBox = $("#sl-dots");
  var btnPrev = $("#sl-prev");
  var btnNext = $("#sl-next");
  var step = 0, pages = 1, index = 0, timer = null, userHold = false;

  function measure() {
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    step = slides[0].offsetWidth + gap;
    var perView = Math.max(1, Math.round((track.clientWidth + gap) / step));
    var newPages = Math.max(1, slides.length - perView + 1);
    if (newPages !== pages || !dotsBox.children.length) {
      pages = newPages;
      dotsBox.innerHTML = "";
      for (var i = 0; i < pages; i++) {
        (function (n) {
          var b = document.createElement("button");
          b.type = "button";
          b.setAttribute("aria-label", "Slide " + (n + 1));
          b.addEventListener("click", function () { goTo(n); restartAuto(); });
          dotsBox.appendChild(b);
        })(i);
      }
    }
    markActive();
  }
  function markActive() {
    index = Math.max(0, Math.min(pages - 1, Math.round(track.scrollLeft / (step || 1))));
    $$("button", dotsBox).forEach(function (b, i) { b.classList.toggle("is-active", i === index); });
    btnPrev.disabled = index === 0;
    btnNext.disabled = index === pages - 1;
  }
  function goTo(n) {
    n = Math.max(0, Math.min(pages - 1, n));
    track.scrollTo({ left: n * step, behavior: reduceMotion ? "auto" : "smooth" });
  }
  function auto() {
    if (reduceMotion || userHold || document.hidden) return;
    goTo(index >= pages - 1 ? 0 : index + 1);
  }
  function restartAuto() {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(auto, 5500);
  }

  var scrollTimer;
  track.addEventListener("scroll", function () {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(markActive, 60);
  }, { passive: true });
  btnPrev.addEventListener("click", function () { goTo(index - 1); restartAuto(); });
  btnNext.addEventListener("click", function () { goTo(index + 1); restartAuto(); });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { goTo(index + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { goTo(index - 1); e.preventDefault(); }
  });
  ["mouseenter", "focusin", "touchstart", "pointerdown"].forEach(function (ev) {
    track.addEventListener(ev, function () { userHold = true; }, { passive: true });
  });
  ["mouseleave", "focusout", "touchend", "pointerup"].forEach(function (ev) {
    track.addEventListener(ev, function () { userHold = false; restartAuto(); }, { passive: true });
  });
  window.addEventListener("resize", measure);
  measure();
  restartAuto();

  /* ---------- 10. Фото-плейсхолдеры и галерея ---------- */
  $$(".ph").forEach(function (box) {
    var img = $("img", box);
    if (!img) return;
    function missing() { box.classList.add("is-missing"); }
    img.addEventListener("error", missing);
    if (img.complete && img.naturalWidth === 0) missing();
  });

  var lightbox = $("#lightbox");
  var lbImg = $("img", lightbox);
  var lbCount = $("#lb-count");
  var lbIndex = 0;
  var figs = $$(".gallery .g");

  function lbItems() { return figs.filter(function (f) { return !f.classList.contains("is-missing"); }); }
  function lbShow(i) {
    var items = lbItems();
    if (!items.length) return;
    lbIndex = (i + items.length) % items.length;
    var img = $("img", items[lbIndex]);
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCount.textContent = (lbIndex + 1) + " / " + items.length;
  }
  function lbOpen(fig) {
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lbShow(lbItems().indexOf(fig));
  }
  function lbClose() {
    lightbox.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  }
  figs.forEach(function (fig) {
    fig.addEventListener("click", function () {
      if (!fig.classList.contains("is-missing")) lbOpen(fig);
    });
  });
  $(".lightbox__nav--prev", lightbox).addEventListener("click", function (e) { e.stopPropagation(); lbShow(lbIndex - 1); });
  $(".lightbox__nav--next", lightbox).addEventListener("click", function (e) { e.stopPropagation(); lbShow(lbIndex + 1); });
  lightbox.addEventListener("click", function (e) { if (e.target !== lbImg) lbClose(); });
  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") lbClose();
    if (e.key === "ArrowRight") lbShow(lbIndex + 1);
    if (e.key === "ArrowLeft") lbShow(lbIndex - 1);
  });
  var touchX = null;
  lightbox.addEventListener("touchstart", function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  /* ---------- 11. Мелочи ---------- */
  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  function updateAvatars() {
    $$(".review").forEach(function (r) {
      var name = $("cite", r).textContent.trim();
      $(".avatar", r).textContent = name.charAt(0).toUpperCase();
    });
  }

  // при смене языка обновляем динамические тексты
  document.addEventListener("langchange", function () {
    updateStatus();
    updateAvatars();
    updatePicker();
  });
  updateAvatars();
})();
