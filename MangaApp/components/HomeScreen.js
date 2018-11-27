import React from 'react';
import { StyleSheet, Text, Image, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'; 
import { ListItem, SearchBar } from 'react-native-elements';

import GridView from 'react-native-super-grid';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#33363B',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isGridView: true
    }
  };

  renderFooter = () => {
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size='small' />
      </View>
    )
  };

  changeGrid() {
    this.state.isGridView = !this.state.isGridView
    this.forceUpdate()
    console.log("hihfisdfjsldfjsdlgj")
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
          <ActivityIndicator/>
        </View>
      )
    }
    if(this.state.isGridView) {
      return(
        <View style={{backgroundColor: '#161B21'}}>
          <SearchBar
            ref='searchBar'
            placeholder='Search'
            onChangeText={this.search}
            onSearchButtonPress={this.search}
            onCancelButtonPress={this.search}
          />
          <GridView
            itemDimension={100}
            items={this.state.dataSource}
            renderItem={item => (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Details', {id: item.i}) }}>
              <View style={{flex: 1}}>
                <Image source={{uri: 'https://cdn.mangaeden.com/mangasimg/' + item.im}} style={{width:'100%', height: 133}} />

                <Text style={{position:'absolute', width:'100%', textAlign: 'center', fontSize: 12 , bottom: 0, backgroundColor:'black', opacity: 0.9, color: '#B1C7E8', alignSelf: 'stretch'}}>{item.t}</Text>
              </View>
            </TouchableOpacity>
            )}
          />
        </View>

      )
    } else{
      return(
        <View style={{flex: 1, paddingTop:20}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Details', {id: item.i}) }}>
                <ListItem
                  roundAvatar
                  title={`${item.t}`}
                  subtitle={`${item.c}`}
                  avatar={{ uri: "https://cdn.mangaeden.com/mangasimg/" + item.im}}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.i}
            ListFooterComponent = {this.renderFooter}
          />
        </View>
      );
    }
  }
  componentDidMount() {

    return fetch('https://www.mangaeden.com/api/list/0/?p=1&l=100')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson.manga,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }

  search() {
    console.log("search")
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 160,
    margin: 1
  },
  list: {
    flex: 1
  }
});