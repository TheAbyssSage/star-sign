const ARIES_START = new Date(2001, 2, 21);          // Mar 21
const ARIES_END   = new Date(2001, 3, 19);          // Apr 19
const TAURUS_START = new Date(2001, 3, 20);         // Apr 20
const TAURUS_END   = new Date(2001, 4, 20);         // May 20
const GEMINI_START = new Date(2001, 4, 21);         // May 21
const GEMINI_END   = new Date(2001, 5, 20);         // Jun 20
const CANCER_START = new Date(2001, 5, 21);         // Jun 21
const CANCER_END   = new Date(2001, 6, 22);         // Jul 22
const LEO_START = new Date(2001, 6, 23);            // Jul 23
const LEO_END   = new Date(2001, 7, 22);            // Aug 22
const VIRGO_START = new Date(2001, 7, 23);          // Aug 23
const VIRGO_END   = new Date(2001, 8, 22);          // Sep 22
const LIBRA_START = new Date(2001, 8, 23);          // Sep 23
const LIBRA_END   = new Date(2001, 9, 22);          // Oct 22
const SCORPIO_START = new Date(2001, 9, 23);        // Oct 23
const SCORPIO_END   = new Date(2001, 10, 21);       // Nov 21
const SAGITTARIUS_START = new Date(2001, 10, 22);   // Nov 22
const SAGITTARIUS_END   = new Date(2001, 11, 21);   // Dec 21
const CAPRICORN_START_1 = new Date(2001, 11, 22);   // Dec 22, 2001
const CAPRICORN_END_1   = new Date(2001, 11, 31);   // Dec 31, 2001
const CAPRICORN_START_2 = new Date(2001, 0, 1);     // Jan 1, 2001
const CAPRICORN_END_2   = new Date(2001, 0, 19);    // Jan 19, 2001
const AQUARIUS_START = new Date(2001, 0, 20);       // Jan 20
const AQUARIUS_END   = new Date(2001, 1, 18);       // Feb 18
const PISCES_START = new Date(2001, 1, 19);         // Feb 19
const PISCES_END   = new Date(2001, 2, 20);         // Mar 20


// -- Select date --


(function init() {
  const container = document.getElementById('sign');
  if (!container) return;

  const label = document.createElement('label');
  label.textContent = 'Select a date:';
  label.setAttribute('for', 'sign-date');

  const input = document.createElement('input');
  input.type = 'date';
  input.id = 'sign-date';

  const button = document.createElement('button');
  button.textContent = 'Show date info';

  const output = document.createElement('pre');

  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '8px';
  row.style.alignItems = 'center';
  row.appendChild(label);
  row.appendChild(input);
  row.appendChild(button);

  container.innerHTML = '';
  container.appendChild(row);
  container.appendChild(output);

  button.addEventListener('click', () => {
    if (!input.value) {
      output.textContent = 'Pick a date first.';
      return;
    }
    const date = new Date(input.value);
    output.textContent = [
      `Input: ${input.value}`,
      `ISO: ${date.toISOString()}`,
      `Locale: ${date.toLocaleDateString()}`,
      `Epoch ms: ${date.getTime()}`
    ].join('\n');
  });
})();


// -- Comparing --


// Compare dates
export function isBefore(a, b) {
  return new Date(a).getTime() < new Date(b).getTime();
}

export function isAfter(a, b) {
  return new Date(a).getTime() > new Date(b).getTime();
}

export function isSameDay(a, b) {
  const d1 = new Date(a); d1.setHours(0, 0, 0, 0);
  const d2 = new Date(b); d2.setHours(0, 0, 0, 0);
  return d1.getTime() === d2.getTime();
}

function getZodiac(birth) {
  const date = birth instanceof Date ? birth : new Date(birth);
  const m = date.getMonth() + 1;
  const d = date.getDate();

  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Aries';
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Taurus';
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Gemini';
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Cancer';
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Leo';
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Virgo';
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Libra';
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Scorpio';
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'Sagittarius';
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'Capricorn';
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Aquarius';
  return 'Pisces';
}
console.log(getZodiac)