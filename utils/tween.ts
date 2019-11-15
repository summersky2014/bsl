import * as TWEEN from '@tweenjs/tween.js';

const TweenPro = (TWEEN as any).default as typeof TWEEN;
const tween = (TweenPro || TWEEN);

export default tween;