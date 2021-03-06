#### React 中 keys 的作用是什么？
 * 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性

 #### 调用 setState 之后发生了什么？
 * 在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

 * setState 可以传一个对象，也可以传一个 函数 来修改 state。  二者的区别是 多次调用 setState 方法，如果传对象会合并对象生成最终state，如果传的是 函数的话，可以每次执行函数修改state。
 
 #### react 生命周期函数
* 初始化阶段：
* getDefaultProps:获取实例的默认属性
* getInitialState:获取每个实例的初始化状态
* componentWillMount：组件即将被装载、渲染到页面上
* render:组件在这里生成虚拟的 DOM 节点
* componentDidMount:组件真正在被装载之后
* 运行中状态：
* componentWillReceiveProps:组件将要接收到属性的时候调用
* shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）
* componentWillUpdate:组件即将更新不能修改属性和状态
* render:组件重新描绘
* componentDidUpdate:组件已经更新
* 销毁阶段：
* componentWillUnmount:组件即将销毁

#### shouldComponentUpdate 是做什么的，（react 性能优化是哪个周期函数？）
* shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。

#### 为什么虚拟 dom 会提高性能?
* 虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能。用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。

#### react diff 原理
* 把树形结构按照层级分解，只比较同级元素。
* 给列表结构的每个单元添加唯一的 key 属性，方便比较。
* React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）
* 合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
* 选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。

#### React 中 refs 的作用是什么？
* Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。我们可以为元素添加 ref 属性然后在回调函数中接受该元素在 DOM 树中的句柄，该值会作为回调函数的第一个参数返回：

```js
    class CustomForm extends Component {
        handleSubmit = () => {
            console.log("Input Value: ", this.input.value)
        }
        render () {
            return (
            <form onSubmit={this.handleSubmit}>
                <input
                type='text'
                ref={(input) => this.input = input} />
                <button type='submit'>Submit</button>
            </form>
            )
        }
    }
```
上述代码中的 input 域包含了一个 ref 属性，该属性声明的回调函数会接收 input 对应的 DOM 元素，我们将其绑定到 this 指针以便在其他的类函数中使用。另外值得一提的是，refs 并不是类组件的专属，函数式组件同样能够利用闭包暂存其值：

```js
function CustomForm ({handleSubmit}) {
  let inputElement
  return (
    <form onSubmit={() => handleSubmit(inputElement.value)}>
      <input
        type='text'
        ref={(input) => inputElement = input} />
      <button type='submit'>Submit</button>
    </form>
  )
}

```

#### 展示组件(Presentational component)和容器组件(Container component)之间有何不同
* 展示组件关心组件看起来是什么。展示专门通过 props 接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心 UI 状态而不是数据的状态。
* 容器组件则更关心组件是如何运作的。容器组件会为展示组件或者其它容器组件提供数据和行为(behavior)，它们会调用 Flux actions，并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是(其它组件的)数据源。

#### 类组件(Class component)和函数式组件(Functional component)之间有何不同
* 类组件不仅允许你使用更多额外的功能，如组件自身的状态和生命周期钩子，也能使组件直接访问 store 并维持状态
* 当组件仅是接收 props，并将组件自身渲染到页面时，该组件就是一个 '无状态组件(stateless component)'，可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件(dumb components)或展示组件
* 函数组件不会被实例化，整体渲染性能得到提升；
* 函数组件不能访问 this 对象；
* 函数组件无法继承 React.Component 上的属性，因此无法访问生命周期的方法；
* 无状态函数组件只能访问输入的 props 。

#### (组件的)状态(state)和属性(props)之间有何不同
* State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。
* Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的(immutable)。组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)。Props 也不仅仅是数据--回调函数也可以通过 props 传递。

#### 何为受控组件(controlled component)
* 在 HTML 中，类似 <input>, <textarea> 和 <select> 这样的表单元素会维护自身的状态，并基于用户的输入来更新。当用户提交表单时，前面提到的元素的值将随表单一起被发送。但在 React 中会有些不同，包含表单元素的组件将会在 state 中追踪输入的值，并且每次调用回调函数时，如 onChange 会更新 state，重新渲染组件。一个输入表单元素，它的值通过 React 的这种方式来控制，这样的元素就被称为"受控元素"。

