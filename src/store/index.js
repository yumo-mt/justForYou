import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger';
import rootReducer from '../Reducers'

//生成
// const createStoreWithMiddleware = applyMiddleware(
//   thunkMiddleware,
//   createLogger()
// )(createStore)
//
//
// export default function configureStore(initialState) {
//   const store = createStoreWithMiddleware(rootReducer, initialState);
//   return store
// }


/**
 * applyMiddlewares 是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行
 */
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    // createLogger()
  )
)


export default store