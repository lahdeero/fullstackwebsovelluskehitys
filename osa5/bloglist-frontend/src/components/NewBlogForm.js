import React from 'react'

const NewBlogForm = ({ addBlog, newBlogTitle, handleBlogChange, newBlogAuthor, newBlogUrl }) => {
  return (
    <div>
      <h2>Luo uusi blogi</h2>

      <form onSubmit={addBlog}>
        <div>
          Otsikko:
        <input
          type="text"
          name="newBlogTitle"
          value={newBlogTitle}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        Kirjoittaja:
        <input
          type="text"
          name="newBlogAuthor"
          value={newBlogAuthor}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        WWW-osoite:
        <input
          type="text"
          name="newBlogUrl"
          value={newBlogUrl}
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">tallenna</button>
      </form>

    </div>
  )
}

export default NewBlogForm
