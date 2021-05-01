const path = require('path');

module.exports = {
    webpack: config => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@utils": path.resolve(__dirname + "/src/utils"),
            "@components": path.resolve(__dirname + "/src/components"),
            "@redux": path.resolve(__dirname + "/src/redux"),
            "@screens": path.resolve(__dirname + "/src/page"),
            "@css": path.resolve(__dirname + "/src/css"),
            "@hooks": path.resolve(__dirname + "/src/hooks"),
            "@hoc": path.resolve(__dirname + "/src/components/_hoc"),
            "@common": path.resolve(__dirname + "/src/components/common"),
            "@forms": path.resolve(__dirname + "/src/components/form"),
            "@constants": path.resolve(__dirname + "/src/utils/constants"),
            "@helpers": path.resolve(__dirname + "/src/utils/helpers"),
            "@services": path.resolve(__dirname + "/src/utils/services"),
            "@config": path.resolve(__dirname + "/src/config"),
        }
        return config;
    }
};
