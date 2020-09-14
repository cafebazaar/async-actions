## Overview

Handling async actions(like API calls) is so tedious. Showing loading state and handling options like debouncing needs a lot of code duplications.

Async-Actions proposes a more efficient way of handling those actions without code duplications.

## How It Works

Actions are just simple functions. Async-Actions adds `state`, `error` and `data` properties to your functions and updates these properties dynamically.

#### Action lifecycle and possible values of the `state` property

| Value        | Description                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| notInitiated | Action has not called yet                                                                            |
| pending      | Action has called, but it has not been completed yet.                                                |
| fulfilled    | Action has been completed successfully, and the result value is accessible using the `data` property |
| rejected     | Action has been rejected with an error which is accessible using `error` property                    |

## Instalation

You can install Async-Actions with NPM, Yarn.

```bash
npm install @cafebazaar/async-actions --save
```

or

```bash
yarn add @cafebazaar/async-actions
```

## Usage

You can use Async-Actions in pure JS. Also there are built in extension for Vue.js and svelte.

#### Pure JS

You can define an async-action using `asyncAction` method which gets a handler function and configuration options as its parameters. When using the pure version, you must provide an observable function which used for updating action properties.

```javascript
import { asyncAction } from '@cafebazaar/async-actions/pure';
import customObservable from 'utils/observable';

const myAsyncAction = asyncAction(
  Promise.resolve('Hello'),
  {
    debounce: 500,
  },
  customObservable
);
```

### Vue.js

In the Vue version, `Vue.observable` provided by default as the observable function and you don't need to pass it. There are two ways for using Async-Actions in a Vue.js project.

#### 1. Define actions in component options

For declaring async-actions in this way, you need to import the plugin and `use` it as a Vue plugin to enable the functionality globally on all components.

```javascript
import Vue from 'vue';
import AsyncActions from '@cafebazaar/async-actions/vue';

Vue.use(AsyncActions);
```

then, you can define async-actions in all components using `asyncActions` property.

```javascript
<template>
  <div>
    <div v-if="fetchUsers.state === 'pending'">
      Fetching Users List. Please Wait...
    </div>
    <div v-else-if="fetchUsers.error">
      Oops. Somthing Went Wrong :(
    </div>
    <div v-else>
      <ul v-for="user in fetchUsers.data">
        <li>{{ user.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersList',
  asyncActions: {
    fetchUsers: {
      handler() {
        return someApiCall();
      },
      immediate: true,
      initialData: [],
      // other options...
    },
  },
};
</script>
```

If an actions does not need any options, you can define it as a function.

```javascript
script>
export default {
  name: 'Login',
  asyncActions: {
    login() {
      return loginApi();
    }
  },
};
</script>
```

##### Options

| Property    | Description                                                             | type     | Required | Default |
| ----------- | ----------------------------------------------------------------------- | -------- | -------- | ------- |
| handler     | action's handler                                                        | function | true     |         |
| immediate   | determines handler function should be called immediately after creation | boolean  | false    | false   |
| debounce    | debounce time in miliseconds                                            | number   | false    | 0       |
| initialData | initial value of `data` property of action                              | any      | false    | null    |

#### 2. Create asyncActions outside of components

In this way you can create asyncActions anywhere and use them as normal functions.

```javascript
// usersActions.js
import { asyncAction } from '@cafebazaar/async-actions/vue';

export const getUsers = asyncAction(() => someApiCall(), {
  initialData: [],
});
```
