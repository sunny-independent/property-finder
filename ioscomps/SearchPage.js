'use strict';

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
  ActivityIndicatorIOS,
} from 'react-native'
import BackendService from '../backendservice';
import SearchResults from './SearchResults';

class SearchPage extends Component{
  constructor(props){
    super(props);
    this.state = {searchString:"bangalore",isLoading:true, msg:""};
    this.service = new BackendService();
  }
  
  componentDidMount(){
    //this is to fix indicator being shown before press
     this.setState({ isLoading: false });
  }
  
  handleTextInputChange(event){
    //console.log('handleTextInputChange');
    this.setState({ searchString: event.nativeEvent.text });
    //console.log("st--"+this.state.searchString);
  }
  
  handleGoButtonPress(){
    this.setState({ isLoading: true });
    var self = this;
    var promise = this.service.getNestoriaPropertyList('place_name', this.state.searchString, 1);
    promise
      .then(list => {
        self.setState({ isLoading: false });
        if(list.length != 0){
          //self.setState({ msg: list.length +" listings are identified." });
          //console.log(list);
          self.props.navigator.push({
            title: 'Results',
            component: SearchResults,
            passProps: {propertyList: list}
          });
        }else{
          self.setState({ msg: "Location not recognized; please try again." });
        }
      })
      .catch(reason => {
        console.log(reason);
        self.setState({ isLoading: false });
        self.setState({ msg: "Location not recognized; please try again." });
      });
  }
  
  render(){
    //console.log('SearchPage.render');
    return(
      <View style={styles.container}>
         <Text style={styles.desc}>
            Search for houses to buy!
         </Text>
        <Text style={styles.desc}>
            Search by place-name, postcode or search near your location.
         </Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.inputText}
            placeholder={'Search via name or postcode' }
            value={this.state.searchString}
            onChange={this.handleTextInputChange.bind(this)}
          />
          <TouchableHighlight
            style={styles.button}
            underlayColor={ "#99d9f4" }
            onPress={this.handleGoButtonPress.bind(this)}>
            <Text style={styles.buttonText}>GO</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          style={styles.button}
          underlayColor={"#99d9f4" }>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image 
          style={styles.image}
          resizeMode={"contain"}
          source={require("../resources/house.png")}
        />
        <ActivityIndicatorIOS
          style={styles.indicator}
          animating={ this.state.isLoading }
          size={'large'}
          color={'black'}
        />
        <Text style={styles.desc}>
          {this.state.msg}
        </Text>
      </View>
    );
  }
}
        
const styles = StyleSheet.create({
  container:{
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  desc:{
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  inputRow:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'stretch'
  },
  inputText:{
    flex: 4,
    height: 36,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  button:{
    flex:1,
    flexDirection:'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  image: {
    width: 217,
    height: 138
  },
  indicator:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = SearchPage;