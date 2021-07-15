import * as http from 'http';

import {app} from './app';
import {config} from './config';

const server = http.createServer(app);

server.listen(config.PORT, () => console.log(`Server listen ${config.PORT}`));

