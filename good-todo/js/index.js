// Звуки
const soundDone = new Audio('sound/right_1.mp3');
const soundTrash = new Audio('sound/trash.mp3');
const soundClack = new Audio('sound/clack.mp3');

class App {
  constructor(options) {
    this.data = options.data || [];
    this.components = options.components || [];
  }

  init() {
    const initialState = {
      tab: 'current',
      modalIsOpen: false,
    }

    const componentOptions = {
      data: this.data,
      store: createStore(rootReducer, initialState),
    };

    this.components.forEach(item => {
      const component = new item.class(item.elem, componentOptions);
      component.init();
    });
  }

}

const app = new App({
  data: new Todos(),
  components: [
    {class: HeaderComponent, elem: document.querySelector('.header')},
    {class: TabsComponent, elem: document.querySelector('.tabs')},
    {class: TodosComponent, elem: document.querySelector('.todos')},
    {class: AddBtnComponent, elem: document.querySelector('.add-btn')},
    {class: ModalComponent, elem: document.querySelector('.modal')},
  ],
});

app.init();