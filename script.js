var colorCount = 0;

$(document).ready(() => {
    $("#generate-btn").click(() => {
        $("#palette").addClass("color-box");
        var box = $(".color-box");
        options = $(".color-options");
        box.append(`<li class="strip" id='strip-${++colorCount}'></li>`);
        options.append(`<li id='input-${colorCount}'><input type="text" class="color-input" placeholder="Color Code">
            <button class="done-btn" id='color-${colorCount}'>Done</button></li>`);
        $(`#input-${colorCount} > .color-input`).focus();
        $("#strip-1").addClass("round-above");
        $(`#strip-${colorCount - 1}`).removeClass("round-below");
        $(`#strip-${colorCount}`).addClass("round-below");
    });
});

$("#rem-btn").click(() => {
    if (colorCount > 0) {
        $(`#strip-${colorCount--}`).remove();
        $(`#input-${colorCount + 1}`).remove();
        if (colorCount === 0) {
            $("#palette").removeClass("color-box");
            return;
        }
        $(`#strip-${colorCount}`).addClass("round-below");
    }
});

$(document).on("click", ".done-btn", function(e) {
    var id = e.target.id.split("-")[1];
    var color = $(`#input-${id} input`).val();
    $(`#strip-${id}`).css("background-color", color);
});