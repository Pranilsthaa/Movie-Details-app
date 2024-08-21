/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Dimensions, Image, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CastList from '../components/castList';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchCastDetail, fetchMovieDetail, fetchSimilarMovies, image500 } from '../api/movieDb';

function MovieScreen() {
    const { params: item } = useRoute(); //getting particular movie details
    const { height, width } = Dimensions.get('window');
    const navigation = useNavigation();
    const [isfavourite, setFavourite] = React.useState(false);
    const [similar, setSimilar] = React.useState([]);
    const [movieDetail, setMovieDetail] = React.useState({});
    const [cast, setCast] = React.useState([]);

    React.useEffect(() => {
        getMovieDetail(item.id);
        getCastDetail(item.id);
        getSimilarMovies(item.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    async function getMovieDetail(id) {
        const result = await fetchMovieDetail(id);
        if (result) {
            setMovieDetail(result);
        }
    }

    async function getCastDetail(id) {
        const data = await fetchCastDetail(id);
        if (data) {
            setCast(data.cast);
        }
    }
    async function getSimilarMovies(id) {
        const data = await fetchSimilarMovies(id);
        if (data) {
            setSimilar(data.results);
        }
    }

    return (
        <ScrollView style={{ backgroundColor: '#1e201d' }}>

            <SafeAreaView style={{ position: 'absolute', width: '100%', marginTop: 16, padding: 10, flexDirection: 'row', justifyContent: 'space-between', zIndex: 999 }}>
                <TouchableOpacity style={{ backgroundColor: 'yellow', width: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 34 }} onPress={() => setFavourite(!isfavourite)} >
                    {isfavourite ? <Ionicons name="heart" size={35} color="red" /> : <Ionicons name="heart-outline" size={35} color="white" />}
                </TouchableOpacity>
            </SafeAreaView>
            <View style={{ width, height: height / 1.8 }}>
                <Image
                    style={{ height: height / 1.8, width, position: 'absolute' }}
                    source={{ uri: movieDetail.poster_path ? image500(movieDetail?.poster_path) : fallbackMoviePoster }}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(30, 32, 29, 0.8)', 'rgba(30, 32, 29, 1)']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{
                        width,
                        height: height / 3,
                        position: 'absolute',
                        bottom: 0,
                        flex: 1,
                        borderRadius: 5,
                    }}
                />
            </View>
            {/* Movie Description */}
            <View style={{ marginTop: -(height * 0.09), justifyContent: 'center', alignItems: 'center', gap: 12 }}>
                <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }}>{movieDetail.title}</Text>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>Released • {movieDetail?.release_date?.split('-')[0]} • {movieDetail.runtime} min</Text>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                    {

                        movieDetail?.genres?.map((value, index) => {
                            const showDot = index + 1 !== movieDetail?.genres?.length;
                            return <Text key={Math.floor(Math.random() + index)} style={{ color: 'white' }}> {value.name} {showDot ? '•' : null} </Text>;
                        })
                    }
                </Text>
                <Text style={{ color: 'grey' }}>{item.overview}</Text>
            </View>
            {/* Cast */}
            <View style={{ padding: 12 }}>
                <Text style={{ color: 'white', fontSize: 18, marginBottom: 20 }}>Top Cast</Text>
                <CastList data={cast} />
            </View>
            <View style={{ padding: 12 }}>
                <MovieList data={similar} title={'Similar Movies'} winHeight={height * 0.25} winWidth={width * 0.4} hideSeeAll={true} />
            </View>
        </ScrollView>
    );
}

export default MovieScreen;
