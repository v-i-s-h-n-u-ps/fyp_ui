const resolve = require('path').resolve;

const path = url => resolve(__dirname + url);

const AMAZON_SECRET_KEY = process.env.AMAZON_SECRET_KEY;
const AMAZON_ACCESS_KEY = process.env.AMAZON_ACCESS_KEY;
const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;
const TALKJS_APP_ID = process.env.TALKJS_APP_ID;
const TALKJS_SECRET_KEY = process.env.TALKJS_SECRET_KEY;

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
    },
    env: {
        AMAZON_SECRET_KEY,
        AMAZON_ACCESS_KEY,
        GOOGLE_MAPS_KEY,
        TALKJS_APP_ID,
        TALKJS_SECRET_KEY
    }
};
