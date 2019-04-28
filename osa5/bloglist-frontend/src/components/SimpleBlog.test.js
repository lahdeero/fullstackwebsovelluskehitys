import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  const simpleblog = {
    title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    author: 'Matti Luukkainen',
    url: 'https://fullstack-hy.github.io/osa5/',
    likes: 100
  }
  it('shows title, author and likes', () => {

    const simpleblogComponent = shallow(<SimpleBlog blog={simpleblog} />)
    const contentDiv = simpleblogComponent.find('.content')
    const likesDiv = simpleblogComponent.find('.likes')

    expect(contentDiv.text()).toContain(simpleblog.title)
    expect(contentDiv.text()).toContain(simpleblog.author)
    expect(likesDiv.text()).toContain('100')
  })
  it('when clicking like twice, it calls handler twice', () => {
    const mockHandler = jest.fn()

    // console.log('mockHandler = ', mockHandler)
    const simpleblogComponent = shallow(<SimpleBlog blog={simpleblog} onClick={mockHandler} />)
    const button = simpleblogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
