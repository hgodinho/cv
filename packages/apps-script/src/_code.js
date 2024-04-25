function doGet(e) {
    const api = new Api(e);
    return api.response();
}
