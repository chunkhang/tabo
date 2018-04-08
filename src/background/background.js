var managerTabId = null;

// Open manager page after clicking icon
browser.browserAction.onClicked.addListener(function() {
  // Check if manager tab is already open
  browser.tabs.query({
    currentWindow: true
  }).then(function(tabs) {
    var managerTab = tabs.filter(tab =>
      tab.id == managerTabId && tab.title.startsWith("Tabo") &&
      tab.url.startsWith("moz-extension://") &&
      tab.url.endsWith("/manager/index.html")
    );
    if (managerTab.length == 0) {
      // Create manager tab
      browser.tabs.create({
        url: "manager/index.html",
        active: true
      }).then(function(tab) {
        managerTabId = tab.id;
      });
    } else {
      // Switch to manager tab
      browser.tabs.update(managerTabId, {
        active: true
      });
    }
  });
});

