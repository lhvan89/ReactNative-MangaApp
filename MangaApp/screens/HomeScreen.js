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
            loading: false,
            data: [],
            error: null,
            isGridView: true
        };
        this.arrayholder = [];
    };

    componentDidMount() {
        this.requestManga();
    }

    componentWillMount() {
        clearTimeout(this.timeout);
    }

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                round
                onChangeText={(text) => {
                    this.text = text;
                    clearTimeout(this.timeout);
                    this.timeout = setTimeout(() => this.searchFilterFunction(this.text), 2000);
                }}
                autoCorrect={false}
            />
        )
    }

    renderFooter = () => {
        return (
            <View style={{paddingVertical: 20}}>
            <ActivityIndicator animating size='small' />
            </View>
        )
    };

    searchFilterFunction = text => {
        console.log(text);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.t.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
        data: newData,
        });
    };

  
    render() {
        if(this.state.loading) {
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator/>
                </View>
            );
        }
        if(this.state.isGridView) {
            return(
                <View style={{backgroundColor: '#161B21'}}>
                    <GridView
                        itemDimension={100}
                        items={this.state.data}
                        renderItem={item => (
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Detail', {id: item.i, title: item.t}) }}>
                                <View style={{flex: 1}}>
                                    <Image source={{uri: global.hostImage + item.im}} style={{width:'100%', height: 133}} />
                                    <Text style={{position:'absolute', width:'100%', textAlign: 'center', fontSize: 12 , bottom: 0, backgroundColor:'black', opacity: 0.9, color: '#B1C7E8', alignSelf: 'stretch'}}>{item.t}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListHeaderComponent = {this.renderHeader}
                    />
                </View>
            )
        } else{
            return(
                <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Details', { title: item.t, id: item.i }) }}>
                        <ListItem
                        roundAvatar
                        title={`${item.t}`}
                        subtitle={`${item.c}`}
                        avatar={{ uri: "https://cdn.mangaeden.com/mangasimg/" + item.im}}
                        />
                    </TouchableOpacity>
                    )}
                    keyExtractor={item => item.i}
                    ListHeaderComponent = {this.renderHeader}
                    ListFooterComponent = {this.renderFooter}
                />
                </View>
            );
        }
    }

    requestManga = () => {
        const url = global.apiHost + '/api/list/0/';
        this.setState({ loading: true });

        fetch(url)
        .then(res => res.json())
        .then(res => {
        this.setState({
            data: res.manga,
            error: res.error || null,
            loading: false,
        });
        this.arrayholder = res.manga;
        })
        .catch(error => {
            this.setState({ error, loading: false });
        });
    };
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