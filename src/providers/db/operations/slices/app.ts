import operations from "../common";

export default {
    home_blog() {
        return operations.exec("SELECT `id`, `key`, `title`, `short_description` AS `description`, `image`, `creation_date` FROM blog ORDER BY id DESC LIMIT 3");
    },
};
