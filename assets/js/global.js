function copyBibtex(bibtex) {
    navigator.clipboard.writeText(bibtex).then(function() {
      alert("BibTeX copied to clipboard!");
    }, function(err) {
      console.error("Could not copy text: ", err);
    });
  }