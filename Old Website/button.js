let badNames = ["Noah", "noah"];
let test = true;

function testName() {
  let name = prompt(`What is your first name?`);
  for (let i = 0; i < badNames.length; i++) {
    if (badNames[i] === name) {
      test = false;
      window.location.href = "https://www.nolandonahue.org/areYouPussy.html";
    }
    if (test)
      window.location.href = "https://www.nolandonahue.org/callMeIsh.html";
  }
}
