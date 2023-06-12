import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spin from './Spin';
import PropTypes from 'prop-types'




export class News extends Component {

  static defaultProps ={
    country:'in',
    pageSize:'8',
    category:'general'
  }

  static propTypes ={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  constructor(props) {
    super(props);
    console.log("i am called")
    this.state = {
      articles: [],
      loading:false,
      page:1
    }
    document.title =`${this.props.category} - Today News`
  }


async updateNews(pageNo)
  {
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff8fbe1b97c441ee88badd4f45b08e32&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults,loading:false})
  }


  async componentDidMount(){
    this.updateNews()
  }


   handlePrevClick = async()=>{
    // console.log("previous");
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff8fbe1b97c441ee88badd4f45b08e32&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
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

    this.setState({page:this.state.page-1})
    this.updateNews();
  }

  handleNextClick = async()=>{
    // console.log("next");
    // if(Math.ceil(this.state.page +1 > this.state.totalResults/this.props.pageSize))
    // {

    // }
    // else{
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff8fbe1b97c441ee88badd4f45b08e32&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
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
    this.setState({page:this.state.page+1})
    this.updateNews();

    
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'40px 0px;'}}>Top Headlines from {this.props.category}</h1>
        {this.state.loading && <Spin/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return  <div className="col-md-4" key ={element.url}>
          <Newsitem  title={element.title?element.title:""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl ={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled ={Math.ceil(this.state.page +1 > this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News