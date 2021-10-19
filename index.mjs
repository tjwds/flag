import jimp from "jimp";
import configure from "@jimp/custom";
// all of jimp's default types
import types from "@jimp/types";
// all of jimp's default types
import plugins from "@jimp/plugins";
import sine from "./jimp-sine.mjs";

configure({
  types: [types],
  plugins: [plugins, sine],
});


async function main() {
  const original = await jimp.read("rva.gif");
  const image = await jimp.read("mask.png");
  const map = await jimp.read("mask.png");
  const backdrop = await jimp.read("backdrop.png");

  original.resize(144, 102);
  original.sine();
  image.blit(original, 7, 26);
  image.mask(map);
  backdrop.blit(image, 0, 0);

  await backdrop.write("./out.png");
}

main();
