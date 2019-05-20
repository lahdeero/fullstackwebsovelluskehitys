import React from 'react'
import { useField } from '../hooks'
import { Button } from 'reactstrap'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    props.createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    })
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input id="title" {...title} />
        </div>
        <div>
          author:
          <input id="author" {...author} />
        </div>
        <div>
          url:
          <input id="url" {...url} />
        </div>
        <Button id="create" color="success" type='submit'>create</Button>
      </form>
    </div>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     user: state.user
//   }
// }

// const ConnectedNewBlog = connect(mapStateToProps)(NewBlog)

// export default ConnectedNewBlog
export default NewBlog