export default (statusCode: number) => {
    switch (statusCode) {
        case 404:
            return "Not Found";
        case 400:
            return "Bad Request";
        case 401:
            return "Unauthorized";
        case 403:
            return "Forbidden";
        case 500:
            return "Internal Server Error";
        default:
            return "error"
    }
}