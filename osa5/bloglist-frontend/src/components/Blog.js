import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.author,
      likes: props.blog.likes,
      expand: false
    }
  }

  toggleExpand = () => {
    console.log('togglee klikattu')
    this.setState({expand: !this.state.expand })
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }

    if (this.state.expand) {
      <div style={blogStyle} onClick={this.toggleExpand}>
        {this.state.title}
        {this.state.author}
        {this.state.url}
        {this.state.likes}
      </div>
    }

    return (
      <div style={blogStyle} onClick={this.toggleExpand}>
        {this.state.title}
      </div>
    )
  }
}

export default Blog
