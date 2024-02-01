import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, des, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      
        <div className="my-3">
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>
          
          <span
            className="badge rounded-pill bg-success"
          >
            {source}
          </span>
          </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://s.yimg.com/ny/api/res/1.2/U8R08fekW6Wu4bA2P84f7Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2024-01/c4365af0-b41a-11ee-afbf-e4eae68d3f3f"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{des}</p>
            <p className="card-text">
              <small className="text-muted">
                by {author ? author : "Unknown"} on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
