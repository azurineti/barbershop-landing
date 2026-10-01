/* =========================================================
   Переводы: русский (ru), English (en), қазақша (kk)
   Чтобы изменить текст — правь значения ниже.
   В HTML каждый переводимый элемент помечен data-i18n="ключ".
   ========================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "goldblade-lang";
  var DEFAULT_LANG = "ru";

  var T = {
    ru: {
      "meta.title": "Gold Blade — барбершоп",
      "meta.desc": "Мужские стрижки, уход за бородой и классическое бритьё опасной бритвой. Запись онлайн.",

      "nav.services": "Услуги",
      "nav.team": "Мастера",
      "nav.gallery": "Работы",
      "nav.reviews": "Отзывы",
      "nav.contacts": "Контакты",
      "cta.book": "Записаться",

      "hero.tag": "Барбершоп",
      "hero.text": "Мужские стрижки, уход за бородой и классическое бритьё опасной бритвой.",
      "hero.more": "Услуги и цены",

      "sv.title": "Услуги и цены",
      "sv.sub": "Честные цены, без скрытых доплат.",
      "sv.note": "Цены ориентировочные и зависят от длины и сложности.",
      "unit.min": "мин",
      "sv1.t": "Классическая стрижка", "sv1.d": "Ножницы и машинка, мытьё головы, укладка.",
      "sv2.t": "Оформление бороды", "sv2.d": "Форма, чёткий контур и уход маслом.",
      "sv3.t": "Бритьё опасной бритвой", "sv3.d": "Горячее полотенце, пена и классическое бритьё.",
      "sv4.t": "Стрижка + борода", "sv4.d": "Полный образ за один визит — выгоднее, чем по отдельности.",
      "sv5.t": "Уход за волосами", "sv5.d": "Маска, питание и восстановление после мытья.",
      "sv6.t": "Массаж головы", "sv6.d": "Снимает напряжение после рабочего дня.",

      "tm.title": "Наши мастера",
      "tm.sub": "У каждого свой почерк и годы практики.",
      "tm.exp": "лет опыта",
      "role.senior": "Старший барбер",
      "role.barber": "Барбер",
      "role.beard": "Мастер по бороде",
      "role.junior": "Джуниор барбер",
      "n1": "Арман", "n2": "Дамир", "n3": "Тимур", "n4": "Алия",

      "gl.title": "Наши работы",
      "gl.sub": "Стрижки, бороды и бритьё — прямо из кресла.",
      "gl.follow": "Больше работ в Instagram",

      "rv.title": "Отзывы клиентов",
      "rv.score": "средняя оценка",
      "rv1": "Лучшая стрижка за последние годы. Мастер выслушал и предложил форму под моё лицо — результат огонь.",
      "rv2": "Бритьё с горячим полотенцем — отдельное удовольствие. Атмосфера, музыка, кофе. Приду ещё.",
      "rv3": "Записался за минуту и не ждал ни минуты. Борода наконец выглядит так, как я хотел.",
      "rn1": "Данияр", "rn2": "Максим", "rn3": "Ерлан",

      "ct.title": "Как записаться",
      "ct.text": "Позвони или напиши в мессенджер — подберём удобное время.",
      "ct.addr.l": "Адрес",
      "ct.addr.v": "г. Алматы, ул. Примерная, 12",
      "ct.phone.l": "Телефон",
      "ct.hours.l": "Часы работы",
      "ct.hours.v": "Ежедневно 10:00–21:00",
      "ct.call": "Позвонить",

      "f.all": "Все", "f.hair": "Стрижки", "f.beard": "Борода и бритьё", "f.care": "Уход",
      "pk.add": "Добавить", "pk.added": "Выбрано", "pk.selected": "Выбрано", "pk.clear": "Сбросить",
      "pk.yours": "Ваш выбор", "pk.wa": "Здравствуйте! Хочу записаться: ",
      "sx.years": "лет с вами", "sx.clients": "довольных клиентов", "sx.masters": "мастера в команде", "sx.rating": "средняя оценка",
      "st.open": "Открыто до {t}", "st.closed": "Закрыто, откроемся в {t}",
      "rv4": "Хожу сюда второй год. Всегда вовремя, всегда чисто, мастера знают своё дело.",
      "rv5": "Привёл сына на первую стрижку — мастер нашёл подход, ребёнок вышел довольный.",
      "rv6": "Хороший свет, удобные кресла и аккуратная работа. Лучший барбершоп в районе.",
      "rn4": "Алихан", "rn5": "Сергей", "rn6": "Нурлан",
      "ft.rights": "Все права защищены."
    },

    en: {
      "meta.title": "Gold Blade — barbershop",
      "meta.desc": "Men's haircuts, beard care and classic straight-razor shaves. Book online.",

      "nav.services": "Services",
      "nav.team": "Barbers",
      "nav.gallery": "Gallery",
      "nav.reviews": "Reviews",
      "nav.contacts": "Contacts",
      "cta.book": "Book now",

      "hero.tag": "Barbershop",
      "hero.text": "Men's haircuts, beard care and classic straight-razor shaves.",
      "hero.more": "Services and prices",

      "sv.title": "Services and prices",
      "sv.sub": "Fair prices, no hidden extras.",
      "sv.note": "Prices are approximate and depend on length and complexity.",
      "unit.min": "min",
      "sv1.t": "Classic haircut", "sv1.d": "Scissors and clippers, wash and styling.",
      "sv2.t": "Beard trim", "sv2.d": "Shape, sharp line-up and an oil finish.",
      "sv3.t": "Straight-razor shave", "sv3.d": "Hot towel, lather and a classic shave.",
      "sv4.t": "Haircut + beard", "sv4.d": "The full look in one visit — cheaper than booking separately.",
      "sv5.t": "Hair care", "sv5.d": "Mask, nourishment and repair after the wash.",
      "sv6.t": "Head massage", "sv6.d": "Melts away the tension after a long day.",

      "tm.title": "Meet the barbers",
      "tm.sub": "Each with their own signature and years of practice.",
      "tm.exp": "yrs experience",
      "role.senior": "Senior barber",
      "role.barber": "Barber",
      "role.beard": "Beard specialist",
      "role.junior": "Junior barber",
      "n1": "Arman", "n2": "Damir", "n3": "Timur", "n4": "Aliya",

      "gl.title": "Our work",
      "gl.sub": "Haircuts, beards and shaves — straight from the chair.",
      "gl.follow": "More work on Instagram",

      "rv.title": "Client reviews",
      "rv.score": "average rating",
      "rv1": "Best haircut I've had in years. The barber listened and suggested a shape that suits my face — fire.",
      "rv2": "A hot-towel shave is a treat of its own. Great vibe, music and coffee. I'll be back.",
      "rv3": "Booked in a minute and didn't wait at all. My beard finally looks the way I wanted.",
      "rn1": "Daniyar", "rn2": "Maxim", "rn3": "Yerlan",

      "ct.title": "How to book",
      "ct.text": "Call us or message in your favorite app — we'll find a time that suits you.",
      "ct.addr.l": "Address",
      "ct.addr.v": "12 Example St., Almaty",
      "ct.phone.l": "Phone",
      "ct.hours.l": "Opening hours",
      "ct.hours.v": "Daily 10:00–21:00",
      "ct.call": "Call us",

      "f.all": "All", "f.hair": "Haircuts", "f.beard": "Beard & shave", "f.care": "Care",
      "pk.add": "Add", "pk.added": "Added", "pk.selected": "Selected", "pk.clear": "Clear",
      "pk.yours": "Your selection", "pk.wa": "Hi! I'd like to book: ",
      "sx.years": "years with you", "sx.clients": "happy clients", "sx.masters": "barbers on the team", "sx.rating": "average rating",
      "st.open": "Open until {t}", "st.closed": "Closed, opening at {t}",
      "rv4": "Second year as a regular. Always on time, always clean, and the barbers know their craft.",
      "rv5": "Brought my son for his first haircut — the barber won him over and he left happy.",
      "rv6": "Great light, comfy chairs and clean work. The best barbershop in the area.",
      "rn4": "Alikhan", "rn5": "Sergey", "rn6": "Nurlan",
      "ft.rights": "All rights reserved."
    },

    kk: {
      "meta.title": "Gold Blade — барбершоп",
      "meta.desc": "Ерлерге арналған шаш қию, сақал күтімі және ұстарамен классикалық қыру. Онлайн жазылу.",

      "nav.services": "Қызметтер",
      "nav.team": "Шеберлер",
      "nav.gallery": "Жұмыстар",
      "nav.reviews": "Пікірлер",
      "nav.contacts": "Байланыс",
      "cta.book": "Жазылу",

      "hero.tag": "Барбершоп",
      "hero.text": "Ерлерге арналған шаш қию, сақал күтімі және қауіпті ұстарамен классикалық қыру.",
      "hero.more": "Қызметтер мен бағалар",

      "sv.title": "Қызметтер мен бағалар",
      "sv.sub": "Адал бағалар, жасырын төлемсіз.",
      "sv.note": "Бағалар шамамен берілген, шаштың ұзындығы мен күрделілігіне байланысты.",
      "unit.min": "мин",
      "sv1.t": "Классикалық шаш қию", "sv1.d": "Қайшы мен машинка, бас жуу, сәндеу.",
      "sv2.t": "Сақалды пішімдеу", "sv2.d": "Пішін, анық контур және майлы күтім.",
      "sv3.t": "Ұстарамен қыру", "sv3.d": "Ыстық сүлгі, көбік және классикалық қыру.",
      "sv4.t": "Шаш қию + сақал", "sv4.d": "Толық образ бір келгенде — бөлек жазылғаннан тиімдірек.",
      "sv5.t": "Шаш күтімі", "sv5.d": "Маска, қоректендіру және жуғаннан кейінгі қалпына келтіру.",
      "sv6.t": "Бас массажы", "sv6.d": "Жұмыс күнінен кейінгі шаршауды басады.",

      "tm.title": "Біздің шеберлер",
      "tm.sub": "Әрқайсысының өз қолтаңбасы мен тәжірибесі бар.",
      "tm.exp": "жыл тәжірибе",
      "role.senior": "Аға барбер",
      "role.barber": "Барбер",
      "role.beard": "Сақал маманы",
      "role.junior": "Жас барбер",
      "n1": "Арман", "n2": "Дамир", "n3": "Тимур", "n4": "Алия",

      "gl.title": "Біздің жұмыстар",
      "gl.sub": "Шаш қию, сақал және қыру — тікелей креслодан.",
      "gl.follow": "Instagram-да көбірек",

      "rv.title": "Клиенттер пікірі",
      "rv.score": "орташа баға",
      "rv1": "Соңғы жылдардағы ең жақсы шаш қию. Шебер мұқият тыңдап, бетіме жарасатын пішін ұсынды — керемет.",
      "rv2": "Ыстық сүлгімен қыру — бөлек ләззат. Атмосфера, музыка, кофе. Тағы келемін.",
      "rv3": "Бір минутта жазылдым, күтпедім де. Сақалым ақыры мен қалағандай болды.",
      "rn1": "Данияр", "rn2": "Максим", "rn3": "Ерлан",

      "ct.title": "Қалай жазылуға болады",
      "ct.text": "Қоңырау шалыңыз немесе мессенджерге жазыңыз — ыңғайлы уақытты табамыз.",
      "ct.addr.l": "Мекенжай",
      "ct.addr.v": "Алматы қ., Мысал к-сі, 12",
      "ct.phone.l": "Телефон",
      "ct.hours.l": "Жұмыс уақыты",
      "ct.hours.v": "Күн сайын 10:00–21:00",
      "ct.call": "Қоңырау шалу",

      "f.all": "Барлығы", "f.hair": "Шаш қию", "f.beard": "Сақал және қыру", "f.care": "Күтім",
      "pk.add": "Қосу", "pk.added": "Таңдалды", "pk.selected": "Таңдалды", "pk.clear": "Тазалау",
      "pk.yours": "Сіздің таңдауыңыз", "pk.wa": "Сәлеметсіз бе! Жазылғым келеді: ",
      "sx.years": "жыл бірге", "sx.clients": "разы клиент", "sx.masters": "команда шеберлері", "sx.rating": "орташа баға",
      "st.open": "{t} дейін ашық", "st.closed": "Жабық, {t} ашамыз",
      "rv4": "Екінші жыл тұрақты келемін. Әрдайым уақытында, таза, шеберлер өз ісін біледі.",
      "rv5": "Ұлымды алғашқы шаш алдыруға әкелдім — шебер тіл тапты, бала риза болып шықты.",
      "rv6": "Жарығы жақсы, креслолары ыңғайлы, жұмысы таза. Аудандағы ең жақсы барбершоп.",
      "rn4": "Әлихан", "rn5": "Сергей", "rn6": "Нұрлан",
      "ft.rights": "Барлық құқықтар қорғалған."
    }
  };

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  var current = DEFAULT_LANG;

  function setLang(lang) {
    if (!T[lang]) lang = DEFAULT_LANG;
    current = lang;
    var dict = T[lang];

    document.documentElement.lang = lang;
    document.title = dict["meta.title"];
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dict["meta.desc"]);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll(".lang button").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    save(lang);
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  document.querySelectorAll(".lang button").forEach(function (btn) {
    btn.addEventListener("click", function () { setLang(btn.getAttribute("data-lang")); });
  });

  // Небольшой API для main.js (динамические тексты: статус, выбор услуг)
  window.GB_I18N = {
    t: function (key) { var v = T[current][key]; return v === undefined ? key : v; },
    lang: function () { return current; }
  };

  setLang(getSaved() || DEFAULT_LANG);
})();
