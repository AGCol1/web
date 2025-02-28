function redirectToTranscript() {
    const input = document.getElementById("search-up").value.trim();
    if (input) {
        window.location.href = `https://agcol.uk/transcripts/incident-${encodeURIComponent(input)}-transcript`;
    } else {
        alert("Please enter a valid Incident ID.");
    }
}