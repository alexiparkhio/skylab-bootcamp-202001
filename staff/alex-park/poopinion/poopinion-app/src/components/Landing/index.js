import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, Image } from 'react-native'
import MapView from 'react-native-maps'
import styles from './styles'

function Landing({ user, lat, latDelta, lng, lngDelta }) {
    return (<>
        <ScrollView>
            <View style={styles.container}>
                {user && <Text style={styles.header}>Welcome, {user.name} {user.surname}!! Enjoy your pooping 🚽</Text>}
                {!user && <Text style={styles.header}>🚽 Welcome, stranger!! Enjoy your pooping 🚽</Text>}
                <Text>Your current position is: </Text>
                <MapView style={styles.mapStyle}
                    region={{
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: latDelta,
                        longitudeDelta: lngDelta,
                    }}>
                    <MapView.Marker coordinate={{
                        latitude: lat,
                        longitude: lng
                    }} />
                </MapView>

                <View style={styles.topToilets}>
                    <Text style={styles.bold}>Top Toilets</Text>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.left}>Skylab Coders Academy</Text>
                                <Text style={styles.left}>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text style={styles.right}>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.left}>Skylab Coders Academy</Text>
                                <Text style={styles.left}>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text style={styles.right}>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.left}>Skylab Coders Academy</Text>
                                <Text style={styles.left}>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text style={styles.right}>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.left}>Skylab Coders Academy</Text>
                                <Text style={styles.left}>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text style={styles.right}>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.left}>Skylab Coders Academy</Text>
                                <Text style={styles.left}>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text style={styles.right}>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <View style={styles.posts}>
                    <View style={styles.post}>
                        <Image style={styles.postImage} source={require('../../../assets/placeholder.jpg')} />
                        <View style={styles.postContent}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.left}>Skylab Coders Academy</Text>
                                <Text style={styles.left}>💩💩💩💩💩 (666)</Text>
                            </View>

                            <View style={styles.contentRight}>
                                <Text style={styles.right}>💖</Text>
                            </View>

                        </View>
                    </View>
                </View>

            </View>
        </ScrollView>
    </>)
}

export default Landing