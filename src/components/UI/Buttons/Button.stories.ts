import Button from './Button.vue';
import IconSearch from '@/assets/icons/Button/Search.vue';

export default {
  title: 'Button',
  component: Button,
};

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

const Template: Story<ButtonProps> = (args: ButtonProps) => ({
  components: { Button, IconSearch },
  setup() {
    return { args };
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
        :class="{'ui-button__span_search': args.isSearch}">
        <IconSearch
          v-if="args.isSearch"
          :class="{'svg_none': args.text.length < 1}"
        />
        {{ args.text }}
      </span>
    </Button>
  `,
});


export const Default = Template.bind({});
Default.args = {
  width: 100,
  padding: 0,
  isSearch: false,
  searchRight: false,
  text: 'Subscribe',
  defaultBtn: true,
  coffeBtn: false,
  disabledBtn: false,
  background: false,
};

export const CoffeeButton = Template.bind({});
CoffeeButton.args = {
  width: 100,
  padding: 0,
  isSearch: false,
  searchRight: false,
  text: 'Subscribe',
  defaultBtn: false,
  coffeBtn: true,
  disabledBtn: false,
  background: false,
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
  width: 100,
  padding: 0,
  isSearch: false,
  searchRight: false,
  text: 'Subscribe',
  defaultBtn: false,
  coffeBtn: false,
  disabledBtn: true,
  background: false,
};