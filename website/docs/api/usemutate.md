# useMutate

`const [mutateFn, { loading, data, error }] = useMutate(query)`

## Params

`query: string`

GraphQL 的 query 字符串，例如：

```javascript
{
  hero {
    name
  }
}
```

## Result

### Mutate function:

`mutateFn: (variables?: Variables)`

一个用来触发 mutate 的函数，例如：`addTodo({ title: 'one thing'})`。

### Mutate result:

`loading: boolean`

请求状态，是否成功获取数据，对前端界面状态处理很有用。

`data: TData`

GraphQL mutate 成功返回的数据对象，例如：

```javascript
{
  hero: {
    name: 'Cristiano Ronaldo'
  }
}
```

`error: TError`

请求发生错误时，返回的错误信息对象，例如：

```javascript
{
  error: {
    statusCode: 401,
    error: "Unauthorized",
    message: "未登录"
  }
}
```

