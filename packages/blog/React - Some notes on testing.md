What is the output of the component i.e what does it render?
Does the component render different results based on differing conditions?
What does the component do with functions passed to it as props?
What are the outcomes of a user interacting with the component?

//Use array destructurig to create mock functions.
let [editTodo, toggleTodo, deleteTodo] = new Array(3).fill(jest.fn());

```js
function shallowSetup() {
  // Sample props to pass to our shallow render
  const props = {
    id: "7ae5bfa3-f0d4-4fd3-8a9b-61676d67a3c8",
    title: "Todo",
    project: "Project",
    done: false,
    url: "https://www.photos.com/a_photo",
    createdAt: "2017-03-02T23:04:38.003Z",
    editTodo: editTodo,
    toggleTodo: toggleTodo,
    deleteTodo: deleteTodo
  }
  // wrapper instance around rendered output
  const enzymeWrapper = shallow(<Todo {...props} />);

  return {
    props,
    enzymeWrapper
  };
```

We can assert the unique rendered elements of the card as follows:

```js
// ./**tests**/todo_component_test.js
describe("Shallow rendered Todo Card", () => {
  it("should render a card with the details of the Todo", () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();
    // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector.
    expect(enzymeWrapper.find("img").hasClass("ui image")).toBe(true);
    expect(enzymeWrapper.find(".header").text()).toBe(props.title);
    expect(enzymeWrapper.find("button.ui.basic.red.button").text()).toBe(
      "Delete"
    );
    // enzymeWrapper.containsMatchingElement(node i.e reactElement) : Check if the provided React element matches one element in the render tree. Returns a boolean.
    expect(enzymeWrapper.containsMatchingElement(<button>Delete</button>)).toBe(
      true
    );
  });
});
```

We'll have to simulate a click on the edit button to assert that the elements
that we expect to be present when the form is open are indeed present.

We'll need to confirm that the state has changed to reflect that the form is open,
input boxes are present and their default values are the original to-do properties
And finally, that new buttons with different text are present.

We can do this as follows.

```js
// ./**tests**/todo_component_test.js
describe('Todo form', () => {
  let wrapper, props_;
  beforeEach(() => {
    // spy on the component handleOpen method
    sinon.spy(Todo.prototype, "handleOpen");
    const { enzymeWrapper, props } = shallowSetup();
    wrapper = enzymeWrapper;
    props_ = props;
  });
const button = wrapper.find('button').first();
button.simulate('click');
```

```js
// ./**tests**/todo_component_test.js
describe('Todo form', () => {
  let wrapper, props_;
  beforeEach(() => {
    // spy on the component handleOpen method
    sinon.spy(Todo.prototype, "handleOpen");
    const { enzymeWrapper, props } = shallowSetup();
    wrapper = enzymeWrapper;
    props_ = props;
  });
  afterEach(() => {
    Todo.prototype.handleOpen.restore();
  });
  it('should update the state property _**`formOpen`**_ and call handleOpen when edit button is clicked', () => {
    // find the edit button and simulate a click on it
    const button = wrapper.find('button').first();
    button.simulate('click');
    // The handleOpen method should be called.
    expect(Todo.prototype.handleOpen.calledOnce).toBe(true);
    // The value of this.state.formOpen should now be true
    expect(wrapper.state().formOpen).toEqual(true);
  });
  it('should display different buttons', () => {
    const button = wrapper.find('button').first();
    button.simulate('click');
    // When we click the edit button, the Update button should be present.
    expect(wrapper.find('button.ui').length).toBe(2);
    expect(wrapper.find('button.ui.basic.green.button').text()).toBe(' Update');
  });
  it('should display current values in edit fields', () =>{
    const button = wrapper.find('button').first();
    button.simulate('click');
    // Before any edits are made, the prepopulated values in the input fields should be the same passed through props.
    expect(wrapper.find('input').at(0).props().defaultValue).toEqual(props_.title);
  });
});

```

React Context test component that contains both Context.Provider and Context.Consumer
Test a component that contains both the provider and consumer of React Context.
The provider is in a wrapper class that also handles state.

App.tsx:

```js
public render(): React.ReactNode {
  return (
    <ConfigurationContextProvider>
      <ConfigurationContext.Consumer>
        { ({
          loadedStatus,
        }): ReactElement => {
          switch( loadedStatus ){
            case ConfigStatus.GoodConfiguration:
              return ( this.renderApp());
            case ConfigStatus.NotLoaded:
              return ( this.renderUnloadedApp() );
            case ConfigStatus.BadConfiguration:
              return ( this.renderBadConfiguration() );
          }
        }}
      </ConfigurationContext.Consumer>
    </ConfigurationContextProvider>
  );
}
```

How do you mock the `ConfigurationContextProvider` wrapper class so that it
can properly provide the `loadedStatus` value to the consumer for testing
the various renders of `App.tsx`?

ContextProvider.tsx:

```js
export const ConfigurationContext = React.createContext<ConfigurationState | undefined>(undefined);
export enum ConfigStatus {
  NotLoaded,
  BadConfiguration,
  GoodConfiguration
}

export interface ConfigurationState {
  loadedStatus: ConfigStatus;
  baseUrl: URL;
}

```

https://www.youtube.com/watch?v=JYIMbLxTkaM

context testing

kent c dodds: https://www.youtube.com/watch?v=3yiialslPbc

Jest Tests with React
https://itnext.io/jest-tests-with-react-context-api-90f3d2e06c8f

wth is detox: https://stackoverflow.com/questions/49321032/load-redux-store-initial-state-in-detox-testing

UT for React:
https://stackoverflow.com/questions/64251016/unit-test-case-of-containers-in-react

Should remember that
React state updates are asynchronous:
https://stackoverflow.com/questions/56722139/when-testing-code-that-causes-react-state-updates-should-be-wrapped-into-act

The key is to await act and then use async arrow function.

await act( async () => render(<TestApp/>));

Source:

https://stackoverflow.com/a/59839513/3850405

Anti-pattern:
https://stackoverflow.com/questions/64587784/react-hook-can-i-use-common-variable-out-of-functionhook-or-is-it-anti-patte/64600556#64600556

Search stack overflow for Anti-patterns
