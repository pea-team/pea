# useFetch

`const { loading, data, error, refetch } = useFetch(url, options)`

获取服务端数据是一个非常通用的业务场景，这个一个重复而繁杂的工作，`useQuery` 把这个业务逻辑通用化了，通过 `useQuery`，你可以用最简单的方式获取数据，并且可以方便的处理加载状态和错误信息。

## Params

`url: string` 请求的 URL。

`options?: TOptions`

* method \(String\) - HTTP method. 默认: `GET`
* body \(Object, body types\) - HTTP request body
* headers \(Object, Headers\) - 默认: {}

和 fetch 的异同：TODO:

## Result

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

`refetch: (variables?: TVariables) => void`

一个函数，可以让你重新发请求获取数据，比如你有一刷新按钮，点击重新获取数据，你就可以用 refetch 了。

