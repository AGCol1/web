function submitCode() {
    var code = document.getElementById("code").value;
    if (code === "1234") {
        window.location.href = "https://agcol.uk/school_projects.html";
    } else {
        alert("Invalid code. Please try again.");
    }
    console.log("Entered code: " + code);
}