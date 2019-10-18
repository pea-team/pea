import React from 'react'
import { State, useForm } from '../src'
import { Button, Input, Form, Select, Radio } from 'antd'
import { FormItemProps } from 'antd/lib/form'

import { Post } from '../Post'

import './index.css'

const { Option } = Select

// PeaForm.register('Field', ({}) => {
//   const Field = () => {
//     return <div>hahahxxxx..........</div>
//   }
//   return Field
// })

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
  const { Field, state, handlers, actions, name, error } = useForm<Post, FormItemProps>(Post)

  console.log('reder......')
  return (
    <div style={{ margin: '200px' }}>
      <form onSubmit={handlers.handleSubmit}>
        <pre>{JSON.stringify(state, null, 2)}</pre>

        <span>
          <Field name="drone" label="" origin>
            <input type="radio" id="huey" value="huey" />
          </Field>
          <label htmlFor="huey">Huey</label>
        </span>
        <span>
          <Field name="drone">
            <input type="radio" id="dewey" value="dewey" />
          </Field>
          <label htmlFor="dewey">Dewey</label>
        </span>
        <span>
          <Field name="drone">
            <input type="radio" id="louie" value="louie" />
          </Field>
          <label htmlFor="louie">Louie</label>
        </span>

        {state.values.drone === 'louie' && (
          <Field name="age">
            <Input placeholder="age" />
          </Field>
        )}

        <input type="text" {...name('user.name')} />

        <Field name="email">
          <input type="text" {...name('email')} />
        </Field>

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
          <Select onChange={handlers.handleChange} style={{ width: 200 }}>
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

        <span>
          <Field name="checks">
            <input type="checkbox" id="scales" value="scales" />
          </Field>
          <label htmlFor="scales">Scales</label>
        </span>
        <span>
          <Field name="checks">
            <input type="checkbox" id="horns" value="horns" />
          </Field>
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
