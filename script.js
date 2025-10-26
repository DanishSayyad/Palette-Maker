var colorCount = 0;

// Load saved palette from localStorage on page load
$(document).ready(() => {
    const savedPalette = JSON.parse(localStorage.getItem("lastPalette"));
    if (savedPalette && savedPalette.length > 0) {
        savedPalette.forEach(color => addColorStrip(color));
    }

    $("#generate-btn").click(() => addColorStrip(""));

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

    $("#save-btn").click(() => {
        let paletteData = [];
        for (let i = 1; i <= colorCount; i++) {
            paletteData.push($(`#strip-${i}`).css("background-color"));
        }
        // Save current palette
        localStorage.setItem("lastPalette", JSON.stringify(paletteData));

        // Save history
        let history = JSON.parse(localStorage.getItem("paletteHistory")) || [];
        history.push(paletteData);
        localStorage.setItem("paletteHistory", JSON.stringify(history));
    });

        $("#close-history").click(() => {
            $("#history-modal").hide();
        });

        $(window).click(function(event) {
            if ($(event.target).is("#history-modal")) {
                $("#history-modal").hide();
            }
        });


    $("#history-btn").click(() => {
    const history = JSON.parse(localStorage.getItem("paletteHistory")) || [];
    const $list = $("#history-list");
    $list.empty();

    history.forEach((palette, index) => {
        const filteredPalette = palette.filter(color => color && color.trim() !== "");
        if (filteredPalette.length === 0) return;

        let $paletteDiv = $(`<div class="history-palette" data-index="${index}"></div>`);

        filteredPalette.forEach(color => {
            $paletteDiv.append(`<div class="history-color" style="background-color:${color}"></div>`);
        });

        $paletteDiv.append(`<button class="delete-palette" data-index="${index}">🗑️</button>`);

        $list.append($paletteDiv);
    });

    $("#history-modal").show();
});

$(document).on("click", ".history-palette", function(e) {
    if ($(e.target).hasClass("delete-palette")) return; 
    const index = $(this).data("index");
    const history = JSON.parse(localStorage.getItem("paletteHistory"));
    const palette = history[index];

    $("#palette").empty();
    $(".color-options").empty();
    colorCount = 0;

    palette.forEach(color => addColorStrip(color));
    $("#history-modal").hide();
});

// Delete palette from history
$(document).on("click", ".delete-palette", function(e) {
    e.stopPropagation(); 
    const index = $(this).data("index");
    let history = JSON.parse(localStorage.getItem("paletteHistory")) || [];

    history.splice(index, 1);
    localStorage.setItem("paletteHistory", JSON.stringify(history));

    $("#history-btn").click();
});


});

function addColorStrip(color) {
    $("#palette").addClass("color-box");
    var box = $(".color-box");
    var options = $(".color-options");
    colorCount++;
    box.append(`<li class="strip" id='strip-${colorCount}' style="background-color:${color}"></li>`);
    options.append(`<li id='input-${colorCount}'>
                        <input type="text" class="color-input" placeholder="Color Code" value="${color}">
                        <button class="done-btn" id='color-${colorCount}'>Done</button>
                    </li>`);
    $(`#input-${colorCount} > .color-input`).focus();
    $("#strip-1").addClass("round-above");
    $(`#strip-${colorCount - 1}`).removeClass("round-below");
    $(`#strip-${colorCount}`).addClass("round-below");
}

$(document).on("click", ".done-btn", function(e) {
    var id = e.target.id.split("-")[1];
    var color = $(`#input-${id} input`).val();
    $(`#strip-${id}`).css("background-color", color);
});

