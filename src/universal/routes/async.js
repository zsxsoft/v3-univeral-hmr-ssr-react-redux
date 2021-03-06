import React from 'react'

function asyncRoute (getComponent) {
  return class AsyncComponent extends React.Component {
    state = {
      Component: null
    };

    componentDidMount () {
      if (this.state.Component === null) {
        getComponent().then((Component) => {
          this.setState({Component: Component})
        })
      }
    }

    render () {
      const {
        Component
      } = this.state

      if (Component) {
        return (<Component {...this.props} />)
      }
      return (<div>loading...</div>) // or <div /> with a loading spinner, etc..
    }
  }
}

export const Home = asyncRoute(() => {
  return import('../components/Home/Home.js').then(p => p.default)
})

export const Counter = asyncRoute(() => {
  return import('../modules/counter/containers/Counter/CounterContainer.js').then(p => p.default)
})
