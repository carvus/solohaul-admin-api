import operations from "../common";

export default {
    getServicesLastOrder() {
        return operations.exec("SELECT `order` FROM `services` ORDER BY `order` DESC LIMIT 1");
    }
};
