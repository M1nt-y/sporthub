import { defineComponent } from 'vue';
import TheRadioInputVue from './TheRadioInput.vue';

interface RadioInputProps {
  state: boolean;
}

export default {
  title: 'RadioInput',
  component: TheRadioInputVue,
  argTypes: {
    state: { control: 'boolean' },
  },
};

const Template = defineComponent({
  components: { TheRadioInputVue },
  props: {
    args: {
      type: Object as () => RadioInputProps,
      required: true,
    },
  },
  template: '<TheRadioInputVue :state="args.state" />',
});

export const Default = () => ({
  components: { Template },
  setup() {
    const args = {
      state: false,
    };

    return {
      args,
    };
  },
  template: '<Template :args="args" />',
});

export const Active = () => ({
  components: { Template },
  setup() {
    const args = {
      state: true,
    };

    return {
      args,
    };
  },
  template: '<Template :args="args" />',
});