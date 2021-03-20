# Dynamically build dom tree from json

This is my JSON data. I need to build a dom where the nodes built inside its children. I am able to build a dom for the node without children. Any pointers on how to build the dom tree with childrens contained inside the parent would be appreciated

Sample JSON for DOM Building

```js
{
  widgetData: [
    {
      label: "node1",
      color: "red",
      children: [
        {
          label: "vip1",
          color: "red",
          children: [
            {
              label: "obj1",
              color: "gray",
              id: "539803eae4b0ffad82491508",
            },
            {
              label: "obj2",
              color: "green",
              id: "5395635ee4b071f136e4b691",
            },
            {
              label: "obj3",
              color: "green",
              id: "539803e4e4b0ffad82491507",
            },
          ],
          id: "53956358e4b071f136e4b690",
        },
        {
          label: "vip2",
          color: "blue",
          id: "539803f2e4b0ffad82491509",
        },
      ],
      id: "5395634ee4b071f136e4b68e",
    },
    {
      label: "node2",
      children: [
        {
          label: "vip1",
          color: "green",
          id: "539803eae4b0ffad82491501",
        },
        {
          label: "vip2",
          color: "green",
          id: "5395635ee4b071f136e4b694",
        },
      ],
      id: "5395637fe4b071f136e4b692",
    },
    {
      label: "node3",
      color: "red",
      children: [],
      id: "53956371f136e4b692",
    },
    {
      label: "node4",
      color: "red",
      children: [],
      id: "5656",
    },
    {
      label: "node5",
      color: "red",
      children: [],
      id: "5395637fe4b071f13b692",
    },
  ],
};
```

```js
const attachDOM = (container, json) => {
  json.map((data) => {
    let el = document.createElement("div");
    let {
      label: { id },
    } = data;
    el.innerText();
    el.setAttribute('id', id);
    if (data.children) {
      attachDOM(el, data.children);
    }
    container.appendChild(el);
  });
};
```
