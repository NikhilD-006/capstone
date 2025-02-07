import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'
import { FaEdit } from 'react-icons/fa'
import { MdDelete, MdRestore } from 'react-icons/md'

function ArticleByID() {

  const { state } = useLocation()
  const { currentUser } = useContext(userAuthorContextObj)
  //console.log(state)

  return (
    <div className='container'>
      {/* print full article */}
      <div className="d-flex justify-contnet-between">
        <div className="mb-5 author-block w-100 px-4 py-2 rounded-2 d-flex justify-content-between align-items-center">
          <div>
            <p className="display-3 me-4">{state.title}</p>
            {/* doc & dom */}
            <span className="py-3">
              <small className="text-secondary me-4">
                Created on : {state.dateOfCreation}
              </small>
              <small className="text-secondary me-4">
                Modified on : {state.dateOfModification}
              </small>
            </span>

          </div>
          {/* author details */}
          <div className="author-details text-center">
            <img src={state.authorData.profileImageUrl} width='60px' className='rounded-circle' alt="" />
            <p>{state.authorData.nameOfAuthor}</p>
          </div>

        </div>
        {/* edit & delete */}
        {
          currentUser.role === 'author' && (
            <div className="d-flex me-3">
              {/* edit button */}
              <button className="me-2 btn btn-light">
                <FaEdit className='text-warning' />
              </button>
              {/* if article is active,display delete icon, otherwise display restore icon */}
              {
                state.isArticleActive === true ? (
                  <button className="me-2 btn btn-light">
                    <MdDelete className='text-danger' fs-4 />
                  </button>
                ) : (
                  <button className="me-2 btn btn-light">
                    <MdRestore className='text-info' fs-4 />
                  </button>
                )
              }
            </div>
          )
        }
      </div>
      {/* content*/}
      <p className="lead mt-3 article-content" style={{ whiteSpace: "pre-line" }}>
        {state.content}
      </p>
      {/* user commnets */}
      <div>
        <div className="comments my-4">
          {
            state.comments.length === 0 ? <p className='display-3'>No comments yet..</p> :
              state.comments.map(commentObj => {
                return <div key={commentObj._id} >
                  <p className="user-name">
                    {commentObj?.nameOfUser}
                  </p>
                  <p className="comment">
                    {commentObj?.comment}
                  </p>
                </div>
              })
          }
        </div>
      </div>
    </div>
  )
}

export default ArticleByID