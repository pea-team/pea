import React from 'react'
import { Form, Button, Input, Select, Radio } from 'antd'
import required from 'checkok-required'
import min from 'checkok-min'
import { createAntdForm } from '../src'

import 'antd/dist/antd.css'

const { Option } = Select

const { Field, store } = createAntdForm({
  initialValues: {
    email: '',
    password: '',
    phone: 158,
    removed: false,
  },
  validator: {
    email: [required('require email'), min(5, 'email too short')],
    password: () => [required('need password'), min(6, 'password too short')],
  },
  onError(errors) {
    console.log('errors:', errors)
  },
  onSubmit(values, store) {
    // alert(JSON.stringify(values, null, 2))
    setTimeout(() => {
      store.setSubmitting(false)
    }, 3000)
  },
})

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}

export default () => {
  return (
    <div style={{ width: '600px', margin: 'auto' }}>
      <Form onSubmit={store.handleSubmit} {...formItemLayout}>
        <Field name="email" label="email" required>
          <Input placeholder="Email" />
        </Field>

        <Field name="password" label="密码">
          <Input placeholder="password" />
        </Field>
        <Field name="phone" label="手机">
          <Select style={{ width: 200 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        </Field>

        <Field name="removed" label="是否移除">
          <Radio.Group>
            <Radio value={true}>应该</Radio>
            <Radio value={false}>不应该</Radio>
          </Radio.Group>
        </Field>

        <Field label="提交">
          <Button
            type="primary"
            htmlType="submit"
            disabled={!store.valid || store.submitting}
          >
            submit
          </Button>
        </Field>

        <Field label="重置">
          <Button type="default" onClick={store.resetForm}>
            reset
          </Button>
        </Field>
        <Field label="手动触发">
          <Button type="default" onClick={store.submitForm}>
            submitForm
          </Button>
        </Field>

        <div></div>
      </Form>
    </div>
  )
}
