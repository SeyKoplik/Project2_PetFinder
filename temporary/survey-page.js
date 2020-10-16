function checkSearch() {
  if (
    document.search.elements[1].selectedIndex == 0 &&
    document.search.elements[2].value.length < 3
  ) {
    alert("Please select an animal and/or a breed to search!");
    document.search.elements[1].focus();
    return false;
  }
  if (document.search.elements[3].value.length < 5) {
    alert("Please enter your zip or postal code!");
    document.search.elements[3].focus();
    return false;
  }
  return true;
}
var len = 80;
var p = document.getElementById("sheltername");
if (p) {
  var trunc = p.innerHTML;
  if (trunc.length > len) {
    /* Truncate the content of the P, then go back to the end of the
   previous word to ensure that we don't truncate in the middle of
   a word */
    trunc = trunc.substring(0, len);
    trunc = trunc.replace(/\w+$/, "");

    /* Add an ellipses to the end and make it a link that expands
   the paragraph back to its original size */
    trunc +=
      '<a href="#" ' +
      'onclick="this.parentNode.innerHTML=' +
      "unescape('" +
      escape(p.innerHTML) +
      "');return false;\">" +
      "...</a>";
    p.innerHTML = trunc;
  }
}
