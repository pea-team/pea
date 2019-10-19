import { Contains, Length, IsEmail, IsBoolean, ValidateNested } from 'class-validator'
import { Errors, IModel } from '../../src/types'

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export class User {
  @Length(10, 20, {
    message: 'Tag is too short or long',
  })
  name: string
}
export class Post implements IModel<Post> {
  @ValidateNested()
  user: User = {
    name: 'livia',
  }

  drone = 'dewey'

  age = 10

  checks = ['horns']

  @IsEmail()
  @Length(10, 20)
  email = 'qqcom'

  @Length(10, 20)
  password: string = '123456'

  @Length(11)
  phone = 87

  @IsBoolean()
  removed = false

  @Contains('hello')
  desc: string = 'desc..'

  validate() {
    let errors: Errors<Post> = {}
    // errors.email = 'not email'
    // errors.phone = 'not phone'
    // await sleep(3000)
    return errors
  }

  onSubmit(values: Post) {
    console.log('values:', values)
  }

  onError(errors: Errors<Post>) {
    console.log('errors:', errors)
  }
}
