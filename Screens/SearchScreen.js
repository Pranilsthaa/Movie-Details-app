/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, TextInput, TouchableOpacity, View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import CrossIcon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, fetchSearchResult, image500 } from '../api/movieDb';

function SearchScreen() {
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const [result, setResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [search, setSearch] = React.useState(null);

    React.useEffect(() => {
        getSearchResult({
            query: search ? search : 'aven',
            include_adult: 'false',
            language: 'en-US',
            page: '1',
        });
    }, [search]);

    async function getSearchResult(params) {
        if (typeof search === 'string' && search.length > 2) {
            let data = await fetchSearchResult(params);
            if (data.results) {
                setResult(data.results);
            }
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#1e201d', flex: 1, paddingHorizontal: 12, gap: 14 }}>
            <View style={{ alignItems: 'center', height: 60, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingRight: 4, borderColor: 'darkgrey', borderWidth: 1, borderRadius: 40 }}>
                <TextInput
                    style={{ flex: 1, paddingLeft: 22, width: width * 0.84, fontSize: 16, color: 'white' }}
                    placeholder="Search Movies..."
                    placeholderTextColor={'grey'}
                    onChangeText={(text) => setSearch(text)}
                />
                <TouchableOpacity style={{ backgroundColor: 'grey', padding: 8, borderRadius: 50 }} onPress={() => navigation.navigate('Home')}>
                    <CrossIcon name="cross" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ gap: 20 }} showsVerticalScrollIndicator={false} >
                {/* Shows loading animation if loading */}
                {loading ? (<ActivityIndicator size="large" color={'white'} />)
                    : result.length > 0 ?
                        <>
                            <Text style={{ color: 'white' }}>Results ({result.length})</Text>
                            <FlatList
                                contentContainerStyle={{ gap: 20 }}
                                data={result}
                                numColumns={2}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{ width: width * 0.44, marginRight: 20, alignItems: 'center' }} onPress={() => navigation.navigate('Movie', item)}>
                                        <Image
                                            style={{ width: '100%', height: height * 0.3, borderRadius: 16 }}
                                            source={{
                                                uri: image500(item.poster_path) || fallbackMoviePoster,
                                            }}
                                        />
                                        <Text style={{ color: 'white' }}>{result?.title?.length > 22 ? result?.title?.slice(0, 22) + '...' : result?.title}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                scrollEnabled={false}
                            />
                        </> :
                        <View>
                            <Image
                                style={{ height: 500, width: 500, objectFit: 'contain' }}
                                source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-6074325-5006801.png' }}
                            />
                        </View>
                }

            </ScrollView>
        </SafeAreaView>
    );
}

export default SearchScreen;
