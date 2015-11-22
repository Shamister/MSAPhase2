document.addEventListener("DOMContentLoaded", function () {
    var controller = getUrlParameters("type", "", true);
    var id = getUrlParameters("id", "", true);
    if (controller === "courses") {
        courseModule.getCourseById(id, function (course) {
            document.getElementById("loadingmsg").classList.add("hidden");
            document.getElementById("details").classList.remove("hidden");
            showDetails(course);
        });
    }

});

function showDetails(obj) {
    for (var key in obj) {
        var element = document.getElementById(key);
        element.innerHTML = obj[key];
    }
}

function getUrlParameters(parameter, staticURL, decode) {
    var currentLocation = (staticURL.length) ? staticURL : window.location.search,
        paramArray = currentLocation.split("?")[1].split("&");
    for (var i = 0; i < paramArray.length; i++) {
        param = paramArray[i].split("=");
        if (param[0] == parameter) {
            return (decode) ? decodeURIComponent(param[1]) : param[1];
        }
    }
    return false;
}