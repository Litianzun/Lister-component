import React, { useState } from "react";
import Alert, { AlertType } from "./components/Alert/alert";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/submenu";
import TabItem from "./components/Tabs/tabItem";
import Tabs from "./components/Tabs/tabs";
import Icon from "./components/Icon/icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Transition from "./components/Transition/transition";
import Input from "./components/Input/input";
import AutoComplete from "./components/AutoComplete/autoComplete";
import Select from "./components/Select/select";
import SelectOptions from "./components/Select/option";
library.add(fas);

type Ilogin = {
  login: string;
};
function App() {
  const [show, setShow] = useState(false);
  const [inputValue, setValue] = useState("");
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        return items.slice(0, 10).map((item: Ilogin) => ({
          value: item.login,
          ...item,
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="App">
      <Button
        btnType="primary"
        onClick={(e) => {
          e.preventDefault();
          alert("click");
        }}
        className="rr"
      >
        primary button
      </Button>
      <Button btnType="default">default button</Button>
      <Button btnType="danger" loading>
        danger button
      </Button>
      <br />
      <Button btnType="primary" size="lg" icon={<Icon icon="coffee" theme="light" />}>
        large
      </Button>
      <br />
      <Button btnType="primary" size="sm">
        small
      </Button>
      <br />
      <Button btnType="primary" disabled>
        Hello
      </Button>
      <br />
      <Button btnType="link" href="https://www.baidu.com/" target="_blank">
        百度
      </Button>
      <Button btnType="link" href="https://www.baidu.com/" disabled>
        百度
      </Button>
      <Alert message="title" type="success" description="税金到那时觉得你觉得那就是你家呢" />
      <Alert message="title" type="danger" />
      <Alert message="title" type="warning" />
      <Alert message="title" type="default" />
      <Menu
        defaultIndex="0"
        onSelect={(index) => {
          console.log(index);
        }}
        // mode='vertical'
        defaultOpenSubMenus={["3"]}
      >
        <MenuItem disabled>cool link1</MenuItem>
        <MenuItem>cool link2</MenuItem>
        <MenuItem>cool link3</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem disabled>dropdown1</MenuItem>
          <MenuItem>dropdown2</MenuItem>
          <MenuItem>dropdown3</MenuItem>
        </SubMenu>
      </Menu>
      <Button
        onClick={() => {
          setShow(!show);
        }}
      >
        toggle
      </Button>
      <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
        <>
          <Icon icon="coffee" theme="primary" size="10x" />
          <Button>123</Button>
        </>
      </Transition>
      <Tabs
        defaultIndex="0"
        onSelect={(index) => {
          console.log(index);
        }}
        type="card"
      >
        <TabItem label="label1">tab1</TabItem>
        <TabItem label="label2">tab2</TabItem>
        <TabItem label="label3">tab3</TabItem>
      </Tabs>
      <Input
        size="lg"
        placeholder="请填写内容"
        defaultValue="123"
        value={inputValue}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <AutoComplete fetchSuggestions={handleFetch} placeholder="请输入" />
      <Select
        onChange={(index) => {
          console.log(index);
        }}
        defaultValue={['option1']}
      >
        <SelectOptions label="label1" value="option1"></SelectOptions>
        <SelectOptions label="label2" value="option2"></SelectOptions>
        <SelectOptions label="label3" value="option3"></SelectOptions>
      </Select>
      <Select
        onChange={(index) => {
          console.log(index);
        }}
        multiple
        defaultValue={['option1']}
      >
        <SelectOptions label="label1" value="option1"></SelectOptions>
        <SelectOptions label="label2" value="option2"></SelectOptions>
        <SelectOptions label="label3" value="option3"></SelectOptions>
      </Select>
    </div>
  );
}

export default App;
