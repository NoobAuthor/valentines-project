const translations = {
  en: {
    question: "Will you be my Valentine? 💝",
    yes: "Yes!",
    no: "No!",
    messages: [
      "Pookie, please!",
      "Are you sure? 😢",
      "My heart is breaking... 💔",
      "Okay, I'll ask again next year! 🥺",
    ],
    thanks: "Thanks for being my Valentine! 💖😊",
    gifs: {
      initial:
        "https://cdnl.iconscout.com/lottie/premium/thumb/cute-cat-9685696-7933396.gif", // Cat in vase with flowers :cite[9]
      celebration:
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWIzY3dqYmg1aml6dmhzMnliM2x3azBybnpiOTJhY3loNzdydDBzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/kPryNRkt1ryfnpn59G/giphy.gif", // Dancing cats with hearts :cite[3]
      rejections: [
        "https://gifdb.com/images/high/freaked-out-sad-cat-sobbing-x81xcmvrn4yyk9j9.gif", // Pleading cat eyes :cite[5]
        "https://media.tenor.com/1WEZeMbbHwMAAAAM/cat-depressed.gif", // Unsure cat tilt :cite[8]
        "https://media.tenor.com/K2V8Zbx5ezgAAAAC/cute-so.gif", // Heartbroken Pusheen :cite[5]
        "https://gifdb.com/images/high/cute-sad-peach-cat-on-floor-ctnvwnkm9ip6dnug.gif", // Resigned cat with card :cite[10]
      ],
    },
  },
  es: {
    question: "¿Quieres ser mi San Valentín? 💝",
    yes: "¡Sí!",
    no: "¡No!",
    messages: [
      "¡Cariño, por favor!",
      "¿Estás segura? 😢",
      "Mi corazón se está rompiendo... 💔",
      "¡Bueno, te lo preguntaré el próximo año! 🥺",
    ],
    thanks: "¡Gracias por ser mi San Valentín! 💖😊",
    gifs: {
      initial:
        "https://cdnl.iconscout.com/lottie/premium/thumb/cute-cat-9685696-7933396.gif", // Cat in vase with flowers :cite[9]
      celebration:
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWIzY3dqYmg1aml6dmhzMnliM2x3azBybnpiOTJhY3loNzdydDBzdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/kPryNRkt1ryfnpn59G/giphy.gif", // Dancing cats with hearts :cite[3]
      rejections: [
        "https://gifdb.com/images/high/freaked-out-sad-cat-sobbing-x81xcmvrn4yyk9j9.gif", // Pleading cat eyes :cite[5]
        "https://media.tenor.com/1WEZeMbbHwMAAAAM/cat-depressed.gif", // Unsure cat tilt :cite[8]
        "https://media.tenor.com/K2V8Zbx5ezgAAAAC/cute-so.gif", // Heartbroken Pusheen :cite[5]
        "https://gifdb.com/images/high/cute-sad-peach-cat-on-floor-ctnvwnkm9ip6dnug.gif", // Resigned cat with card :cite[10]
      ],
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  // Common elements
  const translateBtn = document.getElementById("translateBtn");
  let currentLang = localStorage.getItem("valentineLang") || "en";

  if (document.getElementById("thanksMessage")) {
    // Thanks page logic
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get("lang") || currentLang;
    document.getElementById("thanksMessage").textContent =
      translations[lang].thanks;
    document.querySelector(".celebration-gif").src =
      translations[lang].gifs.celebration;
  } else {
    // Main page logic
    let clickCount = 0;
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const messageDiv = document.getElementById("message");
    const gifContainer = document.getElementById("gifContainer");

    // Initialize GIF
    const initialGif = document.createElement("img");
    initialGif.className = "valentine-gif";
    initialGif.src = translations[currentLang].gifs.initial;
    gifContainer.appendChild(initialGif);

    // Translation functionality
    function translatePage(lang) {
      currentLang = lang;
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        element.textContent = translations[lang][key];
      });
      yesButton.parentElement.href = `thanks.html?lang=${lang}`;
      translateBtn.textContent = lang === "en" ? "ES" : "EN";
      localStorage.setItem("valentineLang", lang);

      // Update GIF
      initialGif.src = translations[lang].gifs.initial;
    }

    translateBtn.addEventListener("click", () => {
      translatePage(currentLang === "en" ? "es" : "en");
    });

    // No button functionality
    noButton.addEventListener("click", () => {
      clickCount = Math.min(clickCount + 1, 3);
      const currentSize = parseFloat(
        window.getComputedStyle(yesButton).fontSize,
      );
      yesButton.style.fontSize = `${currentSize * 1.2}px`;
      messageDiv.textContent = translations[currentLang].messages[clickCount];
      initialGif.src = translations[currentLang].gifs.rejections[clickCount];
    });

    // Initial translation
    translatePage(currentLang);
  }
});
