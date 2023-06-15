import React from 'react'

const Newsitem = (props) => {

  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="my-3">
      <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className=" badge rounded-pill bg-danger">{source}</span>
        </div>
        <div>
          <img src={!imageUrl ? "https://cdn.ndtv.com/common/images/ogndtv.png" : imageUrl}
            className="card-img-top"
            alt="..."
            style={{ height: '250px', width: '100%' }} />
        </div>
        <div className="card-body" >
          <h5 className="card-title">{title}</h5>
          {/* <p className="card-text">{description}</p> */}
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </div>
  );




}

export default Newsitem