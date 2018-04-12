var LocalStorage = {
  sessions: {
    save(items) {
      var sessions = JSON.parse(JSON.stringify(items));
      // items = items.map(item => {
      //   item.remove = false;
      //   return item;
      // });
      browser.storage.local.set({"sessions": sessions});
    },
    load() {
      return new Promise(resolve => {
        var items = [];
        browser.storage.local.get("sessions").then(results => {
          if (Object.keys(results).length != 0) {
            items = results.sessions;
          }
          resolve(items);
        });
      });
    }
  }
};

export default LocalStorage;
