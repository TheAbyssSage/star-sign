// Aries: March 21 – April 19
const ARIES_START = new Date(2001, 2, 21); // Mar 21
const ARIES_END   = new Date(2001, 3, 19); // Apr 19

// Taurus: April 20 – May 20
const TAURUS_START = new Date(2001, 3, 20); // Apr 20
const TAURUS_END   = new Date(2001, 4, 20); // May 20

// Gemini: May 21 – June 20
const GEMINI_START = new Date(2001, 4, 21); // May 21
const GEMINI_END   = new Date(2001, 5, 20); // Jun 20

// Cancer: June 21 – July 22
const CANCER_START = new Date(2001, 5, 21); // Jun 21
const CANCER_END   = new Date(2001, 6, 22); // Jul 22

// Leo: July 23 – August 22
const LEO_START = new Date(2001, 6, 23); // Jul 23
const LEO_END   = new Date(2001, 7, 22); // Aug 22

// Virgo: August 23 – September 22
const VIRGO_START = new Date(2001, 7, 23); // Aug 23
const VIRGO_END   = new Date(2001, 8, 22); // Sep 22

// Libra: September 23 – October 22
const LIBRA_START = new Date(2001, 8, 23); // Sep 23
const LIBRA_END   = new Date(2001, 9, 22); // Oct 22

// Scorpio: October 23 – November 21
const SCORPIO_START = new Date(2001, 9, 23); // Oct 23
const SCORPIO_END   = new Date(2001, 10, 21); // Nov 21

// Sagittarius: November 22 – December 21
const SAGITTARIUS_START = new Date(2001, 10, 22); // Nov 22
const SAGITTARIUS_END   = new Date(2001, 11, 21); // Dec 21

// Capricorn: December 22 – January 19 (spans year-end)
// Represented as two ranges for clarity:
const CAPRICORN_START_1 = new Date(2001, 11, 22); // Dec 22, 2001
const CAPRICORN_END_1   = new Date(2001, 11, 31); // Dec 31, 2001
const CAPRICORN_START_2 = new Date(2001, 0, 1);   // Jan 1, 2001
const CAPRICORN_END_2   = new Date(2001, 0, 19);  // Jan 19, 2001

// Aquarius: January 20 – February 18
const AQUARIUS_START = new Date(2001, 0, 20); // Jan 20
const AQUARIUS_END   = new Date(2001, 1, 18); // Feb 18

// Pisces: February 19 – March 20
const PISCES_START = new Date(2001, 1, 19); // Feb 19
const PISCES_END   = new Date(2001, 2, 20); // Mar 20





// attachDatePickerToSign.js

// Utilities
function toDateString(date) {
  if (!(date instanceof Date) || isNaN(date)) throw new Error('Invalid Date');
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function fromDateString(value) {
  if (typeof value !== 'string') return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

// Main: build UI inside #sign
(function init() {
  const container = document.getElementById('sign');
  if (!container) {
    console.error('No element with id="sign" found.');
    return;
  }

  // Clear and create elements
  container.innerHTML = '';
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '8px';
  row.style.alignItems = 'center';
  row.style.marginBottom = '12px';

  const label = document.createElement('label');
  label.textContent = 'Select a date:';
  label.setAttribute('for', 'sign-date-input');

  const input = document.createElement('input');
  input.type = 'date';
  input.id = 'sign-date-input';
  // Initialize to empty, user picks a date themselves
  input.value = '';

  const readBtn = document.createElement('button');
  readBtn.textContent = 'Read value';

  const output = document.createElement('pre'); // pre to show multi-line
  output.style.marginTop = '8px';

  row.appendChild(label);
  row.appendChild(input);
  row.appendChild(readBtn);
  container.appendChild(row);
  container.appendChild(output);

  readBtn.addEventListener('click', () => {
    const value = input.value;
    const parsed = fromDateString(value);
    if (!parsed) {
      output.textContent = 'Please select a valid date first.';
      return;
    }
    output.textContent = [
      `Raw input: ${value}`,
      `ISO: ${parsed.toISOString()}`,
      `Locale: ${parsed.toLocaleDateString()}`,
      `Epoch ms: ${parsed.getTime()}`
    ].join('\n');
  });
})();
