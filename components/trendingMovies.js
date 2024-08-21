/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import { FlatList, Text, Dimensions, TouchableWithoutFeedback, View, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image500 } from '../api/movieDb';

function TrendingMovies({ data, isLoading }) {
    const width = Dimensions.get('window').width;
    const navigation = useNavigation();

    function handleClick(item) {
        navigation.navigate('Movie', item);
    }
    return (
        <>
            <Text style={{ color: 'white', fontSize: 20, marginBottom: 20, paddingLeft: 12 }}>
                Trending
            </Text>
            {isLoading ? <ActivityIndicator size={50} color={'white'} /> :
                <FlatList
                    data={data}
                    renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    initialScrollIndex={Math.floor(data.length / 2)} // Set initial scroll index to middle index
                    getItemLayout={(data, index) => ({
                        length: width, // Adjust according to your item width
                        offset: width * index,
                        index,
                    })}
                />
            }
        </>

    );
}

function MovieCard({ item, handleClick }) {
    const width = Dimensions.get('window').width;
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={{ height: width * 0.8, width: width, alignItems: 'center' }}>
                <Image
                    style={{
                        width: width * 0.6,
                        height: width * 0.8,
                        borderRadius: 20,
                        justifyContent: 'center',

                    }}
                    source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default TrendingMovies;
