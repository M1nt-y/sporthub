import { defineComponent } from 'vue';
import Button from './Button.vue';
import IconSearch from '@/assets/icons/Button/Search.vue';

interface ButtonProps {
  width: number;
  padding: number;
  isSearch: boolean;
  searchRight: boolean;
  text: string;
  defaultBtn: boolean;
  coffeBtn: boolean;
  disabledBtn: boolean;
  background: boolean;
}

const Template = defineComponent({
  components: { Button, IconSearch },
  props: {
    args: Object as () => ButtonProps,
  },
  template: `
    <Button
      :width="args.width"
      :padding="args.padding"
      :isSearch="args.isSearch"
      :searchRight="args.searchRight"
      :text="args.text"
      :defaultBtn="args.defaultBtn"
      :coffeBtn="args.coffeBtn"
      :disabledBtn="args.disabledBtn"
      :background="args.background"
      @pressed="pressed"
    >
      <span
        class="ui-button__span"
        :class="{'ui-button__span_search': args.isSearch}"
      >
        <IconSearch
          v-if="args.isSearch"
          :class="{'svg_none': args.text.length < 1}"
        />
        {{ args.text }}
      </span>
    </Button>
  `,
});

export default {
  title: 'Button',
  component: Template,
  argTypes: {
    args: {
      control: {
        type: 'object',
      },
    },
  },
};

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
  width: 150,
  padding: 10,
  isSearch: false,
  searchRight: false,
  text: 'Subscribe',
  defaultBtn: true,
  coffeBtn: false,
  disabledBtn: false,
  background: false,
};

export const CoffeeButton = (args: { [key: string]: any }) => ({
  components: { Template },
  setup() {
    return {
      args,
    };
  },
  template: '<Template :args="args" />',
});

CoffeeButton.args = {
  width: 150,
  padding: 10,
  isSearch: false,
  searchRight: false,
  text: 'Subscribe',
  defaultBtn: false,
  coffeBtn: true,
  disabledBtn: false,
  background: false,
};

export const DisabledButton = (args: { [key: string]: any }) => ({
  components: { Template },
  setup() {
    return {
      args,
    };
  },
  template: '<Template :args="args" />',
});

DisabledButton.args = {
  width: 150,
  padding: 10,
  isSearch: false,
  searchRight: false,
  text: 'Subscribe',
  defaultBtn: false,
  coffeBtn: false,
  disabledBtn: true,
  background: false,
};