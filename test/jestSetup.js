import axios from 'axios';
import {
  shallow, render, mount, configure
} from 'enzyme';
import { t } from './i18n/mocks';
import jsdom from 'jsdom';

// React 16 Enzyme adapter
import Adapter from 'enzyme-adapter-react-16';// React 16 Enzyme adapter
configure({ adapter: new Adapter() });// Make Enzyme functions available in all test files without importing
jest.mock('axios');


global.shallow = shallow;
global.render = render;
global.mount = mount;
global.t = t;
global.window = new jsdom.JSDOM().window;
axios.get.mockImplementation(() => Promise.resolve());
axios.post.mockImplementation(() => Promise.resolve());
