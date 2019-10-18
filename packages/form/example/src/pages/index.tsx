import React from 'react'
import { State } from '../src'
import { Button, Input, Form, Select, Radio } from 'antd'
import { FormItemProps } from 'antd/lib/form'
import { Post } from '../Post'

import { useForm } from '../src/useForm'
import './index.css'

const { Option } = Select

export function helper(store: State<Post>, name: string) {
  const itemProps = {} as FormItemProps
  const error = store.errors[name]

  if (error && store.touched[name]) {
    itemProps.validateStatus = 'error'
    itemProps.help = error
  }

  if (!error && store.touched[name]) {
    itemProps.validateStatus = 'success'
    itemProps.hasFeedback = true
  }
  return itemProps
}

export default () => {
  const { state, action, name, error } = useForm(Post)

  console.log('reder......')
  return (
    <div style={{ margin: '200px' }}>
      <form onSubmit={action.handleSubmit}>
        <pre>{JSON.stringify(state, null, 2)}</pre>

        <input type="text" {...name('email')} />
        <div>{error('email')}</div>

        <Form.Item {...helper(state, 'phone')}>
          <Input type="number" {...name('phone')} />
        </Form.Item>

        <Form.Item {...helper(state, 'desc')}>
          <Input {...name('desc')} />
        </Form.Item>

        <Form.Item {...helper(state, 'email')}>
          <Input {...name('email')} />
        </Form.Item>

        <Form.Item {...helper(state, 'password')}>
          <Input {...name('password')} />
        </Form.Item>

        <Form.Item {...helper(state, 'phone')}>
          <Select onChange={action.handleChange} style={{ width: 200 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        </Form.Item>

        <Form.Item {...helper(state, 'removed')}>
          <Radio.Group {...name('removed')}>
            <Radio value={true}>应该</Radio>
            <Radio value={false}>不应该</Radio>
          </Radio.Group>
        </Form.Item>

        <div>
          <Button htmlType="submit" disabled={!state.valid}>
            submit
          </Button>
        </div>

        <div>
          <Button htmlType="reset" onClick={action.resetForm}>
            reset
          </Button>
        </div>

        <Button type="default" onClick={action.submitForm}>
          submitForm
        </Button>
      </form>
    </div>
  )
}
