import {Component} from 'angular2/core';
import TodoStore from './../store/todostore';
import {TodoItem as TodoModelItem} from './../store/todoitem';
import TodoItem from '../todoitem/todoitem';
import ItemUpdatedEvent from '../todoitem/itemupdatedevent';

@Component({
  selector: 'todo-list',
  templateUrl: 'app/todolist/todolist.html',
  styleUrls: ['app/todolist/todolist.css'],
  directives: [TodoItem]
})
export default class TodoList {
  newItem = 'test';
  store: TodoStore;

  constructor(store: TodoStore) {
    this.store = store;
  }

  addItem() {
    this.store.dispatch({
      type: 'ADD',
      text: this.newItem
    });
    this.newItem = '';
  }

  removeItem(item: TodoModelItem) {
    this.store.dispatch({
      type: 'REMOVE',
      itemId: item.uuid
    });
  }

  itemUpdated(event: ItemUpdatedEvent) {
    if (event.text !== undefined) {
      if (event.text === '') {
        this.store.dispatch({
          type: 'REMOVE',
          itemId: event.itemId
        });
      } else {
        this.store.dispatch({
          type: 'UPDATE_ITEM_TEXT',
          itemId: event.itemId,
          text: event.text
        });
      }
    }
    if (event.completed !== undefined) {
       this.store.dispatch({
         type: 'UPDATE_ITEM_COMPLETION',
         itemId: event.itemId,
         completed: event.completed
       });
     }
  }

}