#### 何为高阶组件
* 高阶组件是一个以组件为参数并返回一个新组件的函数。HOC 运行你重用代码、逻辑和引导抽象。最常见的可能是 Redux 的 connect 函数。除了简单分享工具库和简单的组合，HOC 最好的方式是共享 React 组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的 HOC。

#### 为什么建议传递给 setState 的参数是一个 callback 而不是一个对象
* 因为 this.props 和 this.state 的更新可能是异步的，不能依赖它们的值去计算下一个 state

#### 除了在构造函数中绑定 this，还有其它方式吗
* 你可以使用属性初始值设定项(property initializers)来正确绑定回调，create-react-app 也是默认支持的。在回调中你可以使用箭头函数，但问题是每次组件渲染时都会创建一个新的回调。

#### (在构造函数中)调用 super(props) 的目的是什么
* 在 super() 被调用之前，子类是不能使用 this 的，在 ES2015 中，子类必须在 constructor 中调用 super()。传递 props 给 super() 的原因则是便于(在子类中)能在 constructor 访问 this.props。

#### 应该在 React 组件的何处发起 Ajax 请求
* 在 React 组件中，应该在 componentDidMount 中发起网络请求。这个方法会在组件第一次“挂载”(被添加到 DOM)时执行，在组件的生命周期中仅会执行一次。更重要的是，你不能保证在组件挂载之前 Ajax 请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用 setState，这将不起作用。在 componentDidMount 中发起网络请求将保证这有一个组件可以更新了。

#### 描述事件在 React 中的处理方式
* 为了解决跨浏览器兼容性问题，您的 React 中的事件处理程序将传递 SyntheticEvent 的实例，它是 React 的浏览器本机事件的跨浏览器包装器。这些 SyntheticEvent 与您习惯的原生事件具有相同的接口，除了它们在所有浏览器中都兼容。有趣的是，React 实际上并没有将事件附加到子节点本身。React 将使用单个事件监听器监听顶层的所有事件。这对于性能是有好处的，这也意味着在更新 DOM 时，React 不需要担心跟踪事件监听器。

#### createElement 和 cloneElement 有什么区别？
* React.createElement():JSX 语法就是用 React.createElement()来构建 React 元素的。它接受三个参数，第一个参数可以是一个标签名。如 div、span，或者 React 组件。第二个参数为传入的属性。第三个以及之后的参数，皆作为组件的子组件。
```js
    React.createElement(
    type,
    [props],
    [...children]
)
```
* React.cloneElement()与 React.createElement()相似，不同的是它传入的第一个参数是一个 React 元素，而不是标签名或组件。新添加的属性会并入原有的属性，传入到返回的新元素中，而就的子元素奖杯替换。
```js
    React.cloneElement(
    element,
    [props],
    [...children]
    )
```

#### react 组件的划分业务组件技术组件？
* 根据组件的职责通常把组件分为 UI 组件和容器组件。
* UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
* 两者通过 React-Redux 提供 connect 方法联系起来。

#### 简述 flux 思想
* Flux 的最大特点，就是数据的"单向流动"。
* 用户访问 View
* View 发出用户的 Action
* Dispatcher 收到 Action，要求 Store 进行相应的更新
* Store 更新后，发出一个"change"事件
* View 收到"change"事件后，更新页面

#### 了解 redux 么，说一下 redux 把
* redux 是一个应用数据流框架，主要是解决了组件间状态共享的问题，原理是集中式管理，主要有三个核心方法，action，store，reducer，工作流程是 view 调用 store 的 dispatch 接收 action 传入 store，reducer 进行 state 操作，view 通过 store 提供的 getState 获取最新的数据，flux 也是用来进行数据操作的，有四个组成部分 action，dispatch，view，store，工作流程是 view 发出一个 action，派发器接收 action，让 store 进行数据更新，更新完成以后 store 发出 change，view 接受 change 更新视图。Redux 和 Flux 很像。主要区别在于 Flux 有多个可以改变应用状态的 store，在 Flux 中 dispatcher 被用来传递数据到注册的回调事件，但是在 redux 中只能定义一个可更新状态的 store，redux 把 store 和 Dispatcher 合并,结构更加简单清晰

