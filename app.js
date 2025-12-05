// Zodiac ranges (template dates – will be adjusted to the correct year)
const ZODIAC_RANGES = [
  { sign: "Aries",        start: [3, 21], end: [4, 19] },   // Mar 21 – Apr 19
  { sign: "Taurus",       start: [4, 20], end: [5, 20] },
  { sign: "Gemini",       start: [5, 21], end: [6, 20] },
  { sign: "Cancer",       start: [6, 21], end: [7, 22] },
  { sign: "Leo",          start: [7, 23], end: [8, 22] },
  { sign: "Virgo",        start: [8, 23], end: [9, 22] },
  { sign: "Libra",        start: [9, 23], end: [10, 22] },
  { sign: "Scorpio",      start: [10, 23], end: [11, 21] },
  { sign: "Sagittarius",  start: [11, 22], end: [12, 21] },
  { sign: "Capricorn",    start: [12, 22], end: [1, 19] },   // crosses year
  { sign: "Aquarius",     start: [1, 20], end: [2, 18] },
  { sign: "Pisces",       start: [2, 19], end: [3, 20] },
];

function getZodiacSign(date) {
  const month = date.getMonth() + 1;    // 1–12
  const day   = date.getDate();
  const year  = date.getFullYear();

  for (const { sign, start, end } of ZODIAC_RANGES) {
    const [sMonth, sDay] = start;
    const [eMonth, eDay] = end;

    const inStartRange = (month === sMonth && day >= sDay) || month > sMonth;
    const inEndRange   = (month === eMonth && day <= eDay) || month < eMonth;

    // Special handling for signs that cross the year (only Capricorn)
    if (sMonth === 12 && eMonth === 1) {
      if ((month === 12 && day >= sDay) || (month === 1 && day <= eDay)) {
        return sign;
      }
    } else if (inStartRange && inEndRange) {
      return sign;
    }
  }
  return "Unknown";
}

// UI – creates everything inside <div id="sign">
(() => {
  const container = document.getElementById("sign");
  if (!container) return;

  const label = Object.assign(document.createElement("label"), {
    textContent: "Birth date: ",
    htmlFor: "birthdate"
  });

  const input = Object.assign(document.createElement("input"), {
    type: "date",
    id: "birthdate"
  });

  const button = Object.assign(document.createElement("button"), {
    textContent: "Show Zodiac Sign"
  });

  const output = Object.assign(document.createElement("div"), {
    style: "margin-top: 1rem; font-size: 1.4rem; font-weight: bold;"
  });

  const row = Object.assign(document.createElement("div"), {
    style: "display: flex; gap: 12px; align-items: center; flex-wrap: wrap;"
  });
  row.append(label, input, button);
  container.append(row, output);

  button.addEventListener("click", () => {
    if (!input.value) {
      output.textContent = "Please select a date";
      return;
    }

    const [y, m, d] = input.value.split("-");
    const birthDate = new Date(y, m - 1, d); // safe, no timezone issues
    const sign = getZodiacSign(birthDate);

    const emojis = {
      Aries: "Aries", Taurus: "Taurus", Gemini: "Gemini", Cancer: "Cancer",
      Leo: "Leo", Virgo: "Virgo", Libra: "Libra", Scorpio: "Scorpio",
      Sagittarius: "Sagittarius", Capricorn: "Capricorn", Aquarius: "Aquarius", Pisces: "Pisces"
    };

    output.innerHTML = `Your zodiac sign is <strong>${emojis[sign]} ${sign}</strong>`;
  });
})();