import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Search from 'material-ui/svg-icons/action/search';
import {setFilter,setGenre} from '../actions';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import find from 'lodash/find';
// this component contains autofilling and filters
class SearchForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {filter:'',genres:'',searchText : '',modelData :{}};
    this.handleChange = this.handleChange.bind(this);
    this.handleGenres = this.handleGenres.bind(this);
  }
  //there two funtions for handiling dilog box
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  //thre functions are used to dispatch filter changes
  handleChange(event,index,value){
    this.setState({filter:value});
    this.props.setFilter(value);
  }
  handleGenres(event,index,value){
    this.setState({genres:value});
    this.props.setGenre(value);
  }
  // these two functions used to handle AutoComplete
  handleUpdateInput = (searchText) => {
    this.setState({
      searchText: searchText,
    });
  };

  handleNewRequest = () => {
    this.handleOpen();
    if(this.state.open && this.state.searchText !== ''){
      let x = find(this.props.movieData,
                      {[this.props.filter]:this.state.searchText});
      this.setState({modelData:x});

    }
  };
  render(){
    let dataSource = this.props.dataSource;
    let modelData = this.state.modelData;
    const actions = [

      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return(
      <div>
        <Paper zDepth={2}
        style = {{padding: '10px', margin: '10px'}}>
        <div className ='row'>
          <div className ='col-sm-3'>
            <SelectField
              value={this.state.filter}
              onChange={this.handleChange}
              maxHeight={200}
              floatingLabelText={"Select Filter"}
            >
              <MenuItem value={'movie_title'} key={1} primaryText={`Movie Title`} />
              <MenuItem value={'director_name'} key={2} primaryText={`Director`} />
              <MenuItem value={'actor_1_name'} key={3} primaryText={`Actor_1`} />
              <MenuItem value={'actor_2_name'} key={4} primaryText={`Actor_2`} />
              <MenuItem value={'title_year'} key={5} primaryText={`Year`} />
          </SelectField>
      </div>
      <div className ='col-sm-3'>
          <SelectField
            value={this.state.genres}
            onChange={this.handleGenres}
            maxHeight={200}
            floatingLabelText={"Genres"}
          >
            <MenuItem value={'All'} key={0} primaryText={`All`} />
            <MenuItem value={'Adventure'} key={1} primaryText={`Adventure`} />
            <MenuItem value={'Animation'} key={2} primaryText={`Animation`} />
            <MenuItem value={'Action'} key={3} primaryText={`Action`} />
            <MenuItem value={'Comedy'} key={4} primaryText={`Comedy`} />
            <MenuItem value={'Fantasy'} key={5} primaryText={`Fantasy`} />
            <MenuItem value={'Sci-Fi'} key={6} primaryText={`Sci-Fi`} />
            <MenuItem value={'Thriller'} key={7} primaryText={`Thriller`} />
            <MenuItem value={'Documentary'} key={8} primaryText={`Documentary`} />
            <MenuItem value={'Romance'} key={9} primaryText={`Romance`} />
        </SelectField>
    </div>
        </div>
        <AutoComplete
          floatingLabelText="Search Here"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={dataSource}
          maxSearchResults = {5}
          style = {{width: '100%'}}
          fullWidth = {true}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={this.handleNewRequest}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          open={this.state.open}
        />
        </Paper>
        <Dialog
          title="Search Results"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className ='row'>
            <div className = "col-sm-4">
                      <img src = {'https://thumb1.shutterstock.com/display_pic_with_logo/157960/144901360/stock-photo-film-slate-movie-reel-popcorn-and-cup-of-soda-144901360.jpg'} className = "img-thumbnail model-poster"/>

            </div>
            <div className = "col-sm-8">
              <h3> <span style = {{color:'black'}} >{modelData.movie_title}</span></h3>
              <h4>Language : {modelData.language}</h4>
              <h4>Genres : {modelData.genres}</h4>
              <h4>Director : {modelData.director_name}</h4>
              <h4>Year : {modelData.title_year}</h4>
              <h4>Imdb Link : <a href ={modelData.movie_imdb_link}>{modelData.movie_imdb_link}</a></h4>


            </div>
          </div>

        </Dialog>
      </div>
    );
  }

}

export default connect(
  (state) => ({
    dataSource : state.movieNames,
    filter:state.filter,
    movieData : state.movieData.movieData
  }),
  {setGenre,setFilter}
)(SearchForm);