* 新增 state,对状态的管理更加明确，通过 redux，流程更加规范了，减少手动编码量，提高了编码效率，同时缺点时当数据更新时有时候组件不需要，但是也要重新绘制，有些影响效率。一般情况下，我们在构建多交互，多数据流的复杂项目应用时才会使用它们

#### redux 有什么缺点
* 一个组件所需要的数据，必须由父组件传过来，而不能像 flux 中直接从 store 取。
* 当一个组件相关数据更新时，即使父组件不需要用到这个组件，父组件还是会重新 render，可能会有效率影响，或者需要写复杂的 shouldComponentUpdate 进行判断。

### React 组件间的通信
 ##### 父传子
 * 父传子通过props 传递
 ##### 子传父
 * child 组件通知 parent 组件， 主要是依靠 parent 传下来的 callback 函数执行，改变 parent 组件的状态，或者把 child 自己的 state 通知 parent 。
 ##### 兄弟组件
 * 利用共有的Container 相当于将状态提升至兄弟组件的父组件  当然也可以使用context

### React如何获取DOM实例 以及 访问子组件方法及属性
> React 支持一种非常特殊的属性 Ref ，你可以用来绑定到 render() 输出的任何组件上。
  >ref : 绑定属性
  >refs : 调用的时候使用
##### 父组件访问子组件的方法 
* refs,它可以调用子组件的方法以及属性(场景：子组件的状态和方法在组件内部维护，但是父组件需调用子组件的方法来改变子组件的状态)
```js
class SubComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '这里是初始化文本'
    };
  }
  subHandleClick(){
    this.setState({text: '文本被改变啦！哈哈！'})
  }
  render(){
    return(
      <div>
        查看：{this.state.text}
      </div>
    )
  }
}

class MyComponent extends Component {
  handleClick(){
    this.refs.subcomponents.subHandleClick();
  }
  render(){
    return(
      <div>
        <input
          type="button"
          value="点我调用子组件方法"
          onClick={this.handleClick.bind(this)}
        />
        <SubComponent ref="subcomponents" />
      </div>
    )
  }
}
```

##### 获取dom实例
```js
class MyComponent extends Component {
  handleClick(){
    this.refs.myInput.focus();
  }
  render(){
    return(
      <div>
        <input 
          type="text" 
          ref="myInput" 
        />
        <input
          type="button"
          value="点我输入框获取焦点"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    )
  }
}
```
 ### 如何理解React的渲染机制
 ##### React 生命周期
 ##### 实例化阶段
 * 依次执行 getDefaultProps -> getInitialState -> componentWillDidMount -> render -> componentDidMount
 ##### 存在期
 * state状态更新 shouldComponetUpDate (true) -> componentWillUpdate -> render -> componentDidMount
 * props状态更新 componentWillReceiveProps -> shouldComponetUpDate (true) -> componentWillUpdate -> render -> componentDidMount
 ##### 卸载销毁期
 * componentWillUnmount

 ### React Differ 算法
 * 在页面一开始打开的时候，React会调用render函数构建一棵虚拟Dom树，在state/props发生改变的时候，render函数会被再次调用渲染出另外一棵树，接着，React会用对两棵树进行对比，找到需要更新的地方批量改动。
 **React基于两个假设**
 * 两个相同的组件产生类似的DOM结构，不同组件产生不同DOM结构
 * 对于同一层次的一组子节点，它们可以通过唯一的id区分
 **Diff算法是怎么做的，这里分为两种情况考虑**
 * 节点类型相同，但是属性不同
 * 节点类型不同
 对于不同的节点类型，react会基于第一条假设，直接删去旧的节点，新建一个新的节点。</br>
 **相同节点类型**</br>
当对比相同的节点类型比较简单，这里分为两种情况，</br>
一种是DOM元素类型，对应html直接支持的元素类型：div，span和p；</br>
还有一种是React组件。由于React此时并不知道如何去更新DOM树，因为这些逻辑都在React组件里面，所以它能做的就是根据新节点的props去更新原来根节点的组件实例，触发一个更新的过程.

