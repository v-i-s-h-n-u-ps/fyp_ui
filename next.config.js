const resolve = require('path').resolve;

const path = url => resolve(__dirname + url);

module.exports = {
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@utils": path("/src/utils"),
            "@components": path("/src/components"),
            "@redux": path("/src/redux"),
            "@screens": path("/src/page"),
            "@css": path("/src/css"),
            "@hooks": path("/src/hooks"),
            "@config": path("/src/config"),
            "@hoc": path("/src/components/_hoc"),
            "@common": path("/src/components/common"),
            "@forms": path("/src/components/form"),
            "@constants": path("/src/utils/constants"),
            "@helpers": path("/src/utils/helpers"),
            "@services": path("/src/utils/services"),
        }
        return config;
    }
};
