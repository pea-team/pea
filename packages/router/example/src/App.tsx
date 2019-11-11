import React from 'react'
import { Router, Link, useRouter, navigate } from './src'

setTimeout(() => {
  navigate('/about')
}, 3000);

const Home = () => {
  const { navigate } = useRouter()
  

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <button onClick={() => navigate('/about')}>to about</button>
      <h1>Home</h1>
    </div>
  )
}

const About = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <h1>About</h1>
  </div>
)

const NotFound = () => <div>404 not found</div>

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '**',
    component: NotFound,
  },
]

const App = () => <Router routes={routes} />

export default App
