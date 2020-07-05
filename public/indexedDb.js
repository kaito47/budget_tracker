// Create/open database
var request = indexedDB.open("transactions", 1);

request.onsuccess = function (event) {
    console.log("Success creating/accessing IndexedDB database");
    db = request.result;

    db.onerror = function (event) {
        console.log("Error creating/accessing IndexedDB database");
    };

    // Interim solution for Google Chrome to create an objectStore. Will be deprecated
    if (db.setVersion) {
        if (db.version != dbVersion) {
            var setVersion = db.setVersion(dbVersion);
            setVersion.onsuccess = function () {
                createObjectStore(db);
                getImageFile();
            };
        }
        else {
            getImageFile();
        }
    }
    else {
        getImageFile();
    }
}

// For future use. Currently only in latest Firefox versions
request.onupgradeneeded = function (event) {
    createObjectStore(event.target.result);
};