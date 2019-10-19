import React from 'react'
import { useForm, PeaForm } from '../src'
import { Button, Input, Form, Select, Radio } from 'antd'
import { FormItemProps } from 'antd/lib/form'

import { Post } from '../Post'

import './index.css'

const { Option } = Select

PeaForm.register('help', ({ name, state }) => {
  const itemProps = {} as FormItemProps
  const error = state.errors[name]

  if (error && state.touched[name]) {
    itemProps.validateStatus = 'error'
    itemProps.help = error
  }

  if (!error && state.touched[name]) {
    itemProps.validateStatus = 'success'
    itemProps.hasFeedback = true
  }
  return itemProps
})

export default () => {
  const { state, handlers, handlerBuilder, actions, name, error, help } = useForm(Post, {
    onSubmit(values) {
      console.log('values hahaha:', values)
    },
    onError(errors, { actions }) {
      console.log('error hahaha:', errors)
    },
  })

  return (
    <div style={{ margin: '200px' }}>
      <form onSubmit={handlers.handleSubmit}>
        <pre>{JSON.stringify(state, null, 2)}</pre>

        <span>
          <input type="radio" id="huey" value="huey" />
          <label htmlFor="huey">Huey</label>
        </span>
        <span>
          <input type="radio" id="dewey" value="dewey" />
          <label htmlFor="dewey">Dewey</label>
        </span>
        <span>
          <input type="radio" id="louie" value="louie" />
          <label htmlFor="louie">Louie</label>
        </span>

        {state.values.drone === 'louie' && <Input placeholder="age" />}

        <input type="text" {...name('user.name')} />

        <div>1111</div>

        <div>2222</div>
        <input type="text" {...name('email')} />

        <div>{error('email')}</div>

        <Form.Item {...help('phone')}>
          <Input type="number" {...name('phone')} />
        </Form.Item>

        <Form.Item {...help('desc')}>
          <Input {...name('desc')} />
        </Form.Item>

        <Form.Item {...help('email')}>
          <Input {...name('email')} />
        </Form.Item>

        <Form.Item {...help('password')}>
          <Input {...name('password')} />
        </Form.Item>

        <Form.Item {...help('phone')}>
          <Select
            value={state.values.phone}
            onChange={handlerBuilder.createChangeHandler('phone')}
            style={{ width: 200 }}
          >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        </Form.Item>

        <Form.Item {...help('removed')}>
          <Radio.Group {...name('removed')}>
            <Radio value={true}>应该</Radio>
            <Radio value={false}>不应该</Radio>
          </Radio.Group>
        </Form.Item>

        <span>
          <input type="checkbox" id="scales" value="scales" />
          <label htmlFor="scales">Scales</label>
        </span>
        <span>
          <input type="checkbox" id="horns" value="horns" />
          <label htmlFor="horns">Horns</label>
        </span>

        <div>
          <Button htmlType="submit" disabled={!state.valid}>
            submit
          </Button>
        </div>

        <div>
          <Button htmlType="reset" onClick={actions.resetForm}>
            reset
          </Button>
        </div>

        <Button type="default" onClick={actions.submitForm}>
          submitForm
        </Button>
      </form>
    </div>
  )
}
