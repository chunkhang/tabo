function formatDigit(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

var Helper = {
  capitalize(text) {
    var words = text.split(" ");
    words = words.map(word => {
      return word[0].toUpperCase() + word.slice(1);
    });
    return words.join(" ");
  },
  getDateNow() {
    var today = new Date();
    var date = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ].map(formatDigit);
    return date.join("/");
  },
  getTimeNow() {
    var today = new Date();
    var time = [
      today.getHours(),
      today.getMinutes(),
      today.getSeconds()
    ].map(formatDigit);
    return time.join(":");
  }
};

export default Helper;
