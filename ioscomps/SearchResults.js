'use strict';

import React, {Component} from 'react';
import {View, Text, ListView, TouchableHighlight} from 'react-native';

class SearchResults extends Component{
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged:(r1, r2) => r1.guide!= r2.guide});
    this.state = {dataSource: ds.cloneWithRows(this.props.propertyList)};
  }
  
renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
          underlayColor='#dddddd'>
        <View>
          <Text>{rowData.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  
  render(){
    return (
      <ListView dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}>
      </ListView>
    );
  }
}

module.exports = SearchResults;