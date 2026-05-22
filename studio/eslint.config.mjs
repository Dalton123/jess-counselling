import studio from '@sanity/eslint-config-studio'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default [...studio]; 
