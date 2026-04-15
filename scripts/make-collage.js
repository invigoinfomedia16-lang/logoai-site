const sharp = require('sharp');
const path = require('path');

const IMG = p => path.join(__dirname, '..', 'public', 'images', 'illustrations', p);
const OUT = path.join(__dirname, '..', 'public', 'images', 'illustrations', 'cta-hg-collage-v2.png');

const W = 1460;
const H = 760;
const THUMB = 140;
const RADIUS = 10;
const GAP = 12;

async function roundedImg(imgPath, w, h, r) {
  const resized = await sharp(imgPath)
    .resize(w, h, { fit: 'cover', position: 'centre' })
    .toBuffer();
  const mask = Buffer.from(
    `<svg width="${w}" height="${h}"><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="white"/></svg>`
  );
  return sharp(resized)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function thumbWithBorder(imgPath, size, r) {
  const inner = await roundedImg(imgPath, size - 4, size - 4, r);
  // Add 2px dark border by extending
  return sharp(inner)
    .extend({ top: 2, bottom: 2, left: 2, right: 2, background: { r: 20, g: 20, b: 20, alpha: 255 } })
    .png()
    .toBuffer();
}

async function main() {
  // Full-width storefront
  const storefront = await sharp(IMG('hg-storefront.png'))
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();

  const composites = [
    { input: storefront, top: 0, left: 0 },
  ];

  // Subtle dark gradient on left and right edges so thumbs pop
  const sideGradientL = Buffer.from(
    `<svg width="200" height="${H}"><rect width="200" height="${H}" fill="url(#g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgb(13,13,13)" stop-opacity="0.7"/><stop offset="1" stop-color="rgb(13,13,13)" stop-opacity="0"/></linearGradient></defs></svg>`
  );
  const sideGradientR = Buffer.from(
    `<svg width="200" height="${H}"><rect width="200" height="${H}" fill="url(#g)"/><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgb(13,13,13)" stop-opacity="0"/><stop offset="1" stop-color="rgb(13,13,13)" stop-opacity="0.7"/></linearGradient></defs></svg>`
  );
  composites.push({ input: sideGradientL, top: 0, left: 0 });
  composites.push({ input: sideGradientR, top: 0, left: W - 200 });

  // Left thumbnails
  const leftFiles = ['hg-cup.png', 'hg-bag.png', 'hg-card.png'];
  const leftX = 28;
  const startY = Math.round((H - (3 * THUMB + 2 * GAP)) / 2);
  for (let i = 0; i < 3; i++) {
    const buf = await thumbWithBorder(IMG(leftFiles[i]), THUMB, RADIUS);
    composites.push({ input: buf, top: startY + i * (THUMB + GAP), left: leftX });
  }

  // Right thumbnails
  const rightFiles = ['hg-apron.png', 'hg-social.png', 'hg-loyalty.png'];
  const rightX = W - THUMB - 28;
  for (let i = 0; i < 3; i++) {
    const buf = await thumbWithBorder(IMG(rightFiles[i]), THUMB, RADIUS);
    composites.push({ input: buf, top: startY + i * (THUMB + GAP), left: rightX });
  }

  await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 13, g: 13, b: 13, alpha: 255 } },
  })
    .composite(composites)
    .png()
    .toFile(OUT);

  console.log('Done:', OUT);
}

main().catch(console.error);
