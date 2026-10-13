import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public", "brand", "shindara-logo.jpg");
const output = path.join(root, "public", "brand", "shindara-logo.png");

/**
 * Convert official logo JPG → transparent PNG by knocking out near-black
 * background pixels. Does not redraw or distort the mark/typography.
 */
async function run() {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Near-black / charcoal background → transparent
    if (r < 28 && g < 28 && b < 28) {
      data[i + 3] = 0;
    } else if (r < 42 && g < 42 && b < 42) {
      // Soft edge feather for grainy matte areas
      data[i + 3] = Math.round(((r + g + b) / 3 / 42) * 255);
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(output);

  console.log(`Wrote transparent logo: ${output}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
