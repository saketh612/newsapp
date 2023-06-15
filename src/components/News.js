import React, { useEffect,useState } from 'react'
import Newsitem from './Newsitem'
import Spin from './Spin';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  document.title = `${props.category} - Today News`


  const updateNews = async(pageNo)=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setloading(true)
    let data = await fetch(url)
    props.setProgress(30)
    let parsedData = await data.json()
    props.setProgress(50)
    console.log(parsedData);
    setarticles(parsedData.articles)
    setloading(false)
    settotalResults(parsedData.totalResults)
    props.setProgress(100)
  }



useEffect(() => {
  updateNews()
}, [])


  const handlePrevClick = async () => {
    // console.log("previous");
    // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ff8fbe1b97c441ee88badd4f45b08e32&page=${this.state.page - 1}&pageSize=${props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // this.setState({loading:false})
    // this.setState(
    //   {
    //     page:this.state.page-1,
    //     articles: parsedData.articles
    //   }
    // )  

    setpage(page-1)
    updateNews();
  }

  const handleNextClick = async () => {
    // console.log("next");
    // if(Math.ceil(this.state.page +1 > this.state.totalResults/props.pageSize))
    // {

    // }
    // else{
    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ff8fbe1b97c441ee88badd4f45b08e32&page=${this.state.page + 1}&pageSize=${props.pageSize}`
    //   let data = await fetch(url)
    //   this.setState({loading:true})
    //   let parsedData = await data.json()
    //   this.setState({loading:false})
    //   this.setState(
    //     {
    //       page:this.state.page+1,
    //       articles: parsedData.articles
    //     }
    //   ) 
    // }
    setpage(page+1)
    updateNews();


  }

  const fetchMoreData = async() => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ff8fbe1b97c441ee88badd4f45b08e32&page=${page+1}&pageSize=${props.pageSize}`
  setpage(page+1)
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData);
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };
  
    return (
      <>
        <h1 className="text-center my-2" style={{ margin: '40px 0px;',marginTop:'90px' }}>Top Headlines from {props.category}</h1>
        {loading && <Spin/>}
        <InfiniteScroll style={{overflow:'hidden'}}
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length}
          loader={<Spin/>?articles.length>0:""}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={Math.ceil(this.state.page + 1 > this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: '8',
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News