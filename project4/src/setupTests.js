// setup file - setupTests.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from "jsdom"

configure({ adapter: new Adapter() });

const dom = new JSDOM();
global.document = dom.window.document
global.window = dom.window