/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image200 } from '../api/movieDb';

function CastList({ data }) {
    const navigation = useNavigation();
    function handleClick(item) {
        navigation.navigate('Cast', item);
    }
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <CastCard item={item} handleClick={handleClick} />}
            horizontal
            contentContainerStyle={{ gap: 20 }}
            showsHorizontalScrollIndicator={false}
        />
    );
}

function CastCard({ item, handleClick }) {
    return (
        <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => handleClick(item)}>
            <Image
                style={{ height: 90, width: 90, borderRadius: 100 }}
                source={{ uri: image200(item.profile_path) || fallbackMoviePoster }}
            />
            <Text style={{ color: 'white' }}>{item.character.length > 10 ? item.character.slice(0, 10) + '...' : item.character}</Text>
            <Text style={{ color: 'grey' }}>{item.original_name.length > 10 ? item.original_name.slice(0, 10) + '...' : item.original_name}</Text>
        </TouchableOpacity>
    );
}

export default CastList;
