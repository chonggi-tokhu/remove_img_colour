function remove_colour(imgel, { r, g, b } = { r: 176, g: 0, b: 176 }, colour_margin = 0) {
    if (!(imgel instanceof HTMLImageElement || imgel instanceof Image)) {
        return false;
    }
    var canvas_pr = document.createElement("canvas");
    var canvas = document.body.appendChild(canvas_pr);
    canvas.width = imgel.width;
    canvas.height = imgel.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgel, 0, 0);
    var imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var l = imgdata.data.length / 4;
    for (var i = 0; i < l; i++) {
        if ((imgdata.data[i * 4 + 0] > r - colour_margin && imgdata.data[i * 4 + 0] < r + colour_margin) && (imgdata.data[i * 4 + 1] > g - colour_margin && imgdata.data[i * 4 + 1] < g + colour_margin) && (imgdata.data[i * 4 + 2] > b - colour_margin && imgdata.data[i * 4 + 2] < b + colour_margin)) {
            imgdata.data[i * 4 + 3] = 0;
        }
    }
    ctx.putImageData(imgdata);
    return canvas;
}