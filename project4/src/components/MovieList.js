import React, { Component } from 'react';
import Movie from './Movie';
//styles
import '../MovieList.css';

class MovieList extends Component {

  //-----RENDER----------
  render() {

    return (
      <div id="movieList">
        <Movie movieID={0} imdb="7.0" title="'Arry Pottah" showInfo={this.props.showInfo} description="Yer a wizard, 'Arry" imgsrc={"https://imgc.allpostersimages.com/img/print/plakater/harry-potter-philosophers-stone-movie-poster_a-G-9843009-0.jpg"}/>
        <Movie movieID={1} genre="Lame, Dårlig, Teit" title="John Wick" showInfo={this.props.showInfo} actors="John.F.Kenedy, Morradi" description="This is a description blabalbalbalbalblbdkffblkalkbdflkfbalkfdbkldfblkfdb. This is a description blabalbalbalbalblbdkffblkalkbdflkfbalkfdbkldfblkfdb. This is a description blabalbalbalbalblbdkffblkalkbdflkfbalkfdbkldfblkfdb. " imgsrc={"https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL._SY445_.jpg"} />
        <Movie movieID={2} title="John Wick 2" showInfo={this.props.showInfo} description="This is a description" imgsrc={"https://secure.sfanytime.se/movieimages/COVER/6a9bcb13-2366-4704-9d80-a75200e8f7f8_COVER_01.jpg"}/>
        <Movie movieID={3}  title="John Wick" showInfo={this.props.showInfo} description="This is a description" imgsrc={"https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL._SY445_.jpg"}/>
        <Movie movieID={4}  title="John Wick" showInfo={this.props.showInfo} description="This is a description" imgsrc={"https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL._SY445_.jpg"}/>
        <Movie movieID={5}  title="John Wick" showInfo={this.props.showInfo} description="This is a description" imgsrc={"https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL._SY445_.jpg"}/>
        <Movie movieID={6}  title="John Wick" showInfo={this.props.showInfo} description="This is a description" imgsrc={"https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL._SY445_.jpg"} />
        <Movie movieID={7}   title="John Wick" showInfo={this.props.showInfo} description="This is a description" imgsrc={"https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL._SY445_.jpg"}/>
        <Movie movieID={8}  title="John Wick" showInfo={this.props.showInfo} description="This is a description" imgsrc={"https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL._SY445_.jpg"}/>
        <Movie movieID={9}  title="John Wick" showInfo={this.props.showInfo} description="This is a description" imgsrc={"https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL._SY445_.jpg"}/>
        <Movie movieID={10} title="John Wick" showInfo={this.props.showInfo} description="This is a description" imgsrc={"https://images-na.ssl-images-amazon.com/images/I/51-v2kovwfL._SY445_.jpg"}/>
      </div>
    );
  }
}

export default MovieList;