### react 受控组件 与 非受控组件区别

>  React内部分别使用了props, state来区分组件的属性和状态。props用来定义组件外部传进来的属性, 属于那种经过外部定义之后, 组件内部就无法改变。而state维持组件内部的状态更新和变化, 组件渲染出来后响应用户的一些操作,更新组件的一些状态。如果组件内部状态不需要更新,即没有调用过this.setState, 全部通过props来渲染也是没问题的,。
##### 非受控组件
* 非受控组件一般没什么用途，其值并非受父组件控制，它的值受其自身控制。但是，我们可以对其添加一个ref属性，这样可以获得对非受控组件渲染后底层DOM元素的访问。 非受控组件即组件的状态改变不受控制。（input defaultVale）
##### 受控组件
* 控组件与其它React组件行为一样，其所有状态属性的更改都由React 来控制，也就是说它根据组件的props和state来改变组件的UI表现形式。 受控组件是可通过事件完成的对value的控制。（input 的 value）

### react 无状态组件 和 有状态组件
>我们通常通过props和state来处理两种类型的数据。props是只读的，只能由父组件设置。state在组件内定义，在组件的生命周期中可以更改。基本上，无状态组件（也称为哑组件）使用props来存储数据，而有状态组件（也称为智能组件）使用state来存储数据.
##### 无状态组件(Stateless Component)
* 最基础的组件形式，由于没有状态的影响所以就是纯静态展示的作用。一般来说，各种UI库里也是最开始会开发的组件类别。它的基本组成结构就是属性（props）加上一个渲染函数（render）。
##### 有状态组件（Stateful Component）
* 如果组件内部包含状态（state）且状态随着事件或者外部的消息而发生改变的时候，这就构成了有状态组件（Stateful Component）。有状态组件通常会带有生命周期(lifecycle)，用以在不同的时刻触发状态的更新。这种组件也是通常在写业务逻辑中最经常使用到的。

### 单向数据流(M -> V) 和 双向数据流（M <-> V）
##### 单向数据流
* 单向数据流　数据流动方向可以跟踪，流动单一，追查问题的时候可以跟快捷。缺点就是写起来不太方便。要使UI发生变更就必须创建各种action来维护对应的state
##### 双向数据流
* 双向流动　值和UI双绑定，代码量减少。但是由于各种数据相互依赖相互绑定，导致数据问题的源头难以被跟踪到，子组件修改父组件，兄弟组件互相修改有有违设计原则。　但　好处就是　太特么方便了。

### redux-saga 的 takeEvery 、 takeLatest 、takeLeading 的区别
* takeEvery  允许处理并发的 action，但是不会对多个任务的响应进行排序，并且不保证任务将会以它们启动的顺序结束。如果要对响应进行排序，可以关注以下的 takeLatest。
* takeLatest 在发起到 Store 并且匹配 pattern 的每一个 action 上派生一个 saga。并自动取消之前所有已经启动但仍在执行中的 saga 任务。
* takeLeading 在发起到 Store 并且匹配 pattern 的每一个 action 上派生一个 saga。 它将在派生一次任务之后阻塞，直到派生的 saga 完成，然后又再次开始监听指定的 pattern。

### redux-saga 的 call 、 fork 、take、cancel 的区别
* call 是一个会阻塞的 Effect, Generator 在调用结束之前不能执行或处理任何其他事情。
* fork 是一个无阻塞的 Effect，当我们 fork 一个 任务，任务会在后台启动，调用者也可以继续它自己的流程，而不用等待被 fork 的任务结束。
* take 就像我们更早之前看到的 call 和 put。它创建另一个命令对象，告诉 middleware 等待一个特定的 action。

* cancel yield fork 的返回结果是一个 Task Object。 我们将它们返回的对象赋给一个本地常量 task。我们将那个 task 传入给 cancel Effect。 如果任务仍在运行，它会被中止。如果任务已完成，那什么也不会发生，取消操作将会是一个空操作（no-op）。最后，如果该任务完成了但是有错误， 那我们什么也没做，因为我们知道，任务已经完成了。

