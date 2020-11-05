const backgroundClip = require('inline-style-prefixer/lib/plugins/backgroundClip').default;
const crossFade = require('inline-style-prefixer/lib/plugins/crossFade').default;
const cursor = require('inline-style-prefixer/lib/plugins/cursor').default;
const filter = require('inline-style-prefixer/lib/plugins/filter').default;
const flex = require('inline-style-prefixer/lib/plugins/flex').default;
const flexboxOld = require('inline-style-prefixer/lib/plugins/flexboxOld').default;
const gradient = require('inline-style-prefixer/lib/plugins/gradient').default;
const grid = require('inline-style-prefixer/lib/plugins/grid').default;
const imageSet = require('inline-style-prefixer/lib/plugins/imageSet').default;
const logical = require('inline-style-prefixer/lib/plugins/logical').default;
const position = require('inline-style-prefixer/lib/plugins/position').default;
const sizing = require('inline-style-prefixer/lib/plugins/sizing').default;
const transition = require('inline-style-prefixer/lib/plugins/transition').default;
const w = ["Webkit"];
const m = ["Moz"];
const ms = ["ms"];
const wm = ["Webkit","Moz"];
const wms = ["Webkit","ms"];
const wmms = ["Webkit","Moz","ms"];

export default {
  plugins: [backgroundClip,crossFade,cursor,filter,flex,flexboxOld,gradient,grid,imageSet,logical,position,sizing,transition],
  prefixMap: {"appearance":wmms,"userSelect":wmms,"textEmphasisPosition":wms,"textEmphasis":wms,"textEmphasisStyle":wms,"textEmphasisColor":wms,"boxDecorationBreak":wms,"clipPath":w,"maskImage":wms,"maskMode":wms,"maskRepeat":wms,"maskPosition":wms,"maskClip":wms,"maskOrigin":wms,"maskSize":wms,"maskComposite":wms,"mask":wms,"maskBorderSource":wms,"maskBorderMode":wms,"maskBorderSlice":wms,"maskBorderWidth":wms,"maskBorderOutset":wms,"maskBorderRepeat":wms,"maskBorder":wms,"maskType":wms,"textDecorationStyle":w,"textDecorationSkip":w,"textDecorationLine":w,"textDecorationColor":w,"filter":w,"fontFeatureSettings":w,"breakAfter":wmms,"breakBefore":wmms,"breakInside":wmms,"columnCount":wm,"columnFill":wm,"columnGap":wm,"columnRule":wm,"columnRuleColor":wm,"columnRuleStyle":wm,"columnRuleWidth":wm,"columns":wm,"columnSpan":wm,"columnWidth":wm,"writingMode":w,"flex":w,"flexBasis":w,"flexDirection":w,"flexGrow":w,"flexFlow":w,"flexShrink":w,"flexWrap":w,"alignContent":w,"alignItems":w,"alignSelf":w,"justifyContent":w,"order":w,"transform":w,"transformOrigin":w,"transformOriginX":w,"transformOriginY":w,"backfaceVisibility":w,"perspective":w,"perspectiveOrigin":w,"transformStyle":w,"transformOriginZ":w,"animation":w,"animationDelay":w,"animationDirection":w,"animationFillMode":w,"animationDuration":w,"animationIterationCount":w,"animationName":w,"animationPlayState":w,"animationTimingFunction":w,"backdropFilter":w,"fontKerning":w,"scrollSnapType":wms,"scrollSnapPointsX":wms,"scrollSnapPointsY":wms,"scrollSnapDestination":wms,"scrollSnapCoordinate":wms,"shapeImageThreshold":w,"shapeImageMargin":w,"shapeImageOutside":w,"hyphens":wmms,"flowInto":wms,"flowFrom":wms,"regionFragment":wms,"textOrientation":w,"textAlignLast":m,"tabSize":m,"wrapFlow":ms,"wrapThrough":ms,"wrapMargin":ms,"textSizeAdjust":["ms","Webkit"],"borderImage":w,"borderImageOutset":w,"borderImageRepeat":w,"borderImageSlice":w,"borderImageSource":w,"borderImageWidth":w,"transitionDelay":w,"transitionDuration":w,"transitionProperty":w,"transitionTimingFunction":w}
};