/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import React from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchCastInfo, fetchCastMovies, image500 } from '../api/movieDb';

function CastDetailScreen() {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isfavourite, setFavourite] = React.useState(false);
    const { height, width } = Dimensions.get('window');
    const [castMovies, setCastMovies] = React.useState([]);
    const [castInfo, setCastInfo] = React.useState({});

    React.useEffect(() => {
        getCastInfo(item.id);
        getCastMovies(item.id);
    }, [item.id]);

    async function getCastInfo(id) {
        const data = await fetchCastInfo(id);
        if (data) {
            setCastInfo(data);
        }
    }
    async function getCastMovies(id) {
        const data = await fetchCastMovies(id);
        if (data.cast) {
            setCastMovies(data.cast);
        }
    }
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20, backgroundColor: '#1e201d' }}>
            <SafeAreaView style={{ marginTop: 16, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ backgroundColor: 'yellow', width: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 34 }} onPress={() => setFavourite(!isfavourite)} >
                    {isfavourite ? <Ionicons name="heart" size={35} color="red" /> : <Ionicons name="heart-outline" size={35} color="white" />}
                </TouchableOpacity>
            </SafeAreaView>
            <View style={{ alignItems: 'center', height: height * 0.43 }}>
                <View
                    style={{
                        alignItems: 'center',
                        borderRadius: 150,
                        shadowColor: 'white',
                        elevation: 10,
                        height: height * 0.4,
                        width: width * 0.84,
                    }}
                >
                    <Image
                        style={{
                            height: height * 0.4,
                            width: width * 0.84,
                            borderRadius: width * 0.5,
                        }}
                        source={{ uri: image500(castInfo?.profile_path) || fallbackMoviePoster }}
                    />
                </View>
            </View>
            {/* Cast DEscription */}
            <View style={{ alignItems: 'center', gap: 26, marginBottom: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 28 }}>{castInfo.name}</Text>
                    <Text style={{ color: 'grey', fontSize: 20 }}>{castInfo?.place_of_birth || 'NA'}</Text>
                </View>
                <View style={{ width: width * 0.98, height: 80, padding: 20, backgroundColor: '#343534', borderRadius: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', gap: 5, justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Gender</Text>
                        <Text style={{ color: 'grey', fontSize: 15 }}>{castInfo.gender === 1 ? 'Female' : castInfo.gender === 2 ? 'Male' : 'Not-Specified'}</Text>
                    </View>
                    <View style={{ alignItems: 'center', gap: 5, borderRightWidth: 2, borderLeftWidth: 2, paddingLeft: 10, borderColor: 'darkgrey', paddingRight: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Birthday</Text>
                        <Text style={{ color: 'grey', fontSize: 15 }}>{castInfo?.birthday || 'NA'}</Text>
                    </View>
                    <View style={{ alignItems: 'center', gap: 5, borderRightWidth: 2, paddingRight: 10, borderColor: 'darkgrey' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Known For</Text>
                        <Text style={{ color: 'grey', fontSize: 15 }}>{castInfo.known_for_department || 'NA'}</Text>
                    </View>
                    <View style={{ alignItems: 'center', gap: 5 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', alignItems: 'center', fontSize: 16 }}>Popularity</Text>
                        <Text style={{ color: 'grey', fontSize: 15 }}>{castInfo.popularity || 'NA'}</Text>
                    </View>
                </View>
            </View>

            {/* Biograpgy */}
            <View style={{ justifyContent: 'flex-start', marginLeft: 10, gap: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Biography</Text>
                <Text style={{ color: 'darkgrey' }}>{castInfo.biography || 'NA'}</Text>
            </View>
            {/* Movies of the particular cast */}
            <MovieList title={'Movies'} data={castMovies} winHeight={height * 0.25} winWidth={width * 0.4} hideSeeAll={true} />
        </ScrollView>
    );
}

export default CastDetailScreen;
