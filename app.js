function mmdd(date) {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return m * 100 + d;
}

// Compute zodiac sign with exclusive ranges (Western tropical zodiac)
function getZodiac(date) {
  const v = mmdd(date);

  if (v >= 321 && v <= 419) return "Aries";
  if (v >= 420 && v <= 520) return "Taurus";
  if (v >= 521 && v <= 620) return "Gemini";
  if (v >= 621 && v <= 722) return "Cancer";
  if (v >= 723 && v <= 822) return "Leo";
  if (v >= 823 && v <= 922) return "Virgo";
  if (v >= 923 && v <= 1022) return "Libra";
  if (v >= 1023 && v <= 1121) return "Scorpio";
  if (v >= 1122 && v <= 1221) return "Sagittarius";
  if (v >= 1222 || v <= 119) return "Capricorn"; // wraps across year end
  if (v >= 120 && v <= 218) return "Aquarius";
  if (v >= 219 && v <= 320) return "Pisces";

  return "Unknown";
}

// Optional: simple validation to ensure parsed Date matches input y-m-d
function isValidYMD(y, m, d, date) {
  return (
    date instanceof Date &&
    !isNaN(date) &&
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}

// UI bootstrap inside #sign
(function init() {
  const container = document.getElementById("sign");
  if (!container) return;

  // Clear any previous content to avoid duplicate UI/listeners if re-run
  container.textContent = "";

  container.innerHTML = `
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-bottom:12px;">
      <label for="bd">Birth date:</label>
      <input type="date" id="bd">
      <button id="go">Show Sign</button>
    </div>
    <div id="result" style="font-size:1.5em; font-weight:bold;"></div>
  `;


  const bd = document.getElementById("bd");
  const btn = document.getElementById("go");
  const resultEl = document.getElementById("result");

  btn.addEventListener("click", () => {
    const val = bd.value;
    if (!val) {
      resultEl.textContent = "Pick a date!";
      return;
    }

    const [yStr, mStr, dStr] = val.split("-");
    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);
    const date = new Date(y, m - 1, d);

    if (!isValidYMD(y, m, d, date)) {
      resultEl.textContent = "Invalid date.";
      return;
    }

    const sign = getZodiac(date);
    resultEl.textContent = `Your sign: ${sign}`;
  });
})();
