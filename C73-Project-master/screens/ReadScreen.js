import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import db from '../config';

export default class ReadStoryScreen extends React.Component{
  constructor(props) {
    super(props);

    this.state={
      book: [],
      search: '',
    }
  }

  componentDidMount = async () => {
    const allStories = await db.collection("books").get();

    allStories.docs.map((doc) => {
      this.setState({
        book: [...this.state.book, doc.data()]
      });
    });
  }

  searchFilterFunction = async (text) => {
    const story = await db.collection("books").where('storyName', '==', text).get();
    story.docs.map((doc) => {
      this.setState({
        book: [...this.state.book, doc.data()]
      });
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.bar}
            placeholder="Enter book name"
            onChangeText={(text) => {this.setState({search: text})}}
          />

          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => {this.searchFilterFunction(this.state.search)}}  
          >
            <Text>Search</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {this.state.book.map((read, index) => {
            return(
              <View key={index} style={{borderBottomWidth: 2, marginTop: 20, marginBottom: 20}}>
                <Text>{"Story Name: " + read.storyName}</Text>
                <Text>{"Story Author: " + read.storyAuthor}</Text>
                <Text>{"Pages: " + read.pages}</Text>
                <Text>{"Price: " + read.price}</Text>
              </View>
            );   
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    width: 'auto',
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 280,
    paddingLeft: 10,
    borderRadius: 30,
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  }
});