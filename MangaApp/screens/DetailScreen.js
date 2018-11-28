import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, TouchableOpacity, ListView } from 'react-native';

export default class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: 'Detail',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#33363B',
    }
  };
  

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  };

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator style={{ flex:1, backgroundColor: '#161B21'}}/>
        </View>
      )
    } 
    return (
      <View style={styles.container}>
        <View style={styles.infoView}>
          <View style={styles.imageView}>
            <Image source={{uri: 'https://cdn.mangaeden.com/mangasimg/' + this.state.dataSource.image}} style={{width:90, height:120}} />
          </View> 
          <View style={styles.detailView}>
            <View style={styles.textView}></View>
            <View style={styles.textView}>
              <Text style={{color: '#B1C7E8'}}>Title: {this.state.dataSource.title}</Text>
            </View>
            <View style={styles.textView}>
              <Text style={{color: '#B1C7E8'}}>Author: {this.state.dataSource.author}</Text>
            </View>
            <View style={styles.textView}>
              <Text style={{color: '#B1C7E8'}}>Chapter: {this.state.dataSource.chapters_len}</Text>
            </View>
            <View style={styles.textView}>
              <Text style={{color: '#B1C7E8'}}>Status: {this.state.dataSource.status == 1? 'Completed' : 'Ongoing'}</Text>
            </View>
            <View style={styles.textView}></View>
          </View>
        </View>
        <View style={styles.chapterView}>
          <ListView style={{paddingLeft: 20}}
            dataSource={this.state.chapterList}
            renderRow={(rowData) => 
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Chapter', {chapter: rowData}) }}>
              <Text style={{padding:10, color: '#B7D1F7'}}>{rowData[2]}</Text>
              <View style={{paddingLeft: 10, height:1, backgroundColor: '#302E30'}}></View>
            </TouchableOpacity>
            }
          />
        </View>
      </View>
    )
  }

  componentDidMount() {

    return fetch('https://www.mangaeden.com/api/manga/' + this.props.navigation.state.params.id)
    .then((response) => response.json())
    .then((responseJson) => {

      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: responseJson,
        chapterList: ds.cloneWithRows(responseJson.chapters),
      }, function(){

      });

    })
    .catch((error) =>{
        console.error(error);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoView: {
    flexDirection:'row',
    height: 200,
    backgroundColor: '#20262E',
  },
  imageView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailView: {
    flex:2,
    justifyContent: 'center',
  },
  textView: {
    flex: 1,
  },
  chapterView: {
    flex: 1,
    backgroundColor: '#161B21',
  }
});