# useUpdate

`const [updateFn, { loading, data, error }] = useUpdate(url, options)`

## Params

`url: string` 请求的 URL。

`options?: Options`

* method \(String\) - HTTP method. 默认: `GET`
* body \(Object, body types\) - HTTP request body
* headers \(Object, Headers\) - 默认: {}

和 fetch 的异同：TODO:

## Result

### Update function

`updateFn: (options: Options)`

一个用来触发 update 的函数，例如：`addTodo({ title: 'one thing'})`。

### Update result

`loading: boolean`

请求状态，是否成功获取数据，对前端界面状态处理很有用。

`data: TData`

GraphQL 查询成功返回的数据对象，例如：

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

