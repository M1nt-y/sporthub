import { defineComponent } from 'vue';
import TheInput from './TheInput.vue';

export default {
  title: 'Input',
  component: TheInput,
};

interface InputArgs {
  padding: number;
  placeholder: string;
  type: string;
  search: boolean;
  searchLeft: boolean;
}

const Template = defineComponent({
  components: { TheInput,  },
  props: {
    args: Object as () => InputArgs,
  },
  template: '<TheInput v-bind="args" />',
});

export const Default = (args: { [key: string]: any }) => ({
  components: { Template },
  setup() {
    return {
      args,
    };
  },
  template: '<Template :args="args" />',
});


Default.args = {
  padding: 10,
  placeholder: 'Enter text',
  type: 'text',
  search: false,
  searchLeft: false,
};


export const SearchInput = (args: { [key: string]: any }) => ({
  components: { Template },
  setup() {
    return {
      args,
    };
  },
  template: '<Template :args="args" />',
});

SearchInput.args = {
  padding: 10,
  placeholder: 'Search...',
  type: 'text',
  search: true,
  searchLeft: false,
};


export const SearchInputLeft = (args: { [key: string]: any }) => ({
  components: { Template },
  setup() {
    return {
      args,
    };
  },
  template: '<Template :args="args" />',
});
SearchInputLeft.args = {
  padding: 10,
  placeholder: 'Search...',
  type: 'text',
  search: true,
  searchLeft: true,
};