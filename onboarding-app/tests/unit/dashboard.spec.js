import { shallowMount } from '@vue/test-utils';
import Dashboard from '@/components/Dashboard';

describe('Dashboard.vue', () => {
  let wrapper;
  const msg = 'OnBoarding Tasks';

  describe('#test', () => {
    beforeEach(() => {
      wrapper = shallowMount(Dashboard, {
        propsData: { msg },
        stubs: ['router-link'],
      });
    });

    it('renders props.msg when passed', () => {
      const title = wrapper.find('.title');

      expect(title.text()).toMatch(msg);
      wrapper.destroy();
    });

    it('should be a vue instance', () => {
      expect(wrapper).toBeTruthy();
      wrapper.destroy();
    });

    it('snapshot', () => {
      expect(wrapper).toMatchSnapshot();
      wrapper.destroy();
    });
  });

  describe('#Delete Task', () => {
    const tasksData = [
      {
        id: 1,
        module: 'Test Module',
        contents: 'Test Contents',
        duration: 2,
        finished: false,
      },
    ];
    beforeEach(() => {
      wrapper = shallowMount(Dashboard, {
        data() {
          return {
            tasksData,
          };
        },
        stubs: ['router-link'],
      });
    });

    it('should delete a task', async () => {
      const onDelete = jest.fn();
      wrapper.setMethods({
        onDelete,
      });
      const deleteBtn = wrapper.find('.all-task-delete-btn');
      await deleteBtn.trigger('click');
      expect(onDelete).toHaveBeenCalled();
      wrapper.destroy();
    });
  });
});
