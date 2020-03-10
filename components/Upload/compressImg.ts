import * as EXIF from 'exif-js';

/**
 * 以下代码是修复canvas在ios中显示压缩的问题。
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
 *
 */
function detectVerticalSquash(img: HTMLImageElement) {
  // const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const data = ctx.getImageData(0, 0, 1, ih).data;
  let sy = 0;
  let ey = ih;
  let py = ih;
  canvas.width = 1;
  canvas.height = ih;

  ctx.drawImage(img, 0, 0);

  // search image edge pixel position in case it is squashed vertically.
  while (py > sy) {
    const alpha = data[(py - 1) * 4 + 3];
    if (alpha === 0) {
      ey = py;
    } else {
      sy = py;
    }
    py = (ey + sy) >> 1;
  }
  const ratio = (py / ih);
  return ratio === 0 ? 1 : ratio;
}

/**
 *  A replacement for context.drawImage
 * (args are for source and destination).
 */
// tslint:disable-next-line: max-line-length
function drawImageIOSFix(ctx: CanvasRenderingContext2D, img: HTMLImageElement, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
  const vertSquashRatio = detectVerticalSquash(img);
  // Works only if whole image is displayed:
  // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
  // The following works correct also when only a part of the image is displayed:
  ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio, sw * vertSquashRatio, sh * vertSquashRatio, dx, dy, dw, dh);
}

function compressImg(file: File, afterWidth: number): Promise<[string, Blob] | undefined> {
  return new Promise((resolve, reject) => {
    const hidCanvas = document.createElement('canvas');
    let hidCtx: CanvasRenderingContext2D | null = null;
    let result = '';

    //生成隐藏画布
    if (hidCanvas.getContext) {
      hidCtx = hidCanvas.getContext('2d');
    } else {
      alert('对不起，您的浏览器不支持图片压缩及上传功能，请换个浏览器试试~');
      return;
    }

    const reader = new FileReader();
    const image = new Image();
    reader.readAsDataURL(file);

    image.onload = () => {
      const upImgWidth = image.width;
      const upImgHeight = image.height;
      let orientation = 1;

      //获取图像的方位信息
      EXIF.getData(image.src, () => {
        orientation = parseInt(EXIF.getTag(image.src, 'Orientation'));
        orientation = orientation ? orientation : 1;
      });
      // 只对图片做放小图片，如果图片本来比屏幕尺寸小就使用本身的尺寸
      const width = afterWidth < upImgWidth ? afterWidth : upImgWidth;
      //压缩换算后的图片高度
      const afterHeight = width * upImgHeight / upImgWidth;

      if (upImgWidth < 10 || upImgWidth < 10) {
        alert('请不要上传过小的图片');
        resolve(undefined);
        return;
      } else if (hidCtx) {
        if (orientation <= 4) {
          // 设置压缩canvas区域高度及宽度
          hidCanvas.setAttribute('height', afterHeight + 'px');
          hidCanvas.setAttribute('width', afterWidth + 'px');
          if (orientation === 3 || orientation === 4) {
            hidCtx.translate(afterWidth, afterHeight);
            hidCtx.rotate(180 * Math.PI / 180);
          }
        } else {
          // 设置压缩canvas区域高度及宽度
          hidCanvas.setAttribute('height', afterHeight + 'px');
          hidCanvas.setAttribute('width', afterWidth + 'px');

          if (orientation === 5 || orientation === 6) {
            hidCtx.translate(afterHeight, 0);
            hidCtx.rotate(90 * Math.PI / 180);
          } else if (orientation === 7 || orientation === 8) {
            hidCtx.translate(0, afterWidth);
            hidCtx.rotate(270 * Math.PI / 180);
          }
        }

        // canvas绘制压缩后图片
        drawImageIOSFix(hidCtx, image, 0, 0, upImgWidth, upImgHeight, 0, 0 , afterWidth, afterHeight);
        // 获取压缩后生成的img对象
        result = hidCanvas.toDataURL('image/jpeg');
        // 获取压缩后生成的blob对象
        hidCanvas.toBlob((blob) => {
          if (blob) {
            resolve([result, blob]);
          }
        }, 'image/jpeg', 1);
      }
    };
    reader.onload = (evt) => {
      const target = evt.target as FileReader;
      const srcString = target.result as string;
      //安卓获取的base64数据无信息头，加之
      image.src = srcString.substring(5, 10) !== 'image' ? srcString.replace(/(.{5})/, '$1image/jpeg;') : srcString;
    };
  });
}

export default compressImg;