### redux-saga 的 race all 的区别
* race 创建一个 Effect 描述信息，用来命令 middleware 在多个 Effect 间运行 竞赛，当 reslve race 的时候，middleware 会自动地取消所有输掉的 Effect。结果返回第一个完成的 effects。
* all 创建一个 Effect 描述信息，用来命令 middleware 并行地运行多个 Effect，并等待它们全部完成。 当并发运行 Effect 时，middleware 将暂停 Generator，直到以下任一情况发生：所有 Effect 都成功完成：（1）返回一个包含所有 Effect 结果的数组，并恢复 Generator。（2）在所有 Effect 完成之前，有一个 Effect 被 reject：在 Generator 中抛出 reject 错误。

### V16 生命周期函数用法建议
class ExampleComponent extends React.Component {
  // 用于初始化 state  constructor生命周期，如不需要，可缺省。通常会在 constructor 方法中初始化 state 和绑定事件处理程序。
但是，如果写了constructor，那么必须在其中调用super(props);否则可能会引起报错。
  ```js
  constructor() {}
  ```
  // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
  // 因为该函数是静态函数，所以取不到 `this`
  // 如果需要对比 `prevProps` 需要单独在 `state` 中维护
  ```js
  static getDerivedStateFromProps(nextProps, prevState) {}
  ```
  // 判断是否需要更新组件，多用于组件性能优化
  ```js
  shouldComponentUpdate(nextProps, nextState) {}
  ```
  // 组件挂载后调用
  // 可以在该函数中进行请求或者订阅
  ```js
  componentDidMount() {}
  ```
  // 用于获得最新的 DOM 数据
  ```js
  getSnapshotBeforeUpdate() {}
  ```
  // 组件即将销毁
  // 可以在此处移除订阅，定时器等等
  ```js
  componentWillUnmount() {}
  ```
  // 组件销毁后调用
  ```js
  componentDidUnMount() {}
  ```
  // 组件更新后调用
  ```js
  componentDidUpdate() {}
  ```
  // 渲染组件函数
  render() {}
}

* getDerivedStateFromProps/getSnapshotBeforeUpdate 和 componentWillMount/componentWillReceiveProps/componentWillUpdate 如果同时存在，React会在控制台给出警告信息，且仅执行 getDerivedStateFromProps/getSnapshotBeforeUpdate 【React@16.7.0】

**props发生变化时**
> static getDerivedStateFromProps(props, status)  -> shouldComponentUpdate(nextProps, nextState, nextContext) -> render -> getSnapshotBeforeUpdate(prevProps, prevState) -> componentDidUpdate(prevProps, prevState, snapshot) 
  或者执行
> componentWillReceiveProps(nextProps, nextContext)/UNSAFE_componentWillReceiveProps  ->  shouldComponentUpdate(nextProps, nextState, nextContext)  -> componentWillUpdate(nextProps, nextState, nextContext)  -> render  -> componentDidUpdate(prevProps, prevState, snapshot)
**state发生变化时**
> static getDerivedStateFromProps(props, status)  -> shouldComponentUpdate(nextProps, nextState, nextContext)  -> render  -> getSnapshotBeforeUpdate(prevProps, prevState)  -> componentDidUpdate(prevProps, prevState, snapshot)
  或者执行
> shouldComponentUpdate(nextProps, nextState, nextContext)  ->  componentWillUpdate(nextProps,nextState,nextContext) -> render  -> componentDidMount()



### React 最新api 总结
* static getDerivedStateFromProps(nextProps, prevState)

根据 getDerivedStateFromProps(nextProps, prevState) 的函数签名可知: 其作用是根据传递的 props 来更新 state。它的一大特点是 无副作用 : 由于处在 Render Phase 阶段，所以在每次的更新都要触发， 故在设计 API 时采用了静态方法，其好处是单纯 —— 无法访问实例、无法通过 ref 访问到 DOM 对象等，保证了单纯且高效。值得注意的是，其仍可以通过 props 的操作来产生副作用，这时应该将操作 props 的方法移到 componentDidUpdate 中，减少触发次数。

