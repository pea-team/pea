import less from 'dahlia-less'
import antd from 'dahlia-antd'
import styledJsx from 'dahlia-styled-jsx'

export default {
  title: '资源检查平台',
  plugins: [
    less({
      modifyVars: {
        // 'primary-color': 'red',
        // 'link-color': '#1DA57A',
        // 'border-radius-base': '10px',
      },
      javascriptEnabled: true,
    }),
    antd(),
    styledJsx(),
  ],
}
