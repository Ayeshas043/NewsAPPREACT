import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
    date: "publishedAt",
    author: "author",
    source: "source",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title=`${this.props.category}`
  }
  async updatePage() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(50);

    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      
      totalResults: parsedData.totalResults,
      loading: false,
      
    });
    this.props.setProgress(100);

  }
  async componentDidMount() {
    this.updatePage();
  }
  onPreviousHandle = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updatePage();
  };
  onNextHandle = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updatePage();
  };
  fetchMoreDate=async()=>{
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  }
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px" }} >
          Top {this.props.category} Headlines
        </h1>
        {/* {this.state.loading && <Spiner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreDate}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spiner/>}
        >
          <div className="container">
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    des={element.description ? element.description : ""}
                    date={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
        </div></div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.onPreviousHandle}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.onNextHandle}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
