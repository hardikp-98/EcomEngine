const globalAny: any = global;
globalAny.CONFIGURATION = require(`./config/${process.env.NODE_ENV?.toLocaleLowerCase().trim()}`);;

import { InversifyServer } from "./inversifyServer";
import { ECOMDatabase } from "./database/db";

(function main() {
    const app = new InversifyServer(globalAny.CONFIGURATION.config.SERVER_PORT);

    ECOMDatabase.authenticate()
        .then(() => app.start())
        .catch((error: any) => console.log(`Connection Error : ${error}`));
})();
