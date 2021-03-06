import React from 'react';
import { View, ListView, ActivityIndicator, Image, Dimensions} from 'react-native';

export default class ChapterScreen extends React.Component {

    deviceWidth = Dimensions.get('window').width

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Chapter'),
            headerTintColor: '#ffffff',
            headerStyle: {
            backgroundColor: '#33363B',
            }
        };
    };

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            )
        } 
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ListView
                    dataSource={this.state.chapterImages}
                    renderRow={(rowData) => 
                        <Image source={{uri: global.hostImage + rowData[1]}} style={{width:this.deviceWidth, height: this.deviceWidth * rowData[3] / rowData[2]}} />
                    }
                />
            </View>
        )
    }

    componentDidMount() {

        return fetch(global.apiChapter + this.props.navigation.state.params.chapter[3])
        .then((response) => response.json())
        .then((responseJson) => {
    
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                isLoading: false,
                chapterImages: ds.cloneWithRows(responseJson.images),
                chapterTitle: this.props.navigation.state.params.chapter[2]
            }, function(){
        
            });
    
        })
        .catch((error) =>{
            console.error(error);
        });
      }
}