// ulid.js — zero dependencies, works offline, cryptographically random
// Includes ms-monotonicity for rapid-fire ID generation

const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const ENCODING_LEN = ENCODING.length;

let lastTime = 0;
let lastRandomChars = '';

export function ulid(seedTime = Date.now()) {
  let now = seedTime;
  
  if (now === lastTime) {
    // Increment the last random component instead of generating fresh
    lastRandomChars = incrementBase32(lastRandomChars);
  } else {
    lastTime = now;
    lastRandomChars = generateRandomChars(16);
  }
  
  return encodeTime(now, 10) + lastRandomChars;
}

function encodeTime(now, len) {
  let str = '';
  for (let i = len; i > 0; i--) {
    str = ENCODING[now % ENCODING_LEN] + str;
    now = Math.floor(now / ENCODING_LEN);
  }
  return str;
}

function generateRandomChars(len) {
  let str = '';
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  for (let i = 0; i < len; i++) {
    str += ENCODING[bytes[i] % ENCODING_LEN];
  }
  return str;
}

function incrementBase32(str) {
  let chars = str.split('');
  for (let i = chars.length - 1; i >= 0; i--) {
    let charIdx = ENCODING.indexOf(chars[i]);
    if (charIdx === ENCODING_LEN - 1) {
      chars[i] = ENCODING[0]; // Carry over
    } else {
      chars[i] = ENCODING[charIdx + 1];
      break;
    }
  }
  return chars.join('');
}
