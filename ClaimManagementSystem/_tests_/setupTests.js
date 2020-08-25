const configure = require('enzyme').configure;
const adapter = require('enzyme-adapter-react-16')

configure({ adapter: new adapter() });