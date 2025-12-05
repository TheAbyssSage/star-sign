// const Aries: March 21 – April 19
// const Taurus: April 20 – May 20
// const Gemini: May 21 – June 20
// const Cancer: June 21 – July 22
// const Leo: July 23 – August 22
// const Virgo: August 23 – September 22
// const Libra: September 23 – October 22
// const Scorpio: October 23 – November 21
// const Sagittarius: November 22 – December 21
// const Capricorn: December 22 – January 19
// const Aquarius: January 20 – February 18
// const Pisces: February 19 – March 20 


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
