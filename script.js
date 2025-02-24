function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function submitCode() {
    var code = document.getElementById("code").value;
    if (code === "1234") {
        alert("Code accepted. Click Ok to view...");
        window.location.href = "https://agcol.uk/school_projects";
    } else {
        alert("Invalid code. Please try again.");
    }
    console.log("Entered code: " + code);
}

document.addEventListener("DOMContentLoaded", function() {
    const text = "ALFIE COLCLOUGH";
    let index = 0;
    const speed = 20; 

    function typeWriter() {
        if (index < text.length) {
            document.getElementById("animated-text").innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});
