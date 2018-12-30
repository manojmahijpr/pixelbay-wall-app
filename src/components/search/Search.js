import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

import ImageResults from "../image-results/ImageResults";

const apiUrl = 'https://pixabay.com/api';

export default class Search extends Component {

  state = {
    searchText: '',
    amount: 5,
    images: []
  }

  fetchData = ()=> {
    const apiKey = process.env.REACT_APP_PIXELBAY_API_KEY

    axios.get(`${apiUrl}/?key=${apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
      .then(res => 
        this.setState({
          images: res.data.hits
        })
      )
      .catch(err => console.log(err));
  }

  isText = ()=> {
    if(this.state.searchText !== '') {
      return true;
    }
    else {
      this.setState({
        images: []
      },
      ()=> {
        return false;
      });
    }
  }

  onTextChange = (e)=> {

    const searchText = e.target.value

    this.setState({
      [e.target.name]: searchText
    },
    ()=> {
      if(this.isText())
        this.fetchData();
    }
    );
  }

  onAmountChange = (e, index, value) => {
    
    this.setState({
        amount: value
    },
    ()=> {
      if(this.isText())
        this.fetchData();
    });

  }

  render() {
    return (
      <div>
        <TextField 
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for Images"
          fullWidth={true}
        />
        <SelectField 
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5"/>
          <MenuItem value={10} primaryText="10"/>
          <MenuItem value={15} primaryText="15"/>
          <MenuItem value={30} primaryText="30"/>
          <MenuItem value={50} primaryText="50"/>
        </SelectField>
        {
          this.state.images.length > 0 ? (<ImageResults images={this.state.images}/>) : null
        }
      </div>
    )
  }
}
