import React from 'react'
import { Form, Input, Select, Radio } from 'antd'
import required from 'checkok-required'
import min from 'checkok-min'
// import { createForm } from 'dahlia-from'
import { createForm } from '../src'

const { Option } = Select

const { Form: DahliaForm, Field, ErrorMessage, store } = createForm({
  initialValues: {
    email: 'test@email.com',
    password: 'pass',
    age: 10,
    phone: 158,
    drone: 'dewey',
    desc: 'intro..',
    removed: false,
    selected: 'audi',
    checks: ['horns'],
    user: {
      name: 'livia',
    },
  },
  validator: {
    email: [required('require email'), min(5, 'email too short')],
    password: () => [required('need password'), min(6, 'password too short')],
  },
  onSubmit: values => {
    alert(JSON.stringify(values, null, 2))
  },
  onReset() {
    console.log('reset.....');
  }
})

const SelectRule: React.FC<any> = ({ field }) => {
  return (
    <Select {...field} style={{ width: 200 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  )
}

export default () => {
  return (
    <div style={{ margin: '200px' }}>
      <DahliaForm>
        <pre>{JSON.stringify(store, null, 2)}</pre>
        <Field name="phone" component={SelectRule} />
        <Form.Item label="是否该移除">
          <Field name="email">
            <Input placeholder="Email" />
          </Field>

          <ErrorMessage name="email" className="field-error" />
        </Form.Item>

        <Field name="password">
          <input placeholder="password" />
        </Field>
        <br />
        <Field name="phone">
          <Select style={{ width: 200 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        </Field>
        <Field name="desc">
          <textarea />
        </Field>
        <Field name="selected">
          <select>
            <option value="">任意</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </Field>
        <span>
          <Field name="drone">
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

        {store.values.drone === 'louie' && (
          <Field name="age">
            <Input placeholder="age" />
          </Field>
        )}

        <br />
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

        <Form.Item label="是否该移除">
          <Field name="removed">
            <Radio.Group>
              <Radio value={true}>应该</Radio>
              <Radio value={false}>不应该</Radio>
            </Radio.Group>
          </Field>
        </Form.Item>

        <div>
          <button type="submit" disabled={!store.valid}>
            submit
          </button>

          <br />
          <button type="button" onClick={store.resetForm}>
            reset
          </button>
        </div>
      </DahliaForm>
    </div>
  )
}
