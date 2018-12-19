import config from '../../config';
import { Base64 } from '../utils/converters';

const encodedSecret = Base64.encode(`${config.authorization.clientId}:${config.authorization.clientSecret}`);
const authorizationKey = `Basic ${encodedSecret}`;

export default authorizationKey;