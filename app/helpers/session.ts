function loadCache(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function saveCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export { loadCache, saveCache };
