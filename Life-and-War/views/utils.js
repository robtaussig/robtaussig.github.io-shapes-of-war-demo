const Util = {

  wrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  },

  distance (objOne, objTwo) {
    let x = Math.pow(objOne.pos[0] - objTwo.pos[0],2);
    let y = Math.pow(objOne.pos[1] - objTwo.pos[1],2);
    return Math.sqrt(x + y);
  },

  fragmentText (text, maxWidth, ctx) {
    let words = text.split(' '),
      lines = [],
      line = "";
    if (ctx.measureText(text).width < maxWidth) {
      return [text];
    }
    while (words.length > 0) {
      while (ctx.measureText(words[0]).width >= maxWidth) {
        let tmp = words[0];
        words[0] = tmp.slice(0, -1);
        if (words.length > 1) {
            words[1] = tmp.slice(-1) + words[1];
        } else {
            words.push(tmp.slice(-1));
        }
      }
      if (ctx.measureText(line + words[0]).width < maxWidth) {
        line += words.shift() + " ";
      } else {
        lines.push(line);
        line = "";
      }
      if (words.length === 0) {
        lines.push(line);
      }
    }
    return lines;
  }
};

module.exports = Util;
