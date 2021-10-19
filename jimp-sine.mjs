import { isNodePattern } from "@jimp/utils";

/**
 * sine-wave-ify
 * @param {function(Error, Jimp)} options (optional) radius, x, y
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
export default () => ({
  sine(options = {}, cb) {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    const source = this.cloneQuiet();
    const { width, height } = source.bitmap;

    const period = 85;
    this.scanQuiet(0, 0, width, height, (x, y) => {
      const workingX = Math.abs(x - 30);
      let up = -5;
      up += (workingX % period) + 1;
      if (Math.floor(workingX / period) % 2) {
        up = period - up;
      }
      up /= -8;
      up += 5; // this is just height
      up = Math.floor(up);

      let color = source.getPixelColor(x, y);
      this.setPixelColor(color, x, y + up);
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },
});