```js
state = { isLogin: false }

static getDerivedStateFromProps(nextProps, prevState) {
  if(nextProps.isLogin !== prevState.isLogin){
    return {
      isLogin: nextProps.isLogin
    }
  }
  return null
}

componentDidUpdate(prevProps, prevState){
  if(!prevState.isLogin && prevProps.isLogin) this.handleClose()
}
```
但在使用时要非常小心，因为它不像 componentWillReceiveProps 一样，只在父组件重新渲染时才触发，本身调用 setState 也会触发。官方提供了 3 条 checklist,这里搬运一下：

如果改变 props 的同时，有副作用的产生(如异步请求数据，动画效果)，这时应该使用 componentDidUpdate
如果想要根据 props 计算属性，应该考虑将结果 memoization 化，参见 memoization
如果想要根据 props 变化来重置某些状态，应该考虑使用受控组件
配合 componentDidUpdate 周期函数，getDerivedStateFromProps 是为了替代 componentWillReceiveProps 而出现的。它将原本 componentWillReceiveProps 功能进行划分 —— 更新 state 和 操作/调用 props，很大程度避免了职责不清而导致过多的渲染, 从而影响应该性能。


### React 中 setState 什么时候是同步的，什么时候是异步的？

* 在 React 中，如果是由 React 引发的事件处理（比如通过 onClick 引发的事件处理），调用 setState **不会同步更新** this.state，除此之外的 setState 调用会同步执行 this.state。所谓“除此之外”，指的是绕过 React 通过 addEventListener 直接添加的事件处理函数，还有通过 setTimeout/setInterval 产生的异步调用。

**原因：**在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果就是由 React 控制的事件处理过程 setState 不会同步更新 this.state。
### 

```js
class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }
  
  componentDidMount() {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 1 次 log 0 

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);    // 第 2 次 log 0

    setTimeout(() => {
      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 3 次 log 2

      this.setState({val: this.state.val + 1});
      console.log(this.state.val);  // 第 4 次 log 3
    }, 0);
  }

  render() {
    return null;
  }
};


```
1.React 平时怎么绑定事件的？函内绑定和成员的箭头函数绑定有什么区别？如果是在 constructor 里 bind 绑定呢？
2.React 常用的 hook 有什么？
3.useMemo 平时都怎么用的？
4.平时做过哪些 React 优化？怎么定位问题，如何优化？
5.hook 解决了什么问题？为什么有 hook
6.了解合成事件吗？是什么？为什么需要合成事件？（解决什么问题？）
7.循环里的 key 有什么用？为什么一定要加？
8.平时状态管理工具用什么？怎么选型的？为什么？redux 和 mobx 什么区别？
9.什么是高阶组件？
10.redux 的 connect 是什么？为什么需要 connect？
11.PureComponent 和 React.memo 有什么区别？
12.context 是什么？用过吗？怎么用的？
13.ref 用过吗？什么场景？
14.react-router 原理是什么？和 vue-router 什么区别？什么是动态路由，什么是静态路由？有什么区别？
15.setState 什么时候是异步，什么时候是同步？
16.为什么一定要 super(props)
17.React 是如何 rerender 的？（得略懂源码，比如 diff vdom，然后判断是否要 render）
18.mobx 和 redux 原理是什么？（你工作用什么就看什么，有时间就都掌握）
19.React 是如何 diff的？什么样的策略？
20.fiber 是什么？
21.React 的一些TS类型问题。React.Element/React.ComponentType/React.ReactNode/JSX.Element/Element
构建 react


### React Fiber 原理介绍
* React 15 的问题：在页面元素很多，且需要频繁刷新的场景下，React 15 会出现掉帧的现象。根本原因是大量的同步计算任务阻塞了浏览器的 UI 渲染。默认情况下，JS 运算、页面布局和页面绘制都是运行在浏览器的主线程当中，他们之间是互斥的关系。如果 JS 运算持续占用主线程，页面就没法得到及时的更新。当我们调用setState更新页面的时候，React 会遍历应用的所有节点，计算出差异，然后再更新 UI。整个过程是一气呵成，不能被打断的。如果页面元素很多，整个过程占用的时机就可能超过 16 毫秒，就容易出现掉帧的现象
* 旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。而Fiber实现了自己的组件调用栈，它以链表的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。实现方式是使用了浏览器的requestIdleCallback这一 API。官方的解释是这样的：
window.requestIdleCallback()会在浏览器空闲时期依次调用函数，这就可以让开发者在主事件循环中执行后台或低优先级的任务，而且不会对像动画和用户交互这些延迟触发但关键的事件产生
* React 框架内部的运作可以分为 3 层：
    > Virtual DOM 层，描述页面长什么样。
    > Reconciler 层，负责调用组件生命周期方法，进行 Diff 运算等。
    > Renderer 层，根据不同的平台，渲染出相应的页面，比较常见的是 ReactDOM 和 ReactNative。
