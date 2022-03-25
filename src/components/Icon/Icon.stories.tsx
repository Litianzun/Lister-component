import React from "react";
import { ComponentStory, ComponentMeta, Story, Meta } from "@storybook/react";
import "../../styles/index.scss";
import Component, { IconProps } from "./icon";
import { Title, Subtitle, Description, Primary, ArgsTable, Stories, PRIMARY_STORY } from "@storybook/addon-docs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export const Icon: React.FC<IconProps> = (args: any) => {
  return <Component icon="coffee" {...args} />;
};

export default {
  title: "Base/Icon",
  Component: Icon,
  argTypes: {
    className: {
      description: "类名",
      disable: true,
    },
    theme: {
      description: "icon类型",
      defaultValue: "primary",
      control: {
        type: "select",
        options: ["primary", "secondary", "success", "info", "warning", "danger", "light", "dark"],
      },
      table: {
        category: "Icon",
        type: { summary: "primary | secondary | success | info | warning | danger | light | dark" },
        defaultValue: { summary: "primary" },
      },
    },
    icon: {
      description: "icon图标名称",
      control: {
        type: "text",
      },
      table: {
        category: "Icon",
      },
      type: {
        name: "string",
        required: true
      },
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle></Subtitle>
          <Description>此icon组件基于react-fontawesome, docs：https://fontawesome.com/start</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
} as Meta;

// const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const IconTypes: Story<IconProps> = (args) => (
  <div style={styles}>
    <Icon icon="coffee" theme="primary" />
    <Icon icon="coffee" theme="secondary" />
    <Icon icon="coffee" theme="success" />
    <Icon icon="coffee" theme="warning" />
    <Icon icon="coffee" theme="danger" />
    <Icon icon="coffee" theme="dark" />
    <Icon icon="coffee" theme="light" />
    <Icon icon="coffee" theme="info" />
  </div>
);

// export const template = Template.bind({});

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};
