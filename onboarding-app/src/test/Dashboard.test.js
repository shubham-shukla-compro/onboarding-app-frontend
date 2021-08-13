import { shallowMount } from '@vue/test-utils';
import Dashboard from '../components/Dashboard';

describe('Dashboard.vue', () => {
  test('display title', () => {
    const wrapper = shallowMount(Dashboard);
    const title = wrapper.find('h1');

    expect(title.text()).toContain('OnBoarding Tasks');
  });
});