* Fiber 其实指的是一种数据结构，以前的 Reconciler 被命名为Stack Reconciler。Stack Reconciler 运作的过程是不能被打断的，必须一条道走到黑,Fiber Reconciler 每执行一段时间，都会将控制权交回给浏览器，可以分段执行.它可以用一个纯 JS 对象来表示：本质来说是一个链表。
 * Fiber Reconciler 在执行过程中，会分为 2 个阶段。
    > 阶段一，生成 Fiber 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断。
    > 阶段二，将需要更新的节点一次过批量更新，这个过程不能被打断。


### hook写法 和 class 写法区别
* 类组件是基于ES6 Class的写法，通过继承React.Component得到的react组件。函数组件，就是以函数的形式存在的react组件。
* 类组件需要继承class，函数组件不需要；
* 类组件可以访问生命周期，函数组件不可以；
* 类组件可以获取实例话后的this，并基于this做其他很多的事情，而函数组件不可以；
* 类组件可以维护state，函数组件不可以。

### 两种组件写法的优缺点

* 类组件是面向对象编程的一种表现，react类组件内部预置很多的API，我们直接调用/定制，就像生命周期，只要我们继承一个React.Component就可以了。

但是React类组件呢，它给我们的东西是太多了，有多少我们就需要学习多少。有时候，“多”并不意味着“好”。例如生命周期，如果记不住生命周期，那么在组件逻辑中有可能会变成一团糟。最后总结就是，React组件的“大而全”，增加我们的学习成本。

另外在某些场景下，React组件显得太重了，

类组件内的逻辑封装之后是和组件粘在一起的，难以拆分和复用（可以使用高阶组件、Render Props来实现）。

综合下来就是React类组件就是很强大，但并非全能。

函数组件：响应了React的设计理念“轻巧”，它和类组件一样可以承接相对复杂的交互逻辑。

函数组件显而易见的一个特质就是轻量、灵活，易于组织和维护、较低的学习成本。

函数组件和类组件最大的不同就是，函数组件可以捕获render内部的状态。

React组件的本身的定位是函数，一个吃进数据，吐出UI的函数。React框架只要的工作就是将代码转化为DOM操作，把数据层面的描述映射到用户可见的UI变化中去。React的数据应该是紧紧和渲染绑定一起的，而类组件则不能做到这一点。
因为组件之间的数据传输是通过props来实现的，在类组件中是通过this.props 来获取数据，虽然props本身不可变的，但是this是可变的，this上的数据也是可以修改的，所以this.props每次调用都会获取最新的props，这是react保证数据实时性的一个保证。

但是在某些场景下，我们通过setTimeout将渲染推迟3s，酒打破了this.props和渲染动作之间的联系了，这就导致了渲染错误。
然而在函数组件中，是直接通过props接受数据，它会在函数组件执行的瞬间就被捕获，而且props本身就是不可变的，所以在任何时机下获取props，都是最初捕获到那个props。当父组件传一个新的props来重新渲染组件的时候，本质上就是基于新的props入参而发起的一次全新函数调用，并不会影响上次对props的捕获。这就前面为什么说是函数组件可以捕获render内的状态的原因。

Hook的本质就是：一套能够使用函数组件更强大、更灵活的“钩子”

在函数组件中没有生命周期和state的说法：

useState()：为函数组件引入状态，通过useState()可以直接在函数组件引入state。

useEffect()：允许函数组件执行副作用的操作，在一定程度上弥补了react函数组件没有生命周期的遗憾
————————————————
版权声明：本文为CSDN博主「读心悦」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/xuelian3015/article/details/114262533




