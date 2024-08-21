/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */

import { Dimensions, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Fontawesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import TrendingMovies from '../components/trendingMovies';
import React from 'react';
import MovieList from '../components/movieList';
import { useNavigation } from '@react-navigation/native';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/movieDb';

function HomeScreen() {
    const [trending, setTrending] = React.useState([]);
    const [upcoming, setUpcoming] = React.useState([]);
    const [topRated, setTopRated] = React.useState([]);

    const [winHeight, setHeight] = React.useState(0);
    const [winWidth, setWidth] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const navigation = useNavigation();

    React.useEffect(() => {
        const { height, width } = Dimensions.get('window');
        setHeight(height * 0.25);
        setWidth(width * 0.4);

        getTrendingMovies(); // calling axios function to get trending movies
        getUpcomingMovies(); // calling axios function to get trending movies
        getTopRatedMovies(); // calling axios function to get trending movies
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) {
            setTrending(data.results);
            setLoading(false);
        }
    };
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) {
            setUpcoming(data.results);
        }
    };
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) {
            setTopRated(data.results);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#1e201d' }}>
            <StatusBar backgroundColor={'#1e201d'} />
            <SafeAreaView style={{ marginTop: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, padding: 12 }}>
                    <TouchableOpacity>
                        <Fontawesome6 name={'bars-staggered'} style={{ color: 'white', fontSize: 38 }} />
                    </TouchableOpacity>
                    <Text style={{ color: 'white', fontSize: 30 }}> <Text style={{ color: 'yellow' }}>M</Text>ovie</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Feather name={'search'} style={{ color: 'white', fontSize: 30 }} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <TrendingMovies data={trending} isLoading={loading} />
                    <MovieList title="Upcoming" data={upcoming} winHeight={winHeight} winWidth={winWidth} />
                    <MovieList title="Top Rated" data={topRated} winHeight={winHeight} winWidth={winWidth} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
export default HomeScreen;
