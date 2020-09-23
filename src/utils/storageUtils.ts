function getStorage(type : "session" | "local"): Storage |null {
    let storage: Storage |null = null;
    if (type === "local") {
        storage = window.localStorage ? window.localStorage : null;
    } else if (type === "session") {
        storage = window.sessionStorage ? window.sessionStorage : null;
    }
    return storage;
}


export {
    getStorage
}
