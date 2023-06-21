# Redux

단방향 바인딩만 가능한 React의 특성상 전역 상태 관리의 어려움이 있었습니다.

지금은 상태 관리 도구를 사용하면서 이 문제를 해결하고 있는데

대부분 [Flux 아키텍처](https://taegon.kim/archives/5288)를 구현한 라이브러리입니다.

Redux 또한 이 시기에 나온 라이브러리로 Redux는 상태 관리 도구이며 Flux 아키텍쳐의 구현체입니다.

## 구조

**/store.ts** redux의 설정 파일

**/feature/couter/couter.ts** 동기 상태 관리 파일 (Action)

**/feature/todo/todoSlice.ts** 비동기 상태 관리 파일 (Slice)

## 설치

`npm install @reduxjs/toolkit react-redux`

## 스토어 설정하기

먼저 `/store.ts` 파일을 만들어 아래와 같이 설정을 추가해 주겠습니다.

```js
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counter';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo : todoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
```

## index.ts에 Redux 연결하기
 
`index.ts`에 아래와 같이 store를 연결해 주면 끝입니다.

```js
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

## Action

`redux-action`의 기능입니다.

기존의 사용 방법 그대로 사용하면 됩니다.

`/feature/couter/couter.ts`에 아래와 같이 작성하면 됩니다.

```js
// 
const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");

function counter(state = 0, action) {
  switch (action.type) {
    case increment.type:
      return state + 1;
    case decrement.type:
      return state - 1;
    default:
      return state;
  }
}

export default counter
```

store에 연결되어 있기 때문에 `Dispatch`로 바로 사용할 수 있습니다.

## Disaptch

`Dispatch`는 redux의 **Action을 실행하는 함수**입니다.

`useDispatch`를 사용하여 아래와 같이 사용할 수 있습니다.

```js
import { increment } from './counter'
import { decrement } from  './counter'
import { useDispatch } from 'react-redux'

export default function counter(){
    const dispath = useDispatch()
    return (
        <button onClick={() => dispatch(increment())}>+</button>
    )
}
```

## ThunkAction

비동기 로직을 수행하는 기능으로
[react-thunk와 같습니다.](https://redux-toolkit.js.org/api/createAsyncThunk)

`createAsyncThunk`함수로 구현할 수 있습니다.

아래 비동기 상태 관리하기 예제를 참고해주세요.

## 비동기 상태 관리하기

비동기 데이터를 다룰때는 `createAsyncThunk`와 `createSlice`를 사용합니다.

### createSlice, createAsyncThunk 설정하기

todo list를 API로 가져오는 로직을 예로 들어보겠습니다.

```js
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

import { Todos } from '@/types'
const initState: Todos = { todos: [] }

export const getTodoAsync = createAsyncThunk('todo/get', async () => {
  const responseData = await getTodosAPI()
  return responseData
})
export const addTodoAsync = createAsyncThunk('todo/create', async (todo: TodoAddParams) => {
  const responseData = await addTodoAPI(todo)
  return responseData
})
// Edit todo, Delete todo 등 로직을 추가할 수 있습니다.

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // * getTodoAsync
      .addCase(getTodoAsync.pending, (state) => {
        state.getTodoStatus = 'loading'
        state.editTodoStatus = undefined
        state.addTodoStatus = undefined
        state.deleteTodoStatus = undefined
      })
      .addCase(getTodoAsync.fulfilled, (state, action) => {
        state.getTodoStatus = 'idle'
        state.todos = action.payload
      })
      .addCase(getTodoAsync.rejected, (state) => {
        state.getTodoStatus = 'failed'
        state.todos = []
      })
      // * addTodoAsync
      .addCase(addTodoAsync.pending, (state, action) => {
        state.getTodoStatus = undefined
        state.editTodoStatus = undefined
        state.addTodoStatus = 'loading'
        state.deleteTodoStatus = undefined
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.addTodoStatus = 'idle'
        state.todos = [...state.todos, action.payload]
      })
      .addCase(addTodoAsync.rejected, (state) => {
        state.addTodoStatus = 'failed'
      })
  },
})

export const selectTodo = (state: RootState) => state.todo
export default todoSlice.reducer
```

### Selector, Dispath로 비동기 데이터 사용하기

Selector : 선택한 상태를 불러옵니다.

Dispatch : redux의 createSlice의 action을 실행합니다.

```js
import { useDispatch, useSelector } from 'react-redux'
import { todoReducer } from '@/app/features/todo/todoSlice'
import { addTodoAsync } from '@/app/features/todo/todoSlice'
import Spinner from '@/app/components/Spinner'

export default function TodoForm() {
  const dispatch = useDispatch()
  const { todos, addTodoStatus } = useSelector(todoReducer)
  const [title, setTitle] = useState('')

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value)
  }
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    dispatch(addTodoAsync({title}))
  }

  return (
      <div>
        <h2>Add To do</h2>
        {addTodoStatus === 'loading' ? (
          <Spinner />
        ) : (
          <form onSubmit={addTodo}>
            <input
              type='text'
              value={title}
              placeholder='Write a to do'
              onChange={setTitle}
            />
            <input type='submit'/>
          </form>
        )}
      </div>
  )
}
```
