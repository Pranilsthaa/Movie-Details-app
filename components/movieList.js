/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image300 } from '../api/movieDb';

const MovieList = ({ title, data, winHeight, winWidth, hideSeeAll }) => {
    const navigation = useNavigation();

    function handleClick(item) {
        navigation.navigate('Movie', item);
    }
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                <Text style={{ fontSize: 20, color: 'white' }}>{title}</Text>
                {!hideSeeAll &&
                    <TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'yellow' }}>See All</Text>
                    </TouchableOpacity>
                }
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <MovieCard item={item} winHeight={winHeight} winWidth={winWidth} handleClick={handleClick} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

function MovieCard({ item, winHeight, winWidth, handleClick }) {
    return (
        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }} onPress={() => handleClick(item)}>
            <Image
                style={{ margin: 10, borderRadius: 20, height: winHeight, width: winWidth }}
                source={{ uri: item.poster_path ? image300(item.poster_path) : fallbackMoviePoster }}
            />
            <Text style={{ color: 'white', marginTop: -8 }}>{item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}</Text>
        </TouchableOpacity>
    );
}

export default MovieList;
