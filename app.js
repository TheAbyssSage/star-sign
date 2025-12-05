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

function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();
  
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}