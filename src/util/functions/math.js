export function round(n, k) {
  k = typeof k == 'undefined' ? 1 : k;
  return Math.round(n * k) / k;
}

export function degreeToRadian(angle) {
  return angle * Math.PI / 180;
}

/**
 *
 * convert radian to degree
 *
 * @param {number} radian
 * @returns {number} 0..360
 */
export function radianToDegree(radian) {
  let angle =  radian * 180 / Math.PI;
  // 각도가 0보다 작으면 360 에서 반전시킨다.
  if (angle < 0) {
    angle = 360 + angle;
  }
  return angle;
}

export function getXInCircle(angle, radius, centerX = 0) {
  return centerX + radius * Math.cos(degreeToRadian (angle));
}

export function getYInCircle(angle, radius, centerY = 0) {
  return centerY + radius * Math.sin(degreeToRadian(angle));
}

export function getXYInCircle(angle, radius, centerX = 0, centerY = 0) {
  return {
    x: getXInCircle(angle, radius, centerX),
    y: getYInCircle(angle, radius, centerY),
  };
}

export function calculateAngle(rx, ry) {
  return radianToDegree(Math.atan2(ry, rx));
}
