const Todo = require('./todo');
const TodoList = require('./todolist');

// eslint-disable-next-line max-lines-per-function
describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray method returns an array of the todos', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('first method returns first element', () => {
    expect(list.first()).toBe(todo1);
  });

  test('last method returns first element', () => {
    expect(list.last()).toBe(todo3);
  });

  test('shift removes first element and returns it', () => {
    expect(list.shift()).toBe(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('isDone returns true when all tasks are done', () => {
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('type error when adding non todo object', () => {
    expect(() => list.add('a string')).toThrow(TypeError);
    expect(() => list.add(1)).toThrow(TypeError);
  });

  test('itemAt returns item and throws error if index for no item', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => {
      list.itemAt(5);
    }).toThrow();
  });

  test('markDoneAt marks done', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
    expect(() => {
      list.itemAt(5);
    }).toThrow(ReferenceError);
  });

  test('markUndoneAt marks todo at given index undone', () => {
    expect(() => list.markUndoneAt(6)).toThrow(ReferenceError);
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();

    list.markUndoneAt(1);

    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  });


  test('markAllDone marks all done', () => {
    list.markAllDone();
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  });

  test('removeAt removes todo at reference', () => {
    expect(() => {
      list.removeAt();
    }).toThrow(ReferenceError);

    list.removeAt(1);
    expect(list.itemAt(1)).toEqual(todo3);
  });

  test('to string returns the proper string when all undone', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('to string returns the proper string when 1 done', () => {
    todo1.markDone();

    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString returns proper string when all done', () => {
    list.markAllDone();
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over all todos', () => {
    list.forEach(todo => {
      todo.markDone();
    });

    expect(list.isDone()).toBe(true);
  });

  test('filter returns a new todolist object with filtered todos', () => {
    let newToDoList = list.filter(() => {
      return true;
    });

    expect(newToDoList).toEqual(list);

    list.markDoneAt(0);
    let newToDoList2 = list.filter(todo => {
      return todo.isDone();
    });
    let string = `---- Today's Todos ----
[X] Buy milk`;
    expect(newToDoList2.toString()).toBe(string);
});


});