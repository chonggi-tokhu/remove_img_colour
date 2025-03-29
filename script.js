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
    ctx.putImageData(imgdata, 0, 0);
    return canvas;
}  


function crop_auto(imgel, { cropsize_x, cropsize_y } = { cropsize_x: 562, cropsize_y: 562 }, { looptime_x, looptime_y } = { looptime_x: 4, looptime_y: 3 }) {
    if (!(imgel instanceof HTMLImageElement || imgel instanceof Image)) {
        return false;
    }
    var myarr = [];
    for (var i = 0; i < looptime_x * cropsize_x; i += cropsize_x) {
        for (var j = 0; j < looptime_y * cropsize_y; j += cropsize_y) {
            var canvas_pr = document.createElement("canvas");
            var canvas = document.body.appendChild(canvas_pr);
            canvas.width = cropsize_x;
            canvas.height = cropsize_y;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(imgel, i, j, i + cropsize_x, j + cropsize_y, 0, 0, cropsize_x, cropsize_y);
            myarr.push(canvas);
        }
    }
    return myarr;
}