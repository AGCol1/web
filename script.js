function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
