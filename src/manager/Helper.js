function formatDigit(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

var Helper = {
  capitalize: function(text) {
    var words = text.split(" ");
    words = words.map(function(word) {
      return word[0].toUpperCase() + word.slice(1);
    });
    return words.join(" ");
  },
  getDateNow: function() {
    var today = new Date();
    var date = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ].map(formatDigit);
    return date.join("/");
  },
  getTimeNow: function() {
    var today = new Date();
    var time = [
      today.getHours(),
      today.getMinutes(),
      today.getSeconds()
    ].map(formatDigit);
    return time.join(":");
  },
  storeSessions: function(sessions) {
    var items = JSON.parse(JSON.stringify(sessions));
    items = items.map(function(item) {
      item.remove = false;
      return item;
    });
    browser.storage.local.set({"sessions": items});
  }
};

export default Helper;
