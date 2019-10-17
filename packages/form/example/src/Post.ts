import { Contains, Length, IsEmail, IsBoolean } from 'class-validator'
import { Errors, IModel } from './src/types'

export enum fileds {
  email = 'email',
  phone = 'phone',
}

export class Post implements IModel {
  @IsEmail()
  @Length(10, 20)
  email = 'livia...'

  @Length(10, 20)
  password: string = '123456'

  @Length(11)
  phone = 158

  @IsBoolean()
  removed = false

  @Contains('hello')
  desc: string = 'desc..'

  onSubmit(values: Post) {
    console.log('values:', values)
  }

  onError(errors: Errors<Post>) {
    console.log('errors:', errors)
  }
}
