import { mountWithForm } from '../../../../../test/provider';
import { StateSelect } from './StateSelect';
const { t } = global;

describe('StateSelect', () => {
  const onChangeMock = jest.fn();
  const defaultProps = {
    country: {},
    setRegion: onChangeMock,
    t
  };
  const mounted = (props) => {
    return mountWithForm(StateSelect, { defaultProps, props });
  };

  test('it renders the label according to the label prop', () => {
    expect(mounted().find('.InputField-label').text()).toEqual('State');
  });

  test('it sets the id, and htmlFor attributes according to input id', () => {
    expect(mounted().find('label').prop('htmlFor')).toEqual('state-select-dropdown');
    expect(mounted().find('select').prop('id')).toEqual('state-select-dropdown');
  });

  test('Dropdown calls onChange methods when onChange is invoked', () => {
    expect(onChangeMock).toHaveBeenCalledTimes(0);
    mounted().find('select').simulate('change', '');
    expect(onChangeMock).toBeCalled();
  });

  test('Dropdown is disabled if states prop is undefined', () => {
    const wrapper = mounted();
    expect(wrapper.find('select').prop('disabled')).toBeTruthy();
  });

  test('Dropdown is disabled if states exist but length is zero', () => {
    const props = { country: { states: [] } };
    const wrapper = mounted(props);
    expect(wrapper.find('select').prop('disabled')).toBeTruthy();
  });

  test('Dropdown is enabled if states has a length', () => {
    const props = { country: { states: [{ 'code': 'test' }] } };
    const wrapper = mounted(props);
    expect(wrapper.find('select').prop('disabled')).toBeFalsy();
  });
});
