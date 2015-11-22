document.addEventListener("DOMContentLoaded", function () {
    setupAssignmentSubmit();
    setupReturn();
});

function setupAssignmentSubmit() {
    // Create student from form and update database
    var form = document.forms.create;
    form.onsubmit = function (e) {
        e.preventDefault();
        var newAssignment = {
            AssignmentID: document.getElementById("AssignmentIDInput").value,
            Title: document.getElementById("TitleInput").value,
            Credits: document.getElementById("CreditsInput").value
        }

        assignmentModule.addAssignment(newAssignment, function () {
            window.location.href = "index.html";
        });
    }
}

//Go back to home without saving changes
function setupReturn() {
    document.getElementById("cancelButton").addEventListener('click', function () {
        window.location.href = "index.html";
    });
}